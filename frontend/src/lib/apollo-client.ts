import { ApolloClient, InMemoryCache, HttpLink, from, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL || 'http://localhost:4000/graphql',
    credentials: 'include', // Include cookies for authentication
});

// Create WebSocket link for subscriptions (client-side only)
function createWsLink() {
    if (typeof window === 'undefined') return null;

    return new GraphQLWsLink(
        createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
            connectionParams: () => {
                // Include authentication token if available
                const token = localStorage.getItem('auth_token');
                return token ? { authorization: `Bearer ${token}` } : {};
            },
            retryAttempts: 5,
            shouldRetry: () => true,
        })
    );
}

// Split link based on operation type
function createSplitLink() {
    const wsLink = createWsLink();

    if (!wsLink) {
        // Server-side: use only HTTP link
        return httpLink;
    }

    // Client-side: split between HTTP and WebSocket
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
}

// Create Apollo Client for server-side rendering
export function createApolloServerClient() {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        ssrMode: true,
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
        },
    });
}

// Create Apollo Client for browser
export function createApolloBrowserClient() {
    return new ApolloClient({
        link: from([createSplitLink()]),
        cache: new InMemoryCache({
            typePolicies: {
                MarketTick: {
                    keyFields: ['symbol'],
                },
                Position: {
                    keyFields: ['id'],
                },
                Alert: {
                    keyFields: ['id'],
                },
            },
        }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
            query: {
                fetchPolicy: 'network-only',
            },
        },
    });
}

// Get or create Apollo Client instance (singleton for browser)
let apolloClient: ApolloClient<any> | null = null;

export function getApolloClient() {
    // Server-side: always create new client
    if (typeof window === 'undefined') {
        return createApolloServerClient();
    }

    // Browser: reuse existing client
    if (!apolloClient) {
        apolloClient = createApolloBrowserClient();
    }

    return apolloClient;
}
