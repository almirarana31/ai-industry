'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DesktopWindowProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
  className?: string;
  toolbar?: React.ReactNode;
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({
  title,
  icon,
  isActive = true,
  onClose,
  onMinimize,
  onMaximize,
  children,
  className,
  toolbar,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn('desktop-window flex flex-col h-full', className)}
      >
        {/* Title bar */}
        <div
          className={cn(
            'flex items-center justify-between px-4 py-2 border-b border-slate-700',
            isActive ? 'bg-slate-800' : 'bg-slate-800/50'
          )}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <span className={isActive ? 'text-primary-400' : 'text-slate-500'}>
                {icon}
              </span>
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isActive ? 'text-white' : 'text-slate-400'
              )}
            >
              {title}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
            )}
            {onMaximize && (
              <button
                onClick={onMaximize}
                className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                </svg>
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Toolbar if provided */}
        {toolbar && (
          <div className="px-4 py-2 border-b border-slate-700 bg-slate-800/50">
            {toolbar}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export { DesktopWindow };
