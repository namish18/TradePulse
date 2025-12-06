/**
 * Authorization Middleware
 * SpiceDB-based permission checking
 */

import { logger } from './loggingMiddleware.js';
import { checkPermission } from '../config/spicedb.js';
import { CONSTANTS } from '../config/constants.js';

/**
 * Check permission middleware factory
 * @param {string} resourceType - Resource type (e.g., 'portfolio', 'order')
 * @param {string} permission - Permission to check (e.g., 'read', 'write', 'delete')
 * @param {Function} getResourceId - Function to extract resource ID from request
 * @returns {Function} Express middleware
 */
export function requirePermission(resourceType, permission, getResourceId) {
    return async (req, res, next) => {
        try {
            // User must be authenticated
            if (!req.user) {
                return res.status(401).json({
                    error: CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR,
                    message: 'Authentication required',
                });
            }

            // Extract resource ID from request
            const resourceId = getResourceId(req);

            if (!resourceId) {
                return res.status(400).json({
                    error: CONSTANTS.ERROR_CODES.BAD_REQUEST,
                    message: 'Resource ID not found in request',
                });
            }

            // Check permission via SpiceDB
            const hasPermission = await checkPermission(
                req.user.id,
                resourceType,
                resourceId,
                permission
            );

            if (!hasPermission) {
                logger.warn('Permission denied', {
                    userId: req.user.id,
                    resourceType,
                    resourceId,
                    permission,
                    correlationId: req.correlationId,
                });

                return res.status(403).json({
                    error: CONSTANTS.ERROR_CODES.AUTHORIZATION_ERROR,
                    message: 'You do not have permission to perform this action',
                });
            }

            logger.debug('Permission granted', {
                userId: req.user.id,
                resourceType,
                resourceId,
                permission,
                correlationId: req.correlationId,
            });

            next();
        } catch (error) {
            logger.error('Authorization middleware error:', {
                error: error.message,
                correlationId: req.correlationId,
            });

            return res.status(500).json({
                error: CONSTANTS.ERROR_CODES.INTERNAL_ERROR,
                message: 'Authorization check failed',
            });
        }
    };
}

/**
 * Middleware to check portfolio access
 */
export function requirePortfolioAccess(permission = 'read') {
    return requirePermission(
        'portfolio',
        permission,
        (req) => req.params.portfolioId || req.params.id || req.body.portfolioId
    );
}

/**
 * Middleware to check order access
 */
export function requireOrderAccess(permission = 'read') {
    return requirePermission(
        'order',
        permission,
        (req) => req.params.orderId || req.params.id
    );
}

/**
 * Middleware to check position access
 */
export function requirePositionAccess(permission = 'read') {
    return requirePermission(
        'position',
        permission,
        (req) => req.params.positionId || req.params.id
    );
}

export default {
    requirePermission,
    requirePortfolioAccess,
    requireOrderAccess,
    requirePositionAccess,
};
