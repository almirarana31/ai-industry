import { Router } from 'express';
import { trainingController } from '../controllers';
import {
  authenticate,
  validate,
  moduleIdSchema,
  startScenarioSchema,
  submitDecisionSchema,
  aiPromptSchema,
} from '../middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Module routes
router.get('/modules', trainingController.getModules);
router.get('/modules/:id', validate(moduleIdSchema), trainingController.getModuleById);

// Scenario routes
router.post('/scenario/start', validate(startScenarioSchema), trainingController.startScenario);
router.post('/scenario/decision', validate(submitDecisionSchema), trainingController.submitDecision);
router.post('/scenario/complete', trainingController.completeScenario);

// Progress routes
router.get('/progress', trainingController.getProgress);

// AI interaction routes
router.post('/ai/chat', validate(aiPromptSchema), trainingController.aiChat);
router.post('/ai/analyze', trainingController.analyzePrompt);

export default router;
