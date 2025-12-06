/**
 * Health Check Routes
 * System health and readiness endpoints
 */

import express from 'express';
import { healthCheck as dbHealthCheck } from '../config/database.js';
import { healthCheck as redisHealthCheck } from '../config/redis.js';
import { healthCheck as kafkaHealthCheck } from '../config/redpanda.js';

const router = express.Router();

/**
 * Liveness probe
 * Returns 200 if the application is running
 */
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

/**
 * Readiness probe
 * Returns 200 if all dependencies are healthy
 */
router.get('/ready', async (req, res) => {
    const checks = {
        database: false,
        redis: false,
        kafka: false,
    };

    try {
        // Check database
        checks.database = await dbHealthCheck();

        // Check Redis
        checks.redis = await redisHealthCheck();

        // Check Kafka
        checks.kafka = await kafkaHealthCheck();

        const allHealthy = Object.values(checks).every((check) => check === true);

        res.status(allHealthy ? 200 : 503).json({
            status: allHealthy ? 'ready' : 'not ready',
            checks,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(503).json({
            status: 'error',
            checks,
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});

export default router;
