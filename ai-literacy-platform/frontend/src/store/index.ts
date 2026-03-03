import { create } from 'zustand';
import type {
  TrainingModule,
  Scenario,
  SessionAttempt,
  UserProgress,
  NPCMessage,
  ComplianceStatus,
  Email,
  DesktopApp,
} from '@/types';

// Training Store
interface TrainingState {
  modules: TrainingModule[];
  currentModule: TrainingModule | null;
  currentScenario: Scenario | null;
  currentSession: SessionAttempt | null;
  progress: UserProgress[];
  isLoading: boolean;
}

interface TrainingStore extends TrainingState {
  setModules: (modules: TrainingModule[]) => void;
  setCurrentModule: (module: TrainingModule | null) => void;
  setCurrentScenario: (scenario: Scenario | null) => void;
  setCurrentSession: (session: SessionAttempt | null) => void;
  setProgress: (progress: UserProgress[]) => void;
  setLoading: (isLoading: boolean) => void;
  updateSessionScores: (scores: Partial<SessionAttempt>) => void;
}

export const useTrainingStore = create<TrainingStore>((set) => ({
  modules: [],
  currentModule: null,
  currentScenario: null,
  currentSession: null,
  progress: [],
  isLoading: false,

  setModules: (modules) => set({ modules }),
  setCurrentModule: (currentModule) => set({ currentModule }),
  setCurrentScenario: (currentScenario) => set({ currentScenario }),
  setCurrentSession: (currentSession) => set({ currentSession }),
  setProgress: (progress) => set({ progress }),
  setLoading: (isLoading) => set({ isLoading }),
  updateSessionScores: (scores) =>
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, ...scores }
        : null,
    })),
}));

// Simulation Store for Desktop UI
interface SimulationState {
  activeApp: string;
  apps: DesktopApp[];
  emails: Email[];
  chatMessages: NPCMessage[];
  aiMessages: NPCMessage[];
  complianceStatus: ComplianceStatus;
  isTyping: boolean;
  timer: number | null;
}

interface SimulationStore extends SimulationState {
  setActiveApp: (appId: string) => void;
  setApps: (apps: DesktopApp[]) => void;
  setEmails: (emails: Email[]) => void;
  markEmailRead: (emailId: string) => void;
  addChatMessage: (message: NPCMessage) => void;
  setChatMessages: (messages: NPCMessage[]) => void;
  addAIMessage: (message: NPCMessage) => void;
  setAIMessages: (messages: NPCMessage[]) => void;
  setComplianceStatus: (status: ComplianceStatus) => void;
  setIsTyping: (isTyping: boolean) => void;
  setTimer: (timer: number | null) => void;
  resetSimulation: () => void;
}

const initialComplianceStatus: ComplianceStatus = {
  level: 'safe',
  score: 100,
  activeFlags: [],
  recentIssues: [],
};

const defaultApps: DesktopApp[] = [
  { id: 'email', name: 'Email', icon: 'mail', isActive: true, component: 'EmailApp' },
  { id: 'chat', name: 'Internal Chat', icon: 'message-square', isActive: false, component: 'ChatApp' },
  { id: 'ai', name: 'AI Assistant', icon: 'bot', isActive: false, component: 'AIAssistantApp' },
  { id: 'files', name: 'Files', icon: 'folder', isActive: false, component: 'FilesApp' },
  { id: 'escalate', name: 'Escalate', icon: 'alert-triangle', isActive: false, component: 'EscalateApp' },
];

export const useSimulationStore = create<SimulationStore>((set) => ({
  activeApp: 'email',
  apps: defaultApps,
  emails: [],
  chatMessages: [],
  aiMessages: [],
  complianceStatus: initialComplianceStatus,
  isTyping: false,
  timer: null,

  setActiveApp: (appId) =>
    set((state) => ({
      activeApp: appId,
      apps: state.apps.map((app) => ({
        ...app,
        isActive: app.id === appId,
      })),
    })),

  setApps: (apps) => set({ apps }),

  setEmails: (emails) => set({ emails }),

  markEmailRead: (emailId) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === emailId ? { ...email, isRead: true } : email
      ),
    })),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),

  setChatMessages: (messages) => set({ chatMessages: messages }),

  addAIMessage: (message) =>
    set((state) => ({
      aiMessages: [...state.aiMessages, message],
    })),

  setAIMessages: (messages) => set({ aiMessages: messages }),

  setComplianceStatus: (status) => set({ complianceStatus: status }),

  setIsTyping: (isTyping) => set({ isTyping }),

  setTimer: (timer) => set({ timer }),

  resetSimulation: () =>
    set({
      activeApp: 'email',
      apps: defaultApps,
      emails: [],
      chatMessages: [],
      aiMessages: [],
      complianceStatus: initialComplianceStatus,
      isTyping: false,
      timer: null,
    }),
}));

// UI Store for global UI state
interface UIState {
  sidebarCollapsed: boolean;
  theme: 'dark' | 'light';
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface UIStore extends UIState {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  theme: 'dark',
  notifications: [],

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  setTheme: (theme) => set({ theme }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
