/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: 'button';
}

interface ButtonAsAnchorProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: 'a';
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const Button = (props: ButtonProps) => {
  const { 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    ...restProps 
  } = props;
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-8 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.as === 'a') {
    const { as, ...anchorProps } = restProps as ButtonAsAnchorProps;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as, ...buttonProps } = restProps as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;