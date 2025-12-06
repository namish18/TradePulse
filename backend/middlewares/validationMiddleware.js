/**
 * Validation Middleware
 * Request validation using Joi
 */

import Joi from 'joi';
import { logger } from './loggingMiddleware.js';
import { ValidationError } from './errorHandler.js';

/**
 * Validate request data against schema
 * @param {Object} schema - Joi validation schema
 * @param {string} property - Property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware
 */
export function validate(schema, property = 'body') {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const details = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
                type: detail.type,
            }));

            logger.warn('Validation error', {
                correlationId: req.correlationId,
                property,
                errors: details,
            });

            return next(new ValidationError('Validation failed', details));
        }

        // Replace request property with validated value
        req[property] = value;
        next();
    };
}

/**
 * Common validation schemas
 */
export const schemas = {
    // Pagination schema
    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20),
        sortBy: Joi.string(),
        sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
    }),

    // ID parameter schema
    id: Joi.object({
        id: Joi.string().uuid().required(),
    }),

    // Symbol schema
    symbol: Joi.string()
        .uppercase()
        .pattern(/^[A-Z]{1,5}$/)
        .required(),

    // Email schema
    email: Joi.string().email().required(),

    // Password schema
    password: Joi.string().min(8).max(128).required(),

    // Date range schema
    dateRange: Joi.object({
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')),
    }).and('startDate', 'endDate'),
};

/**
 * Validation schemas for specific endpoints
 */

// Auth schemas
export const authSchemas = {
    register: Joi.object({
        email: schemas.email,
        password: schemas.password,
        name: Joi.string().min(2).max(100).required(),
    }),

    login: Joi.object({
        email: schemas.email,
        password: schemas.password,
    }),

    refreshToken: Joi.object({
        refreshToken: Joi.string().required(),
    }),
};

// Portfolio schemas
export const portfolioSchemas = {
    create: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        description: Joi.string().max(500).allow('', null),
    }),

    update: Joi.object({
        name: Joi.string().min(1).max(100),
        description: Joi.string().max(500).allow('', null),
    }).or('name', 'description'),

    id: schemas.id,
};

// Order schemas
export const orderSchemas = {
    create: Joi.object({
        portfolioId: Joi.string().uuid().required(),
        symbol: schemas.symbol,
        side: Joi.string().valid('buy', 'sell').required(),
        type: Joi.string().valid('market', 'limit', 'stop', 'stop_limit').required(),
        quantity: Joi.number().positive().required(),
        price: Joi.number().positive().when('type', {
            is: Joi.string().valid('limit', 'stop_limit'),
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        stopPrice: Joi.number().positive().when('type', {
            is: Joi.string().valid('stop', 'stop_limit'),
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
    }),

    id: schemas.id,
};

// Market data schemas
export const marketSchemas = {
    symbol: Joi.object({
        symbol: schemas.symbol,
    }),

    symbols: Joi.object({
        symbols: Joi.array().items(schemas.symbol).min(1).max(50).required(),
    }),

    orderBook: Joi.object({
        symbol: schemas.symbol,
        depth: Joi.number().integer().min(1).max(100).default(20),
    }),

    ohlcv: Joi.object({
        symbol: schemas.symbol,
        interval: Joi.string()
            .valid('1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w')
            .default('1h'),
        limit: Joi.number().integer().min(1).max(1000).default(100),
    }),
};

export default {
    validate,
    schemas,
    authSchemas,
    portfolioSchemas,
    orderSchemas,
    marketSchemas,
};
