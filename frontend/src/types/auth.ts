// User authentication types

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'trader' | 'viewer';
    createdAt: Date;
}

export interface Session {
    userId: string;
    email: string;
    role: string;
    expiresAt: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => Promise<void>;
}
