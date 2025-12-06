/**
 * Database Configuration
 * PostgreSQL/TimescaleDB connection pool setup
 */

import pg from 'pg';
import { logger } from '../middlewares/loggingMiddleware.js';

const { Pool } = pg;

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'tradepulse',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    min: parseInt(process.env.DB_POOL_MIN) || 2,
    max: parseInt(process.env.DB_POOL_MAX) || 10,
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS) || 2000,
};

// Create connection pool
export const pool = new Pool(dbConfig);

// Pool event handlers
pool.on('connect', (client) => {
    logger.debug('New database client connected');
});

pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle database client:', err);
});

pool.on('remove', (client) => {
    logger.debug('Database client removed from pool');
});

/**
 * Query helper function
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
export async function query(text, params) {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;

        logger.debug('Executed query', {
            text,
            duration,
            rows: result.rowCount,
        });

        return result;
    } catch (error) {
        logger.error('Query error:', {
            text,
            error: error.message,
        });
        throw error;
    }
}

/**
 * Get a client from the pool for transactions
 * @returns {Promise<Object>} Database client
 */
export async function getClient() {
    const client = await pool.connect();

    // Add query helper to client
    const originalQuery = client.query.bind(client);
    client.query = async (text, params) => {
        const start = Date.now();
        try {
            const result = await originalQuery(text, params);
            const duration = Date.now() - start;

            logger.debug('Executed transaction query', {
                text,
                duration,
                rows: result.rowCount,
            });

            return result;
        } catch (error) {
            logger.error('Transaction query error:', {
                text,
                error: error.message,
            });
            throw error;
        }
    };

    return client;
}

/**
 * Execute a transaction
 * @param {Function} callback - Transaction callback function
 * @returns {Promise<any>} Transaction result
 */
export async function transaction(callback) {
    const client = await getClient();

    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        logger.error('Transaction rolled back:', error);
        throw error;
    } finally {
        client.release();
    }
}

/**
 * Health check for database connection
 * @returns {Promise<boolean>} Connection status
 */
export async function healthCheck() {
    try {
        const result = await query('SELECT NOW() as time');
        return !!result.rows[0];
    } catch (error) {
        logger.error('Database health check failed:', error);
        return false;
    }
}

/**
 * Close database pool
 * @returns {Promise<void>}
 */
export async function closePool() {
    try {
        await pool.end();
        logger.info('Database pool closed');
    } catch (error) {
        logger.error('Error closing database pool:', error);
        throw error;
    }
}

export default {
    pool,
    query,
    getClient,
    transaction,
    healthCheck,
    closePool,
};
