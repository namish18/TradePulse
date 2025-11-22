import { getAuthToken } from './auth';

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectInterval: number;
  private maxReconnectAttempts: number;
  private heartbeatInterval: number;
  private reconnectAttempts: number = 0;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private connectionPromise: Promise<void> | null = null;

  constructor(config: WebSocketConfig) {
    this.url = config.url;
    this.reconnectInterval = config.reconnectInterval || 5000;
    this.maxReconnectAttempts = config.maxReconnectAttempts || 10;
    this.heartbeatInterval = config.heartbeatInterval || 30000;
  }

  public connect(): Promise<void> {
    if (this.connectionPromise) return this.connectionPromise;

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        const token = getAuthToken();
        const wsUrl = new URL(this.url);
        
        if (token) {
          wsUrl.searchParams.append('token', token);
        }

        this.ws = new WebSocket(wsUrl.toString());

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket closed');
          this.stopHeartbeat();
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data);
      const { type, payload } = message;

      const handler = this.messageHandlers.get(type);
      if (handler) {
        handler(payload);
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.pow(2, Math.min(this.reconnectAttempts - 1, 3));
      console.log(`Attempting to reconnect in ${delay}ms...`);

      setTimeout(() => {
        this.connectionPromise = null;
        this.connect().catch(console.error);
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'PING' }));
      }
    }, this.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  public subscribe(type: string, handler: (data: any) => void): () => void {
    this.messageHandlers.set(type, handler);

    return () => {
      this.messageHandlers.delete(type);
    };
  }

  public send(type: string, payload?: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public disconnect(): void {
    this.stopHeartbeat();
    this.messageHandlers.clear();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.connectionPromise = null;
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
