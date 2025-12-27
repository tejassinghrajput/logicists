export type AuthMode = 'login' | 'register' | 'forgot_password';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}