import { Session, User } from '@/types/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const EXPIRY_KEY = 'auth_expiry';

export function setAuthToken(token: string, expiresIn: number = 3600000): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, (Date.now() + expiresIn).toString());
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;

  if (Date.now() > parseInt(expiry)) {
    clearAuthData();
    return null;
  }

  return token;
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;

  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearAuthData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export async function validateSession(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      clearAuthData();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}

export async function login(email: string, password: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: Session = await response.json();

  setAuthToken(data.token, data.expiresAt - Date.now());
  setUser(data.user);

  return data;
}

export async function logout(): Promise<void> {
  const token = getAuthToken();

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  clearAuthData();
}

export function getAuthHeader(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
