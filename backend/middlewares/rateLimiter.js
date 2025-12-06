/**
 * Rate Limiter Middleware
 * Protects API from abuse
 */

import rateLimit from 'express-rate-limit';
import { logger } from './loggingMiddleware.js';
import { CONSTANTS } from '../config/constants.js';

/**
 * Main rate limiter for all routes
 */
export const rateLimiter = rateLimit({
    windowMs: CONSTANTS.RATE_LIMIT.WINDOW_MS,
    max: (req) => {
        // Higher limit for authenticated users
        if (req.user) {
            return CONSTANTS.RATE_LIMIT.AUTHENTICATED_MAX;
        }
        return CONSTANTS.RATE_LIMIT.MAX_REQUESTS;
    },
    message: {
        error: CONSTANTS.ERROR_CODES.RATE_LIMIT_EXCEEDED,
        message: 'Too many requests, please try again later',
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        // Use user ID if authenticated, otherwise IP address
        return req.user?.id || req.ip || req.connection.remoteAddress;
    },
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', {
            correlationId: req.correlationId,
            userId: req.user?.id,
            ip: req.ip,
            path: req.path,
        });

        res.status(429).json({
            error: CONSTANTS.ERROR_CODES.RATE_LIMIT_EXCEEDED,
            message: 'Too many requests, please try again later',
            correlationId: req.correlationId,
        });
    },
});

/**
 * Strict rate limiter for sensitive endpoints (e.g., login, register)
 */
export const strictRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    skipSuccessfulRequests: true, // Don't count successful requests
    message: {
        error: CONSTANTS.ERROR_CODES.RATE_LIMIT_EXCEEDED,
        message: 'Too many attempts, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip || req.connection.remoteAddress;
    },
    handler: (req, res) => {
        logger.warn('Strict rate limit exceeded', {
            correlationId: req.correlationId,
            ip: req.ip,
            path: req.path,
        });

        res.status(429).json({
            error: CONSTANTS.ERROR_CODES.RATE_LIMIT_EXCEEDED,
            message: 'Too many attempts, please try again in 15 minutes',
            correlationId: req.correlationId,
        });
    },
});

/**
 * GraphQL-specific rate limiter
 */
export const graphqlRateLimiter = rateLimit({
    windowMs: CONSTANTS.RATE_LIMIT.WINDOW_MS,
    max: (req) => {
        // Higher limit for authenticated users
        if (req.user) {
            return CONSTANTS.RATE_LIMIT.AUTHENTICATED_MAX * 2; // Double for GraphQL
        }
        return CONSTANTS.RATE_LIMIT.MAX_REQUESTS;
    },
    message: {
        error: CONSTANTS.ERROR_CODES.RATE_LIMIT_EXCEEDED,
        message: 'Too many GraphQL requests, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        return req.user?.id || req.ip || req.connection.remoteAddress;
    },
});

export default {
    rateLimiter,
    strictRateLimiter,
    graphqlRateLimiter,
};
