/**
 * Middleware Index
 * Export all middlewares
 */

export { logger, loggingMiddleware } from './loggingMiddleware.js';
export { authMiddleware, optionalAuthMiddleware, requireRole, verifyToken } from './authMiddleware.js';
export {
    requirePermission,
    requirePortfolioAccess,
    requireOrderAccess,
    requirePositionAccess,
} from './authzMiddleware.js';
export {
    errorHandler,
    asyncHandler,
    notFoundHandler,
    AppError,
    AuthenticationError,
    AuthorizationError,
    ValidationError,
    NotFoundError,
    DuplicateError,
    DatabaseError,
    ExternalAPIError,
} from './errorHandler.js';
export { rateLimiter, strictRateLimiter, graphqlRateLimiter } from './rateLimiter.js';
export { corsMiddleware } from './corsMiddleware.js';
export {
    validate,
    schemas,
    authSchemas,
    portfolioSchemas,
    orderSchemas,
    marketSchemas,
} from './validationMiddleware.js';
