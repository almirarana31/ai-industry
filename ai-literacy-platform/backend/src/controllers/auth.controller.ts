import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { authService } from '../services';
import { asyncHandler } from '../middleware';

export const authController = {
  // Register new user
  register: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { email, password, firstName, lastName, organizationId, organizationName } = req.body;

    const result = await authService.register({
      email,
      password,
      firstName,
      lastName,
      organizationId,
      organizationName,
    });

    res.status(201).json({
      success: true,
      data: result,
      message: 'Registration successful',
    });
  }),

  // Login user
  login: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      data: result,
      message: 'Login successful',
    });
  }),

  // Refresh tokens
  refresh: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body;

    const tokens = await authService.refreshTokens(refreshToken);

    res.json({
      success: true,
      data: tokens,
    });
  }),

  // Logout
  logout: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body;

    if (req.user) {
      await authService.logout(req.user.id, refreshToken);
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  }),

  // Get current user
  me: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authenticated',
      });
      return;
    }

    const user = await authService.getUserById(req.user.id);

    res.json({
      success: true,
      data: user,
    });
  }),

  // Update password
  updatePassword: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authenticated',
      });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    await authService.updatePassword(req.user.id, currentPassword, newPassword);

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  }),
};
