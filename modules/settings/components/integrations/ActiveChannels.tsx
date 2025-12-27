
import React from 'react';
import { Card } from '../../../../common/components/Shared';
import { IntegrationCard } from './IntegrationCard';
import { AppDef } from './types';

interface Props { apps: AppDef[]; connected: Record<string, boolean>; onToggle: (id: string, name: string) => void; }

export const ActiveChannels: React.FC<Props> = ({ apps, connected, onToggle }) => {
  const activeApps = apps.filter(a => connected[a.id]);

  if (activeApps.length === 0) return null;

  return (
    <Card title="Active Channels" subtitle="Currently connected services." className="border-brand-100 bg-brand-50/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeApps.map(app => (
                <IntegrationCard 
                    key={app.id} 
                    name={app.name} 
                    desc={app.desc} 
                    icon={app.icon} 
                    color={app.color} 
                    bg={app.bg}
                    connected={true} 
                    onToggle={() => onToggle(app.id, app.name)}
                />
            ))}
        </div>
    </Card>
  );
};
