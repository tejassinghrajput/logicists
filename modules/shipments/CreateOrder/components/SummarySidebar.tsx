import React from 'react';
import { Button } from '../../../../common/components/Shared';

interface Props { 
  dead: number; vol: number; app: number; 
  onNext: () => void; onBack: () => void;
}

export const SummarySidebar: React.FC<Props> = ({ dead, vol, app, onNext, onBack }) => (
  <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-8 h-fit">
    <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl space-y-4 sm:space-y-6 border border-white/10 ring-1 ring-slate-800">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-wider">Sum of Items</span>
          <span className="text-xs sm:text-sm font-bold text-slate-300">{dead.toFixed(2)} KG</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-wider">Volumetric</span>
          <span className="text-xs sm:text-sm font-bold text-slate-300">{vol.toFixed(2)} KG</span>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="text-center py-1 sm:py-2">
        <p className="text-[9px] sm:text-[10px] font-black uppercase text-brand-400 mb-1 sm:mb-2 tracking-widest">Billable Weight</p>
        <p className="text-4xl sm:text-6xl font-black tracking-tighter text-white">
          {app.toFixed(2)}
          <span className="text-[10px] sm:text-xs ml-1 sm:ml-2 text-slate-500 font-bold">KG</span>
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2 sm:gap-3 px-1 sm:px-0">
      <Button onClick={onNext} disabled={app <= 0} fullWidth className="h-12 sm:h-14 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs">
        Get Best Rates →
      </Button>
      <Button variant="outline" onClick={onBack} fullWidth className="h-10 sm:h-12 border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
        Go Back
      </Button>
    </div>
  </div>
);