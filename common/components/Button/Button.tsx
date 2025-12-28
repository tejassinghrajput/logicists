import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip } from '../Tooltip/Tooltip';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  fullWidth?: boolean;
  tooltip?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', icon: Icon, className = '', 
  fullWidth = false, tooltip, onClick, ...props 
}) => {
  const base = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-[0.98] select-none";
  const variants = {
    primary: "bg-gradient-to-b from-brand-600 to-brand-700 text-white hover:from-brand-500 hover:to-brand-600 shadow-sm shadow-brand-500/20 border border-transparent font-bold",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm font-semibold",
    outline: "border border-slate-200 text-slate-500 bg-transparent hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 font-semibold",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 bg-transparent font-semibold",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-transparent shadow-sm font-semibold",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-transparent shadow-sm font-semibold",
  };
  const sizes = { 
    sm: "h-8 px-3.5 text-[10px] gap-2 uppercase tracking-wider", 
    md: "h-11 px-4 text-sm gap-2", 
    lg: "h-12 px-6 text-base gap-2.5" 
  };
  const iconOnly = (!children && Icon) ? (size === 'sm' ? 'w-8 h-8 px-0' : size === 'md' ? 'w-11 h-11 px-0' : 'w-12 h-12 px-0') : '';
  const btn = (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${iconOnly} ${fullWidth ? 'w-full' : ''} ${className}`} onClick={(e) => { e.stopPropagation(); onClick?.(e); }} {...props}>
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} shrink-0 stroke-[2.5px]`} />}
      {children && <span className="truncate">{children}</span>}
    </button>
  );
  return tooltip ? <Tooltip content={tooltip} position="top">{btn}</Tooltip> : btn;
};