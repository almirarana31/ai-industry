import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { asyncHandler } from '../middleware';
import prisma from '../config/database';
import { hashPassword, generateSlug } from '../utils';
import { UserRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const adminController = {
  // Create organization
  createOrganization: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { name, domain, subscriptionTier } = req.body;

    const slug = generateSlug(name) + '-' + uuidv4().slice(0, 8);

    const organization = await prisma.organization.create({
      data: {
        name,
        slug,
        domain,
        subscriptionTier: subscriptionTier || 'STANDARD',
      },
    });

    res.status(201).json({
      success: true,
      data: organization,
      message: 'Organization created successfully',
    });
  }),

  // Get organization details
  getOrganization: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const organization = await prisma.organization.findUnique({
      where: { id: req.user.organizationId },
      include: {
        _count: {
          select: {
            users: { where: { deletedAt: null } },
            trainingModules: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: organization,
    });
  }),

  // Update organization
  updateOrganization: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { name, domain, logo, settings } = req.body;

    const organization = await prisma.organization.update({
      where: { id: req.user.organizationId },
      data: {
        ...(name && { name }),
        ...(domain !== undefined && { domain }),
        ...(logo !== undefined && { logo }),
        ...(settings && { settings }),
      },
    });

    res.json({
      success: true,
      data: organization,
      message: 'Organization updated successfully',
    });
  }),

  // Invite user
  inviteUser: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { email, firstName, lastName, role, department, jobTitle } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'User with this email already exists',
      });
      return;
    }

    // Generate temporary password
    const tempPassword = uuidv4().slice(0, 12);
    const passwordHash = await hashPassword(tempPassword);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role: role || UserRole.EMPLOYEE,
        department,
        jobTitle,
        organizationId: req.user.organizationId,
      },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'USER_CREATED',
        resourceType: 'user',
        resourceId: user.id,
        userId: req.user.id,
        organizationId: req.user.organizationId,
        details: { invitedEmail: email, role },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        temporaryPassword: tempPassword, // In production, send via email
      },
      message: 'User invited successfully',
    });
  }),

  // Get users list
  getUsers: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { role, department, page, limit, search } = req.query;
    const pageNum = Math.max(1, parseInt((page as string) || '1'));
    const limitNum = Math.min(100, Math.max(1, parseInt((limit as string) || '10')));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      organizationId: req.user.organizationId,
      deletedAt: null,
      ...(role && { role: role as UserRole }),
      ...(department && { department: department as string }),
      ...(search && {
        OR: [
          { email: { contains: search as string, mode: 'insensitive' as const } },
          { firstName: { contains: search as string, mode: 'insensitive' as const } },
          { lastName: { contains: search as string, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          department: true,
          jobTitle: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          _count: {
            select: {
              progress: { where: { status: 'COMPLETED' } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  }),

  // Update user role
  updateUserRole: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { userId } = req.params;
    const { role } = req.body;

    // Verify user belongs to same organization
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser || targetUser.organizationId !== req.user.organizationId) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    // Prevent self-demotion from SUPER_ADMIN
    if (userId === req.user.id && req.user.role === 'SUPER_ADMIN' && role !== 'SUPER_ADMIN') {
      res.status(400).json({
        success: false,
        error: 'Cannot demote yourself from Super Admin',
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'ROLE_CHANGED',
        resourceType: 'user',
        resourceId: userId,
        userId: req.user.id,
        organizationId: req.user.organizationId,
        details: {
          previousRole: targetUser.role,
          newRole: role,
        },
      },
    });

    res.json({
      success: true,
      data: updatedUser,
      message: 'User role updated successfully',
    });
  }),

  // Deactivate user
  deactivateUser: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { userId } = req.params;

    // Verify user belongs to same organization
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser || targetUser.organizationId !== req.user.organizationId) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    // Prevent self-deactivation
    if (userId === req.user.id) {
      res.status(400).json({
        success: false,
        error: 'Cannot deactivate yourself',
      });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'USER_UPDATED',
        resourceType: 'user',
        resourceId: userId,
        userId: req.user.id,
        organizationId: req.user.organizationId,
        details: { action: 'deactivated' },
      },
    });

    res.json({
      success: true,
      message: 'User deactivated successfully',
    });
  }),

  // Delete user (soft delete - GDPR compliant)
  deleteUser: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { userId } = req.params;

    // Verify user belongs to same organization
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser || targetUser.organizationId !== req.user.organizationId) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    // Prevent self-deletion
    if (userId === req.user.id) {
      res.status(400).json({
        success: false,
        error: 'Cannot delete yourself',
      });
      return;
    }

    // Soft delete - anonymize PII but keep audit records
    await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        isActive: false,
        email: `deleted-${userId}@deleted.local`,
        firstName: 'Deleted',
        lastName: 'User',
        avatar: null,
      },
    });

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'USER_DELETED',
        resourceType: 'user',
        resourceId: userId,
        userId: req.user.id,
        organizationId: req.user.organizationId,
        details: { gdprCompliant: true },
      },
    });

    res.json({
      success: true,
      message: 'User deleted successfully (GDPR compliant)',
    });
  }),
};
