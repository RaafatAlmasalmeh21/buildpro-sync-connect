import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthResponse } from '@/services/authService';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  token: string | null;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  updateProfile: (data: { name: string; email: string }) => Promise<unknown>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
