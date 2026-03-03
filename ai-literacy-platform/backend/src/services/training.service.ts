import prisma from '../config/database';
import { AppError } from '../middleware/error';
import { ScenarioDecision } from '../types';
import { calculateComplianceScore, getPaginationParams } from '../utils';
import { ModuleCategory, ProgressStatus } from '@prisma/client';

export class TrainingService {
  // Get all training modules
  async getModules(
    organizationId: string,
    filters?: {
      category?: ModuleCategory;
      isPublished?: boolean;
      page?: number;
      limit?: number;
    }
  ) {
    const { page, limit, skip } = getPaginationParams(filters?.page, filters?.limit);

    const where = {
      AND: [
        { OR: [{ organizationId }, { organizationId: null }] },
        { deletedAt: null },
        filters?.isPublished !== undefined ? { isPublished: filters.isPublished } : {},
        filters?.category ? { category: filters.category } : {},
      ],
    };

    const [modules, total] = await Promise.all([
      prisma.trainingModule.findMany({
        where,
        include: {
          scenarios: {
            where: { isActive: true, deletedAt: null },
            select: { id: true, title: true, scenarioType: true },
            orderBy: { order: 'asc' },
          },
          _count: {
            select: { scenarios: true },
          },
        },
        orderBy: { order: 'asc' },
        skip,
        take: limit,
      }),
      prisma.trainingModule.count({ where }),
    ]);

    return {
      modules,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get single module with full details
  async getModuleById(moduleId: string, userId?: string) {
    const module = await prisma.trainingModule.findUnique({
      where: { id: moduleId },
      include: {
        scenarios: {
          where: { isActive: true, deletedAt: null },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!module || module.deletedAt) {
      throw new AppError('Module not found', 404);
    }

    // Get user progress if userId provided
    let progress = null;
    if (userId) {
      progress = await prisma.userProgress.findUnique({
        where: {
          userId_moduleId: { userId, moduleId },
        },
      });
    }

    return { module, progress };
  }

  // Start a scenario session
  async startScenario(userId: string, scenarioId: string) {
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId },
      include: { module: true },
    });

    if (!scenario || scenario.deletedAt) {
      throw new AppError('Scenario not found', 404);
    }

    // Create session attempt
    const sessionAttempt = await prisma.sessionAttempt.create({
      data: {
        userId,
        scenarioId,
        startedAt: new Date(),
      },
    });

    // Update or create user progress
    await prisma.userProgress.upsert({
      where: {
        userId_moduleId: { userId, moduleId: scenario.moduleId },
      },
      update: {
        status: ProgressStatus.IN_PROGRESS,
        lastAccessedAt: new Date(),
        attemptCount: { increment: 1 },
      },
      create: {
        userId,
        moduleId: scenario.moduleId,
        status: ProgressStatus.IN_PROGRESS,
        startedAt: new Date(),
        attemptCount: 1,
      },
    });

    // Log audit event
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { organizationId: true },
    });

    if (user) {
      await prisma.auditLog.create({
        data: {
          action: 'SCENARIO_STARTED',
          resourceType: 'scenario',
          resourceId: scenarioId,
          userId,
          organizationId: user.organizationId,
          details: {
            scenarioTitle: scenario.title,
            moduleTitle: scenario.module.title,
          },
        },
      });
    }

    return {
      sessionAttemptId: sessionAttempt.id,
      scenario: {
        id: scenario.id,
        title: scenario.title,
        description: scenario.description,
        context: scenario.context,
        scenarioType: scenario.scenarioType,
        initialState: scenario.initialState,
      },
    };
  }

