export function calculatePercentageChange(previous: number, current: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function calculatePnL(entry: number, current: number, quantity: number): number {
  return (current - entry) * quantity;
}

export function calculateAveragePrice(
  entries: Array<{ price: number; quantity: number }>
): number {
  const totalValue = entries.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
  const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  return totalQuantity === 0 ? 0 : totalValue / totalQuantity;
}

export function calculateStandardDeviation(values: number[]): number {
  if (values.length < 2) return 0;

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;

  return Math.sqrt(variance);
}

export function calculateSharpeRatio(
  returns: number[],
  riskFreeRate: number = 0.02
): number {
  if (returns.length < 2) return 0;

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
  const stdDev = calculateStandardDeviation(returns);

  if (stdDev === 0) return 0;

  return (avgReturn - riskFreeRate) / stdDev;
}

export function calculateDrawdown(prices: number[]): number {
  if (prices.length === 0) return 0;

  let maxPrice = prices[0];
  let maxDrawdown = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > maxPrice) {
      maxPrice = prices[i];
    }
    const drawdown = (prices[i] - maxPrice) / maxPrice;
    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return Math.abs(maxDrawdown) * 100;
}

export function calculateBeta(assetReturns: number[], marketReturns: number[]): number {
  if (assetReturns.length !== marketReturns.length || assetReturns.length < 2) {
    return 0;
  }

  const assetMean = assetReturns.reduce((sum, val) => sum + val, 0) / assetReturns.length;
  const marketMean = marketReturns.reduce((sum, val) => sum + val, 0) / marketReturns.length;

  let covariance = 0;
  let marketVariance = 0;

  for (let i = 0; i < assetReturns.length; i++) {
    covariance += (assetReturns[i] - assetMean) * (marketReturns[i] - marketMean);
    marketVariance += Math.pow(marketReturns[i] - marketMean, 2);
  }

  covariance /= assetReturns.length;
  marketVariance /= assetReturns.length;

  return marketVariance === 0 ? 0 : covariance / marketVariance;
}

export function calculateValueAtRisk(
  returns: number[],
  confidenceLevel: number = 0.95
): number {
  const sorted = [...returns].sort((a, b) => a - b);
  const index = Math.ceil((1 - confidenceLevel) * sorted.length) - 1;
  return Math.abs(sorted[Math.max(0, index)]);
}

export function calculateExpectedShortfall(
  returns: number[],
  confidenceLevel: number = 0.95
): number {
  const var_value = calculateValueAtRisk(returns, confidenceLevel);
  const worstReturns = returns.filter((r) => r <= -var_value);

  if (worstReturns.length === 0) return var_value;

  return Math.abs(worstReturns.reduce((sum, r) => sum + r, 0) / worstReturns.length);
}
