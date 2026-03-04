// Frontend type definitions

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  jobTitle?: string;
  organizationId: string;
  organization?: Organization;
}

export type UserRole = 'EMPLOYEE' | 'MANAGER' | 'COMPLIANCE_ADMIN' | 'SUPER_ADMIN';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Training types
export interface TrainingModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ModuleCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  objectives: string[];
  scenarios: Scenario[];
  isPublished: boolean;
  thumbnailUrl?: string;
}

export type ModuleCategory =
  | 'AI_FUNDAMENTALS'
  | 'BIAS_ETHICS'
  | 'GOVERNANCE_ESCALATION'
  | 'IP_CONTENT_LIABILITY'
  | 'DATA_PRIVACY_SECURITY';

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  scenarioType: ScenarioType;
  initialState?: Record<string, unknown>;
}

export type ScenarioType =
  | 'EMAIL_RESPONSE'
  | 'AI_CHAT'
  | 'DOCUMENT_REVIEW'
  | 'ESCALATION_DECISION'
  | 'POLICY_APPLICATION'
  | 'MULTI_STEP';

// Progress types
export interface UserProgress {
  id: string;
  moduleId: string;
  module: {
    id: string;
    title: string;
    category: ModuleCategory;
    estimatedMinutes: number;
  };
  completionPercent: number;
  status: ProgressStatus;
  startedAt?: string;
  completedAt?: string;
  bestScore?: number;
}

export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CERTIFIED';

// Session types
export interface SessionAttempt {
  id: string;
  scenarioId: string;
  score: number;
  complianceScore: number;
  ethicalScore: number;
  promptSuccessRate: number;
  violations: string[];
  timeSpentSeconds: number;
  completedAt?: string;
}

// NPC/AI types
export interface NPCMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  npcName?: string;
  npcRole?: string;
  tone?: NPCTone;
  riskFlags?: string[];
  timestamp: Date;
}

export type NPCTone = 'NEUTRAL' | 'FRIENDLY' | 'URGENT' | 'SKEPTICAL' | 'DEMANDING' | 'SUPPORTIVE';

export interface AIResponse {
  message: string;
  tone: NPCTone;
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
  severity: Severity;
  description: string;
  createdAt: string;
}

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface UserAnalytics {
  user: User;
  summary: {
    completedModules: number;
    totalModules: number;
    certificationProgress: number;
    currentComplianceScore: number;
    retentionScore: number;
  };
  scores: {
    current: ComplianceScoreDetail;
    history: { date: string; score: number }[];
  };
  skillRadar: SkillRadar;
  recentSessions: RecentSession[];
  moduleProgress: UserProgress[];
}

export interface ComplianceScoreDetail {
  overallScore: number;
  riskDetectionScore: number;
  ethicalJudgmentScore: number;
  policyAdherenceScore: number;
  promptSafetyScore: number;
}

export interface SkillRadar {
  aiLiteracy: number;
  ethicsAwareness: number;
  complianceKnowledge: number;
  ipUnderstanding: number;
  privacyCompliance: number;
}

export interface RecentSession {
  id: string;
  scenarioTitle: string;
  scenarioType: ScenarioType;
  score: number;
  completedAt: string;
}

// Audit types
export interface AuditLog {
  id: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details: Record<string, unknown>;
  user?: {
    email: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

// Desktop simulation types
export interface DesktopApp {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  component: string;
}

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    role: string;
  };
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: Attachment[];
  requiresAction: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

// Compliance Monitor types
export interface ComplianceStatus {
  level: 'safe' | 'warning' | 'violation';
  score: number;
  activeFlags: string[];
  recentIssues: string[];
}

// Dashboard Analytics types
export interface DashboardAnalytics {
  overallProgress: number;
  complianceScore: number;
  modulesCompleted: number;
  totalModules: number;
  scenariosCompleted: number;
  totalScenarios: number;
  averageScore: number;
  timeSpent: number;
  streakDays: number;
  recentActivity: RecentActivity[];
  riskBreakdown: RiskBreakdown;
}

export interface RecentActivity {
  id: string;
  type: 'scenario_completed' | 'module_started' | 'badge_earned' | 'certification';
  title: string;
  timestamp: string;
  score?: number;
}

export interface RiskBreakdown {
  UNACCEPTABLE: number;
  HIGH: number;
  LIMITED: number;
  MINIMAL: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Decision types for scenarios
export interface Decision {
  id: string;
  text: string;
  isCorrect?: boolean;
  riskLevel?: 'low' | 'medium' | 'high';
  feedback?: string;
}

export interface DecisionResult {
  evaluation: {
    riskScore: number;
    complianceImpact: number;
    ethicalImpact: number;
    isViolation: boolean;
    feedback: string;
  };
  currentScores: {
    riskScore: number;
    complianceScore: number;
    ethicalScore: number;
  };
}
