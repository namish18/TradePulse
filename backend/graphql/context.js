/**
 * GraphQL Context Builder
 * Creates context for each GraphQL request
 */

import { verifyToken } from '../middlewares/authMiddleware.js';
import { logger } from '../middlewares/loggingMiddleware.js';
import * as db from '../config/database.js';
import * as redis from '../config/redis.js';

/**
 * Build GraphQL context from Express request
 * @param {Object} options - Context options
 * @param {Object} options.req - Express request object
 * @param {Object} options.res - Express response object
 * @returns {Promise<Object>} GraphQL context
 */
export async function buildContext({ req, res }) {
    const context = {
        // Request and response objects
        req,
        res,

        // Database access
        db,

        // Redis/cache access
        redis,

        // Logger
        logger,

        // User (if authenticated)
        user: null,

        // Correlation ID for tracking
        correlationId: req?.correlationId || 'graphql',

        // IP address
        ip: req?.ip || req?.connection?.remoteAddress,
    };

    // Extract and verify token if present
    if (req?.headers?.authorization) {
        try {
            const token = req.headers.authorization.replace('Bearer ', '');
            const user = await verifyToken(token);
            context.user = user;
            context.userId = user.id;

            logger.debug('GraphQL request authenticated', {
                userId: user.id,
                correlationId: context.correlationId,
            });
        } catch (error) {
            logger.warn('GraphQL token verification failed', {
                error: error.message,
                correlationId: context.correlationId,
            });
            // Continue with unauthenticated context
        }
    }

    return context;
}

export default buildContext;
