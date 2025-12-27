
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface DropdownItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const MenuList: React.FC<{ items: DropdownItem[]; onClose: () => void }> = ({ items, onClose }) => (
  <div className="py-1">
    {items.map((item, idx) => (
      <button
        key={idx}
        onClick={(e) => { e.stopPropagation(); item.onClick(); onClose(); }}
        className={`w-full text-left px-4 py-2.5 text-sm flex items-center transition-colors duration-150 ${
          item.variant === 'danger' ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {item.icon && <item.icon className={`w-4 h-4 mr-3 flex-shrink-0 ${item.variant === 'danger' ? 'text-rose-500' : 'text-slate-400'}`} />}
        <span className="font-medium">{item.label}</span>
      </button>
    ))}
  </div>
);
