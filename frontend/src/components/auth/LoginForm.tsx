'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { isValidEmail } from '@/utils/validation';
import styles from './LoginForm.module.css';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const { login, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        // Validation
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        // Attempt login
        const result = await login({ email, password });

        if (!result.success) {
            setGeneralError(result.error || 'Login failed');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to your TradePulse account</p>
            </div>

            {generalError && (
                <div className={styles.errorAlert}>{generalError}</div>
            )}

            <Input
                type="email"
                label="Email Address"
                placeholder="trader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                disabled={isLoading}
            />

            <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                disabled={isLoading}
            />

            <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                className={styles.submitButton}
            >
                Sign In
            </Button>

            <p className={styles.footer}>
                Don't have an account? <a href="/signup" className={styles.link}>Sign up</a>
            </p>
        </form>
    );
}
