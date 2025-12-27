import React, { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { SidePanel } from './components/SidePanel';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { AuthMode } from './types';

interface AuthProps { onLogin: () => void; }

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <AuthLayout
      sidePanel={<SidePanel mode={mode} />}
      form={
        mode === 'login' ? (
          <LoginForm onLogin={onLogin} onForgot={() => setMode('forgot_password')} onRegister={() => setMode('register')} />
        ) : mode === 'register' ? (
          <RegisterForm onLogin={onLogin} onSignIn={() => setMode('login')} />
        ) : (
          <ResetPasswordForm onBack={() => setMode('login')} />
        )
      }
    />
  );
};