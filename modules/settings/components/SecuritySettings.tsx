
import React from 'react';
import { PasswordSection } from './security/PasswordSection';
import { TwoFactorSection } from './security/TwoFactorSection';
import { SessionsSection } from './security/SessionsSection';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
        <PasswordSection />
        <TwoFactorSection />
        <SessionsSection />
    </div>
  );
};