  // Submit a decision in a scenario
  async submitDecision(
    userId: string,
    data: {
      sessionAttemptId: string;
      decisionId: string;
      choice: string;
      context?: Record<string, unknown>;
    }
  ) {
    const sessionAttempt = await prisma.sessionAttempt.findUnique({
      where: { id: data.sessionAttemptId },
      include: {
        scenario: true,
        user: { select: { organizationId: true } },
      },
    });

    if (!sessionAttempt) {
      throw new AppError('Session attempt not found', 404);
    }

    if (sessionAttempt.userId !== userId) {
      throw new AppError('Unauthorized access to session', 403);
    }

    if (sessionAttempt.completedAt) {
      throw new AppError('Session already completed', 400);
    }

    // Evaluate decision
    const evaluation = this.evaluateDecision(
      data.choice,
      sessionAttempt.scenario.decisionTree as Record<string, unknown>,
      sessionAttempt.scenario.riskFactors as unknown[]
    );

    // Update session attempt with new decision
    const currentDecisions = sessionAttempt.decisions as ScenarioDecision[];
    const newDecision: ScenarioDecision = {
      decisionId: data.decisionId,
      choice: data.choice,
      timestamp: new Date(),
      context: data.context || {},
    };

    const updatedAttempt = await prisma.sessionAttempt.update({
      where: { id: data.sessionAttemptId },
      data: {
        decisions: [...currentDecisions, newDecision],
        riskScoreTotal: sessionAttempt.riskScoreTotal + evaluation.riskScore,
        complianceScore: Math.max(0, sessionAttempt.complianceScore + evaluation.complianceImpact),
        ethicalScore: Math.max(0, sessionAttempt.ethicalScore + evaluation.ethicalImpact),
        violations: evaluation.isViolation
          ? [...(sessionAttempt.violations as string[]), data.decisionId]
          : sessionAttempt.violations,
      },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'DECISION_MADE',
        resourceType: 'scenario',
        resourceId: sessionAttempt.scenarioId,
        userId,
        organizationId: sessionAttempt.user.organizationId,
        details: {
          sessionAttemptId: data.sessionAttemptId,
          decisionId: data.decisionId,
          choice: data.choice,
          evaluation,
        },
      },
    });

