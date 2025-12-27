
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, className = '', title, subtitle, action, noPadding = false, ...props 
}) => (
  <div className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:border-brand-200/50 transition-all duration-300 border border-slate-100 ${className}`} {...props}>
    {(title || action) && (
      <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-start sm:items-center bg-white/50 backdrop-blur-sm rounded-t-2xl">
        <div>
           {title && <h3 className="font-semibold text-slate-900 text-lg tracking-tight">{title}</h3>}
           {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>
    )}
    <div className={noPadding ? '' : 'p-6'}>{children}</div>
  </div>
);
