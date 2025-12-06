/**
 * Date Utilities
 * Helper functions for date manipulation and formatting
 */

/**
 * Format date to string
 * @param {Date} date - Date to format
 * @param {string} format - Format string (ISO, date, time, datetime)
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'ISO') {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    switch (format) {
        case 'ISO':
            return date.toISOString();
        case 'date':
            return date.toISOString().split('T')[0];
        case 'time':
            return date.toISOString().split('T')[1].split('.')[0];
        case 'datetime':
            return date.toISOString().replace('T', ' ').split('.')[0];
        default:
            return date.toISOString();
    }
}

/**
 * Parse date string
 * @param {string} dateString - Date string
 * @returns {Date} Parsed date
 */
export function parseDate(dateString) {
    return new Date(dateString);
}

/**
 * Get start of day
 * @param {Date} date - Input date
 * @returns {Date} Start of day
 */
export function getStartOfDay(date = new Date()) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
}

/**
 * Get end of day
 * @param {Date} date - Input date
 * @returns {Date} End of day
 */
export function getEndOfDay(date = new Date()) {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
}

/**
 * Get relative time ago string
 * @param {Date} date - Date
 * @returns {string} Time ago string
 */
export function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [name, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
        }
    }

    return 'just now';
}

/**
 * Check if market is open (simplified - US market hours)
 * @returns {boolean} Is market open
 */
export function isMarketOpen() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Weekend
    if (day === 0 || day === 6) return false;

    // Market hours: 9:30 AM - 4:00 PM ET
    // Simplified - doesn't account for timezone
    if (hour < 9 || (hour === 9 && now.getMinutes() < 30)) return false;
    if (hour >= 16) return false;

    return true;
}

/**
 * Get next market open time
 * @returns {Date} Next market open
 */
export function getNextMarketOpen() {
    const now = new Date();
    let next = new Date(now);

    // If weekend, move to Monday
    if (now.getDay() === 0) {
        // Sunday
        next.setDate(next.getDate() + 1);
    } else if (now.getDay() === 6) {
        // Saturday
        next.setDate(next.getDate() + 2);
    } else if (now.getHours() >= 16) {
        // After market close
        next.setDate(next.getDate() + 1);
    }

    next.setHours(9, 30, 0, 0);
    return next;
}

/**
 * Add days to date
 * @param {Date} date - Input date
 * @param {number} days - Days to add
 * @returns {Date} New date
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Add months to date
 * @param {Date} date - Input date
 * @param {number} months - Months to add
 * @returns {Date} New date
 */
export function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Get difference in days
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in days
 */
export function diffInDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Is date in range
 * @param {Date} date - Date to check
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {boolean} Is in range
 */
export function isDateInRange(date, start, end) {
    return date >= start && date <= end;
}

export default {
    formatDate,
    parseDate,
    getStartOfDay,
    getEndOfDay,
    getTimeAgo,
    isMarketOpen,
    getNextMarketOpen,
    addDays,
    addMonths,
    diffInDays,
    isDateInRange,
};
