'use client';

import { useEffect, useState } from 'react';
import { MarketData } from '@/types/market';

interface UseMarketDataOptions {
  symbols: string[];
  refreshInterval?: number;
}

export function useMarketData({ symbols, refreshInterval = 5000 }: UseMarketDataOptions) {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);

        // This will be replaced with Apollo Client query
        const response = await fetch(
          `/api/market?symbols=${symbols.join(',')}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }

        const marketData = await response.json();
        setData(marketData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    const interval = setInterval(fetchMarketData, refreshInterval);
    return () => clearInterval(interval);
  }, [symbols, refreshInterval]);

  return { data, loading, error };
}
