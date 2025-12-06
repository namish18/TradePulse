/**
 * Response Formatter
 * Standardized API response formatting
 */

/**
 * Success response
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Formatted response
 */
export function success(data, message = 'Success') {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
    };
}

/**
 * Error response
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {any} details - Error details
 * @returns {Object} Formatted error response
 */
export function error(code, message, details = null) {
    const response = {
        success: false,
        error: {
            code,
            message,
        },
        timestamp: new Date().toISOString(),
    };

    if (details) {
        response.error.details = details;
    }

    return response;
}

/**
 * Paginated response
 * @param {Array} data - Response data
 * @param {Object} pageInfo - Pagination info
 * @returns {Object} Formatted paginated response
 */
export function paginated(data, pageInfo) {
    return {
        success: true,
        data,
        pageInfo: {
            hasNextPage: pageInfo.hasNextPage || false,
            hasPreviousPage: pageInfo.hasPreviousPage || false,
            startCursor: pageInfo.startCursor || null,
            endCursor: pageInfo.endCursor || null,
            totalCount: pageInfo.totalCount || data.length,
        },
        timestamp: new Date().toISOString(),
    };
}

/**
 * Format GraphQL error
 * @param {Error} err - Error object
 * @returns {Object} Formatted GraphQL error
 */
export function formatGraphQLError(err) {
    return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
        path: err.path,
        locations: err.locations,
        extensions: {
            ...err.extensions,
            timestamp: new Date().toISOString(),
        },
    };
}

export default {
    success,
    error,
    paginated,
    formatGraphQLError,
};
