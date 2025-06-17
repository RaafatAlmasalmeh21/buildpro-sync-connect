export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'auth_user';

  async login(username: string, password: string): Promise<AuthResponse> {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      throw new Error('Failed to login');
    }
    const data: AuthResponse = await res.json();
    localStorage.setItem(this.tokenKey, data.token);
    localStorage.setItem(this.userKey, JSON.stringify(data.user));
    return data;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser() {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as AuthResponse['user']) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async updateProfile(user: { name: string; email: string }): Promise<AuthResponse['user']> {
    const token = this.getToken();
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      throw new Error('Failed to update profile');
    }
    const updated = (await res.json()) as AuthResponse['user'];
    localStorage.setItem(this.userKey, JSON.stringify(updated));
    return updated;
  }
}

export const authService = new AuthService();
