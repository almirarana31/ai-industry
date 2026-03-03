import type {
  User,
  TrainingModule,
  Scenario,
  SessionAttempt,
  UserProgress,
  NPCMessage,
  DashboardAnalytics,
  OrganizationAnalytics,
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Token management
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Initialize token from localStorage on client side
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('auth-storage');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      accessToken = parsed.state?.accessToken || null;
    } catch {
      // Invalid stored data
    }
  }
}

// Base fetch with auth
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 - try to refresh token
      if (response.status === 401 && accessToken) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // Retry the request
          (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
          const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
          });
          return retryResponse.json();
        }
      }

      return {
        success: false,
        error: data.error || 'Request failed',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const stored = localStorage.getItem('auth-storage');
  if (!stored) return false;

  try {
    const parsed = JSON.parse(stored);
    const refreshToken = parsed.state?.refreshToken;
    if (!refreshToken) return false;

    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    accessToken = data.accessToken;

    // Update stored token
    parsed.state.accessToken = data.accessToken;
    localStorage.setItem('auth-storage', JSON.stringify(parsed));

    return true;
  } catch {
    return false;
  }
}

// Auth API
export const authAPI = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      accessToken = response.data.accessToken;
    }

    return response;
  },

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName: string;
  }): Promise<ApiResponse<LoginResponse>> {
    const response = await apiFetch<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data) {
      accessToken = response.data.accessToken;
    }

    return response;
  },

  async logout(): Promise<ApiResponse<void>> {
    const result = await apiFetch<void>('/auth/logout', { method: 'POST' });
    accessToken = null;
    return result;
  },

  async me(): Promise<ApiResponse<User>> {
    return apiFetch<User>('/auth/me');
  },
};

// Training API
export const trainingAPI = {
  async getModules(): Promise<ApiResponse<TrainingModule[]>> {
    return apiFetch<TrainingModule[]>('/training/modules');
  },

  async getModule(id: string): Promise<ApiResponse<TrainingModule>> {
    return apiFetch<TrainingModule>(`/training/modules/${id}`);
  },

  async getScenario(id: string): Promise<ApiResponse<Scenario>> {
    return apiFetch<Scenario>(`/training/scenarios/${id}`);
  },

  async startSession(scenarioId: string): Promise<ApiResponse<SessionAttempt>> {
    return apiFetch<SessionAttempt>('/training/sessions/start', {
      method: 'POST',
      body: JSON.stringify({ scenarioId }),
    });
  },

  async submitDecision(
    sessionId: string,
    decision: string,
    reasoning?: string
  ): Promise<ApiResponse<{
    feedback: string;
    complianceImpact: number;
    riskScore: number;
    isCorrect: boolean;
  }>> {
    return apiFetch(`/training/sessions/${sessionId}/decision`, {
      method: 'POST',
      body: JSON.stringify({ decision, reasoning }),
    });
  },

  async completeSession(
    sessionId: string,
    scores: {
      complianceScore: number;
      riskAwarnessScore: number;
      aiUsageScore: number;
    }
  ): Promise<ApiResponse<SessionAttempt>> {
    return apiFetch<SessionAttempt>(`/training/sessions/${sessionId}/complete`, {
      method: 'POST',
      body: JSON.stringify(scores),
    });
  },

  async getProgress(): Promise<ApiResponse<UserProgress[]>> {
    return apiFetch<UserProgress[]>('/training/progress');
  },

  async getNPCResponse(data: {
    scenarioId: string;
    npcName: string;
    userMessage: string;
    conversationHistory?: Array<{ role: string; content: string }>;
  }): Promise<ApiResponse<NPCMessage>> {
    return apiFetch<NPCMessage>('/training/npc/respond', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async analyzePrompt(data: {
    prompt: string;
    context?: string;
  }): Promise<ApiResponse<{
    riskLevel: string;
    issues: string[];
    suggestions: string[];
    euAiActReferences: string[];
  }>> {
    return apiFetch('/training/ai/analyze-prompt', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Analytics API
export const analyticsAPI = {
  async getDashboard(): Promise<ApiResponse<DashboardAnalytics>> {
    return apiFetch<DashboardAnalytics>('/analytics/dashboard');
  },

  async getOrganizationStats(): Promise<ApiResponse<OrganizationAnalytics>> {
    return apiFetch<OrganizationAnalytics>('/analytics/organization');
  },

  async getUserAnalytics(userId?: string): Promise<ApiResponse<{
    completedModules: number;
    totalTimeSpent: number;
    averageScore: number;
    complianceLevel: string;
    recentActivity: Array<{
      date: string;
      moduleName: string;
      score: number;
    }>;
  }>> {
    const endpoint = userId
      ? `/analytics/users/${userId}`
      : '/analytics/users/me';
    return apiFetch(endpoint);
  },

  async getComplianceReport(params?: {
    startDate?: string;
    endDate?: string;
    format?: 'json' | 'pdf' | 'csv';
  }): Promise<ApiResponse<Blob | object>> {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.format) queryParams.append('format', params.format);

    return apiFetch(`/analytics/compliance-report?${queryParams}`);
  },

  async getRiskIncidents(params?: {
    severity?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{
    incidents: Array<{
      id: string;
      type: string;
      severity: string;
      description: string;
      userId: string;
      userName: string;
      createdAt: string;
      status: string;
    }>;
    total: number;
    page: number;
    totalPages: number;
  }>> {
    const queryParams = new URLSearchParams();
    if (params?.severity) queryParams.append('severity', params.severity);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    return apiFetch(`/analytics/risk-incidents?${queryParams}`);
  },
};

// Admin API
export const adminAPI = {
  async getUsers(params?: {
    search?: string;
    role?: string;
    department?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
  }>> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.department) queryParams.append('department', params.department);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    return apiFetch(`/admin/users?${queryParams}`);
  },

  async updateUser(
    userId: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    return apiFetch<User>(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async getAuditLogs(params?: {
    action?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{
    logs: Array<{
      id: string;
      action: string;
      details: object;
      userId: string;
      userName: string;
      ipAddress: string;
      createdAt: string;
    }>;
    total: number;
    page: number;
    totalPages: number;
  }>> {
    const queryParams = new URLSearchParams();
    if (params?.action) queryParams.append('action', params.action);
    if (params?.userId) queryParams.append('userId', params.userId);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    return apiFetch(`/admin/audit-logs?${queryParams}`);
  },

  async getOrganizationSettings(): Promise<ApiResponse<{
    id: string;
    name: string;
    settings: object;
    subscription: string;
    maxUsers: number;
    currentUsers: number;
  }>> {
    return apiFetch('/admin/organization');
  },

  async updateOrganizationSettings(
    settings: object
  ): Promise<ApiResponse<object>> {
    return apiFetch('/admin/organization/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  },
};

export default {
  auth: authAPI,
  training: trainingAPI,
  analytics: analyticsAPI,
  admin: adminAPI,
};
