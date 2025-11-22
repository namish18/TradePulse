'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketManager, WebSocketConfig } from '@/lib/websocket';

interface UseWebSocketOptions {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  autoConnect?: boolean;
}

export function useWebSocket<T>(
  options: UseWebSocketOptions
): {
  data: T | null;
  isConnected: boolean;
  error: Error | null;
  send: (type: string, payload?: any) => void;
  subscribe: (type: string, handler: (data: any) => void) => () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wsManagerRef = useRef<WebSocketManager | null>(null);

  useEffect(() => {
    const config: WebSocketConfig = {
      url: options.url,
      reconnectInterval: options.reconnectInterval,
      maxReconnectAttempts: options.maxReconnectAttempts,
    };

    wsManagerRef.current = new WebSocketManager(config);

    if (options.autoConnect !== false) {
      wsManagerRef.current
        .connect()
        .then(() => setIsConnected(true))
        .catch((err) => setError(err));
    }

    return () => {
      wsManagerRef.current?.disconnect();
    };
  }, [options.url, options.reconnectInterval, options.maxReconnectAttempts, options.autoConnect]);

  const send = useCallback((type: string, payload?: any) => {
    if (wsManagerRef.current) {
      wsManagerRef.current.send(type, payload);
    }
  }, []);

  const subscribe = useCallback(
    (type: string, handler: (data: any) => void) => {
      if (wsManagerRef.current) {
        return wsManagerRef.current.subscribe(type, (payload) => {
          setData(payload);
          handler(payload);
        });
      }
      return () => {};
    },
    []
  );

  return {
    data,
    isConnected,
    error,
    send,
    subscribe,
  };
}
