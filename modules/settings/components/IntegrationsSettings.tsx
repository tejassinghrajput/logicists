
import React, { useState } from 'react';
import { useToast } from '../../../common/components/Shared';
import { Blocks } from 'lucide-react';
import { ActiveChannels } from './integrations/ActiveChannels';
import { AllChannels } from './integrations/AllChannels';
import { ChannelOrders } from './integrations/ChannelOrders';
import { CHANNEL_APPS } from '../../../mockData/channelApps';
import { AppDef } from './integrations/types';

export const IntegrationsSettings: React.FC = () => {
  const { toast } = useToast();
  const APPS = CHANNEL_APPS as AppDef[];
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
        <div className="flex items-center p-4 bg-brand-50 border border-brand-100 rounded-xl">
            <div className="p-2 bg-brand-100 text-brand-600 rounded-lg mr-4">
                <Blocks className="w-6 h-6" />
            </div>
            <div><h3 className="text-sm font-bold text-brand-900">Integration Hub</h3><p className="text-xs text-brand-700">Extend LogiFlow capabilities with external tools.</p></div>
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
