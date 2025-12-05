// Financial calculation utilities

/**
 * Calculate profit/loss
 */
export function calculatePnL(
    entryPrice: number,
    currentPrice: number,
    quantity: number,
    side: 'long' | 'short'
): number {
    const priceDiff = currentPrice - entryPrice;
    const multiplier = side === 'long' ? 1 : -1;
    return priceDiff * quantity * multiplier;
}

/**
 * Calculate percentage change
 */
export function calculatePercentChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculate PnL percentage
 */
export function calculatePnLPercent(
    entryPrice: number,
    currentPrice: number,
    side: 'long' | 'short'
): number {
    if (entryPrice === 0) return 0;
    const change = calculatePercentChange(entryPrice, currentPrice);
    return side === 'long' ? change : -change;
}

/**
 * Calculate position value
 */
export function calculatePositionValue(price: number, quantity: number): number {
    return price * quantity;
}

/**
 * Calculate average entry price for multiple positions
 */
export function calculateAveragePrice(positions: Array<{ price: number; quantity: number }>): number {
    if (positions.length === 0) return 0;

    const totalValue = positions.reduce((sum, pos) => sum + pos.price * pos.quantity, 0);
    const totalQuantity = positions.reduce((sum, pos) => sum + pos.quantity, 0);

    return totalQuantity === 0 ? 0 : totalValue / totalQuantity;
}

/**
 * Calculate Sharpe Ratio
 */
export function calculateSharpeRatio(
    returns: number[],
    riskFreeRate: number = 0.02
): number {
    if (returns.length === 0) return 0;

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const stdDev = calculateStandardDeviation(returns);

    return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev;
}

/**
 * Calculate standard deviation
 */
export function calculateStandardDeviation(values: number[]): number {
    if (values.length === 0) return 0;

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;

    return Math.sqrt(variance);
}

/**
 * Calculate Value at Risk (simplified historical method)
 */
export function calculateVaR(returns: number[], confidence: number = 0.95): number {
    if (returns.length === 0) return 0;

    const sorted = [...returns].sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * sorted.length);

    return sorted[index] || 0;
}

/**
 * Calculate maximum drawdown
 */
export function calculateMaxDrawdown(values: number[]): number {
    if (values.length === 0) return 0;

    let maxDrawdown = 0;
    let peak = values[0];

    for (const value of values) {
        if (value > peak) {
            peak = value;
        }
        const drawdown = ((peak - value) / peak) * 100;
        if (drawdown > maxDrawdown) {
            maxDrawdown = drawdown;
        }
    }

    return maxDrawdown;
}

/**
 * Calculate win rate
 */
export function calculateWinRate(trades: Array<{ pnl: number }>): number {
    if (trades.length === 0) return 0;

    const winningTrades = trades.filter(t => t.pnl > 0).length;
    return (winningTrades / trades.length) * 100;
}
