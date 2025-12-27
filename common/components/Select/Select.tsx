
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectOption { label: string; value: string | number; }
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  icon?: LucideIcon;
}

export const Select: React.FC<SelectProps> = ({ label, options, icon: Icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 text-slate-400 group-focus-within:text-brand-500">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <select
        className={`block w-full rounded-xl border-slate-200 bg-white/50 shadow-sm text-slate-900 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 sm:text-sm py-2.5 transition-all duration-200 appearance-none ${Icon ? 'pl-10' : 'pl-4'} pr-10 cursor-pointer hover:border-slate-300 ${className}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
      </div>
    </div>
  </div>
);
