'use client';

import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  firstName?: string;
  lastName?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      firstName,
      lastName,
      size = 'md',
      status,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
    };

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-slate-500',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    };

    const initials = getInitials(firstName, lastName);
    const showImage = src && !imageError;

    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-ai-purple font-medium text-white overflow-hidden',
            sizes[size]
          )}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt || `${firstName} ${lastName}`}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-slate-900',
              statusSizes[size],
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group component
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = 'md',
}) => {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const overlaps = {
    xs: '-ml-2',
    sm: '-ml-2.5',
    md: '-ml-3',
    lg: '-ml-4',
  };

  return (
    <div className="flex items-center">
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className={cn(index > 0 && overlaps[size], 'ring-2 ring-slate-900 rounded-full')}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            overlaps[size],
            'flex items-center justify-center rounded-full bg-slate-700 text-white font-medium ring-2 ring-slate-900',
            sizes[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
