'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionMap: Record<'top' | 'bottom' | 'left' | 'right', React.CSSProperties> = {
    top: { bottom: '100%', marginBottom: '0.5rem', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: '100%', marginTop: '0.5rem', left: '50%', transform: 'translateX(-50%)' },
    left: { right: '100%', marginRight: '0.5rem', top: '50%', transform: 'translateY(-50%)' },
    right: { left: '100%', marginLeft: '0.5rem', top: '50%', transform: 'translateY(-50%)' },
  };

  const arrowPositionMap: Record<'top' | 'bottom' | 'left' | 'right', React.CSSProperties> = {
    top: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' },
    bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(50%)' },
    left: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(50%)' },
    right: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-50%)' },
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="animate-fadeIn"
          style={{
            position: 'absolute',
            zIndex: 50,
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            backgroundColor: '#111827',
            color: 'var(--color-white)',
            fontSize: '0.875rem',
            borderRadius: 'var(--radius-md)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            ...positionMap[position],
          }}
        >
          {content}
          <div
            style={{
              position: 'absolute',
              width: '0.5rem',
              height: '0.5rem',
              backgroundColor: '#111827',
              ...arrowPositionMap[position],
            }}
          />
        </div>
      )}
    </div>
  );
}
