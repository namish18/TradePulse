/**
 * Redis Configuration
 * Redis client for caching and pub/sub
 */

import Redis from 'ioredis';
import { logger } from '../middlewares/loggingMiddleware.js';
import { CONSTANTS } from './constants.js';

// Redis client configuration
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB) || 0,
    keyPrefix: CONSTANTS.REDIS_KEYS.PREFIX,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        logger.warn(`Redis reconnecting, attempt ${times}`);
        return delay;
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
};

// Main Redis client for caching
export const redis = new Redis(redisConfig);

// Separate client for pub/sub (subscriptions)
export const redisPub = new Redis(redisConfig);
export const redisSub = new Redis(redisConfig);

// Event handlers for main client
redis.on('connect', () => {
    logger.info('Redis client connected');
});

redis.on('ready', () => {
    logger.info('Redis client ready');
});

redis.on('error', (error) => {
    logger.error('Redis client error:', error);
});

redis.on('close', () => {
    logger.warn('Redis client connection closed');
});

redis.on('reconnecting', () => {
    logger.info('Redis client reconnecting...');
});

// Event handlers for pub client
redisPub.on('connect', () => {
    logger.info('Redis pub client connected');
});

redisPub.on('error', (error) => {
    logger.error('Redis pub client error:', error);
});

// Event handlers for sub client
redisSub.on('connect', () => {
    logger.info('Redis sub client connected');
});

redisSub.on('error', (error) => {
    logger.error('Redis sub client error:', error);
});

// Cache helper functions

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} Cached value (parsed JSON if applicable)
 */
export async function get(key) {
    try {
        const value = await redis.get(key);
        if (!value) return null;

        // Try to parse JSON
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    } catch (error) {
        logger.error(`Redis GET error for key ${key}:`, error);
        return null;
    }
}

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds
 * @returns {Promise<boolean>} Success status
 */
export async function set(key, value, ttl = 300) {
    try {
        const serialized = typeof value === 'object' ? JSON.stringify(value) : value;

        if (ttl) {
            await redis.setex(key, ttl, serialized);
        } else {
            await redis.set(key, serialized);
        }

        return true;
    } catch (error) {
        logger.error(`Redis SET error for key ${key}:`, error);
        return false;
    }
}

/**
 * Delete value from cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} Success status
 */
export async function del(key) {
    try {
        await redis.del(key);
        return true;
    } catch (error) {
        logger.error(`Redis DEL error for key ${key}:`, error);
        return false;
    }
}

/**
 * Delete multiple keys matching a pattern
 * @param {string} pattern - Key pattern
 * @returns {Promise<number>} Number of keys deleted
 */
export async function delPattern(pattern) {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length === 0) return 0;

        const result = await redis.del(...keys);
        return result;
    } catch (error) {
        logger.error(`Redis DEL pattern error for ${pattern}:`, error);
        return 0;
    }
}

/**
 * Set expiration on a key
 * @param {string} key - Cache key
 * @param {number} seconds - Expiration in seconds
 * @returns {Promise<boolean>} Success status
 */
export async function expire(key, seconds) {
    try {
        await redis.expire(key, seconds);
        return true;
    } catch (error) {
        logger.error(`Redis EXPIRE error for key ${key}:`, error);
        return false;
    }
}

/**
 * Check if key exists
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} Existence status
 */
export async function exists(key) {
    try {
        const result = await redis.exists(key);
        return result === 1;
    } catch (error) {
        logger.error(`Redis EXISTS error for key ${key}:`, error);
        return false;
    }
}

/**
 * Increment a counter
 * @param {string} key - Cache key
 * @param {number} by - Amount to increment
 * @returns {Promise<number>} New value
 */
export async function incr(key, by = 1) {
    try {
        const result = await redis.incrby(key, by);
        return result;
    } catch (error) {
        logger.error(`Redis INCR error for key ${key}:`, error);
        return 0;
    }
}

/**
 * Publish message to channel
 * @param {string} channel - Channel name
 * @param {any} message - Message to publish
 * @returns {Promise<boolean>} Success status
 */
export async function publish(channel, message) {
    try {
        const serialized = typeof message === 'object' ? JSON.stringify(message) : message;
        await redisPub.publish(channel, serialized);
        return true;
    } catch (error) {
        logger.error(`Redis PUBLISH error for channel ${channel}:`, error);
        return false;
    }
}

/**
 * Subscribe to channel
 * @param {string} channel - Channel name
 * @param {Function} callback - Message handler
 * @returns {Promise<void>}
 */
export async function subscribe(channel, callback) {
    try {
        await redisSub.subscribe(channel);

        redisSub.on('message', (ch, message) => {
            if (ch === channel) {
                try {
                    const parsed = JSON.parse(message);
                    callback(parsed);
                } catch {
                    callback(message);
                }
            }
        });
    } catch (error) {
        logger.error(`Redis SUBSCRIBE error for channel ${channel}:`, error);
    }
}

/**
 * Unsubscribe from channel
 * @param {string} channel - Channel name
 * @returns {Promise<void>}
 */
export async function unsubscribe(channel) {
    try {
        await redisSub.unsubscribe(channel);
    } catch (error) {
        logger.error(`Redis UNSUBSCRIBE error for channel ${channel}:`, error);
    }
}

/**
 * Health check for Redis connection
 * @returns {Promise<boolean>} Connection status
 */
export async function healthCheck() {
    try {
        const result = await redis.ping();
        return result === 'PONG';
    } catch (error) {
        logger.error('Redis health check failed:', error);
        return false;
    }
}

/**
 * Close all Redis connections
 * @returns {Promise<void>}
 */
export async function closeRedis() {
    try {
        await redis.quit();
        await redisPub.quit();
        await redisSub.quit();
        logger.info('All Redis connections closed');
    } catch (error) {
        logger.error('Error closing Redis connections:', error);
        throw error;
    }
}

export default {
    redis,
    redisPub,
    redisSub,
    get,
    set,
    del,
    delPattern,
    expire,
    exists,
    incr,
    publish,
    subscribe,
    unsubscribe,
    healthCheck,
    closeRedis,
};
