'use client';

import { useQuery } from '@apollo/client';
import type { RiskMetric, GreeksData } from '@/types/risk';

// Placeholders until codegen runs
// import { GetRiskMetricsDocument, GetGreeksDocument } from '@/types/graphql';

export function useRiskMetrics(portfolioId?: string) {
    const { data: metricsData, loading: metricsLoading, error: metricsError } = useQuery(
        {} as any, // Placeholder: GET_RISK_METRICS_QUERY
        {
            variables: { portfolioId },
            skip: !portfolioId,
            pollInterval: 30000, // Poll every 30 seconds
        }
    );

    const { data: greeksData, loading: greeksLoading } = useQuery(
        {} as any, // Placeholder: GET_GREEKS_QUERY
        {
            variables: { portfolioId },
            skip: !portfolioId,
            pollInterval: 30000,
        }
    );

    const metrics: RiskMetric | null = metricsData?.riskMetrics || null;
    const greeks: GreeksData | null = greeksData?.greeks || null;

    return {
        metrics,
        greeks,
        loading: metricsLoading || greeksLoading,
        error: metricsError,
    };
}
