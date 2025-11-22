'use client';

import { useCallback, useEffect, useState } from 'react';
import { User, AuthContext } from '@/types/auth';
import { getUser, getAuthToken, login as authLogin, logout as authLogout } from '@/lib/auth';

export function useAuth(): AuthContext {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = getUser();
        const token = getAuthToken();

        if (storedUser && token) {
          setUserState(storedUser);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const session = await authLogin(email, password);
      setUserState(session.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await authLogout();
      setUserState(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: user !== null,
  };
}
