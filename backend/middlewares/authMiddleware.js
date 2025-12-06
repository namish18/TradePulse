/**
 * Authentication Middleware
 * JWT token validation and user extraction
 */

import jwt from 'jsonwebtoken';
import { logger } from './loggingMiddleware.js';
import { CONSTANTS } from '../config/constants.js';
import { get as getFromCache } from '../config/redis.js';

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Decoded user object
 */
export async function verifyToken(token) {
    try {
        // Verify token signature and expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is blacklisted (logout)
        const blacklisted = await getFromCache(`${CONSTANTS.REDIS_KEYS.USER_SESSION}blacklist:${token}`);
        if (blacklisted) {
            throw new Error('Token has been revoked');
        }

        return decoded;
    } catch (error) {
        logger.warn('Token verification failed:', {
            error: error.message,
        });
        throw error;
    }
}

/**
 * Extract token from Authorization header
 * @param {Object} req - Express request object
 * @returns {string|null} JWT token or null
 */
function extractToken(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return null;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
}

/**
 * Authentication middleware
 * Validates JWT and attaches user to request
 */
export async function authMiddleware(req, res, next) {
    try {
        const token = extractToken(req);

        if (!token) {
            return res.status(401).json({
                error: CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR,
                message: 'No authentication token provided',
            });
        }

        // Verify and decode token
        const user = await verifyToken(token);

        // Attach user to request
        req.user = user;
        req.token = token;

        logger.debug('User authenticated', {
            userId: user.id,
            email: user.email,
            correlationId: req.correlationId,
        });

        next();
    } catch (error) {
        logger.warn('Authentication failed', {
            error: error.message,
            correlationId: req.correlationId,
        });

        return res.status(401).json({
            error: CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR,
            message: 'Invalid or expired token',
        });
    }
}

/**
 * Optional authentication middleware
 * Validates JWT if present but doesn't require it
 */
export async function optionalAuthMiddleware(req, res, next) {
    try {
        const token = extractToken(req);

        if (token) {
            const user = await verifyToken(token);
            req.user = user;
            req.token = token;
        }

        next();
    } catch (error) {
        // Continue without user if token is invalid
        logger.debug('Optional auth failed, continuing without user', {
            error: error.message,
            correlationId: req.correlationId,
        });
        next();
    }
}

/**
 * Role-based authorization middleware
 * @param {Array<string>} allowedRoles - Array of allowed roles
 * @returns {Function} Express middleware
 */
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR,
                message: 'Authentication required',
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            logger.warn('Insufficient permissions', {
                userId: req.user.id,
                userRole: req.user.role,
                requiredRoles: allowedRoles,
                correlationId: req.correlationId,
            });

            return res.status(403).json({
                error: CONSTANTS.ERROR_CODES.AUTHORIZATION_ERROR,
                message: 'Insufficient permissions',
            });
        }

        next();
    };
}

export default {
    authMiddleware,
    optionalAuthMiddleware,
    requireRole,
    verifyToken,
};
