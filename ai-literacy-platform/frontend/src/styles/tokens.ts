// Design Tokens for AI Literacy Training Platform
// Based on enterprise SaaS standards with dark mode default

export const colors = {
  // Primary - Deep Blue (Trust, enterprise)
  primary: {
    50: '#E8EAED',
    100: '#C5CCD4',
    200: '#9EABB9',
    300: '#77899E',
    400: '#596F88',
    500: '#3B5672',
    600: '#334B64',
    700: '#2B3E52',
    800: '#1E2A38', // Main primary
    900: '#151E28',
    950: '#0A0F14',
  },

  // Slate
  slate: '#2F3E4F',

  // Accent colors
  compliance: {
    default: '#22C55E', // Green - compliant/safe
    light: '#4ADE80',
    dark: '#16A34A',
  },

  risk: {
    default: '#F59E0B', // Amber - warnings
    light: '#FCD34D',
    dark: '#D97706',
  },

  violation: {
    default: '#EF4444', // Red - violations/errors
    light: '#F87171',
    dark: '#DC2626',
  },

  ai: {
    default: '#8B5CF6', // Purple - AI related
    light: '#A78BFA',
    dark: '#7C3AED',
  },

  // Background (dark mode default)
  background: {
    default: '#0F172A',
    secondary: '#1E293B',
    tertiary: '#334155',
  },

  // Surface colors
  surface: {
    default: '#1E293B',
    hover: '#334155',
    active: '#475569',
  },

  // Neutrals
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const radius = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  glow: {
    green: '0 0 20px rgba(34, 197, 94, 0.3)',
    red: '0 0 20px rgba(239, 68, 68, 0.3)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
};

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  fontSize: {
    h1: { size: '32px', lineHeight: '40px', weight: 700 },
    h2: { size: '24px', lineHeight: '32px', weight: 600 },
    h3: { size: '18px', lineHeight: '28px', weight: 600 },
    body: { size: '14px', lineHeight: '22px', weight: 400 },
    bodyLg: { size: '16px', lineHeight: '24px', weight: 400 },
    caption: { size: '12px', lineHeight: '18px', weight: 400 },
  },
};

export const transitions = {
  fast: '150ms',
  default: '200ms',
  slow: '300ms',
};

// Risk level colors
export const riskLevelColors = {
  low: colors.compliance.default,
  medium: colors.risk.default,
  high: colors.violation.light,
  critical: colors.violation.default,
};

// Status colors
export const statusColors = {
  success: colors.compliance.default,
  warning: colors.risk.default,
  error: colors.violation.default,
  info: colors.ai.default,
};

export default {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  transitions,
  riskLevelColors,
  statusColors,
};
