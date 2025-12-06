/**
 * Logging Middleware
 * Winston logger configuration and request logging
 */

import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define log colors
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Determine log level based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : process.env.LOG_LEVEL || 'info';
};

// Define log format
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf((info) => {
        const { timestamp, level, message, correlationId, ...meta } = info;

        const log = {
            timestamp,
            level,
            message,
            correlationId,
        };

        // Add metadata if present
        if (Object.keys(meta).length > 0) {
            log.meta = meta;
        }

        return JSON.stringify(log);
    })
);

// Development format with colors
const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
        const { timestamp, level, message, correlationId, ...meta } = info;
        const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
        return `${timestamp} [${level}] ${correlationId ? `[${correlationId}] ` : ''}${message} ${metaStr}`;
    })
);

// Define transports
const transports = [
    new winston.transports.Console({
        format: process.env.NODE_ENV === 'development' ? devFormat : format,
    }),
];

// Add file transport in production
if (process.env.NODE_ENV === 'production' && process.env.LOG_FILE_PATH) {
    transports.push(
        new winston.transports.File({
            filename: process.env.LOG_FILE_PATH || './logs/app.log',
            maxsize: 20 * 1024 * 1024, // 20MB
            maxFiles: 14, // 14 days
            format,
        })
    );
}

// Create logger instance
export const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
    exitOnError: false,
});

/**
 * Express middleware for request logging
 */
export function loggingMiddleware(req, res, next) {
    // Generate correlation ID for tracking requests
    const correlationId = uuidv4();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);

    // Log request
    logger.http('Incoming request', {
        correlationId,
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
    });

    // Record start time
    const startTime = Date.now();

    // Log response
    res.on('finish', () => {
        const duration = Date.now() - startTime;

        const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'http';

        logger[logLevel]('Request completed', {
            correlationId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });

    next();
}

export default {
    logger,
    loggingMiddleware,
};
