import { createClient } from 'graphql-ws';

let wsClient: ReturnType<typeof createClient> | null = null;

export function getWebSocketClient() {
    if (typeof window === 'undefined') {
        return null;
    }

    if (!wsClient) {
        wsClient = createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:4000/graphql',
            connectionParams: () => {
                const token = localStorage.getItem('auth_token');
                return token ? { authorization: `Bearer ${token}` } : {};
            },
            retryAttempts: 5,
            shouldRetry: () => true,
            on: {
                connected: () => {
                    console.log('WebSocket connected');
                },
                closed: (event) => {
                    console.log('WebSocket closed', event);
                },
                error: (error) => {
                    console.error('WebSocket error', error);
                },
            },
        });
    }

    return wsClient;
}

export function closeWebSocketConnection() {
    if (wsClient) {
        wsClient.dispose();
        wsClient = null;
    }
}

export function getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' {
    if (!wsClient) return 'disconnected';

    // Note: graphql-ws client doesn't expose status directly
    // You may need to track this manually based on events
    return 'connected';
}
