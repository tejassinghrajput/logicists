import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  label?: string; value: string; icon?: LucideIcon;
  onChange: (val: string) => void; unit?: string;
}

export const NumberStepper: React.FC<Props> = ({ 
  label, value, onChange, icon: Icon, unit 
}) => {
  return (
    <div className="flex-1">
      {label && <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl h-[52px] shadow-sm focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all px-4">
        {Icon && <Icon className="w-5 h-5 text-slate-300 mr-3" />}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-none p-0 focus:ring-0 font-black text-lg text-slate-900 placeholder:text-slate-300"
          placeholder="0.0"
        />
        {unit && <span className="text-[10px] font-black text-slate-400 uppercase ml-2 select-none">{unit}</span>}
      </div>
    </div>
  );
};