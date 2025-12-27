import React from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { CompanyProfile } from './components/CompanyProfile';
import { PayoutPreferences } from './components/PayoutPreferences';
import { SecuritySettings } from './components/SecuritySettings';
import { NotificationSettings } from './components/NotificationSettings';
import { ApiKeySettings } from './components/ApiKeySettings';
import { IntegrationsSettings } from './components/IntegrationsSettings';

export const Settings: React.FC = () => {
  const { tab } = useParams<{ tab: string }>();
  
  const getComponent = () => {
      switch (tab) {
          case 'profile': return <UserProfile />;
          case 'company': return <CompanyProfile />;
          case 'payouts': return <PayoutPreferences />;
          case 'security': return <SecuritySettings />;
          case 'notifications': return <NotificationSettings />;
          case 'integrations': return <IntegrationsSettings />;
          case 'api': return <ApiKeySettings />;
          default: return <UserProfile />;
      }
  };

  const getTitle = () => {
      switch (tab) {
          case 'profile': return { t: 'My Profile', s: 'Manage your personal information.' };
          case 'company': return { t: 'Company Profile', s: 'Manage business identity and tax info.' };
          case 'payouts': return { t: 'Payout Settings', s: 'Manage banking and withdrawal preferences.' };
          case 'security': return { t: 'Security', s: 'Protect your account and sessions.' };
          case 'notifications': return { t: 'Notifications', s: 'Configure alert preferences.' };
          case 'integrations': return { t: 'Integrations', s: 'Connect third-party tools.' };
          case 'api': return { t: 'API Keys', s: 'Manage developer access keys.' };
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