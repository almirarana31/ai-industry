import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { analyticsService, auditService } from '../services';
import { asyncHandler } from '../middleware';
import { ScorePeriod } from '@prisma/client';

export const analyticsController = {
  // Get organization analytics
  getOrganizationAnalytics: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { period } = req.query;

    const analytics = await analyticsService.getOrganizationAnalytics(
      req.user.organizationId,
      (period as ScorePeriod) || ScorePeriod.WEEKLY
    );

    res.json({
      success: true,
      data: analytics,
    });
  }),

  // Get user analytics
  getUserAnalytics: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    // Users can only view their own analytics unless they're a manager or admin
    if (
      id !== req.user.id &&
      !['MANAGER', 'COMPLIANCE_ADMIN', 'SUPER_ADMIN'].includes(req.user.role)
    ) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    const analytics = await analyticsService.getUserAnalytics(id);

    res.json({
      success: true,
      data: analytics,
    });
  }),

  // Export analytics
  exportAnalytics: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { type } = req.query;

    const validTypes = ['compliance', 'users', 'incidents'];
    if (!type || !validTypes.includes(type as string)) {
      res.status(400).json({
        success: false,
        error: 'Invalid export type. Must be one of: compliance, users, incidents',
      });
      return;
    }

    const csvContent = await analyticsService.exportAnalytics(
      req.user.organizationId,
      type as 'compliance' | 'users' | 'incidents'
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${type}-export.csv`);
    res.send(csvContent);
  }),

  // Get audit logs
  getAuditLogs: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { userId, action, resourceType, startDate, endDate, page, limit } = req.query;

    const result = await auditService.getLogs(req.user.organizationId, {
      userId: userId as string | undefined,
      action: action as any,
      resourceType: resourceType as string | undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: result.logs,
      meta: result.pagination,
    });
  }),

  // Export audit logs
  exportAuditLogs: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const { startDate, endDate } = req.query;

    const csvContent = await auditService.exportLogs(req.user.organizationId, {
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=audit-logs.csv');
    res.send(csvContent);
  }),

  // Generate compliance report
  getComplianceReport: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const report = await auditService.generateComplianceReport(req.user.organizationId);

    res.json({
      success: true,
      data: report,
    });
  }),

  // Download compliance documentation
  downloadComplianceDoc: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const doc = await auditService.generateComplianceDocumentation(req.user.organizationId);

    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename=${doc.filename}`);
    res.send(doc.content);
  }),
};
