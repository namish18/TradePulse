'use client';

import { useEffect, useState } from 'use';
import { useSubscription } from '@apollo/client';
import type { MarketTick } from '@/types/market';

// This would be imported from generated types after codegen
// import { MarketDataUpdatedDocument } from '@/types/graphql';

export function useMarketData(symbols: string[]) {
    const [data, setData] = useState<MarketTick[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Note: This is using a placeholder query name
    // After running codegen, import the actual subscription document
    const { data: subscriptionData, loading: subLoading, error: subError } = useSubscription(
        // MARKET_DATA_UPDATED_SUBSCRIPTION,
        {} as any, // Placeholder until codegen runs
        {
            variables: { symbols },
            skip: symbols.length === 0,
        }
    );

    useEffect(() => {
        if (subscriptionData?.marketDataUpdated) {
            setData(subscriptionData.marketDataUpdated);
            setLoading(false);
        }
    }, [subscriptionData]);

    useEffect(() => {
        if (subError) {
            setError(subError);
            setLoading(false);
        }
    }, [subError]);

    return {
        data,
        loading: subLoading || loading,
        error,
    };
}
