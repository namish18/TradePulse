// Date and time helper functions

/**
 * Format timestamp to readable date string
 */
export function formatDate(timestamp: number, includeTime: boolean = false): string {
    const date = new Date(timestamp);

    if (includeTime) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

/**
 * Format time only
 */
export function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
}

/**
 * Get relative time (e.g., "2 minutes ago")
 */
export function getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    return 'just now';
}

/**
 * Check if timestamp is today
 */
export function isToday(timestamp: number): boolean {
    const date = new Date(timestamp);
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

/**
 * Check if timestamp is this week
 */
export function isThisWeek(timestamp: number): boolean {
    const date = new Date(timestamp);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return date >= weekAgo && date <= today;
}

/**
 * Get start of day timestamp
 */
export function getStartOfDay(timestamp?: number): number {
    const date = timestamp ? new Date(timestamp) : new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

/**
 * Get end of day timestamp
 */
export function getEndOfDay(timestamp?: number): number {
    const date = timestamp ? new Date(timestamp) : new Date();
    date.setHours(23, 59, 59, 999);
    return date.getTime();
}

/**
 * Format duration in milliseconds to readable string
 */
export function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

/**
 * Get timezone offset string
 */
export function getTimezoneOffset(): string {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset <= 0 ? '+' : '-';

    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
