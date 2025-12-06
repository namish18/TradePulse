/**
 * Application Constants
 * Centralized configuration constants
 */

export const CONSTANTS = {
    // Kafka Topics
    KAFKA_TOPICS: {
        MARKET_TICKS: process.env.KAFKA_TOPIC_MARKET_TICKS || 'market-ticks',
        ORDER_EVENTS: process.env.KAFKA_TOPIC_ORDER_EVENTS || 'order-events',
        RISK_EVENTS: process.env.KAFKA_TOPIC_RISK_EVENTS || 'risk-events',
        ALERTS: process.env.KAFKA_TOPIC_ALERTS || 'alerts',
    },

    // Redis Key Prefixes
    REDIS_KEYS: {
        PREFIX: process.env.REDIS_KEY_PREFIX || 'tradepulse:',
        MARKET_TICK: 'market:tick:',
        ORDER_BOOK: 'market:orderbook:',
        PORTFOLIO: 'portfolio:',
        POSITION: 'position:',
        RISK_METRICS: 'risk:metrics:',
        USER_SESSION: 'session:',
        RATE_LIMIT: 'ratelimit:',
        CACHE: 'cache:',
    },

    // Redis Pub/Sub Channels
    REDIS_CHANNELS: {
        MARKET_TICK_UPDATED: 'market:tick:updated',
        ORDER_BOOK_UPDATED: 'market:orderbook:updated',
        POSITION_UPDATED: 'portfolio:position:updated',
        PORTFOLIO_UPDATED: 'portfolio:updated',
        RISK_METRICS_UPDATED: 'risk:metrics:updated',
        ALERT_TRIGGERED: 'alert:triggered',
    },

    // Cache TTL (in seconds)
    CACHE_TTL: {
        MARKET_TICK: parseInt(process.env.CACHE_TTL_MARKET_TICK) || 5,
        ORDER_BOOK: parseInt(process.env.CACHE_TTL_ORDER_BOOK) || 2,
        PORTFOLIO: parseInt(process.env.CACHE_TTL_PORTFOLIO) || 30,
        RISK_METRICS: parseInt(process.env.CACHE_TTL_RISK_METRICS) || 300,
        USER_SESSION: 86400, // 24 hours
    },

    // User Roles
    ROLES: {
        ADMIN: 'admin',
        TRADER: 'trader',
        VIEWER: 'viewer',
    },

    // Order Statuses
    ORDER_STATUS: {
        PENDING: 'pending',
        OPEN: 'open',
        PARTIALLY_FILLED: 'partially_filled',
        FILLED: 'filled',
        CANCELLED: 'cancelled',
        REJECTED: 'rejected',
        EXPIRED: 'expired',
    },

    // Order Sides
    ORDER_SIDE: {
        BUY: 'buy',
        SELL: 'sell',
    },

    // Order Types
    ORDER_TYPE: {
        MARKET: 'market',
        LIMIT: 'limit',
        STOP: 'stop',
        STOP_LIMIT: 'stop_limit',
    },

    // Alert Types
    ALERT_TYPE: {
        PRICE: 'price',
        RISK: 'risk',
        PORTFOLIO: 'portfolio',
        SYSTEM: 'system',
    },

    // Alert Severity
    ALERT_SEVERITY: {
        INFO: 'info',
        WARNING: 'warning',
        CRITICAL: 'critical',
    },

    // Error Codes
    ERROR_CODES: {
        AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
        AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        NOT_FOUND: 'NOT_FOUND',
        DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        INTERNAL_ERROR: 'INTERNAL_ERROR',
        BAD_REQUEST: 'BAD_REQUEST',
        RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
        DATABASE_ERROR: 'DATABASE_ERROR',
        EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
    },

    // Trade Sides
    TRADE_SIDE: {
        BUY: 'buy',
        SELL: 'sell',
    },

    // Trade Statuses
    TRADE_STATUS: {
        PENDING: 'pending',
        EXECUTED: 'executed',
        FAILED: 'failed',
    },

    // Asset Classes
    ASSET_CLASS: {
        EQUITY: 'equity',
        FIXED_INCOME: 'fixed_income',
        COMMODITY: 'commodity',
        CURRENCY: 'currency',
        DERIVATIVE: 'derivative',
        CRYPTO: 'crypto',
    },

    // Sectors
    SECTORS: {
        TECHNOLOGY: 'technology',
        FINANCIAL: 'financial',
        HEALTHCARE: 'healthcare',
        ENERGY: 'energy',
        CONSUMER: 'consumer',
        INDUSTRIAL: 'industrial',
        MATERIALS: 'materials',
        UTILITIES: 'utilities',
        REAL_ESTATE: 'real_estate',
        TELECOMMUNICATIONS: 'telecommunications',
    },

    // Regions
    REGIONS: {
        NORTH_AMERICA: 'north_america',
        EUROPE: 'europe',
        ASIA_PACIFIC: 'asia_pacific',
        LATIN_AMERICA: 'latin_america',
        MIDDLE_EAST: 'middle_east',
        AFRICA: 'africa',
    },

    // Risk Confidence Levels
    RISK_CONFIDENCE: {
        VaR_95: 0.95,
        VaR_99: 0.99,
    },

    // Pagination
    PAGINATION: {
        DEFAULT_LIMIT: 20,
        MAX_LIMIT: 100,
    },

    // Rate Limiting
    RATE_LIMIT: {
        WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
        MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
        AUTHENTICATED_MAX: parseInt(process.env.RATE_LIMIT_AUTHENTICATED_MAX) || 500,
    },

    // WebSocket
    WS: {
        HEARTBEAT_INTERVAL: parseInt(process.env.WS_HEARTBEAT_INTERVAL) || 30000,
        MAX_CONNECTIONS: parseInt(process.env.WS_MAX_CONNECTIONS) || 1000,
    },

    // GraphQL
    GRAPHQL: {
        MAX_COMPLEXITY: parseInt(process.env.MAX_QUERY_COMPLEXITY) || 1000,
        MAX_DEPTH: parseInt(process.env.MAX_QUERY_DEPTH) || 10,
    },
};

export default CONSTANTS;
