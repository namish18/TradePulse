import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { registerApolloClient } from '@apollo/client-integration-nextjs';



// Server-side HTTP Link for SSR/RSC
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL || 'http://localhost:4000/graphql',
  fetchOptions: { cache: 'no-store' },
  credentials: 'include',
});

// Client-side WebSocket Link for subscriptions
const createWsLink = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
      connectionParams: async () => {
        // Get auth token from cookie or localStorage
        const token = localStorage.getItem('auth_token');
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    })
  );
};

// Split link: HTTP for queries/mutations, WebSocket for subscriptions
const createSplitLink = () => {
  const wsLink = createWsLink();
  
  if (!wsLink) {
    return httpLink;
  }

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );
};

// In-memory cache configuration
const createCache = () => {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          marketData: {
            merge(existing = [], incoming: any[]) {
              return incoming;
            },
          },
          portfolio: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      MarketTick: {
        keyFields: ['symbol', 'timestamp'],
      },
      Position: {
        keyFields: ['id'],
      },
      RiskMetric: {
        keyFields: ['portfolioId', 'timestamp'],
      },
    },
  });
};

// Server-side Apollo Client for RSC
export const { getClient: getServerClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: createCache(),
    link: httpLink,
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
    },
  });
});

// Client-side Apollo Client
export const createClientSideClient = (): ApolloClient => {
  return new ApolloClient({
    cache: createCache(),
    link: createSplitLink(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
      mutate: {
        errorPolicy: 'all',
      },
    }
  });
};