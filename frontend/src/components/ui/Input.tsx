import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export function Input({
    label,
    error,
    icon,
    iconPosition = 'left',
    className,
    ...props
}: InputProps) {
    const inputWrapperClass = [
        styles.inputWrapper,
        icon && styles.hasIcon,
        icon && iconPosition === 'right' && styles.iconRight,
        error && styles.hasError,
        props.disabled && styles.disabled,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={inputWrapperClass}>
                {icon && iconPosition === 'left' && (
                    <span className={styles.icon}>{icon}</span>
                )}
                <input
                    className={[styles.input, className].filter(Boolean).join(' ')}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <span className={styles.icon}>{icon}</span>
                )}
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}
