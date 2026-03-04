import { Router } from 'express';
import authRoutes from './auth.routes';
import trainingRoutes from './training.routes';
import analyticsRoutes from './analytics.routes';
import adminRoutes from './admin.routes';

const router = Router();

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Literacy Platform API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/training', trainingRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/admin', adminRoutes);

export default router;
