import React from 'react';
import { Check } from 'lucide-react';

export const StepIndicator: React.FC<{ current: number }> = ({ current }) => {
  const steps = ['Addresses', 'Shipment', 'Carrier'];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-soft flex items-center justify-between sm:justify-around gap-2">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = current === num;
        const done = current > num;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4 flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all border-2 ${
                done ? 'bg-emerald-500 border-emerald-500 text-white' : 
                active ? 'border-brand-600 text-brand-600 ring-4 ring-brand-100' : 'border-slate-200 text-slate-400'
              }`}>
                {done ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3px]" /> : num}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center ${active ? 'text-brand-600' : 'hidden sm:block text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 sm:mx-4 mt-[-18px] sm:mt-[-20px] rounded-full ${done ? 'bg-emerald-500' : 'bg-slate-100'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};