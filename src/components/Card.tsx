import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div 
      className={`rounded-lg border border-gray-200 dark:border-ide-border bg-white dark:bg-ide-surface text-gray-900 dark:text-ide-text shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;