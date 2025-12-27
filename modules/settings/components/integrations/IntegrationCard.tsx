
import React from 'react';
import { Button } from '../../../../common/components/Shared';
import { getIcon } from '../../../../modules/channels/utils/iconMap';

interface Props {
  name: string; desc: string; icon: string; color: string; bg: string;
  connected: boolean; onToggle: () => void;
}

export const IntegrationCard: React.FC<Props> = ({ name, desc, icon, color, bg, connected, onToggle }) => {
  const Icon = getIcon(icon);
  return (
  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-brand-200 hover:bg-slate-50/50 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg} ${color} ring-1 ring-inset ring-black/5`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">{name}</h4>
        <p className="text-xs text-slate-500 max-w-[180px] sm:max-w-xs">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
        {connected && (
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold ring-1 ring-emerald-600/20">
            Active
          </span>
        )}
        <Button variant={connected ? 'outline' : 'secondary'} size="sm" onClick={onToggle}>
            {connected ? 'Configure' : 'Connect'}
        </Button>
    </div>
  </div>
  );
};
