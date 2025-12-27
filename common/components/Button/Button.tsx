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
  children, variant = 'primary', size = 'md', icon: Icon, className = '', fullWidth = false, tooltip, onClick, ...props 
}) => {
  const base = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-b from-brand-600 to-brand-700 text-white hover:from-brand-500 hover:to-brand-600 shadow-lg shadow-brand-500/30 border border-transparent hover:shadow-brand-500/40",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm",
    outline: "border border-slate-200 text-slate-600 bg-transparent hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 focus:ring-slate-100",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-100 bg-transparent",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 focus:ring-rose-500/20 border border-transparent shadow-sm",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 focus:ring-emerald-500/20 border border-transparent shadow-sm",
  };

  // Adjusted sizing and specific icon-only classes for square aspect ratio
  const sizes = { sm: "h-9 px-3 text-xs gap-1.5", md: "h-11 px-4 text-sm gap-2", lg: "h-12 px-6 text-base gap-2.5" };
  const iconOnlyClasses = (!children && Icon) ? (size === 'sm' ? 'w-9 h-9 px-0' : size === 'md' ? 'w-11 h-11 px-0' : 'w-12 h-12 px-0') : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); if (onClick) onClick(e); };

  const buttonElement = (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${iconOnlyClasses} ${fullWidth ? 'w-full' : ''} ${className}`} onClick={handleClick} {...props}>
      {Icon && <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5'} stroke-[2px]`} />}
      {children}
    </button>
  );

  return tooltip ? <Tooltip content={tooltip} position="top">{buttonElement}</Tooltip> : buttonElement;
};