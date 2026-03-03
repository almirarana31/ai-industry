import { UserRole } from '@prisma/client';
import { Request } from 'express';

// Extended Request with authenticated user
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    organizationId: string;
  };
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
  organizationName?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Scenario types
export interface ScenarioDecision {
  decisionId: string;
  choice: string;
  timestamp: Date;
  context: Record<string, unknown>;
}

export interface ScenarioState {
  currentStep: number;
  decisions: ScenarioDecision[];
  riskScore: number;
  complianceScore: number;
  ethicalScore: number;
}

// NPC types
export interface NPCContext {
  scenarioId: string;
  npcName: string;
  npcRole: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  previousMessages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  complianceContext: string;
}

export interface NPCResponse {
  message: string;
  tone: string;
  riskFlags: string[];
  complianceIssues: string[];
  suggestedActions?: string[];
}

// Analytics types
export interface OrganizationAnalytics {
  complianceReadiness: number;
  avgRiskScore: number;
  activeUsers: number;
  totalUsers: number;
  completedModules: number;
  avgPromptSuccessRate: number;
  departmentBreakdown: Record<string, DepartmentStats>;
  riskTrend: TrendPoint[];
  complianceTrend: TrendPoint[];
  recentViolations: ViolationSummary[];
}

export interface DepartmentStats {
  userCount: number;
  avgComplianceScore: number;
  avgRiskScore: number;
  completionRate: number;
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface ViolationSummary {
  id: string;
  type: string;
  severity: string;
  description: string;
  createdAt: Date;
}

// Audit types
export interface AuditLogEntry {
  action: string;
  resourceType: string;
  resourceId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filter types
export interface ModuleFilters {
  category?: string;
  difficulty?: string;
  isPublished?: boolean;
}

export interface UserFilters {
  role?: UserRole;
  department?: string;
  isActive?: boolean;
}
