/**
 * Webhook Routes
 * External webhook handlers
 */

import express from 'express';
import { logger } from '../middlewares/loggingMiddleware.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

/**
 * Market data webhook
 * Receives external market data updates
 */
router.post(
    '/market-data',
    asyncHandler(async (req, res) => {
        logger.info('Market data webhook received', {
            correlationId: req.correlationId,
            body: req.body,
        });

        // Process market data update
        // This would trigger Kafka events, cache updates, etc.

        res.status(200).json({
            status: 'received',
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * Order execution webhook
 * Receives order execution confirmations from external systems
 */
router.post(
    '/order-execution',
    asyncHandler(async (req, res) => {
        logger.info('Order execution webhook received', {
            correlationId: req.correlationId,
            body: req.body,
        });

        res.status(200).json({
            status: 'received',
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * Alert webhook
 * Receives alert triggers from external systems
 */
router.post(
    '/alerts',
    asyncHandler(async (req, res) => {
        logger.info('Alert webhook received', {
            correlationId: req.correlationId,
            body: req.body,
        });

        res.status(200).json({
            status: 'received',
            timestamp: new Date().toISOString(),
        });
    })
);

export default router;
