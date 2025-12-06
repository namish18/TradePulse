/**
 * Redpanda/Kafka Configuration
 * KafkaJS client setup for producers and consumers
 */

import { Kafka, logLevel } from 'kafkajs';
import { logger } from '../middlewares/loggingMiddleware.js';
import { CONSTANTS } from './constants.js';

// Kafka client configuration
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'tradepulse-backend',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    logLevel: logLevel.ERROR,
    retry: {
        initialRetryTime: 300,
        retries: 10,
        maxRetryTime: 30000,
        multiplier: 2,
        restartOnFailure: async (error) => {
            logger.error('Kafka restart on failure:', error);
            return true;
        },
    },
    connectionTimeout: 10000,
    requestTimeout: 30000,
});

// Create admin client for topic management
export const admin = kafka.admin();

/**
 * Create producer instance
 * @returns {Object} Kafka producer
 */
export function createProducer() {
    const producer = kafka.producer({
        allowAutoTopicCreation: true,
        transactionTimeout: 30000,
        idempotent: true,
        maxInFlightRequests: 5,
        retry: {
            retries: 5,
        },
    });

    // Producer event handlers
    producer.on('producer.connect', () => {
        logger.info('Kafka producer connected');
    });

    producer.on('producer.disconnect', () => {
        logger.warn('Kafka producer disconnected');
    });

    producer.on('producer.network.request_timeout', (payload) => {
        logger.error('Kafka producer request timeout:', payload);
    });

    return producer;
}

/**
 * Create consumer instance
 * @param {string} groupId - Consumer group ID
 * @returns {Object} Kafka consumer
 */
export function createConsumer(groupId = process.env.KAFKA_GROUP_ID) {
    const consumer = kafka.consumer({
        groupId,
        sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT) || 30000,
        heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL) || 3000,
        maxBytesPerPartition: 1048576, // 1MB
        retry: {
            retries: 5,
        },
    });

    // Consumer event handlers
    consumer.on('consumer.connect', () => {
        logger.info(`Kafka consumer connected (group: ${groupId})`);
    });

    consumer.on('consumer.disconnect', () => {
        logger.warn(`Kafka consumer disconnected (group: ${groupId})`);
    });

    consumer.on('consumer.crash', (error) => {
        logger.error('Kafka consumer crashed:', error);
    });

    consumer.on('consumer.rebalancing', () => {
        logger.info('Kafka consumer rebalancing...');
    });

    consumer.on('consumer.group_join', (payload) => {
        logger.info('Kafka consumer joined group:', payload);
    });

    return consumer;
}

/**
 * Initialize Kafka topics
 * @returns {Promise<void>}
 */
export async function initTopics() {
    try {
        await admin.connect();
        logger.info('Kafka admin client connected');

        const topics = Object.values(CONSTANTS.KAFKA_TOPICS);
        const existingTopics = await admin.listTopics();

        const topicsToCreate = topics
            .filter((topic) => !existingTopics.includes(topic))
            .map((topic) => ({
                topic,
                numPartitions: 3,
                replicationFactor: 1,
                configEntries: [
                    { name: 'retention.ms', value: '604800000' }, // 7 days
                    { name: 'cleanup.policy', value: 'delete' },
                ],
            }));

        if (topicsToCreate.length > 0) {
            await admin.createTopics({
                topics: topicsToCreate,
                waitForLeaders: true,
            });
            logger.info('Created Kafka topics:', topicsToCreate.map((t) => t.topic));
        } else {
            logger.info('All Kafka topics already exist');
        }

        await admin.disconnect();
    } catch (error) {
        logger.error('Error initializing Kafka topics:', error);
        throw error;
    }
}

/**
 * Send message to Kafka topic
 * @param {Object} producer - Kafka producer instance
 * @param {string} topic - Topic name
 * @param {Object} message - Message payload
 * @param {string} key - Optional message key
 * @returns {Promise<Object>} Send result
 */
export async function sendMessage(producer, topic, message, key = null) {
    try {
        const result = await producer.send({
            topic,
            messages: [
                {
                    key: key || null,
                    value: JSON.stringify(message),
                    timestamp: Date.now().toString(),
                },
            ],
            acks: -1, // Wait for all in-sync replicas
            timeout: 30000,
        });

        logger.debug('Message sent to Kafka:', {
            topic,
            partition: result[0].partition,
            offset: result[0].offset,
        });

        return result;
    } catch (error) {
        logger.error('Error sending message to Kafka:', {
            topic,
            error: error.message,
        });
        throw error;
    }
}

/**
 * Send batch of messages to Kafka topic
 * @param {Object} producer - Kafka producer instance
 * @param {string} topic - Topic name
 * @param {Array} messages - Array of message payloads
 * @returns {Promise<Object>} Send result
 */
export async function sendBatch(producer, topic, messages) {
    try {
        const kafkaMessages = messages.map((msg) => ({
            key: msg.key || null,
            value: JSON.stringify(msg.value || msg),
            timestamp: Date.now().toString(),
        }));

        const result = await producer.send({
            topic,
            messages: kafkaMessages,
            acks: -1,
            timeout: 30000,
        });

        logger.debug('Batch sent to Kafka:', {
            topic,
            count: messages.length,
        });

        return result;
    } catch (error) {
        logger.error('Error sending batch to Kafka:', {
            topic,
            error: error.message,
        });
        throw error;
    }
}

/**
 * Health check for Kafka connection
 * @returns {Promise<boolean>} Connection status
 */
export async function healthCheck() {
    try {
        await admin.connect();
        await admin.listTopics();
        await admin.disconnect();
        return true;
    } catch (error) {
        logger.error('Kafka health check failed:', error);
        return false;
    }
}

export default {
    kafka,
    admin,
    createProducer,
    createConsumer,
    initTopics,
    sendMessage,
    sendBatch,
    healthCheck,
};
