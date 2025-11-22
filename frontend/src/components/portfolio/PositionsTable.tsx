import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface Position {
  id: string;
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  exposure: number;
}

interface PositionsTableProps {
  positions: Position[];
  loading?: boolean;
}

export function PositionsTable({ positions, loading }: PositionsTableProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Open Positions</h3>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : positions.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">No open positions</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400">Symbol</th>
                  <th className="text-right py-3 px-4 text-gray-400">Quantity</th>
                  <th className="text-right py-3 px-4 text-gray-400">Avg Cost</th>
                  <th className="text-right py-3 px-4 text-gray-400">Current Price</th>
                  <th className="text-right py-3 px-4 text-gray-400">P&L</th>
                  <th className="text-right py-3 px-4 text-gray-400">Exposure</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => {
                  const isPositive = position.pnl >= 0;
                  return (
                    <tr key={position.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-semibold">{position.symbol}</td>
                      <td className="py-3 px-4 text-right text-white">{position.quantity.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-gray-300">{formatCurrency(position.averageCost)}</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">{formatCurrency(position.currentPrice)}</td>
                      <td className={`py-3 px-4 text-right font-semibold flex items-center justify-end gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatCurrency(position.pnl)} ({formatPercentage(position.pnlPercent)})
                      </td>
                      <td className="py-3 px-4 text-right text-gray-300">{formatCurrency(position.exposure)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
