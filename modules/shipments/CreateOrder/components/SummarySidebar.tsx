import React from 'react';
import { Button } from '../../../../common/components/Shared';

interface Props { 
  dead: number; vol: number; app: number; 
  onNext: () => void; onBack: () => void;
}

export const SummarySidebar: React.FC<Props> = ({ dead, vol, app, onNext, onBack }) => (
  <div className="space-y-6 lg:sticky lg:top-8 h-fit">
    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6 border border-white/10 ring-1 ring-slate-800">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.1em]">Sum of Items</span>
          <span className="text-sm font-bold text-slate-300">{dead.toFixed(2)} KG</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.1em]">Volumetric</span>
          <span className="text-sm font-bold text-slate-300">{vol.toFixed(2)} KG</span>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="text-center py-2">
        <p className="text-[10px] font-black uppercase text-brand-400 mb-2 tracking-[0.2em]">Billable Weight</p>
        <p className="text-6xl font-black tracking-tighter text-white">
          {app.toFixed(2)}
          <span className="text-xs ml-2 text-slate-500 font-bold uppercase">KG</span>
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <Button onClick={onNext} disabled={app <= 0} fullWidth className="h-14 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs">
        Get Best Rates →
      </Button>
      <Button variant="outline" onClick={onBack} fullWidth className="h-12 border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px]">
        Go Back
      </Button>
    </div>
  </div>
);