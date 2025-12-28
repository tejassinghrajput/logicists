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
    <div className="flex items-center justify-between mb-2 ml-1">
      {label && <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">{label}</label>}
      {info && (
        <Tooltip content={info} position="top">
          <button type="button" className="text-slate-400 hover:text-brand-500 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
      )}
    </div>
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
          <Icon className="h-4.5 w-4.5" />
        </div>
      )}
      <input
        className={`block w-full rounded-2xl border-slate-300 bg-white text-slate-900 font-bold placeholder:text-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 sm:text-sm py-3 transition-all duration-200 shadow-sm ${Icon ? 'pl-11' : 'pl-4'} ${unit ? 'pr-12' : 'pr-4'} ${error ? 'border-rose-300 focus:border-rose-500' : 'hover:border-slate-400'} ${className}`}
        {...props}
      />
      {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase select-none">{unit}</span>}
    </div>
  </div>
);