import { Router } from 'express';
import { authController } from '../controllers';
import {
  authenticate,
  validate,
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from '../middleware';

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);
router.patch('/password', authenticate, authController.updatePassword);

export default router;
