
import React from 'react';
import { User, Lock, Bell, Key, Blocks } from 'lucide-react';

interface SettingsSidebarProps { activeTab: string; onTabChange: (tab: string) => void; }

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Blocks },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="lg:col-span-1 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
            activeTab === item.id ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
          }`}
        >
          <item.icon className={`w-4 h-4 mr-3 ${activeTab === item.id ? 'text-brand-500' : 'text-slate-400'}`} />
          {item.label}
        </button>
      ))}
    </div>
  );
};
