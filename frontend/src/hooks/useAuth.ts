'use client';

import { useState, useCallback } from 'react';
import type { User, LoginCredentials, AuthResponse, AuthContextType } from '@/types/auth';

export function useAuth(): AuthContextType {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = user !== null;

    const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
        setIsLoading(true);

        try {
            // Call your authentication API endpoint
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.success && data.user) {
                setUser(data.user);

                // Store token in localStorage for GraphQL Auth
                if (data.token) {
                    localStorage.setItem('auth_token', data.token);
                }
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'An error occurred during login',
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            localStorage.removeItem('auth_token');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
}
