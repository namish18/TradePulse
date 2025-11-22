'use client';

import { useCallback, useEffect, useState } from 'react';

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

interface Portfolio {
  id: string;
  totalValue: number;
  cashBalance: number;
  usedMargin: number;
  availableMargin: number;
  positions: Position[];
  updatedAt: string;
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/portfolio');

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }

        const data = await response.json();
        setPortfolio(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();

    const interval = setInterval(fetchPortfolio, 10000);
    return () => clearInterval(interval);
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portfolio');

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }

      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { portfolio, loading, error, refetch };
}
