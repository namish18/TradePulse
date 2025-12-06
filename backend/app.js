/**
 * TradePulse Application Setup
 * Configures Express and Apollo Server
 */

import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { logger, loggingMiddleware } from './middlewares/loggingMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';
import { buildContext } from './graphql/context.js';
import healthRoutes from './routes/healthRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

// Create Express app
const app = express();

// Security middlewares
app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: false,
}));

// CORS
app.use(corsMiddleware);

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(loggingMiddleware);

// Rate limiting
app.use(rateLimiter);

// Health check routes (no rate limiting)
app.use('/health', healthRoutes);
app.use('/ready', healthRoutes);

// Webhook routes
app.use('/webhooks', webhookRoutes);

// Create executable schema
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Create Apollo Server
export const apolloServer = new ApolloServer({
    schema,
    plugins: [
        // Landing page
        process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true'
            ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
            : null,
    ].filter(Boolean),
    introspection: process.env.ENABLE_INTROSPECTION === 'true',
    formatError: (formattedError, error) => {
        // Log error for debugging
        logger.error('GraphQL Error:', {
            message: formattedError.message,
            path: formattedError.path,
            extensions: formattedError.extensions,
        });

        // Return formatted error
        return {
            message: formattedError.message,
            code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR',
            path: formattedError.path,
            extensions: {
                ...formattedError.extensions,
                // Hide stack trace in production
                stack: process.env.NODE_ENV === 'development' ? formattedError.extensions?.stack : undefined,
            },
        };
    },
});

// Apollo middleware will be applied in server.js after server starts
export const applyApolloMiddleware = (httpServer) => {
    app.use(
        process.env.GRAPHQL_PATH || '/graphql',
        cors(),
        express.json(),
        expressMiddleware(apolloServer, {
            context: buildContext,
        })
    );
};

// Apply Apollo middleware manually (for when server is started)
// This is a workaround since we need the httpServer reference
setTimeout(() => {
    app.use(
        process.env.GRAPHQL_PATH || '/graphql',
        cors(),
        express.json(),
        expressMiddleware(apolloServer, {
            context: buildContext,
        })
    );
}, 0);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.url} not found`,
    });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
