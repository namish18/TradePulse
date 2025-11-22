import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', ...props }, ref) => {
    const baseStyles = 'rounded-lg overflow-hidden';

    const variantStyles = {
      default: 'bg-primary-dark border border-primary-light/20',
      glass: 'glass',
      elevated: 'bg-primary-dark shadow-neon border border-danger/10',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 border-b border-primary-light/10 ${className}`} {...props} />
);

CardHeader.displayName = 'CardHeader';

export const CardContent = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 ${className}`} {...props} />
);

CardContent.displayName = 'CardContent';

export const CardFooter = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 border-t border-primary-light/10 ${className}`} {...props} />
);

CardFooter.displayName = 'CardFooter';
