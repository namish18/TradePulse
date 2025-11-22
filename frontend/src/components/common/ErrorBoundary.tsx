'use client';

import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '28rem', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-danger)' }} />
              <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-white)' }}>Something went wrong</h1>
            </div>
            <p style={{ color: 'var(--color-gray-300)', marginBottom: '1.5rem' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-danger)',
                color: 'var(--color-white)',
                fontWeight: '600',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderRadius: 'var(--radius-lg)',
                transition: 'background-color var(--transition-base)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-danger)';
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
