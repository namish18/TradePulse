import { Card, CardContent } from '@/components/ui';
import { formatPercentage } from '@/utils/formatters';

interface RiskMetricsData {
  var95: number;
  var99: number;
  expectedShortfall: number;
  beta: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
}

interface RiskMetricsProps {
  metrics: RiskMetricsData;
}

export function RiskMetrics({ metrics }: RiskMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* VaR 95% */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">VaR (95%)</p>
          <p className="text-2xl font-bold text-white">{formatPercentage(metrics.var95)}</p>
          <p className="text-xs text-gray-500 mt-1">95% confidence level</p>
        </CardContent>
      </Card>

      {/* VaR 99% */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">VaR (99%)</p>
          <p className="text-2xl font-bold text-white">{formatPercentage(metrics.var99)}</p>
          <p className="text-xs text-gray-500 mt-1">99% confidence level</p>
        </CardContent>
      </Card>

      {/* Expected Shortfall */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">Expected Shortfall</p>
          <p className="text-2xl font-bold text-white">{formatPercentage(metrics.expectedShortfall)}</p>
          <p className="text-xs text-gray-500 mt-1">Conditional VaR</p>
        </CardContent>
      </Card>

      {/* Beta */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">Beta</p>
          <p className="text-2xl font-bold text-white">{metrics.beta.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Market sensitivity</p>
        </CardContent>
      </Card>

      {/* Sharpe Ratio */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">Sharpe Ratio</p>
          <p className="text-2xl font-bold text-white">{metrics.sharpeRatio.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Risk-adjusted return</p>
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">Max Drawdown</p>
          <p className="text-2xl font-bold text-red-400">{formatPercentage(metrics.maxDrawdown)}</p>
          <p className="text-xs text-gray-500 mt-1">Peak to trough</p>
        </CardContent>
      </Card>

      {/* Volatility */}
      <Card variant="glass">
        <CardContent className="py-6">
          <p className="text-gray-400 text-sm mb-2">Volatility</p>
          <p className="text-2xl font-bold text-white">{formatPercentage(metrics.volatility)}</p>
          <p className="text-xs text-gray-500 mt-1">Annual volatility</p>
        </CardContent>
      </Card>
    </div>
  );
}
