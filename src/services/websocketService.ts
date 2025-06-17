
export interface PresenceMessage {
  type: 'presence';
  data: UserPresence[];
  userId?: string;
  timestamp: number;
}

export interface SyncUpdateMessage {
  type: 'sync_update';
  data: Record<string, unknown>;
  userId?: string;
  timestamp: number;
}

export interface ClientUpdateMessage {
  type: 'client_update';
  data: Record<string, unknown>;
  userId?: string;
  timestamp: number;
}

export interface ConflictMessage {
  type: 'conflict';
  data: { id: string; userName: string; [key: string]: unknown };
  userId?: string;
  timestamp: number;
}

export interface NotificationMessage {
  type: 'notification';
  data: { message: string };
  userId?: string;
  timestamp: number;
}

export type WebSocketMessage =
  | PresenceMessage
  | SyncUpdateMessage
  | ClientUpdateMessage
  | ConflictMessage
  | NotificationMessage;

export interface UserPresence {
  userId: string;
  userName: string;
  avatar?: string;
  location: string; // current page/section
  lastSeen: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectInterval = 1000;
  private messageHandlers: Map<string, Function[]> = new Map();
  private userPresence: Map<string, UserPresence> = new Map();

  connect(userId: string, userName: string) {
    const url = import.meta.env.VITE_WS_URL;
    if (!url) {
      console.error('VITE_WS_URL is not defined');
      return;
    }

    if (this.ws) {
      this.disconnect();
    }

    console.log(`Connecting to WebSocket: ${url}`);
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.updateUserPresence(userId, userName, window.location.pathname);
    };

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        if (message.type === 'presence') {
          const presenceList = (message as PresenceMessage).data;
          presenceList.forEach((p) => this.userPresence.set(p.userId, p));
        }
        this.emit(message.type, message.data);
      } catch (err) {
        console.error('Failed to parse WebSocket message', err);
      }
    };

    this.ws.onerror = (err) => {
      console.error('WebSocket error', err);
    };

    this.ws.onclose = () => {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnect attempts reached');
        return;
      }
      const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts);
      this.reconnectAttempts += 1;
      setTimeout(() => this.connect(userId, userName), delay);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(eventType: string, handler: Function) {
    if (!this.messageHandlers.has(eventType)) {
      this.messageHandlers.set(eventType, []);
    }
    this.messageHandlers.get(eventType)!.push(handler);
  }

  unsubscribe(eventType: string, handler: Function) {
    const handlers = this.messageHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  sendMessage(message: Omit<WebSocketMessage, 'timestamp'>) {
    const fullMessage: WebSocketMessage = {
      ...message,
      timestamp: Date.now()
    } as WebSocketMessage;

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(fullMessage));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  updateUserPresence(userId: string, userName: string, location: string) {
    const presence: UserPresence = {
      userId,
      userName,
      location,
      lastSeen: Date.now()
    };

    this.userPresence.set(userId, presence);

    const message: PresenceMessage = {
      type: 'presence',
      data: Array.from(this.userPresence.values()),
      timestamp: Date.now()
    };

    this.sendMessage(message);
    this.emit('presence', Array.from(this.userPresence.values()));
  }

  getActiveUsers(): UserPresence[] {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return Array.from(this.userPresence.values())
      .filter(user => user.lastSeen > fiveMinutesAgo);
  }

  private emit(eventType: string, data: unknown) {
    const handlers = this.messageHandlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

}

export const websocketService = new WebSocketService();
