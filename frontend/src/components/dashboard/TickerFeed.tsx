import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface Ticker {
  symbol: string;
  price: number;
  bidPrice: number;
  askPrice: number;
  volume24h: number;
  change24h: number;
}

interface TickerFeedProps {
  tickers: Ticker[];
  loading?: boolean;
}

export function TickerFeed({ tickers, loading }: TickerFeedProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Market Tickers</h3>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400">Symbol</th>
                  <th className="text-right py-3 px-4 text-gray-400">Price</th>
                  <th className="text-right py-3 px-4 text-gray-400">Bid/Ask</th>
                  <th className="text-right py-3 px-4 text-gray-400">24h Change</th>
                  <th className="text-right py-3 px-4 text-gray-400">Volume</th>
                </tr>
              </thead>
              <tbody>
                {tickers.map((ticker) => {
                  const isPositive = ticker.change24h >= 0;
                  return (
                    <tr key={ticker.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-semibold">{ticker.symbol}</td>
                      <td className="py-3 px-4 text-right text-white">{formatCurrency(ticker.price)}</td>
                      <td className="py-3 px-4 text-right text-gray-400 text-xs">
                        {formatCurrency(ticker.bidPrice)} / {formatCurrency(ticker.askPrice)}
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold flex items-center justify-end gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(ticker.change24h)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-400">{formatCurrency(ticker.volume24h)}</td>
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
