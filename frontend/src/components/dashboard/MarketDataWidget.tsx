import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface MarketDataWidgetProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
}

export function MarketDataWidget({
  symbol,
  price,
  change,
  changePercent,
  high,
  low,
  volume,
}: MarketDataWidgetProps) {
  const isPositive = change >= 0;

  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{symbol}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white">{formatCurrency(price)}</p>
            <p className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {formatCurrency(Math.abs(change))} ({formatPercentage(changePercent)})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-gray-400">High</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(high)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Low</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(low)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(volume)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
