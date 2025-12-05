import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
    variant?: 'default' | 'outlined' | 'elevated';
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
}

export function Card({
    variant = 'default',
    header,
    footer,
    children,
    className,
    hoverable = false,
}: CardProps) {
    const cardClass = [
        styles.card,
        styles[variant],
        hoverable && styles.hoverable,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cardClass}>
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
}
