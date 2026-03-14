/**
 * Consent Management Routes
 * API endpoints for user consent preferences
 */

import { Router } from 'express';
import {
  getConsent,
  updateConsent,
  syncConsent,
  getConsentHistory,
} from '../controllers/consent.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All consent routes require authentication
router.use(authenticate);

/**
 * GET /api/consent
 * Get current user's consent preferences
 */
router.get('/', getConsent);

/**
 * PUT /api/consent
 * Update user's consent preferences
 */
router.put('/', updateConsent);

/**
 * POST /api/consent/sync
 * Force sync with Privasimu service
 */
router.post('/sync', syncConsent);

/**
 * GET /api/consent/history
 * Get consent change history (audit trail)
 */
router.get('/history', getConsentHistory);

export default router;
