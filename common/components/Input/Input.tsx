
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon: Icon, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 text-slate-400 group-focus-within:text-brand-500">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        className={`block w-full rounded-xl border-slate-200 bg-white/50 shadow-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 sm:text-sm py-2.5 transition-all duration-200 ${Icon ? 'pl-10' : 'pl-4'} ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-200 hover:border-slate-300'} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-xs text-rose-500 ml-0.5 font-medium">{error}</p>}
  </div>
);
