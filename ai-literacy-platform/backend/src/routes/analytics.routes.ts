import { Router } from 'express';
import { analyticsController } from '../controllers';
import { authenticate, authorize, validate, userIdSchema } from '../middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Analytics routes
router.get('/organization', analyticsController.getOrganizationAnalytics);
router.get('/user/:id', validate(userIdSchema), analyticsController.getUserAnalytics);
router.get('/export', analyticsController.exportAnalytics);

// Audit routes - require manager or higher
router.get(
  '/audit',
  authorize('MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  analyticsController.getAuditLogs
);
router.get(
  '/audit/export',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  analyticsController.exportAuditLogs
);

// Compliance report routes
router.get(
  '/compliance/report',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  analyticsController.getComplianceReport
);
router.get(
  '/compliance/download',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  analyticsController.downloadComplianceDoc
);

export default router;
