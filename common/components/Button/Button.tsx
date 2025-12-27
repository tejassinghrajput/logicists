
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
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 focus:ring-brand-500/20 border border-transparent",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 focus:ring-slate-200 shadow-sm",
    outline: "border border-slate-200 text-slate-600 bg-transparent hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 focus:ring-slate-100",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-100",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 focus:ring-rose-500/20 border border-transparent shadow-sm",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 focus:ring-emerald-500/20 border border-transparent shadow-sm",
  };

  const sizes = { sm: "h-8 px-3 text-xs gap-1.5", md: "h-10 px-4 text-sm gap-2", lg: "h-12 px-6 text-base gap-2.5" };
  const iconSizeClasses = (!children && Icon) ? (size === 'sm' ? 'w-8 h-8 px-0' : size === 'md' ? 'w-10 h-10 px-0' : 'w-12 h-12 px-0') : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); if (onClick) onClick(e); };

  const buttonElement = (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${iconSizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`} onClick={handleClick} {...props}>
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} stroke-[2.5px]`} />}
      {children}
    </button>
  );

  return tooltip ? <Tooltip content={tooltip} position="top">{buttonElement}</Tooltip> : buttonElement;
};
