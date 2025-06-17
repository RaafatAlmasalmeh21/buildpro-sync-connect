import { useState, useCallback } from 'react';
import { authService, AuthResponse } from '@/services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(() => authService.getUser());
  const [token, setToken] = useState<string | null>(() => authService.getToken());

  const login = useCallback(async (username: string, password: string) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const updateProfile = useCallback(async (data: { name: string; email: string }) => {
    const updated = await authService.updateProfile(data);
    setUser(updated);
    return updated;
  }, []);

  return { user, token, login, logout, updateProfile, isAuthenticated: !!token };
};
