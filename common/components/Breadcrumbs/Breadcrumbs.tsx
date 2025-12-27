import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem { label: string; onClick?: () => void; active?: boolean; }
interface Props { items: BreadcrumbItem[]; onHome: () => void; className?: string; }

export const Breadcrumbs: React.FC<Props> = ({ items, onHome, className = '' }) => (
  <nav className={`flex items-center space-x-1 text-sm text-slate-500 animate-fade-in ${className}`}>
    <button onClick={onHome} className="p-1.5 hover:bg-white/60 hover:text-brand-600 rounded-lg transition-colors" aria-label="Home">
      <Home className="w-4 h-4" />
    </button>
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button 
          onClick={item.onClick} 
          disabled={item.active || !item.onClick}
          className={`px-2.5 py-1 rounded-lg transition-all text-xs font-medium ${
              item.active 
              ? 'bg-white shadow-sm text-slate-900 ring-1 ring-slate-200/60 cursor-default' 
              : item.onClick 
                ? 'hover:bg-white/50 hover:text-brand-600 cursor-pointer' 
                : 'cursor-default text-slate-500'
          }`}
        >
          {item.label}
        </button>
      </React.Fragment>
    ))}
  </nav>
);