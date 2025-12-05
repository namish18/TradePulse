import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { Session, JWTPayload } from '@/types/auth';

const SECRET_KEY = process.env.SESSION_SECRET || 'default-secret-key-change-in-production';
const secret = new TextEncoder().encode(SECRET_KEY);

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const COOKIE_NAME = 'session';

/**
 * Create a JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);

    return token;
}

/**
 * Verify and decode JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as JWTPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Create session and set cookie
 */
export async function createSession(userId: string, email: string, role: string): Promise<Session> {
    const expiresAt = Date.now() + SESSION_DURATION;

    const session: Session = {
        userId,
        email,
        role,
        expiresAt,
    };

    const token = await createToken({
        userId,
        email,
        role,
    });

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000, // Convert to seconds
        path: '/',
    });

    return session;
}

/**
 * Get session from cookie
 */
export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return null;
    }

    // Check if session is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
        await destroySession();
        return null;
    }

    return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        expiresAt: payload.exp ? payload.exp * 1000 : Date.now() + SESSION_DURATION,
    };
}

/**
 * Destroy session and clear cookie
 */
export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Refresh session (extend expiration)
 */
export async function refreshSession(): Promise<Session | null> {
    const session = await getSession();

    if (!session) {
        return null;
    }

    return createSession(session.userId, session.email, session.role);
}

/**
 * Verify if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}
