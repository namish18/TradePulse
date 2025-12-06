/**
 * TradePulse Backend Server
 * Main entry point for the application
 */

import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import app, { apolloServer, schema } from './app.js';
import { logger } from './middlewares/loggingMiddleware.js';
import { initDatabase, closeDatabase } from './db/index.js';
import { startConsumers, stopConsumers } from './consumers/index.js';
import { startJobs, stopJobs } from './jobs/index.js';
import { closeRedis } from './config/redis.js';
import { verifyToken } from './middlewares/authMiddleware.js';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

// Create HTTP server
const httpServer = http.createServer(app);

// Create WebSocket server for GraphQL subscriptions
const wsServer = new WebSocketServer({
    server: httpServer,
    path: process.env.GRAPHQL_SUBSCRIPTIONS_PATH || '/graphql/subscriptions',
});

// Configure WebSocket server with graphql-ws
const serverCleanup = useServer(
    {
        schema,
        context: async (ctx) => {
            // Extract token from connection params
            const token = ctx.connectionParams?.authentication || ctx.connectionParams?.token;

            if (token) {
                try {
                    const user = await verifyToken(token);
                    return { user, isWebSocket: true };
                } catch (error) {
                    logger.error('WebSocket authentication failed:', error);
                    return { user: null, isWebSocket: true };
                }
            }

            return { user: null, isWebSocket: true };
        },
        onConnect: async (ctx) => {
            logger.info('WebSocket client connected', {
                connectionParams: ctx.connectionParams,
            });
        },
        onDisconnect: (ctx, code, reason) => {
            logger.info('WebSocket client disconnected', { code, reason });
        },
        onSubscribe: (ctx, message) => {
            logger.debug('Client subscribed', { operationName: message.payload?.operationName });
        },
        onComplete: (ctx, message) => {
            logger.debug('Subscription completed', { id: message.id });
        },
        onError: (ctx, message, errors) => {
            logger.error('WebSocket error', { errors });
        },
    },
    wsServer
);

/**
 * Initialize all services and start the server
 */
async function startServer() {
    try {
        // Initialize database connection
        logger.info('Initializing database connection...');
        await initDatabase();
        logger.info('Database connection established');

        // Start Apollo Server
        logger.info('Starting Apollo Server...');
        await apolloServer.start();
        logger.info('Apollo Server started');

        // Start Kafka consumers
        logger.info('Starting Kafka consumers...');
        await startConsumers();
        logger.info('Kafka consumers started');

        // Start scheduled jobs
        logger.info('Starting scheduled jobs...');
        await startJobs();
        logger.info('Scheduled jobs started');

        // Start HTTP server
        httpServer.listen(PORT, HOST, () => {
            logger.info(`🚀 Server ready at http://${HOST}:${PORT}`);
            logger.info(`📊 GraphQL endpoint: http://${HOST}:${PORT}/graphql`);
            logger.info(`🔌 Subscriptions endpoint: ws://${HOST}:${PORT}/graphql/subscriptions`);
            logger.info(`🏥 Health check: http://${HOST}:${PORT}/health`);
            logger.info(`Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

/**
 * Graceful shutdown handler
 */
async function gracefulShutdown(signal) {
    logger.info(`${signal} received, starting graceful shutdown...`);

    try {
        // Stop accepting new connections
        httpServer.close(() => {
            logger.info('HTTP server closed');
        });

        // Clean up WebSocket server
        await serverCleanup.dispose();
        logger.info('WebSocket server cleaned up');

        // Stop Apollo Server
        await apolloServer.stop();
        logger.info('Apollo Server stopped');

        // Stop Kafka consumers
        await stopConsumers();
        logger.info('Kafka consumers stopped');

        // Stop scheduled jobs
        await stopJobs();
        logger.info('Scheduled jobs stopped');

        // Close Redis connections
        await closeRedis();
        logger.info('Redis connections closed');

        // Close database connections
        await closeDatabase();
        logger.info('Database connections closed');

        logger.info('Graceful shutdown completed');
        process.exit(0);
    } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
}

// Handle process signals for graceful shutdown
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception:', error);
    gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
});

// Start the server
startServer();

export { httpServer, wsServer };
