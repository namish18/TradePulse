// Market data types

export interface MarketTick {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    high24h: number;
    low24h: number;
    timestamp: number;
}

export interface OrderBookEntry {
    price: number;
    quantity: number;
    total: number;
}

export interface OrderBook {
    symbol: string;
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    timestamp: number;
}

export interface Trade {
    id: string;
    symbol: string;
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
    timestamp: number;
}

export interface MarketIndex {
    name: string;
    value: number;
    change: number;
    changePercent: number;
}

export interface TopMover {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    volume: number;
}

export interface ChartDataPoint {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
