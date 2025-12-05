// Formatting utilities for displaying data

/**
 * Format number as currency
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

/**
 * Format number as percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(value: number): string {
    if (Math.abs(value) >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (Math.abs(value) >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (Math.abs(value) >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K`;
    }
    return value.toFixed(2);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number, symbol?: string): string {
    // Crypto and forex typically need more decimals
    const decimals = price < 1 ? 6 : price < 100 ? 4 : 2;
    return formatNumber(price, decimals);
}

/**
 * Format change value with color indicator
 */
export function formatChange(change: number): { text: string; isPositive: boolean } {
    return {
        text: formatPercent(change),
        isPositive: change >= 0,
    };
}

/**
 * Format trading volume
 */
export function formatVolume(volume: number): string {
    return formatCompactNumber(volume);
}

/**
 * Format market cap
 */
export function formatMarketCap(value: number): string {
    return formatCompactNumber(value);
}
