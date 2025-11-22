import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const getVariantStyles = (variant: 'primary' | 'secondary' | 'danger' | 'ghost'): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontWeight: '600',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-base)',
  };

  const variantMap: Record<typeof variant, React.CSSProperties> = {
    primary: {
      ...baseStyles,
      backgroundColor: 'var(--color-danger)',
      color: 'var(--color-white)',
      boxShadow: 'var(--shadow-lg)',
    },
    secondary: {
      ...baseStyles,
      backgroundColor: 'var(--color-primary-light)',
      color: 'var(--color-white)',
    },
    danger: {
      ...baseStyles,
      backgroundColor: '#dc2626',
      color: 'var(--color-white)',
    },
    ghost: {
      ...baseStyles,
      backgroundColor: 'transparent',
      color: 'var(--color-white)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  };

  return variantMap[variant];
};

const getSizeStyles = (size: 'sm' | 'md' | 'lg'): React.CSSProperties => {
  const sizeMap: Record<typeof size, React.CSSProperties> = {
    sm: {
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.375rem',
      paddingBottom: '0.375rem',
      fontSize: '0.875rem',
    },
    md: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      fontSize: '1rem',
    },
    lg: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      fontSize: '1.125rem',
    },
  };

  return sizeMap[size];
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      children,
      disabled,
      style = {},
      ...props
    },
    ref
  ) => {
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    const buttonStyle: React.CSSProperties = {
      ...variantStyles,
      ...sizeStyles,
      ...style,
      opacity: disabled || loading ? 0.5 : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
    };

    return (
      <button ref={ref} disabled={disabled || loading} style={buttonStyle} {...props}>
        {loading && (
          <svg style={{ width: '1rem', height: '1rem' }} className="animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {icon && !loading && icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
