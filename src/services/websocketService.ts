
export interface WebSocketMessage {
  type: 'presence' | 'sync_update' | 'client_update' | 'conflict' | 'notification';
  data: any;
  userId?: string;
  timestamp: number;
}

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
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private messageHandlers: Map<string, Function[]> = new Map();
  private userPresence: Map<string, UserPresence> = new Map();

  connect(userId: string, userName: string) {
    // In a real app, this would connect to your WebSocket server
    // For demo purposes, we'll simulate with a mock connection
    console.log(`Connecting to WebSocket for user: ${userName}`);
    
    // Simulate connection
    setTimeout(() => {
      this.simulateConnection(userId, userName);
    }, 1000);
  }

  private simulateConnection(userId: string, userName: string) {
    console.log('WebSocket connected');
    this.reconnectAttempts = 0;
    
    // Simulate receiving presence updates
    this.simulatePresenceUpdates();
    
    // Add current user to presence
    this.updateUserPresence(userId, userName, window.location.pathname);
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
    };
    
    console.log('Sending WebSocket message:', fullMessage);
    // In a real app, you would send via this.ws.send(JSON.stringify(fullMessage))
  }

  updateUserPresence(userId: string, userName: string, location: string) {
    const presence: UserPresence = {
      userId,
      userName,
      location,
      lastSeen: Date.now()
    };
    
    this.userPresence.set(userId, presence);
    this.emit('presence', Array.from(this.userPresence.values()));
  }

  getActiveUsers(): UserPresence[] {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return Array.from(this.userPresence.values())
      .filter(user => user.lastSeen > fiveMinutesAgo);
  }

  private emit(eventType: string, data: any) {
    const handlers = this.messageHandlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  private simulatePresenceUpdates() {
    // Simulate other users being online
    const mockUsers = [
      { userId: 'user-2', userName: 'Sarah Wilson', location: '/projects' },
      { userId: 'user-3', userName: 'Mike Johnson', location: '/workforce' },
    ];

    mockUsers.forEach((user, index) => {
      setTimeout(() => {
        this.userPresence.set(user.userId, {
          ...user,
          lastSeen: Date.now()
        });
        this.emit('presence', Array.from(this.userPresence.values()));
      }, (index + 1) * 2000);
    });
  }
}

export const websocketService = new WebSocketService();
