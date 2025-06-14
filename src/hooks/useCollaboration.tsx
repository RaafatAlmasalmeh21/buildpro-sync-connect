
import { useState, useEffect, useCallback } from 'react';
import { websocketService, UserPresence } from '@/services/websocketService';

export const useCollaboration = (currentUserId: string = 'user-1', currentUserName: string = 'Admin') => {
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [conflicts, setConflicts] = useState<any[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect(currentUserId, currentUserName);
    setIsConnected(true);

    // Subscribe to presence updates
    const handlePresence = (users: UserPresence[]) => {
      setActiveUsers(users.filter(user => user.userId !== currentUserId));
    };

    const handleConflict = (conflict: any) => {
      setConflicts(prev => [...prev, conflict]);
    };

    websocketService.subscribe('presence', handlePresence);
    websocketService.subscribe('conflict', handleConflict);

    return () => {
      websocketService.unsubscribe('presence', handlePresence);
      websocketService.unsubscribe('conflict', handleConflict);
      websocketService.disconnect();
      setIsConnected(false);
    };
  }, [currentUserId, currentUserName]);

  const updateLocation = useCallback((location: string) => {
    websocketService.updateUserPresence(currentUserId, currentUserName, location);
  }, [currentUserId, currentUserName]);

  const resolveConflict = useCallback((conflictId: string, resolution: 'accept' | 'reject') => {
    setConflicts(prev => prev.filter(c => c.id !== conflictId));
    console.log(`Conflict ${conflictId} resolved with: ${resolution}`);
  }, []);

  return {
    activeUsers,
    isConnected,
    conflicts,
    updateLocation,
    resolveConflict
  };
};
