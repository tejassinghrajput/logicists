
import React from 'react';
import { Button, Input, Select } from '../Shared';
import { FilterDefinition } from './types';

interface FilterPanelProps<T> {
  filters: FilterDefinition<T>[];
  activeFilters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onClear: () => void;
  onClose: () => void;
}

export function FilterPanel<T>({ filters, activeFilters, onFilterChange, onClear, onClose }: FilterPanelProps<T>) {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 animate-scale-in origin-top-left z-50">
       <div className="flex justify-between items-center mb-4">
           <h4 className="font-bold text-slate-900">Filter Data</h4>
           <button onClick={onClear} className="text-xs text-brand-600 hover:text-brand-700 font-medium">Reset All</button>
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
