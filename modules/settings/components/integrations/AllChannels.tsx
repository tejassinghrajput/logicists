
import React from 'react';
import { Card } from '../../../../common/components/Shared';
import { IntegrationCard } from './IntegrationCard';
import { AppDef } from './types';

interface Props { apps: AppDef[]; connected: Record<string, boolean>; onToggle: (id: string, name: string) => void; }

export const AllChannels: React.FC<Props> = ({ apps, connected, onToggle }) => (
    <Card title="Available Channels" subtitle="Connect new sales channels and tools.">
        <div className="grid grid-cols-1 gap-4">
            {apps.map(app => (
                <IntegrationCard 
                    key={app.id} 
                    name={app.name} 
                    desc={app.desc} 
                    icon={app.icon} 
                    color={app.color} 
                    bg={app.bg}
                    connected={!!connected[app.id]} 
                    onToggle={() => onToggle(app.id, app.name)}
                />
            ))}
        </div>
    </Card>
);
