
import React, { createContext, useContext, useEffect } from 'react';
import { useCollaboration } from '@/hooks/useCollaboration';
import { ConflictResolver } from './ConflictResolver';
import { UserPresence } from '@/services/websocketService';

interface CollaborationContextType {
  activeUsers: UserPresence[];
  isConnected: boolean;
  updateLocation: (location: string) => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const useCollaborationContext = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaborationContext must be used within a CollaborationProvider');
  }
  return context;
};

interface CollaborationProviderProps {
  children: React.ReactNode;
}

export const CollaborationProvider = ({ children }: CollaborationProviderProps) => {
  const {
    activeUsers,
    isConnected,
    conflicts,
    updateLocation,
    resolveConflict
  } = useCollaboration();

  // Update location when route changes
  useEffect(() => {
    updateLocation(window.location.pathname);
  }, [updateLocation]);

  return (
    <CollaborationContext.Provider value={{
      activeUsers,
      isConnected,
      updateLocation
    }}>
      {children}
      <ConflictResolver
        conflicts={conflicts}
        onResolve={resolveConflict}
      />
    </CollaborationContext.Provider>
  );
};
