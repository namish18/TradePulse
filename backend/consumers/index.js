/**
 * Kafka Consumer Manager
 * Manages all Kafka consumers
 */

import { createConsumer } from '../config/redpanda.js';
import { logger } from '../middlewares/loggingMiddleware.js';
import { CONSTANTS } from '../config/constants.js';
import * as redis from '../config/redis.js';

// Consumer instances
let marketTickConsumer = null;
let orderEventConsumer = null;
let riskEventConsumer = null;

/**
 * Market tick consumer
 * Processes real-time market data updates
 */
async function startMarketTickConsumer() {
    marketTickConsumer = createConsumer('market-tick-consumer-group');

    await marketTickConsumer.connect();
    await marketTickConsumer.subscribe({
        topic: CONSTANTS.KAFKA_TOPICS.MARKET_TICKS,
        fromBeginning: false,
    });

    await marketTickConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const tick = JSON.parse(message.value.toString());

                logger.debug('Received market tick', {
                    symbol: tick.symbol,
                    price: tick.price,
                });

                // Cache latest tick in Redis
                await redis.set(
                    `${CONSTANTS.REDIS_KEYS.MARKET_TICK}${tick.symbol}`,
                    tick,
                    CONSTANTS.CACHE_TTL.MARKET_TICK
                );

                // Publish to Redis pub/sub for GraphQL subscriptions
                await redis.publish(CONSTANTS.REDIS_CHANNELS.MARKET_TICK_UPDATED, tick);

                logger.debug('Market tick processed', { symbol: tick.symbol });
            } catch (error) {
                logger.error('Error processing market tick:', error);
            }
        },
    });

    logger.info('Market tick consumer started');
}

/**
 * Order event consumer
 * Processes order lifecycle events
 */
async function startOrderEventConsumer() {
    orderEventConsumer = createConsumer('order-event-consumer-group');

    await orderEventConsumer.connect();
    await orderEventConsumer.subscribe({
        topic: CONSTANTS.KAFKA_TOPICS.ORDER_EVENTS,
        fromBeginning: false,
    });

    await orderEventConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const event = JSON.parse(message.value.toString());

                logger.info('Received order event', {
                    orderId: event.orderId,
                    status: event.status,
                });

                // Process order event
                // Update database, trigger notifications, etc.

            } catch (error) {
                logger.error('Error processing order event:', error);
            }
        },
    });

    logger.info('Order event consumer started');
}

/**
 * Risk event consumer
 * Processes risk calculation results
 */
async function startRiskEventConsumer() {
    riskEventConsumer = createConsumer('risk-event-consumer-group');

    await riskEventConsumer.connect();
    await riskEventConsumer.subscribe({
        topic: CONSTANTS.KAFKA_TOPICS.RISK_EVENTS,
        fromBeginning: false,
    });

    await riskEventConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const event = JSON.parse(message.value.toString());

                logger.debug('Received risk event', {
                    portfolioId: event.portfolioId,
                });

                // Cache risk metrics
                await redis.set(
                    `${CONSTANTS.REDIS_KEYS.RISK_METRICS}${event.portfolioId}`,
                    event.metrics,
                    CONSTANTS.CACHE_TTL.RISK_METRICS
                );

                // Publish to Redis pub/sub
                await redis.publish(CONSTANTS.REDIS_CHANNELS.RISK_METRICS_UPDATED, event);

            } catch (error) {
                logger.error('Error processing risk event:', error);
            }
        },
    });

    logger.info('Risk event consumer started');
}

/**
 * Start all consumers
 * @returns {Promise<void>}
 */
export async function startConsumers() {
    try {
        await Promise.all([
            startMarketTickConsumer(),
            startOrderEventConsumer(),
            startRiskEventConsumer(),
        ]);
        logger.info('All Kafka consumers started successfully');
    } catch (error) {
        logger.error('Failed to start Kafka consumers:', error);
        throw error;
    }
}

/**
 * Stop all consumers
 * @returns {Promise<void>}
 */
export async function stopConsumers() {
    try {
        const disconnectPromises = [];

        if (marketTickConsumer) {
            disconnectPromises.push(marketTickConsumer.disconnect());
        }
        if (orderEventConsumer) {
            disconnectPromises.push(orderEventConsumer.disconnect());
        }
        if (riskEventConsumer) {
            disconnectPromises.push(riskEventConsumer.disconnect());
        }

        await Promise.all(disconnectPromises);
        logger.info('All Kafka consumers stopped');
    } catch (error) {
        logger.error('Error stopping Kafka consumers:', error);
        throw error;
    }
}

export default {
    startConsumers,
    stopConsumers,
};
