import prisma from '../config/database';
import { AuditLogEntry } from '../types';
import { AuditAction, Severity } from '@prisma/client';
import { getPaginationParams } from '../utils';

export class AuditService {
  // Create audit log entry
  async log(
    organizationId: string,
    entry: AuditLogEntry & { userId?: string }
  ): Promise<void> {
    await prisma.auditLog.create({
      data: {
        organizationId,
        userId: entry.userId,
        action: entry.action as AuditAction,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId,
        details: entry.details,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        metadata: entry.metadata || {},
      },
    });
  }

  // Get audit logs with filtering
  async getLogs(
    organizationId: string,
    filters?: {
      userId?: string;
      action?: AuditAction;
      resourceType?: string;
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    }
  ) {
    const { page, limit, skip } = getPaginationParams(filters?.page, filters?.limit);

    const where = {
      organizationId,
      ...(filters?.userId && { userId: filters.userId }),
      ...(filters?.action && { action: filters.action }),
      ...(filters?.resourceType && { resourceType: filters.resourceType }),
      ...(filters?.startDate && {
        createdAt: {
          gte: filters.startDate,
          ...(filters?.endDate && { lte: filters.endDate }),
        },
      }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { email: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Export audit logs
  async exportLogs(
    organizationId: string,
    filters?: {
      startDate?: Date;
      endDate?: Date;
      actions?: AuditAction[];
    }
  ): Promise<string> {
    const logs = await prisma.auditLog.findMany({
      where: {
        organizationId,
        ...(filters?.startDate && {
          createdAt: {
            gte: filters.startDate,
            ...(filters?.endDate && { lte: filters.endDate }),
          },
        }),
        ...(filters?.actions && { action: { in: filters.actions } }),
      },
      include: {
        user: {
          select: { email: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    let csv = 'Timestamp,User,Action,Resource Type,Resource ID,Details,IP Address\n';

    logs.forEach((log) => {
      const userName = log.user
        ? `${log.user.firstName} ${log.user.lastName}`
        : 'System';
      const details = JSON.stringify(log.details).replace(/"/g, '""');
      csv += `${log.createdAt.toISOString()},${userName},${log.action},${log.resourceType},${log.resourceId || ''},${details},${log.ipAddress || ''}\n`;
    });

    return csv;
  }

  // Generate EU AI Act Article 4 compliance report
  async generateComplianceReport(organizationId: string): Promise<ComplianceReport> {
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        users: {
          where: { deletedAt: null },
          select: { id: true, department: true, role: true },
        },
      },
    });

    if (!organization) {
      throw new Error('Organization not found');
    }

    // Get training completion data
    const userIds = organization.users.map((u) => u.id);
    const progress = await prisma.userProgress.findMany({
      where: {
        userId: { in: userIds },
      },
      include: {
        module: {
          select: { title: true, category: true },
        },
        user: {
          select: { firstName: true, lastName: true, department: true },
        },
      },
    });

    // Get compliance scores
    const complianceScores = await prisma.complianceScore.findMany({
      where: { userId: { in: userIds } },
      orderBy: { calculatedAt: 'desc' },
    });

    // Get incidents
    const incidents = await prisma.riskIncident.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate metrics
    const totalEmployees = organization.users.length;
    const trainedEmployees = new Set(
      progress.filter((p) => p.status === 'COMPLETED').map((p) => p.userId)
    ).size;
    const complianceRate = totalEmployees > 0 ? (trainedEmployees / totalEmployees) * 100 : 0;

    const avgScore =
      complianceScores.length > 0
        ? complianceScores.reduce((sum, s) => sum + s.overallScore, 0) / complianceScores.length
        : 0;

    // Department breakdown
    const departments = [...new Set(organization.users.map((u) => u.department || 'Unassigned'))];
    const departmentCompliance: Record<string, DepartmentComplianceData> = {};

    for (const dept of departments) {
      const deptUsers = organization.users.filter((u) => (u.department || 'Unassigned') === dept);
      const deptProgress = progress.filter(
        (p) => (p.user.department || 'Unassigned') === dept && p.status === 'COMPLETED'
      );
      const uniqueTrained = new Set(deptProgress.map((p) => p.userId)).size;

      departmentCompliance[dept] = {
        totalEmployees: deptUsers.length,
        trainedEmployees: uniqueTrained,
        complianceRate: deptUsers.length > 0 ? (uniqueTrained / deptUsers.length) * 100 : 0,
      };
    }

    // Generate report
    const report: ComplianceReport = {
      reportId: `COMPLIANCE-${organizationId.slice(0, 8)}-${Date.now()}`,
      generatedAt: new Date(),
      organization: {
        id: organization.id,
        name: organization.name,
      },
      summary: {
        totalEmployees,
        trainedEmployees,
        complianceRate,
        avgComplianceScore: avgScore,
        totalIncidents: incidents.length,
        unresolvedIncidents: incidents.filter((i) => !i.isResolved).length,
        criticalIncidents: incidents.filter((i) => i.severity === Severity.CRITICAL).length,
      },
      euAiActCompliance: {
        article4: {
          requirement: 'AI literacy training for all staff handling AI systems',
          status: complianceRate >= 80 ? 'COMPLIANT' : complianceRate >= 50 ? 'PARTIAL' : 'NON_COMPLIANT',
          details: `${trainedEmployees} of ${totalEmployees} employees have completed AI literacy training (${complianceRate.toFixed(1)}%)`,
          recommendations: this.getArticle4Recommendations(complianceRate, avgScore),
        },
      },
      departmentBreakdown: departmentCompliance,
      trainingModules: this.aggregateModuleCompletion(progress),
      recentIncidents: incidents.slice(0, 10).map((i) => ({
        id: i.id,
        type: i.incidentType,
        severity: i.severity,
        description: i.description,
        isResolved: i.isResolved,
        createdAt: i.createdAt,
      })),
      auditTrail: {
        totalLogEntries: await prisma.auditLog.count({ where: { organizationId } }),
        lastLogEntry: (
          await prisma.auditLog.findFirst({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
          })
        )?.createdAt,
      },
    };

    // Log report generation
    await this.log(organizationId, {
      action: 'REPORT_GENERATED',
      resourceType: 'compliance_report',
      resourceId: report.reportId,
      details: {
        reportType: 'EU_AI_ACT_COMPLIANCE',
        complianceRate,
      },
    });

    return report;
  }

  // Generate downloadable compliance documentation
  async generateComplianceDocumentation(
    organizationId: string
  ): Promise<{ filename: string; content: string }> {
    const report = await this.generateComplianceReport(organizationId);

    const markdown = `# EU AI Act Compliance Report
## ${report.organization.name}

**Report ID:** ${report.reportId}
**Generated:** ${report.generatedAt.toISOString()}

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Employees | ${report.summary.totalEmployees} |
| Trained Employees | ${report.summary.trainedEmployees} |
| Compliance Rate | ${report.summary.complianceRate.toFixed(1)}% |
| Avg. Compliance Score | ${report.summary.avgComplianceScore.toFixed(1)} |
| Total Incidents | ${report.summary.totalIncidents} |
| Unresolved Incidents | ${report.summary.unresolvedIncidents} |

---

## EU AI Act Article 4 Compliance

**Requirement:** ${report.euAiActCompliance.article4.requirement}

**Status:** ${report.euAiActCompliance.article4.status}

**Details:** ${report.euAiActCompliance.article4.details}

### Recommendations
${report.euAiActCompliance.article4.recommendations.map((r) => `- ${r}`).join('\n')}

---

## Department Breakdown

| Department | Total | Trained | Rate |
|------------|-------|---------|------|
${Object.entries(report.departmentBreakdown)
  .map(
    ([dept, data]) =>
      `| ${dept} | ${data.totalEmployees} | ${data.trainedEmployees} | ${data.complianceRate.toFixed(1)}% |`
  )
  .join('\n')}

---

## Training Module Completion

| Module | Completed | Status |
|--------|-----------|--------|
${report.trainingModules
  .map((m) => `| ${m.title} | ${m.completedCount} | ${m.completionRate >= 80 ? '✅' : '⚠️'} |`)
  .join('\n')}

---

## Recent Incidents

${
  report.recentIncidents.length > 0
    ? report.recentIncidents
        .map(
          (i) =>
            `- **${i.type}** (${i.severity}): ${i.description.slice(0, 100)}... [${i.isResolved ? 'Resolved' : 'Open'}]`
        )
        .join('\n')
    : 'No incidents recorded in this period.'
}

---

## Audit Trail Summary

- Total Log Entries: ${report.auditTrail.totalLogEntries}
- Last Entry: ${report.auditTrail.lastLogEntry?.toISOString() || 'N/A'}

---

*This report is generated automatically by the AI Literacy Training Platform for EU AI Act compliance documentation purposes.*
`;

    return {
      filename: `compliance-report-${report.reportId}.md`,
      content: markdown,
    };
  }

  // Private helpers
  private getArticle4Recommendations(complianceRate: number, avgScore: number): string[] {
    const recommendations: string[] = [];

    if (complianceRate < 100) {
      recommendations.push(
        `Complete AI literacy training for remaining ${100 - complianceRate}% of employees`
      );
    }

    if (complianceRate < 80) {
      recommendations.push('Prioritize training for departments with lowest completion rates');
      recommendations.push('Consider mandatory training deadlines');
    }

    if (avgScore < 70) {
      recommendations.push('Review and reinforce training content in low-scoring areas');
      recommendations.push('Schedule refresher training for employees with scores below 60%');
    }

    if (recommendations.length === 0) {
      recommendations.push('Maintain current training program');
      recommendations.push('Schedule periodic refresher training to maintain compliance');
    }

    return recommendations;
  }

  private aggregateModuleCompletion(
    progress: Array<{
      status: string;
      module: { title: string; category: string };
    }>
  ): Array<{ title: string; category: string; completedCount: number; completionRate: number }> {
    const moduleMap = new Map<
      string,
      { title: string; category: string; completed: number; total: number }
    >();

    progress.forEach((p) => {
      const key = p.module.title;
      const existing = moduleMap.get(key) || {
        title: p.module.title,
        category: p.module.category,
        completed: 0,
        total: 0,
      };

      existing.total += 1;
      if (p.status === 'COMPLETED') {
        existing.completed += 1;
      }

      moduleMap.set(key, existing);
    });

    return Array.from(moduleMap.values()).map((m) => ({
      title: m.title,
      category: m.category,
      completedCount: m.completed,
      completionRate: m.total > 0 ? (m.completed / m.total) * 100 : 0,
    }));
  }
}

// Type definitions
interface DepartmentComplianceData {
  totalEmployees: number;
  trainedEmployees: number;
  complianceRate: number;
}

interface ComplianceReport {
  reportId: string;
  generatedAt: Date;
  organization: {
    id: string;
    name: string;
  };
  summary: {
    totalEmployees: number;
    trainedEmployees: number;
    complianceRate: number;
    avgComplianceScore: number;
    totalIncidents: number;
    unresolvedIncidents: number;
    criticalIncidents: number;
  };
  euAiActCompliance: {
    article4: {
      requirement: string;
      status: 'COMPLIANT' | 'PARTIAL' | 'NON_COMPLIANT';
      details: string;
      recommendations: string[];
    };
  };
  departmentBreakdown: Record<string, DepartmentComplianceData>;
  trainingModules: Array<{
    title: string;
    category: string;
    completedCount: number;
    completionRate: number;
  }>;
  recentIncidents: Array<{
    id: string;
    type: string;
    severity: string;
    description: string;
    isResolved: boolean;
    createdAt: Date;
  }>;
  auditTrail: {
    totalLogEntries: number;
    lastLogEntry: Date | undefined;
  };
}

export const auditService = new AuditService();
