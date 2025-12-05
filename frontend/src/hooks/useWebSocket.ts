'use client';

import { useState, useEffect } from 'react';
import { getConnectionStatus, closeWebSocketConnection } from '@/lib/websocket';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export function useWebSocket() {
    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const [reconnectAttempts, setReconnectAttempts] = useState(0);

    useEffect(() => {
        // Check connection status periodically
        const interval = setInterval(() => {
            const currentStatus = getConnectionStatus();
            setStatus(currentStatus);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const disconnect = () => {
        closeWebSocketConnection();
        setStatus('disconnected');
    };

    return {
        status,
        isConnected: status === 'connected',
        isConnecting: status === 'connecting',
        reconnectAttempts,
        disconnect,
    };
}
