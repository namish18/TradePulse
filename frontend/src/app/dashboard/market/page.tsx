'use client';

import { useMarketData } from '@/hooks';
import { TickerFeed, MarketDataWidget } from '@/components/dashboard';
import { LoadingSpinner } from '@/components/common';

const SYMBOLS = ['BTC/USD', 'ETH/USD', 'SPY', 'QQQ', 'IWM'];

export default function MarketPage() {
  const { data: marketData, loading } = useMarketData({ symbols: SYMBOLS });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Market Data</h1>
        <p className="text-gray-400 mt-2">Real-time market information and price feeds</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner message="Loading market data..." />
        </div>
      ) : (
        <>
          {/* Top Market Data Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketData.slice(0, 5).map((item) => (
              <MarketDataWidget
                key={item.symbol}
                symbol={item.symbol}
                price={item.price}
                change={item.change}
                changePercent={item.changePercent}
                high={item.high}
                low={item.low}
                volume={item.volume}
              />
            ))}
          </div>

          {/* Ticker Feed */}
          <TickerFeed tickers={marketData.map((m) => ({
            symbol: m.symbol,
            price: m.price,
            bidPrice: m.price * 0.999,
            askPrice: m.price * 1.001,
            volume24h: m.volume,
            change24h: m.changePercent,
          }))} />
        </>
      )}
    </div>
  );
}
