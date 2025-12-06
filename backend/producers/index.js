/**
 * Kafka Producer Manager
 * Manages Kafka producers for event publishing
 */

import { createProducer, sendMessage } from '../config/redpanda.js';
import { logger } from '../middlewares/loggingMiddleware.js';
import { CONSTANTS } from '../config/constants.js';

// Producer instances
let orderEventProducer = null;
let alertProducer = null;

/**
 * Initialize all producers
 * @returns {Promise<void>}
 */
export async function initProducers() {
    try {
        orderEventProducer = createProducer();
        await orderEventProducer.connect();
        logger.info('Order event producer connected');

        alertProducer = createProducer();
        await alertProducer.connect();
        logger.info('Alert producer connected');

        logger.info('All Kafka producers initialized');
    } catch (error) {
        logger.error('Failed to initialize Kafka producers:', error);
        throw error;
    }
}

/**
 * Publish order event
 * @param {string} eventType - Event type (created, updated, cancelled, filled)
 * @param {Object} orderData - Order data
 * @returns {Promise<void>}
 */
export async function publishOrderEvent(eventType, orderData) {
    try {
        const event = {
            eventType,
            orderId: orderData.id,
            portfolioId: orderData.portfolioId,
            symbol: orderData.symbol,
            side: orderData.side,
            type: orderData.type,
            quantity: orderData.quantity,
            price: orderData.price,
            status: orderData.status,
            timestamp: new Date().toISOString(),
        };

        await sendMessage(
            orderEventProducer,
            CONSTANTS.KAFKA_TOPICS.ORDER_EVENTS,
            event,
            orderData.id
        );

        logger.debug('Order event published', {
            eventType,
            orderId: orderData.id,
        });
    } catch (error) {
        logger.error('Failed to publish order event:', error);
        throw error;
    }
}

/**
 * Publish alert event
 * @param {Object} alertData - Alert data
 * @returns {Promise<void>}
 */
export async function publishAlert(alertData) {
    try {
        const alert = {
            alertId: alertData.id,
            userId: alertData.userId,
            portfolioId: alertData.portfolioId,
            type: alertData.type,
            severity: alertData.severity,
            title: alertData.title,
            message: alertData.message,
            metadata: alertData.metadata,
            timestamp: new Date().toISOString(),
        };

        await sendMessage(
            alertProducer,
            CONSTANTS.KAFKA_TOPICS.ALERTS,
            alert,
            alertData.userId
        );

        // Also publish to Redis for real-time subscriptions
        const redis = await import('../config/redis.js');
        await redis.publish(CONSTANTS.REDIS_CHANNELS.ALERT_TRIGGERED, alert);

        logger.debug('Alert published', {
            alertId: alertData.id,
            userId: alertData.userId,
        });
    } catch (error) {
        logger.error('Failed to publish alert:', error);
        throw error;
    }
}

/**
 * Disconnect all producers
 * @returns {Promise<void>}
 */
export async function disconnectProducers() {
    try {
        const disconnectPromises = [];

        if (orderEventProducer) {
            disconnectPromises.push(orderEventProducer.disconnect());
        }
        if (alertProducer) {
            disconnectPromises.push(alertProducer.disconnect());
        }

        await Promise.all(disconnectPromises);
        logger.info('All Kafka producers disconnected');
    } catch (error) {
        logger.error('Error disconnecting Kafka producers:', error);
        throw error;
    }
}

export default {
    initProducers,
    publishOrderEvent,
    publishAlert,
    disconnectProducers,
};
