/**
 * Consent Management Controller
 * Handles HTTP requests for user consent preferences
 */

import { Request, Response } from 'express';
import { consentService } from '../services/consent.service';
import { z } from 'zod';

// Validation schemas
const updateConsentSchema = z.object({
  consents: z.array(
    z.object({
      code: z.string(),
      is_agree: z.boolean(),
    })
  ),
});

/**
 * GET /api/consent
 * Get current user's consent preferences
 */
export const getConsent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const consentData = await consentService.getUserConsent(userId);

    if (!consentData) {
      return res.status(404).json({
        success: false,
        message: 'Consent data not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Consent data retrieved successfully',
      data: consentData,
    });
  } catch (error: any) {
    console.error('[ConsentController] Get consent error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve consent data',
    });
  }
};

/**
 * PUT /api/consent
 * Update user's consent preferences
 */
export const updateConsent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const organizationId = req.user?.organizationId;

    if (!userId || !organizationId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Validate request body
    const validation = updateConsentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
        errors: validation.error.errors,
      });
    }

    const { consents } = validation.data;

    // Update consents
    const updatedData = await consentService.updateUserConsent(userId, consents);

    // Log the change
    await consentService.logConsentChange(
      userId,
      organizationId,
      'consent_updated',
      {
        consents: consents,
        timestamp: new Date().toISOString(),
      },
      req.ip,
      req.get('user-agent')
    );

    return res.status(200).json({
      success: true,
      message: 'Consent preferences updated successfully',
      data: updatedData,
    });
  } catch (error: any) {
    console.error('[ConsentController] Update consent error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update consent preferences',
    });
  }
};

/**
 * POST /api/consent/sync
 * Force sync with Privasimu service
 */
export const syncConsent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const organizationId = req.user?.organizationId;

    if (!userId || !organizationId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const syncedData = await consentService.syncUserConsent(userId);

    // Log the sync
    await consentService.logConsentChange(
      userId,
      organizationId,
      'consent_synced',
      {
        timestamp: new Date().toISOString(),
      },
      req.ip,
      req.get('user-agent')
    );

    return res.status(200).json({
      success: true,
      message: 'Consent data synced successfully',
      data: syncedData,
    });
  } catch (error: any) {
    console.error('[ConsentController] Sync consent error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to sync consent data',
    });
  }
};

/**
 * GET /api/consent/history
 * Get consent change history (audit trail)
 */
export const getConsentHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const limit = parseInt(req.query.limit as string) || 50;
    const history = await consentService.getConsentHistory(userId, limit);

    return res.status(200).json({
      success: true,
      message: 'Consent history retrieved successfully',
      data: history,
    });
  } catch (error: any) {
    console.error('[ConsentController] Get consent history error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve consent history',
    });
  }
};
