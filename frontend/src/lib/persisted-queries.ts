interface PersistedQuery {
  id: string;
  query: string;
}

interface PersistedQueryMap {
  [key: string]: PersistedQuery;
}

// Placeholder for persisted queries mapping
// In production, this would be generated from your GraphQL operations
export const persistedQueries: PersistedQueryMap = {
  // Market Data Queries
  GetMarketData: {
    id: 'market_data_001',
    query: `
      query GetMarketData($symbols: [String!]!) {
        marketData(symbols: $symbols) {
          symbol
          price
          change
          changePercent
          high
          low
          volume
          timestamp
        }
      }
    `,
  },

  // Portfolio Queries
  GetPortfolio: {
    id: 'portfolio_001',
    query: `
      query GetPortfolio {
        portfolio {
          id
          totalValue
          cashBalance
          positions {
            id
            symbol
            quantity
            averageCost
            currentPrice
            pnl
            pnlPercent
          }
        }
      }
    `,
  },

  // Risk Metrics Queries
  GetRiskMetrics: {
    id: 'risk_metrics_001',
    query: `
      query GetRiskMetrics {
        riskMetrics {
          var95
          var99
          expectedShortfall
          beta
          sharpeRatio
          maxDrawdown
          volatility
        }
      }
    `,
  },

  // Market Data Subscription
  MarketDataSubscription: {
    id: 'market_data_sub_001',
    query: `
      subscription OnMarketData($symbols: [String!]!) {
        marketDataUpdated(symbols: $symbols) {
          symbol
          price
          change
          changePercent
          timestamp
        }
      }
    `,
  },

  // Portfolio Updates Subscription
  PortfolioSubscription: {
    id: 'portfolio_sub_001',
    query: `
      subscription OnPortfolioUpdated {
        portfolioUpdated {
          id
          totalValue
          positions {
            id
            symbol
            quantity
            currentPrice
            pnl
          }
        }
      }
    `,
  },

  // Risk Alerts Subscription
  RiskAlertsSubscription: {
    id: 'risk_alerts_sub_001',
    query: `
      subscription OnRiskAlert {
        riskAlert {
          id
          severity
          message
          timestamp
        }
      }
    `,
  },
};

export function getPersistedQuery(key: string): PersistedQuery | undefined {
  return persistedQueries[key];
}

export function getPersistedQueryId(key: string): string | undefined {
  return persistedQueries[key]?.id;
}

// Apollo Client extension for persistent queries
export const persistedQueriesExtension = {
  request(operation: any) {
    const persistedQuery = getPersistedQuery(operation.operationName);
    if (persistedQuery) {
      operation.extensions = operation.extensions || {};
      operation.extensions.persistedQuery = {
        version: 1,
        sha256Hash: persistedQuery.id,
      };
    }
  },
};
