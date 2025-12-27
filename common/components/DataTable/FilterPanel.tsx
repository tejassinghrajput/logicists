import React from 'react';
import { Button, Input, Select } from '../Shared';
import { FilterDefinition } from './types';
import { X } from 'lucide-react';

interface FilterPanelProps<T> {
  filters: FilterDefinition<T>[];
  activeFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onClear: () => void;
  onClose: () => void;
  className?: string;
}

export function FilterPanel<T>({ filters, activeFilters, onFilterChange, onClear, onClose, className = '' }: FilterPanelProps<T>) {
  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 animate-scale-in relative z-50 ${className}`}>
       <div className="flex justify-between items-center mb-4">
           <h4 className="font-bold text-slate-900">Filter Data</h4>
           <div className="flex items-center gap-1">
               <button onClick={onClear} className="text-xs text-brand-600 hover:text-brand-700 font-medium px-2 py-1 hover:bg-brand-50 rounded transition-colors">Reset</button>
               <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" aria-label="Close filters">
                    <X className="w-4 h-4" />
               </button>
           </div>
       </div>
       <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
           {filters.map((config) => (
               <div key={String(config.key)}>
                   {config.type === 'select' ? (
                       <Select 
                         label={config.label}
                         options={config.options || []}
                         value={activeFilters[String(config.key)] || ''}
                         onChange={(e) => onFilterChange(String(config.key), e.target.value)}
                       />
                   ) : (
                       <Input 
                         label={config.label}
                         value={activeFilters[String(config.key)] || ''}
                         onChange={(e) => onFilterChange(String(config.key), e.target.value)}
                       />
                   )}
               </div>
           ))}
       </div>
       <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
           <Button size="sm" fullWidth onClick={onClose}>Apply Filters</Button>
       </div>
    </div>
  );
}