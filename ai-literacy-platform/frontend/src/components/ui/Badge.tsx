'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'ai';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'badge',
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'badge-danger',
      info: 'badge bg-blue-500/10 text-blue-400 border-blue-500/30',
      ai: 'badge bg-ai-purple/10 text-ai-purple border-ai-purple/30',
    };

    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-xs px-2.5 py-1',
    };

    return (
      <span
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
