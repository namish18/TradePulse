'use client';

import { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import type { Position, PortfolioSummary } from '@/types/risk';

// Placeholders until codegen runs
// import { GetPositionsDocument, PositionsUpdatedDocument } from '@/types/graphql';

export function usePortfolio(portfolioId?: string) {
    const [positions, setPositions] = useState<Position[]>([]);
    const [summary, setSummary] = useState<PortfolioSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Query initial positions
    const { data: queryData, loading: queryLoading, error: queryError } = useQuery(
        {} as any, // Placeholder: GET_POSITIONS_QUERY
        {
            variables: { portfolioId },
            skip: !portfolioId,
        }
    );

    // Subscribe to position updates
    const { data: subscriptionData } = useSubscription(
        {} as any, // Placeholder: POSITIONS_UPDATED_SUBSCRIPTION
        {
            variables: { portfolioId },
            skip: !portfolioId,
        }
    );

    useEffect(() => {
        if (queryData?.positions) {
            setPositions(queryData.positions);
            setLoading(false);
        }
    }, [queryData]);

    useEffect(() => {
        if (subscriptionData?.positionsUpdated) {
            setPositions(subscriptionData.positionsUpdated);
        }
    }, [subscriptionData]);

    useEffect(() => {
        if (queryError) {
            setError(queryError);
            setLoading(false);
        }
    }, [queryError]);

    // Calculate summary from positions
    useEffect(() => {
        if (positions.length > 0) {
            const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0);
            const dailyPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
            const dailyPnLPercent = totalValue > 0 ? (dailyPnL / totalValue) * 100 : 0;

            setSummary({
                totalValue,
                dailyPnL,
                dailyPnLPercent,
                openPositions: positions.length,
                winRate: 0, // Would come from trade history
                totalTrades: 0, // Would come from trade history
            });
        }
    }, [positions]);

    return {
        positions,
        summary,
        loading: queryLoading || loading,
        error,
    };
}
