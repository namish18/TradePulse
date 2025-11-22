export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: string;
}

export interface OrderBook {
  symbol: string;
  bids: [number, number][];
  asks: [number, number][];
  timestamp: string;
}

export interface Trade {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
  side: 'buy' | 'sell';
}

export interface Ticker {
  symbol: string;
  price: number;
  bidPrice: number;
  askPrice: number;
  volume24h: number;
  change24h: number;
}
