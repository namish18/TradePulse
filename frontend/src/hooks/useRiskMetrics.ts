'use client';

import { useCallback, useEffect, useState } from 'react';
import { RiskMetrics } from '@/types/risk';

export function useRiskMetrics() {
  const [metrics, setMetrics] = useState<RiskMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRiskMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/risk/metrics');

        if (!response.ok) {
          throw new Error('Failed to fetch risk metrics');
        }

        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchRiskMetrics();

    const interval = setInterval(fetchRiskMetrics, 15000);
    return () => clearInterval(interval);
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/risk/metrics');

      if (!response.ok) {
        throw new Error('Failed to fetch risk metrics');
      }

      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { metrics, loading, error, refetch };
}
