import prisma from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';
import { OrganizationAnalytics, DepartmentStats, TrendPoint } from '../types';
import { ScorePeriod } from '@prisma/client';

export class AnalyticsService {
  // Get organization-wide analytics
  async getOrganizationAnalytics(
    organizationId: string,
    period: ScorePeriod = ScorePeriod.WEEKLY
  ): Promise<OrganizationAnalytics> {
    // Try cache first
    const cacheKey = `analytics:org:${organizationId}:${period}`;
    const cached = await cacheGet<OrganizationAnalytics>(cacheKey);
    if (cached) return cached;

    // Get date range based on period
    const startDate = this.getStartDate(period);

    // Get user counts
    const [totalUsers, activeUsers] = await Promise.all([
      prisma.user.count({
        where: { organizationId, deletedAt: null },
      }),
      prisma.user.count({
        where: {
          organizationId,
          deletedAt: null,
          lastLoginAt: { gte: startDate },
        },
      }),
    ]);

    // Get compliance metrics
    const complianceScores = await prisma.complianceScore.findMany({
      where: {
        user: { organizationId },
        calculatedAt: { gte: startDate },
      },
      orderBy: { calculatedAt: 'desc' },
    });

    const avgComplianceScore =
      complianceScores.length > 0
        ? complianceScores.reduce((sum, s) => sum + s.overallScore, 0) / complianceScores.length
        : 0;

    // Get completed modules
    const completedModules = await prisma.userProgress.count({
      where: {
        user: { organizationId },
        status: 'COMPLETED',
        completedAt: { gte: startDate },
      },
    });

    // Get session stats
    const sessionStats = await prisma.sessionAttempt.aggregate({
      where: {
        user: { organizationId },
        completedAt: { gte: startDate },
      },
      _avg: {
        riskScoreTotal: true,
        promptSuccessRate: true,
      },
    });

    // Get department breakdown
    const departmentBreakdown = await this.getDepartmentBreakdown(organizationId, startDate);

    // Get trend data
    const [riskTrend, complianceTrend] = await Promise.all([
      this.getRiskTrend(organizationId, period),
      this.getComplianceTrend(organizationId, period),
    ]);

    // Get recent violations
    const recentViolations = await prisma.riskIncident.findMany({
      where: {
        organizationId,
        createdAt: { gte: startDate },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        incidentType: true,
        severity: true,
        description: true,
        createdAt: true,
      },
    });

    const analytics: OrganizationAnalytics = {
      complianceReadiness: avgComplianceScore,
      avgRiskScore: sessionStats._avg.riskScoreTotal || 0,
      activeUsers,
      totalUsers,
      completedModules,
      avgPromptSuccessRate: sessionStats._avg.promptSuccessRate || 0,
      departmentBreakdown,
      riskTrend,
      complianceTrend,
      recentViolations: recentViolations.map((v) => ({
        id: v.id,
        type: v.incidentType,
        severity: v.severity,
        description: v.description,
        createdAt: v.createdAt,
      })),
    };

    // Cache for 5 minutes
    await cacheSet(cacheKey, analytics, 300);

    return analytics;
  }

