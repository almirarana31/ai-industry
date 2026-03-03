import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Class name merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date utilities
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

// Time formatting
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

// Score/percentage formatting
export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Risk level utilities
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export function getRiskColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    critical: 'text-red-500',
    high: 'text-orange-500',
    medium: 'text-amber-500',
    low: 'text-yellow-500',
    safe: 'text-green-500',
  };
  return colors[level];
}

export function getRiskBgColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    critical: 'bg-red-500/10 border-red-500/30',
    high: 'bg-orange-500/10 border-orange-500/30',
    medium: 'bg-amber-500/10 border-amber-500/30',
    low: 'bg-yellow-500/10 border-yellow-500/30',
    safe: 'bg-green-500/10 border-green-500/30',
  };
  return colors[level];
}

// Compliance status
export type ComplianceLevel = 'compliant' | 'at_risk' | 'violation' | 'pending';

export function getComplianceColor(level: ComplianceLevel): string {
  const colors: Record<ComplianceLevel, string> = {
    compliant: 'text-compliance-safe',
    at_risk: 'text-compliance-risk',
    violation: 'text-compliance-violation',
    pending: 'text-slate-400',
  };
  return colors[level];
}

export function getComplianceBadge(level: ComplianceLevel): string {
  const badges: Record<ComplianceLevel, string> = {
    compliant: 'badge-success',
    at_risk: 'badge-warning',
    violation: 'badge-danger',
    pending: 'badge',
  };
  return badges[level];
}

// User initials
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.[0]?.toUpperCase() || '';
  const last = lastName?.[0]?.toUpperCase() || '';
  return `${first}${last}` || '?';
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// Role display names
export function getRoleDisplayName(role: string): string {
  const roles: Record<string, string> = {
    EMPLOYEE: 'Employee',
    MANAGER: 'Manager',
    COMPLIANCE_ADMIN: 'Compliance Admin',
    SUPER_ADMIN: 'Super Admin',
  };
  return roles[role] || role;
}

// Module category icons
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    fundamentals: 'book-open',
    ethics: 'scale',
    governance: 'shield',
    legal: 'landmark',
    privacy: 'lock',
    security: 'shield-check',
  };
  return icons[category.toLowerCase()] || 'folder';
}

// Difficulty colors
export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    BEGINNER: 'text-green-500',
    INTERMEDIATE: 'text-amber-500',
    ADVANCED: 'text-red-500',
  };
  return colors[difficulty] || 'text-slate-400';
}

// Sleep utility for simulated delays
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Parse JSON safely
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Local storage helper
export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    const item = localStorage.getItem(key);
    return item ? safeJsonParse(item, fallback) : fallback;
  },
  set(key: string, value: unknown): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Download blob as file
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// EU AI Act risk categories
export const euAiActCategories = {
  UNACCEPTABLE: {
    label: 'Unacceptable Risk',
    description: 'AI systems that are prohibited',
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
  },
  HIGH: {
    label: 'High Risk',
    description: 'AI systems requiring strict compliance',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  LIMITED: {
    label: 'Limited Risk',
    description: 'AI systems with transparency obligations',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  MINIMAL: {
    label: 'Minimal Risk',
    description: 'AI systems with few restrictions',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
};
