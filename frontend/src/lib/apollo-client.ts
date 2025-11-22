import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL || 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

let wsLink: GraphQLWsLink | null = null;

if (typeof window !== 'undefined') {
  wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
      shouldRetry: () => true,
      keepAlive: 30_000,
      retryAttempts: 5,
      connectionParams: () => {
        const token = localStorage.getItem('auth_token');
        return token
          ? {
              authorization: `Bearer ${token}`,
            }
          : {};
      },
      on: {
        connected: () => console.log('WebSocket connected'),
        error: (error) => console.error('WebSocket error:', error),
        closed: () => console.log('WebSocket closed'),
      },
    })
  );
}

const splitLink =
  typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          marketData: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          portfolio: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          riskMetrics: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
