
import React, { useState, useEffect } from 'react';
import { ActiveChannels } from '../components/ActiveChannels';
import { CHANNEL_APPS } from '../../../mockData/channelApps';
import { getConnectedApps, toggleConnectedApp } from '../../../common/utils/storage';
import { useToast } from '../../../common/components/Shared';
import { AppDef } from '../types';

export const ActiveView: React.FC = () => {
  const APPS = CHANNEL_APPS as AppDef[];
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => { setConnected(getConnectedApps()); }, []);

  const handleToggle = (id: string, name: string) => {
      const newState = toggleConnectedApp(id);
      setConnected(newState);
      toast.info(newState[id] ? `${name} Connected` : `${name} Disconnected`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div><h1 className="text-3xl font-bold text-slate-900">Active Channels</h1><p className="text-slate-500">Manage your currently connected sales channels.</p></div>
        <ActiveChannels apps={APPS} connected={connected} onToggle={handleToggle} />
    </div>
  );
};
