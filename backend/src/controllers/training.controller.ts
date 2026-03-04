import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { trainingService, aiService } from '../services';
import { asyncHandler } from '../middleware';
import { ModuleCategory } from '@prisma/client';

export const trainingController = {
  // Get all modules
  getModules: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { category, isPublished, page, limit } = req.query;

    const result = await trainingService.getModules(req.user.organizationId, {
      category: category as ModuleCategory | undefined,
      isPublished: isPublished === 'true' ? true : isPublished === 'false' ? false : undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: result.modules,
      meta: result.pagination,
    });
  }),

  // Get single module
  getModuleById: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const result = await trainingService.getModuleById(id, req.user?.id);

    res.json({
      success: true,
      data: result,
    });
  }),

  // Start scenario
  startScenario: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { scenarioId } = req.body;

    const result = await trainingService.startScenario(req.user.id, scenarioId);

    res.json({
      success: true,
      data: result,
    });
  }),

  // Submit decision
  submitDecision: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { sessionAttemptId, decisionId, choice, context } = req.body;

    const result = await trainingService.submitDecision(req.user.id, {
      sessionAttemptId,
      decisionId,
      choice,
      context,
    });

    res.json({
      success: true,
      data: result,
    });
  }),

  // Complete scenario
  completeScenario: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { sessionAttemptId } = req.body;

    const result = await trainingService.completeScenario(req.user.id, sessionAttemptId);

    res.json({
      success: true,
      data: result,
    });
  }),

  // Get user progress
  getProgress: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const result = await trainingService.getUserProgress(req.user.id);

    res.json({
      success: true,
      data: result,
    });
  }),

  // AI Chat interaction
  aiChat: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { scenarioId, prompt, npcName, npcRole, previousMessages } = req.body;

    const response = await aiService.generateNPCResponse(req.user.id, {
      scenarioId,
      npcName: npcName || 'AI Assistant',
      npcRole: npcRole || 'Corporate AI Model',
      userLevel: 'intermediate',
      previousMessages: previousMessages || [{ role: 'user', content: prompt }],
      complianceContext: '',
    });

    res.json({
      success: true,
      data: response,
    });
  }),

  // Analyze prompt for risks
  analyzePrompt: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { prompt, scenarioId, department } = req.body;

    const analysis = await aiService.analyzePrompt(prompt, { scenarioId, department });

    res.json({
      success: true,
      data: analysis,
    });
  }),
};
