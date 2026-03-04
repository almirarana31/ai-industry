import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { cacheSet, cacheDel } from '../config/redis';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  getExpiryDate,
} from '../utils';
import { AuthTokens, TokenPayload } from '../types';
import { AppError } from '../middleware/error';
import { UserRole } from '@prisma/client';

export class AuthService {
  // Register new user
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationId?: string;
    organizationName?: string;
  }): Promise<{ user: { id: string; email: string }; tokens: AuthTokens }> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // If no organization provided, create new one
    let organizationId = data.organizationId;

    if (!organizationId) {
      const orgName = data.organizationName || `${data.firstName}'s Organization`;
      const organization = await prisma.organization.create({
        data: {
          name: orgName,
          slug: `${orgName.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0, 8)}`,
        },
      });
      organizationId = organization.id;
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.organizationId ? UserRole.EMPLOYEE : UserRole.SUPER_ADMIN,
        organizationId,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return {
      user: { id: user.id, email: user.email },
      tokens,
    };
  }

  // Login user
  async login(
    email: string,
    password: string
  ): Promise<{
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
    };
    tokens: AuthTokens;
  }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user || user.deletedAt) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Log login event
    await prisma.auditLog.create({
      data: {
        action: 'LOGIN',
        resourceType: 'user',
        resourceId: user.id,
        userId: user.id,
        organizationId: user.organizationId,
        details: { email: user.email },
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    };
  }

  // Refresh tokens
  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    // Find refresh token
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.isRevoked) {
      throw new AppError('Invalid refresh token', 401);
    }

    if (tokenRecord.expiresAt < new Date()) {
      throw new AppError('Refresh token expired', 401);
    }

    // Revoke old refresh token
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { isRevoked: true },
    });

    // Generate new tokens
    return this.generateTokens({
      userId: tokenRecord.user.id,
      email: tokenRecord.user.email,
      role: tokenRecord.user.role,
      organizationId: tokenRecord.user.organizationId,
    });
  }

  // Logout - revoke refresh token
  async logout(userId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken, userId },
        data: { isRevoked: true },
      });
    }

    // Clear user cache
    await cacheDel(`user:${userId}`);

    // Log logout event
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { organizationId: true },
    });

    if (user) {
      await prisma.auditLog.create({
        data: {
          action: 'LOGOUT',
          resourceType: 'user',
          resourceId: userId,
          userId,
          organizationId: user.organizationId,
        },
      });
    }
  }

  // Generate access and refresh tokens
  private async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: getExpiryDate('7d'),
      },
    });

    // Cache user data
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        organizationId: true,
        organization: {
          select: { name: true, slug: true },
        },
      },
    });

    if (user) {
      await cacheSet(`user:${payload.userId}`, user, 3600);
    }

    return { accessToken, refreshToken };
  }

  // Get user by ID
  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        department: true,
        jobTitle: true,
        organizationId: true,
        organization: {
          select: { id: true, name: true, slug: true },
        },
        createdAt: true,
      },
    });
  }

  // Update password
  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    const newHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    // Revoke all refresh tokens
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }
}

export const authService = new AuthService();
