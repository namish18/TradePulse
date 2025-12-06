/**
 * Helper Utilities
 * General-purpose helper functions
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Generate UUID v4
 * @returns {string} UUID
 */
export function generateId() {
    return uuidv4();
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} attempts - Number of retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<any>} Function result
 */
export async function retry(fn, attempts = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (attempts <= 1) {
            throw error;
        }

        await sleep(delay);
        return retry(fn, attempts - 1, delay * 2);
    }
}

/**
 * Chunk array into smaller arrays
 * @param {Array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array<Array>} Chunked arrays
 */
export function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Pick specific properties from object
 * @param {Object} object - Source object
 * @param {Array<string>} keys - Keys to pick
 * @returns {Object} New object with picked keys
 */
export function pick(object, keys) {
    return keys.reduce((result, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            result[key] = object[key];
        }
        return result;
    }, {});
}

/**
 * Omit specific properties from object
 * @param {Object} object - Source object
 * @param {Array<string>} keys - Keys to omit
 * @returns {Object} New object without omitted keys
 */
export function omit(object, keys) {
    const result = { ...object };
    keys.forEach((key) => delete result[key]);
    return result;
}

/**
 * Deep clone object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if value is empty
 * @param {any} value - Value to check
 * @returns {boolean} Is empty
 */
export function isEmpty(value) {
    if (value == null) return true;
    if (Array.isArray(value) || typeof value === 'string') return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * Debounce function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Throttle function
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate string
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} ending - Ending string
 * @returns {string} Truncated string
 */
export function truncate(str, length = 50, ending = '...') {
    if (str.length <= length) return str;
    return str.substring(0, length - ending.length) + ending;
}

/**
 * Generate random number in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export default {
    generateId,
    sleep,
    retry,
    chunk,
    pick,
    omit,
    deepClone,
    isEmpty,
    debounce,
    throttle,
    formatNumber,
    truncate,
    randomInRange,
    clamp,
};