  // Get single user analytics
  async getUserAnalytics(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        department: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Get progress summary
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        module: {
          select: { id: true, title: true, category: true },
        },
      },
    });

    const completedModules = progress.filter((p) => p.status === 'COMPLETED').length;
    const totalModules = await prisma.trainingModule.count({
      where: { isPublished: true, deletedAt: null },
    });

    // Get latest compliance scores
    const latestScores = await prisma.complianceScore.findMany({
      where: { userId },
      orderBy: { calculatedAt: 'desc' },
      take: 10,
    });

    const currentScore = latestScores[0] || {
      overallScore: 0,
      riskDetectionScore: 0,
      ethicalJudgmentScore: 0,
      policyAdherenceScore: 0,
      promptSafetyScore: 0,
    };

    // Get session history
    const sessions = await prisma.sessionAttempt.findMany({
      where: { userId, completedAt: { not: null } },
      orderBy: { completedAt: 'desc' },
      take: 20,
      include: {
        scenario: {
          select: { title: true, scenarioType: true },
        },
      },
    });

    // Calculate knowledge retention (based on quiz performance over time)
    const retentionScore = this.calculateRetentionScore(sessions);

    // Get skill radar data
    const skillRadar = {
      aiLiteracy: this.getCategoryScore(progress, 'AI_FUNDAMENTALS'),
      ethicsAwareness: this.getCategoryScore(progress, 'BIAS_ETHICS'),
      complianceKnowledge: this.getCategoryScore(progress, 'GOVERNANCE_ESCALATION'),
      ipUnderstanding: this.getCategoryScore(progress, 'IP_CONTENT_LIABILITY'),
      privacyCompliance: this.getCategoryScore(progress, 'DATA_PRIVACY_SECURITY'),
    };

    return {
      user,
      summary: {
        completedModules,
        totalModules,
        certificationProgress: (completedModules / totalModules) * 100,
        currentComplianceScore: currentScore.overallScore,
        retentionScore,
      },
      scores: {
        current: currentScore,
        history: latestScores.map((s) => ({
          date: s.calculatedAt,
          score: s.overallScore,
        })),
      },
      skillRadar,
      recentSessions: sessions.map((s) => ({
        id: s.id,
        scenarioTitle: s.scenario.title,
        scenarioType: s.scenario.scenarioType,
        score: s.score,
        completedAt: s.completedAt,
      })),
      moduleProgress: progress,
    };
  }

  // Export analytics to CSV format
  async exportAnalytics(
    organizationId: string,
    type: 'compliance' | 'users' | 'incidents'
  ): Promise<string> {
    let csvContent = '';

    switch (type) {
      case 'compliance': {
        const scores = await prisma.complianceScore.findMany({
          where: { user: { organizationId } },
          include: {
            user: {
              select: { email: true, firstName: true, lastName: true, department: true },
            },
          },
          orderBy: { calculatedAt: 'desc' },
        });

        csvContent =
          'User Email,Name,Department,Overall Score,Risk Detection,Ethical Judgment,Policy Adherence,Prompt Safety,Date\n';
        scores.forEach((s) => {
          csvContent += `${s.user.email},"${s.user.firstName} ${s.user.lastName}",${s.user.department || 'N/A'},${s.overallScore},${s.riskDetectionScore},${s.ethicalJudgmentScore},${s.policyAdherenceScore},${s.promptSafetyScore},${s.calculatedAt.toISOString()}\n`;
        });
        break;
      }

      case 'users': {
        const users = await prisma.user.findMany({
          where: { organizationId, deletedAt: null },
          include: {
            progress: {
              where: { status: 'COMPLETED' },
              select: { moduleId: true },
            },
          },
        });

        csvContent =
          'Email,First Name,Last Name,Role,Department,Completed Modules,Last Login,Created At\n';
        users.forEach((u) => {
          csvContent += `${u.email},"${u.firstName}","${u.lastName}",${u.role},${u.department || 'N/A'},${u.progress.length},${u.lastLoginAt?.toISOString() || 'Never'},${u.createdAt.toISOString()}\n`;
        });
        break;
      }

      case 'incidents': {
        const incidents = await prisma.riskIncident.findMany({
          where: { organizationId },
          orderBy: { createdAt: 'desc' },
        });

        csvContent =
          'ID,Type,Severity,Description,Violated Policies,Resolved,Created At,Resolved At\n';
        incidents.forEach((i) => {
          csvContent += `${i.id},${i.incidentType},${i.severity},"${i.description}","${i.violatedPolicies.join('; ')}",${i.isResolved},${i.createdAt.toISOString()},${i.resolvedAt?.toISOString() || ''}\n`;
        });
        break;
      }
    }

    return csvContent;
  }

  // Create analytics snapshot
  async createSnapshot(organizationId: string, period: ScorePeriod): Promise<void> {
    const analytics = await this.getOrganizationAnalytics(organizationId, period);

    const criticalIncidents = await prisma.riskIncident.count({
      where: {
        organizationId,
        severity: 'CRITICAL',
        createdAt: { gte: this.getStartDate(period) },
      },
    });

    const totalViolations = await prisma.riskIncident.count({
      where: {
        organizationId,
        createdAt: { gte: this.getStartDate(period) },
      },
    });

    await prisma.analyticsSnapshot.create({
      data: {
        organizationId,
        period,
        totalUsers: analytics.totalUsers,
        activeUsers: analytics.activeUsers,
        completedModules: analytics.completedModules,
        avgComplianceScore: analytics.complianceReadiness,
        complianceReadiness: analytics.complianceReadiness,
        avgRiskScore: analytics.avgRiskScore,
        totalViolations,
        criticalIncidents,
        avgPromptSuccessRate: analytics.avgPromptSuccessRate,
        avgEthicalScore: 0, // Would be calculated from individual scores
        avgKnowledgeRetention: 0, // Would be calculated from quiz data
        departmentStats: analytics.departmentBreakdown,
        riskTrend: analytics.riskTrend,
        complianceTrend: analytics.complianceTrend,
      },
    });
  }

  // Private helper methods
  private getStartDate(period: ScorePeriod): Date {
    const now = new Date();
    switch (period) {
      case ScorePeriod.DAILY:
        return new Date(now.setDate(now.getDate() - 1));
      case ScorePeriod.WEEKLY:
        return new Date(now.setDate(now.getDate() - 7));
      case ScorePeriod.MONTHLY:
        return new Date(now.setMonth(now.getMonth() - 1));
      case ScorePeriod.QUARTERLY:
        return new Date(now.setMonth(now.getMonth() - 3));
      case ScorePeriod.YEARLY:
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(now.setDate(now.getDate() - 7));
    }
  }

  private async getDepartmentBreakdown(
    organizationId: string,
    startDate: Date
  ): Promise<Record<string, DepartmentStats>> {
    const users = await prisma.user.findMany({
      where: { organizationId, deletedAt: null },
      select: { id: true, department: true },
    });

    const departments = [...new Set(users.map((u) => u.department || 'Unassigned'))];
    const breakdown: Record<string, DepartmentStats> = {};

    for (const dept of departments) {
      const deptUsers = users.filter((u) => (u.department || 'Unassigned') === dept);
      const userIds = deptUsers.map((u) => u.id);

      const [scores, progress] = await Promise.all([
        prisma.complianceScore.findMany({
          where: {
            userId: { in: userIds },
            calculatedAt: { gte: startDate },
          },
        }),
        prisma.userProgress.findMany({
          where: {
            userId: { in: userIds },
            status: 'COMPLETED',
          },
        }),
      ]);

      const avgCompliance =
        scores.length > 0
          ? scores.reduce((sum, s) => sum + s.overallScore, 0) / scores.length
          : 0;

      const avgRisk =
        scores.length > 0
          ? scores.reduce((sum, s) => sum + (100 - s.riskDetectionScore), 0) / scores.length
          : 0;

      breakdown[dept] = {
        userCount: deptUsers.length,
        avgComplianceScore: avgCompliance,
        avgRiskScore: avgRisk,
        completionRate: deptUsers.length > 0 ? (progress.length / deptUsers.length) * 100 : 0,
      };
    }

    return breakdown;
  }

  private async getRiskTrend(organizationId: string, period: ScorePeriod): Promise<TrendPoint[]> {
    const snapshots = await prisma.analyticsSnapshot.findMany({
      where: {
        organizationId,
        period,
      },
      orderBy: { snapshotDate: 'asc' },
      take: 30,
      select: {
        snapshotDate: true,
        avgRiskScore: true,
      },
    });

    return snapshots.map((s) => ({
      date: s.snapshotDate.toISOString().split('T')[0],
      value: s.avgRiskScore,
    }));
  }

  private async getComplianceTrend(
    organizationId: string,
    period: ScorePeriod
  ): Promise<TrendPoint[]> {
    const snapshots = await prisma.analyticsSnapshot.findMany({
      where: {
        organizationId,
        period,
      },
      orderBy: { snapshotDate: 'asc' },
      take: 30,
      select: {
        snapshotDate: true,
        avgComplianceScore: true,
      },
    });

    return snapshots.map((s) => ({
      date: s.snapshotDate.toISOString().split('T')[0],
      value: s.avgComplianceScore,
    }));
  }

  private calculateRetentionScore(sessions: { score: number; completedAt: Date | null }[]): number {
    if (sessions.length < 2) return 0;

    // Compare recent scores to older scores
    const recentSessions = sessions.slice(0, Math.ceil(sessions.length / 2));
    const olderSessions = sessions.slice(Math.ceil(sessions.length / 2));

    const recentAvg = recentSessions.reduce((sum, s) => sum + s.score, 0) / recentSessions.length;
    const olderAvg = olderSessions.reduce((sum, s) => sum + s.score, 0) / olderSessions.length;

    // If scores are improving or stable, retention is good
    if (recentAvg >= olderAvg) return Math.min(100, recentAvg);

    // Calculate retention based on score maintenance
    return Math.max(0, (recentAvg / olderAvg) * 100);
  }

  private getCategoryScore(
    progress: Array<{
      completionPercent: number;
      bestScore: number | null;
      module: { category: string };
    }>,
    category: string
  ): number {
    const categoryProgress = progress.filter((p) => p.module.category === category);
    if (categoryProgress.length === 0) return 0;

    const avgCompletion =
      categoryProgress.reduce((sum, p) => sum + p.completionPercent, 0) / categoryProgress.length;
    const avgScore =
      categoryProgress.reduce((sum, p) => sum + (p.bestScore || 0), 0) / categoryProgress.length;

    return (avgCompletion + avgScore) / 2;
  }
}

export const analyticsService = new AnalyticsService();
