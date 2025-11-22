'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block">
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
          className={`
            absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-md
            whitespace-nowrap pointer-events-none animate-fadeIn
            ${positionStyles[position]}
          `}
        >
          {content}
          {/* Arrow */}
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 rotate-45
              ${
                position === 'top'
                  ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : position === 'bottom'
                    ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2'
                    : position === 'left'
                      ? 'left-full top-1/2 -translate-y-1/2 translate-x-1/2'
                      : 'right-full top-1/2 -translate-y-1/2 -translate-x-1/2'
              }
            `}
          />
        </div>
      )}
    </div>
  );
}
