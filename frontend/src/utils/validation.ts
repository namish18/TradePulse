// Input validation utilities

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Validate trading symbol
 */
export function isValidSymbol(symbol: string): boolean {
    // Allow alphanumeric characters and common separators
    const symbolRegex = /^[A-Z0-9\-_.]{1,20}$/;
    return symbolRegex.test(symbol.toUpperCase());
}

/**
 * Validate numeric input
 */
export function isValidNumber(value: string | number): boolean {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) && isFinite(num);
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: string | number): boolean {
    return isValidNumber(value) && Number(value) > 0;
}

/**
 * Validate quantity
 */
export function isValidQuantity(quantity: number): {
    valid: boolean;
    error?: string;
} {
    if (!isValidNumber(quantity)) {
        return { valid: false, error: 'Invalid quantity' };
    }
    if (quantity <= 0) {
        return { valid: false, error: 'Quantity must be positive' };
    }
    if (quantity > 1_000_000_000) {
        return { valid: false, error: 'Quantity too large' };
    }

    return { valid: true };
}

/**
 * Validate price
 */
export function isValidPrice(price: number): {
    valid: boolean;
    error?: string;
} {
    if (!isValidNumber(price)) {
        return { valid: false, error: 'Invalid price' };
    }
    if (price <= 0) {
        return { valid: false, error: 'Price must be positive' };
    }
    if (price > 1_000_000_000) {
        return { valid: false, error: 'Price too large' };
    }

    return { valid: true };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate required field
 */
export function isRequired(value: any): boolean {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
}

/**
 * Validate string length
 */
export function isValidLength(
    value: string,
    min: number,
    max: number
): {
    valid: boolean;
    error?: string;
} {
    if (value.length < min) {
        return { valid: false, error: `Must be at least ${min} characters` };
    }
    if (value.length > max) {
        return { valid: false, error: `Must be at most ${max} characters` };
    }
    return { valid: true };
}
