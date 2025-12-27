
import React, { useState } from 'react';
import { useToast } from '../../common/components/Shared';
import { ActiveChannels } from './components/ActiveChannels';
import { AllChannels } from './components/AllChannels';
import { ChannelOrders } from './components/ChannelOrders';
import { CHANNEL_APPS } from '../../mockData/channelApps';
import { AppDef } from './types';

export const Channels: React.FC = () => {
  const APPS = CHANNEL_APPS as AppDef[];
  const { toast } = useToast();
  const [connected, setConnected] = useState<Record<string, boolean>>({ slack: true, shopify: true });

  const toggle = (id: string, name: string) => {
      const isNowConnected = !connected[id];
      setConnected(p => ({ ...p, [id]: isNowConnected }));
      toast[isNowConnected ? 'success' : 'info'](
          isNowConnected ? `${name} Connected` : `${name} Disconnected`, 
          { description: isNowConnected ? 'Data synchronization has started.' : 'Services have been unlinked.' }
      );
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Channels & Integrations</h1>
            <p className="text-slate-500 mt-1">Connect your sales channels and external tools.</p>
        </div>

        <ActiveChannels apps={APPS} connected={connected} onToggle={toggle} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AllChannels apps={APPS} connected={connected} onToggle={toggle} />
            <div className="space-y-8">
                <ChannelOrders />
            </div>
        </div>
    </div>
  );
};
