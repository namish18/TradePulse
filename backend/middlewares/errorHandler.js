/**
 * Error Handler Middleware
 * Global error handling for Express and GraphQL
 */

import { logger } from './loggingMiddleware.js';
import { CONSTANTS } from '../config/constants.js';

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
    constructor(message, code = CONSTANTS.ERROR_CODES.INTERNAL_ERROR, statusCode = 500, details = null) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Custom error classes for specific scenarios
 */
export class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed', details = null) {
        super(message, CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR, 401, details);
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends AppError {
    constructor(message = 'Permission denied', details = null) {
        super(message, CONSTANTS.ERROR_CODES.AUTHORIZATION_ERROR, 403, details);
        this.name = 'AuthorizationError';
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation failed', details = null) {
        super(message, CONSTANTS.ERROR_CODES.VALIDATION_ERROR, 400, details);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found', details = null) {
        super(message, CONSTANTS.ERROR_CODES.NOT_FOUND, 404, details);
        this.name = 'NotFoundError';
    }
}

export class DuplicateError extends AppError {
    constructor(message = 'Resource already exists', details = null) {
        super(message, CONSTANTS.ERROR_CODES.DUPLICATE_ERROR, 409, details);
        this.name = 'DuplicateError';
    }
}

export class DatabaseError extends AppError {
    constructor(message = 'Database error occurred', details = null) {
        super(message, CONSTANTS.ERROR_CODES.DATABASE_ERROR, 500, details);
        this.name = 'DatabaseError';
    }
}

export class ExternalAPIError extends AppError {
    constructor(message = 'External API error', details = null) {
        super(message, CONSTANTS.ERROR_CODES.EXTERNAL_API_ERROR, 502, details);
        this.name = 'ExternalAPIError';
    }
}

/**
 * Global error handler middleware
 */
export function errorHandler(err, req, res, next) {
    // Set defaults
    let statusCode = err.statusCode || 500;
    let code = err.code || CONSTANTS.ERROR_CODES.INTERNAL_ERROR;
    let message = err.message || 'Internal server error';
    let details = err.details || null;

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        code = CONSTANTS.ERROR_CODES.VALIDATION_ERROR;
    } else if (err.name === 'CastError') {
        statusCode = 400;
        code = CONSTANTS.ERROR_CODES.VALIDATION_ERROR;
        message = 'Invalid data format';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        code = CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        code = CONSTANTS.ERROR_CODES.AUTHENTICATION_ERROR;
        message = 'Token expired';
    }

    // Log error
    logger.error('Error occurred', {
        correlationId: req.correlationId,
        error: message,
        code,
        statusCode,
        stack: err.stack,
        path: req.path,
        method: req.method,
        userId: req.user?.id,
    });

    // Prepare error response
    const errorResponse = {
        error: code,
        message,
        correlationId: req.correlationId,
    };

    // Include details if present
    if (details) {
        errorResponse.details = details;
    }

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Send error response
    res.status(statusCode).json(errorResponse);
}

/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 */
export function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req, res, next) {
    const error = new NotFoundError(`Route ${req.method} ${req.url} not found`);
    next(error);
}

export default {
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
};
