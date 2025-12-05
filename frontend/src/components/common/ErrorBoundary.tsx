'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';
import { Button } from '../ui/Button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Something went wrong</h1>
                        <p className={styles.message}>
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <Button onClick={this.handleReset}>Try again</Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
