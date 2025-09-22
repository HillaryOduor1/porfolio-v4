import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div 
      className={`rounded-lg border bg-white dark:bg-gray-800 text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;