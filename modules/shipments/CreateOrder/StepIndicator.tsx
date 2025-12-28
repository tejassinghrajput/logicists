import React from 'react';
import { Check } from 'lucide-react';

export const StepIndicator: React.FC<{ current: number }> = ({ current }) => {
  const steps = ['Addresses', 'Shipment Info', 'Carrier & Order'];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 shadow-soft flex items-center justify-around">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = current === num;
        const done = current > num;
        return (
          <div key={label} className="flex items-center gap-4 flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${
                done ? 'bg-emerald-500 border-emerald-500 text-white' : 
                active ? 'border-brand-600 text-brand-600 ring-4 ring-brand-100' : 'border-slate-200 text-slate-400'
              }`}>
                {done ? <Check className="w-5 h-5 stroke-[3px]" /> : num}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-brand-600' : 'text-slate-400'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={`h-px flex-1 mx-4 mt-[-20px] ${done ? 'bg-emerald-500' : 'bg-slate-100'}`} />}
          </div>
        );
      })}
    </div>
  );
};