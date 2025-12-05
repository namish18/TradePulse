'use client';

import React, { useState } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`${styles.tooltip} ${styles[position]}`}>
                    {content}
                    <div className={styles.arrow} />
                </div>
            )}
        </div>
    );
}
