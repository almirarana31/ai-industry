'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSimulationStore } from '@/store';
import { CircularProgress } from '../ui/Progress';
import type { ComplianceStatus } from '@/types';

interface ComplianceMonitorProps {
  status?: ComplianceStatus;
  className?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const ComplianceMonitor: React.FC<ComplianceMonitorProps> = ({
  status: propStatus,
  className,
  isExpanded = false,
  onToggle,
}) => {
  const storeStatus = useSimulationStore((state) => state.complianceStatus);
  const status = propStatus || storeStatus;

  const levelConfig = {
    safe: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      label: 'Compliant',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
    },
    warning: {
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      label: 'At Risk',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
        </svg>
      ),
    },
    danger: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      label: 'Violation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>
        </svg>
      ),
    },
  };

  const config = levelConfig[status.level];
  const progressVariant = status.level === 'safe' ? 'success' : status.level === 'warning' ? 'warning' : 'danger';

  return (
    <div className={cn('fixed bottom-16 right-4 z-50', className)}>
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4 w-72 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={config.color}>{config.icon}</span>
                <span className="text-sm font-medium text-white">Compliance Status</span>
              </div>
              <button
                onClick={onToggle}
                className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7 15 5 5 5-5"/>
                  <path d="m7 9 5-5 5 5"/>
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <CircularProgress
                value={status.score}
                size={70}
                strokeWidth={6}
                variant={progressVariant}
              />
              <div>
                <p className={cn('text-lg font-semibold', config.color)}>{config.label}</p>
                <p className="text-sm text-slate-400">Score: {status.score}/100</p>
              </div>
            </div>

            {status.activeFlags.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-400 mb-2">Active Flags</p>
                <div className="space-y-1">
                  {status.activeFlags.map((flag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-amber-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                        <line x1="4" x2="4" y1="22" y2="15"/>
                      </svg>
                      {flag}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {status.recentIssues.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Recent Issues</p>
                <div className="space-y-2">
                  {status.recentIssues.slice(0, 3).map((issue, index) => (
                    <div
                      key={index}
                      className={cn(
                        'text-xs p-2 rounded border',
                        config.bgColor,
                        config.borderColor
                      )}
                    >
                      {issue}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={onToggle}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg transition-all',
              config.bgColor,
              config.borderColor,
              'hover:opacity-90'
            )}
          >
            <span className={config.color}>{config.icon}</span>
            <span className={cn('text-sm font-medium', config.color)}>{status.score}%</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ComplianceMonitor };
