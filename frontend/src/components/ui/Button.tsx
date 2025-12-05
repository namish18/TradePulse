import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    children,
    className,
    ...props
}: ButtonProps) {
    const buttonClass = [
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClass}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            <span className={loading ? styles.hiddenText : ''}>{children}</span>
        </button>
    );
}
