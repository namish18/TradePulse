'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
    sm: '28rem',
    md: '32rem',
    lg: '36rem',
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
        role="presentation"
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <div
          className="animate-slideIn"
          style={{
            maxWidth: sizeMap[size],
            width: '100%',
            backgroundColor: 'var(--color-primary-dark)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-neon-lg)',
            border: '1px solid rgba(255, 7, 58, 0.2)',
          }}
        >
          {title && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(2, 6, 111, 0.1)',
              }}
            >
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-white)' }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  padding: '0.25rem',
                  backgroundColor: 'transparent',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background-color var(--transition-base)',
                  cursor: 'pointer',
                  border: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
                aria-label="Close modal"
              >
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          )}

          <div
            style={{
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
