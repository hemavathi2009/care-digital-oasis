
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  premium?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  premium = false,
  glass = false
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  const premiumClasses = premium ? 'card-premium hover:shadow-card-lg' : 'bg-card border-border shadow-card';
  const hoverClasses = hover ? 'hover:-translate-y-2 hover:shadow-card-lg' : '';
  const glassClasses = glass ? 'glass-effect' : '';

  return (
    <div className={cn(
      baseClasses,
      premiumClasses,
      hoverClasses,
      glassClasses,
      className
    )}>
      {children}
    </div>
  );
};

export default Card;
