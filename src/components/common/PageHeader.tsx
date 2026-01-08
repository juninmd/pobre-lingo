import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconClassName,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn(
      "relative mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border overflow-hidden",
      className
    )}>
      {/* Ícone decorativo de fundo */}
      {Icon && (
        <div className="absolute top-0 right-0 opacity-10">
          <Icon className={cn("h-32 w-32 md:h-40 md:w-40 text-primary", iconClassName)} />
        </div>
      )}

      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
          {Icon && <Icon className={cn("h-8 w-8 md:h-10 md:w-10", iconClassName)} />}
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
