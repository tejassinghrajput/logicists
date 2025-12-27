
import React from 'react';
import { UserProfile } from './components/UserProfile';
import { CompanyProfile } from './components/CompanyProfile';
import { PayoutPreferences } from './components/PayoutPreferences';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { ApiKeySettings } from './components/ApiKeySettings';
import { IntegrationsSettings } from './components/IntegrationsSettings';

interface SettingsProps { view: string; }

export const Settings: React.FC<SettingsProps> = ({ view }) => {
  const getComponent = () => {
      switch (view) {
          case 'settings_user': return <UserProfile />;
          case 'settings_company': return <CompanyProfile />;
          case 'settings_payouts': return <PayoutPreferences />;
          case 'settings_security': return <SecuritySettings />;
          case 'settings_notifications': return <NotificationSettings />;
          case 'settings_integrations': return <IntegrationsSettings />;
          case 'settings_api': return <ApiKeySettings />;
          default: return <UserProfile />;
      }
  };

  const getTitle = () => {
      switch (view) {
          case 'settings_user': return { t: 'My Profile', s: 'Manage your personal information.' };
          case 'settings_company': return { t: 'Company Profile', s: 'Manage business identity and tax info.' };
          case 'settings_payouts': return { t: 'Payout Settings', s: 'Manage banking and withdrawal preferences.' };
          case 'settings_security': return { t: 'Security', s: 'Protect your account and sessions.' };
          case 'settings_notifications': return { t: 'Notifications', s: 'Configure alert preferences.' };
          case 'settings_integrations': return { t: 'Integrations', s: 'Connect third-party tools.' };
          case 'settings_api': return { t: 'API Keys', s: 'Manage developer access keys.' };
          default: return { t: 'Settings', s: 'Manage your account.' };
      }
  };

  const { t, s } = getTitle();

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t}</h1>
          <p className="text-slate-500 mt-1">{s}</p>
      </div>
      <div className="min-h-[500px]">
        {getComponent()}
      </div>
    </div>
  );
};
