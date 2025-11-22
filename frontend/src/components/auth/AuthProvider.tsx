'use client';

import { createContext, ReactNode, useContext } from 'react';
import { AuthContext } from '@/types/auth';
import { useAuth } from '@/hooks';

const AuthContextValue = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContextValue.Provider value={auth}>
      {children}
    </AuthContextValue.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContextValue);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
