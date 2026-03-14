import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        "background-light": "#f8fafc",
        "background-dark": "#020617",
        accent: {
          success: "#10b981",
          info: "#3b82f6",
          warning: "#f59e0b",
          locked: "#94a3b8"
        },
        slate: {
          DEFAULT: '#2F3E4F',
        },
        brand: {
          cyan: '#00ffd1',
          teal: '#00ccb1',
        },
        mission: {
          bg: '#F0F4F8',
          card: '#FFFFFF',
          green: '#20C997',
          blue: '#4D6EF7',
          purple: '#8B5CF6',
          orange: '#FF8A00',
          yellow: '#FFB800'
        },
        module: {
          bg: '#F4F7FB',
          card: '#FFFFFF',
          borderCompleted: '#20C997',
          glowCompleted: 'rgba(32, 201, 151, 0.4)',
          textCompleted: '#059669',
          iconBgCompleted: '#E6F8F2',
          borderProgress: '#4D6EF7',
          glowProgress: 'rgba(77, 110, 247, 0.4)',
          textProgress: '#2563EB',
          iconBgProgress: '#EAEFFE',
          cardLocked: '#F3F4F6',
          textLocked: '#9CA3AF',
          aicorePurple: '#6366F1'
        },
        // Accent colors
        compliance: {
          DEFAULT: '#22C55E',
          light: '#4ADE80',
          dark: '#16A34A',
        },
        risk: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        violation: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        ai: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        // Surface colors
        surface: {
          DEFAULT: '#1E293B',
          hover: '#334155',
          active: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: "1rem",
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.5s steps(3, end) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typing: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
