
import React, { useState, useEffect } from 'react';
import { AllChannels } from '../components/AllChannels';
import { CHANNEL_APPS } from '../../../mockData/channelApps';
import { getConnectedApps, toggleConnectedApp } from '../../../common/utils/storage';
import { useToast } from '../../../common/components/Shared';
import { AppDef } from '../types';

export const AllView: React.FC = () => {
  const APPS = CHANNEL_APPS as AppDef[];
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => { setConnected(getConnectedApps()); }, []);

  const handleToggle = (id: string, name: string) => {
      const newState = toggleConnectedApp(id);
      setConnected(newState);
      if(newState[id]) toast.success(`${name} Connected`);
      else toast.info(`${name} Disconnected`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div><h1 className="text-3xl font-bold text-slate-900">Integration Marketplace</h1><p className="text-slate-500">Explore and connect new sales channels.</p></div>
        <AllChannels apps={APPS} connected={connected} onToggle={handleToggle} />
    </div>
  );
};
