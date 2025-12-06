/**
 * Financial Calculations
 * Helper functions for financial mathematics
 */

/**
 * Calculate daily returns from prices
 * @param {Array<number>} prices - Array of prices
 * @returns {Array<number>} Daily returns
 */
export function calculateReturns(prices) {
    if (prices.length < 2) return [];

    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        const returnValue = (prices[i] - prices[i - 1]) / prices[i - 1];
        returns.push(returnValue);
    }

    return returns;
}

/**
 * Calculate volatility (standard deviation of returns)
 * @param {Array<number>} returns - Array of returns
 * @returns {number} Volatility
 */
export function calculateVolatility(returns) {
    if (returns.length === 0) return 0;

    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const squaredDiffs = returns.map((r) => Math.pow(r - mean, 2));
    const variance = squaredDiffs.reduce((sum, sq) => sum + sq, 0) / returns.length;

    return Math.sqrt(variance);
}

/**
 * Calculate correlation between two return series
 * @param {Array<number>} returns1 - First return series
 * @param {Array<number>} returns2 - Second return series
 * @returns {number} Correlation coefficient
 */
export function calculateCorrelation(returns1, returns2) {
    if (returns1.length !== returns2.length || returns1.length === 0) return 0;

    const n = returns1.length;
    const mean1 = returns1.reduce((sum, r) => sum + r, 0) / n;
    const mean2 = returns2.reduce((sum, r) => sum + r, 0) / n;

    let numerator = 0;
    let sumSq1 = 0;
    let sumSq2 = 0;

    for (let i = 0; i < n; i++) {
        const diff1 = returns1[i] - mean1;
        const diff2 = returns2[i] - mean2;

        numerator += diff1 * diff2;
        sumSq1 += diff1 * diff1;
        sumSq2 += diff2 * diff2;
    }

    const denominator = Math.sqrt(sumSq1 * sumSq2);
    return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Calculate covariance between two return series
 * @param {Array<number>} returns1 - First return series
 * @param {Array<number>} returns2 - Second return series
 * @returns {number} Covariance
 */
export function calculateCovariance(returns1, returns2) {
    if (returns1.length !== returns2.length || returns1.length === 0) return 0;

    const n = returns1.length;
    const mean1 = returns1.reduce((sum, r) => sum + r, 0) / n;
    const mean2 = returns2.reduce((sum, r) => sum + r, 0) / n;

    let covariance = 0;
    for (let i = 0; i < n; i++) {
        covariance += (returns1[i] - mean1) * (returns2[i] - mean2);
    }

    return covariance / n;
}

/**
 * Calculate percentage change
 * @param {number} oldValue - Old value
 * @param {number} newValue - New value
 * @returns {number} Percentage change
 */
export function percentChange(oldValue, newValue) {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculate weighted average
 * @param {Array<number>} values - Values
 * @param {Array<number>} weights - Weights
 * @returns {number} Weighted average
 */
export function weightedAverage(values, weights) {
    if (values.length !== weights.length || values.length === 0) return 0;

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight === 0) return 0;

    const weightedSum = values.reduce((sum, val, i) => sum + val * weights[i], 0);
    return weightedSum / totalWeight;
}

/**
 * Normal distribution PDF
 * @param {number} x - Value
 * @param {number} mean - Mean
 * @param {number} stdDev - Standard deviation
 * @returns {number} Probability density
 */
export function normalDistribution(x, mean, stdDev) {
    const variance = stdDev * stdDev;
    const coefficient = 1 / Math.sqrt(2 * Math.PI * variance);
    const exponent = -Math.pow(x - mean, 2) / (2 * variance);
    return coefficient * Math.exp(exponent);
}

/**
 * Calculate parametric Value at Risk
 * @param {number} mean - Mean return
 * @param {number} stdDev - Standard deviation
 * @param {number} confidence - Confidence level (e.g., 0.95)
 * @param {number} portfolioValue - Portfolio value
 * @returns {number} VaR
 */
export function calculateVaRParametric(mean, stdDev, confidence, portfolioValue) {
    // Z-score for confidence level
    const zScores = {
        0.90: 1.282,
        0.95: 1.645,
        0.99: 2.326,
    };

    const zScore = zScores[confidence] || 1.645;
    const var = portfolioValue * (mean - zScore * stdDev);

    return Math.abs(var);
}

/**
 * Calculate Sharpe Ratio
 * @param {Array<number>} returns - Portfolio returns
 * @param {number} riskFreeRate - Risk-free rate (annualized)
 * @param {number} periodsPerYear - Periods per year (252 for daily)
 * @returns {number} Sharpe ratio
 */
export function calculateSharpeRatio(returns, riskFreeRate = 0, periodsPerYear = 252) {
    if (returns.length === 0) return 0;

    const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const volatility = calculateVolatility(returns);

    if (volatility === 0) return 0;

    const annualizedReturn = meanReturn * periodsPerYear;
    const annualizedVolatility = volatility * Math.sqrt(periodsPerYear);

    return (annualizedReturn - riskFreeRate) / annualizedVolatility;
}

/**
 * Calculate Maximum Drawdown
 * @param {Array<number>} values - Portfolio values over time
 * @returns {number} Maximum drawdown (positive percentage)
 */
export function calculateMaxDrawdown(values) {
    if (values.length < 2) return 0;

    let maxDrawdown = 0;
    let peak = values[0];

    for (let i = 1; i < values.length; i++) {
        if (values[i] > peak) {
            peak = values[i];
        } else {
            const drawdown = (peak - values[i]) / peak;
            maxDrawdown = Math.max(maxDrawdown, drawdown);
        }
    }

    return maxDrawdown;
}

export default {
    calculateReturns,
    calculateVolatility,
    calculateCorrelation,
    calculateCovariance,
    percentChange,
    weightedAverage,
    normalDistribution,
    calculateVaRParametric,
    calculateSharpeRatio,
    calculateMaxDrawdown,
};
