import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface PnLSummaryProps {
  totalValue: number;
  cashBalance: number;
  pnl: number;
  pnlPercent: number;
}

export function PnLSummary({
  totalValue,
  cashBalance,
  pnl,
  pnlPercent,
}: PnLSummaryProps) {
  const isPositive = pnl >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card variant="glass" className="md:col-span-2">
        <CardContent className="py-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Cash Balance</p>
              <p className="text-xl font-semibold text-white">{formatCurrency(cashBalance)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated" className={isPositive ? 'border-green-500/20' : 'border-red-500/20'}>
        <CardContent className="py-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              {isPositive ? (
                <TrendingUp className={`w-6 h-6 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
              ) : (
                <TrendingDown className={`w-6 h-6 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
              )}
            </div>
            <div>
              <p className="text-gray-400 text-sm">P&L</p>
              <p className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(pnl)}
              </p>
              <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(pnlPercent)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
