import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatCurrency } from '@/utils/formatters';

interface OrderBookLevel {
  price: number;
  quantity: number;
}

interface OrderBookProps {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

export function OrderBook({ symbol, bids, asks }: OrderBookProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{symbol} Order Book</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Asks */}
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-3">Asks</h4>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {asks.map((ask, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-300">
                  <span>{formatCurrency(ask.price)}</span>
                  <span className="text-gray-400">{ask.quantity.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bids */}
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-3">Bids</h4>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {bids.map((bid, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-300">
                  <span>{formatCurrency(bid.price)}</span>
                  <span className="text-gray-400">{bid.quantity.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
