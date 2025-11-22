import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
}

const getCardStyle = (variant: 'default' | 'glass' | 'elevated'): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
  };

  const variantMap: Record<typeof variant, React.CSSProperties> = {
    default: {
      ...baseStyles,
      backgroundColor: 'var(--color-primary-dark)',
      border: `1px solid rgba(2, 6, 111, 0.2)`,
    },
    glass: {
      ...baseStyles,
      background: 'rgba(2, 6, 111, 0.1)',
      backdropFilter: 'blur(10px)',
      border: `1px solid rgba(255, 7, 58, 0.1)`,
    },
    elevated: {
      ...baseStyles,
      backgroundColor: 'var(--color-primary-dark)',
      boxShadow: 'var(--shadow-neon)',
      border: `1px solid rgba(255, 7, 58, 0.1)`,
    },
  };

  return variantMap[variant];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', style = {}, ...props }, ref) => {
    const cardStyle = getCardStyle(variant);

    return <div ref={ref} style={{ ...cardStyle, ...style }} {...props} />;
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ style = {}, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(2, 6, 111, 0.1)',
      ...style,
    }}
    {...props}
  />
);

CardHeader.displayName = 'CardHeader';

export const CardContent = ({ style = {}, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      ...style,
    }}
    {...props}
  />
);

CardContent.displayName = 'CardContent';

export const CardFooter = ({ style = {}, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderTop: '1px solid rgba(2, 6, 111, 0.1)',
      ...style,
    }}
    {...props}
  />
);

CardFooter.displayName = 'CardFooter';
