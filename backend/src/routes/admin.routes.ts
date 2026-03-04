import { Router } from 'express';
import { adminController } from '../controllers';
import {
  authenticate,
  authorize,
  validate,
  createOrganizationSchema,
  inviteUserSchema,
  updateUserRoleSchema,
} from '../middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Organization routes
router.post(
  '/organization',
  authorize('SUPER_ADMIN'),
  validate(createOrganizationSchema),
  adminController.createOrganization
);
router.get(
  '/organization',
  authorize('MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  adminController.getOrganization
);
router.patch(
  '/organization',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  adminController.updateOrganization
);

// User management routes
router.post(
  '/user/invite',
  authorize('MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  validate(inviteUserSchema),
  adminController.inviteUser
);
router.get(
  '/users',
  authorize('MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  adminController.getUsers
);
router.patch(
  '/user/:userId/role',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  validate(updateUserRoleSchema),
  adminController.updateUserRole
);
router.patch(
  '/user/:userId/deactivate',
  authorize('COMPLIANCE_ADMIN', 'SUPER_ADMIN'),
  adminController.deactivateUser
);
router.delete(
  '/user/:userId',
  authorize('SUPER_ADMIN'),
  adminController.deleteUser
);

export default router;
