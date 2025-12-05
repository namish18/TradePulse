import React from 'react';
import styles from './LoadingSpinner.module.css';

export interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'accent' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
    return (
        <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
            <div className={styles.circle} />
        </div>
    );
}
