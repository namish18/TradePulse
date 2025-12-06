/**
 * Input Validators
 * Validation helper functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export function validatePassword(password) {
    const result = {
        isValid: true,
        errors: [],
    };

    if (password.length < 8) {
        result.isValid = false;
        result.errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        result.isValid = false;
        result.errors.push('Password must contain at least one number');
    }

    return result;
}

/**
 * Validate stock symbol
 * @param {string} symbol - Symbol to validate
 * @returns {boolean} Is valid
 */
export function validateSymbol(symbol) {
    // 1-5 uppercase letters
    const symbolRegex = /^[A-Z]{1,5}$/;
    return symbolRegex.test(symbol);
}

/**
 * Validate UUID
 * @param {string} uuid - UUID to validate
 * @returns {boolean} Is valid
 */
export function validateUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate phone number
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid
 */
export function validatePhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid
 */
export function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate number is positive
 * @param {number} num - Number to validate
 * @returns {boolean} Is positive
 */
export function isPositive(num) {
    return typeof num === 'number' && num > 0;
}

/**
 * Validate number is in range
 * @param {number} num - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Is in range
 */
export function isInRange(num, min, max) {
    return typeof num === 'number' && num >= min && num <= max;
}

export default {
    validateEmail,
    validatePassword,
    validateSymbol,
    validateUUID,
    sanitizeInput,
    validatePhone,
    validateURL,
    isPositive,
    isInRange,
};
