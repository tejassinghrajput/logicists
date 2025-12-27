import { APP_CONFIG } from '../config/app';
import { client } from './client';
import { LoginCredentials, AuthResponse, User } from '../../modules/auth/types';

export const authService = {
  login: async (creds: LoginCredentials): Promise<User> => {
    // MOCK MODE: If no API URL is set, simulate a successful login
    if (APP_CONFIG.IS_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = { id: '1', name: 'Alex Morgan', email: creds.email, role: 'admin' };
          localStorage.setItem('logiflow_token', 'mock_jwt_token_123');
          resolve(mockUser);
        }, 1000);
      });
    }

    // REAL MODE
    const res = await client<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    });
    
    localStorage.setItem('logiflow_token', res.token);
    return res.user;
  },

  logout: () => {
    localStorage.removeItem('logiflow_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('logiflow_token');
  }
};