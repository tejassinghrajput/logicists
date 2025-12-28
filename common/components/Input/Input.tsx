import React from 'react';
import { LucideIcon, Info } from 'lucide-react';
import { Tooltip } from '../Tooltip/Tooltip';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; icon?: LucideIcon; error?: string;
  unit?: string; info?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, icon: Icon, error, unit, info, className = '', ...props 
}) => (
  <div className="w-full">
    {label && (
      <div className="flex items-center justify-between mb-1 ml-0.5">
        <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</label>
        {info && (
          <Tooltip content={info} position="top">
            <button type="button" className="p-1 -mr-1 text-slate-300 hover:text-brand-500 active:scale-90" aria-label="Info">
              <Info className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
        )}
      </div>
    )}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-300 group-focus-within:text-brand-500 transition-colors">
          <Icon className="h-4 w-4 stroke-[2.5px]" />
        </div>
      )}
      <input
        className={`block w-full rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold placeholder:text-slate-300 placeholder:font-normal focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-xs sm:text-sm py-2 sm:py-2.5 transition-all duration-200 ${Icon ? 'pl-9 sm:pl-10' : 'pl-3 sm:pl-3.5'} ${unit ? 'pr-10 sm:pr-12' : 'pr-3 sm:pr-3.5'} ${error ? 'border-rose-300' : 'hover:border-slate-300'} ${className}`}
        {...props}
      />
      {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] sm:text-[9px] font-black text-slate-400 uppercase select-none tracking-tight">{unit}</span>}
    </div>
  </div>
);