    return {
      evaluation,
      currentScores: {
        riskScore: updatedAttempt.riskScoreTotal,
        complianceScore: updatedAttempt.complianceScore,
        ethicalScore: updatedAttempt.ethicalScore,
      },
      isViolation: evaluation.isViolation,
      feedback: evaluation.feedback,
    };
  }

  // Complete a scenario session
  async completeScenario(userId: string, sessionAttemptId: string) {
    const sessionAttempt = await prisma.sessionAttempt.findUnique({
      where: { id: sessionAttemptId },
      include: {
        scenario: { include: { module: true } },
        user: { select: { organizationId: true } },
      },
    });

    if (!sessionAttempt) {
      throw new AppError('Session attempt not found', 404);
    }

    if (sessionAttempt.userId !== userId) {
      throw new AppError('Unauthorized access to session', 403);
    }

    // Calculate final scores
    const decisions = sessionAttempt.decisions as ScenarioDecision[];
    const violations = sessionAttempt.violations as string[];
    const totalDecisions = decisions.length;
    const successfulDecisions = totalDecisions - violations.length;

    const finalScore = totalDecisions > 0 ? (successfulDecisions / totalDecisions) * 100 : 0;
    const promptSuccessRate = await this.calculatePromptSuccessRate(sessionAttemptId);

    // Update session attempt
    const completedAttempt = await prisma.sessionAttempt.update({
      where: { id: sessionAttemptId },
      data: {
        completedAt: new Date(),
        score: finalScore,
        promptSuccessRate,
        timeSpentSeconds: Math.floor(
          (Date.now() - sessionAttempt.startedAt.getTime()) / 1000
        ),
      },
    });

    // Update user progress
    await this.updateModuleProgress(userId, sessionAttempt.scenario.moduleId);

    // Update compliance score
    await this.updateUserComplianceScore(userId, {
      riskDetection: 100 - sessionAttempt.riskScoreTotal,
      ethicalJudgment: sessionAttempt.ethicalScore,
      policyAdherence: sessionAttempt.complianceScore,
      promptSafety: promptSuccessRate,
      escalation: sessionAttempt.escalationsMade > 0 ? 80 : 50,
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'SCENARIO_COMPLETED',
        resourceType: 'scenario',
        resourceId: sessionAttempt.scenarioId,
        userId,
        organizationId: sessionAttempt.user.organizationId,
        details: {
          sessionAttemptId,
          finalScore,
          decisionsCount: totalDecisions,
          violationsCount: violations.length,
        },
      },
    });

    return {
      score: finalScore,
      complianceScore: sessionAttempt.complianceScore,
      ethicalScore: sessionAttempt.ethicalScore,
      promptSuccessRate,
      violations: violations.length,
      timeSpentSeconds: completedAttempt.timeSpentSeconds,
    };
  }

  // Get user progress across all modules
  async getUserProgress(userId: string) {
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            category: true,
            estimatedMinutes: true,
          },
        },
      },
      orderBy: { lastAccessedAt: 'desc' },
    });

    const totalModules = await prisma.trainingModule.count({
      where: { isPublished: true, deletedAt: null },
    });

    const completedModules = progress.filter((p) => p.status === 'COMPLETED').length;
    const certifiedModules = progress.filter((p) => p.status === 'CERTIFIED').length;
    const overallCompletion = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    return {
      progress,
      summary: {
        totalModules,
        completedModules,
        certifiedModules,
        inProgressModules: progress.filter((p) => p.status === 'IN_PROGRESS').length,
        overallCompletion,
      },
    };
  }

  // Private helper methods
  private evaluateDecision(
    choice: string,
    decisionTree: Record<string, unknown>,
    riskFactors: unknown[]
  ): {
    riskScore: number;
    complianceImpact: number;
    ethicalImpact: number;
    isViolation: boolean;
    feedback: string;
  } {
    // Default evaluation - in production, this would use the decision tree
    const isRisky = choice.toLowerCase().includes('proceed') || 
                    choice.toLowerCase().includes('ignore');
    const isEthical = choice.toLowerCase().includes('escalate') ||
                      choice.toLowerCase().includes('review') ||
                      choice.toLowerCase().includes('consult');

    return {
      riskScore: isRisky ? 20 : 0,
      complianceImpact: isRisky ? -15 : 10,
      ethicalImpact: isEthical ? 15 : isRisky ? -10 : 5,
      isViolation: isRisky,
      feedback: isRisky
        ? 'This decision may violate compliance policies. Consider escalating to appropriate teams.'
        : 'Good decision. This aligns with company compliance guidelines.',
    };
  }

  private async calculatePromptSuccessRate(sessionAttemptId: string): Promise<number> {
    const interactions = await prisma.nPCInteraction.findMany({
      where: { sessionAttemptId },
      select: { riskFlags: true },
    });

    if (interactions.length === 0) return 100;

    const safeInteractions = interactions.filter(
      (i) => (i.riskFlags as string[]).length === 0
    ).length;

    return (safeInteractions / interactions.length) * 100;
  }

  private async updateModuleProgress(userId: string, moduleId: string): Promise<void> {
    // Get all scenarios in module
    const scenarios = await prisma.scenario.findMany({
      where: { moduleId, isActive: true },
      select: { id: true },
    });

    // Get completed sessions for this module
    const completedSessions = await prisma.sessionAttempt.findMany({
      where: {
        userId,
        scenarioId: { in: scenarios.map((s) => s.id) },
        completedAt: { not: null },
      },
      distinct: ['scenarioId'],
    });

    const completionPercent = (completedSessions.length / scenarios.length) * 100;
    const isCompleted = completionPercent >= 100;

    await prisma.userProgress.update({
      where: { userId_moduleId: { userId, moduleId } },
      data: {
        completionPercent,
        status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS,
        completedAt: isCompleted ? new Date() : undefined,
      },
    });
  }

  private async updateUserComplianceScore(
    userId: string,
    scores: {
      riskDetection: number;
      ethicalJudgment: number;
      policyAdherence: number;
      promptSafety: number;
      escalation: number;
    }
  ): Promise<void> {
    const overallScore = calculateComplianceScore(
      scores.riskDetection,
      scores.ethicalJudgment,
      scores.policyAdherence,
      scores.promptSafety,
      scores.escalation
    );

    await prisma.complianceScore.create({
      data: {
        userId,
        overallScore,
        riskDetectionScore: scores.riskDetection,
        ethicalJudgmentScore: scores.ethicalJudgment,
        policyAdherenceScore: scores.policyAdherence,
        promptSafetyScore: scores.promptSafety,
        escalationScore: scores.escalation,
        period: 'DAILY',
      },
    });
  }
}

export const trainingService = new TrainingService();
