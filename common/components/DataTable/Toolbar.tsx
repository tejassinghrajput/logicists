
import React, { useState, useRef } from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { Button, Input, Dropdown } from '../Shared';
import { FilterPanel } from './FilterPanel';
import { FilterDefinition, ActionConfig } from './types';

interface ToolbarProps<T> {
    title?: string;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    enableSearch?: boolean;
    searchPlaceholder?: string;
    filterConfig?: FilterDefinition<T>[];
    activeFilterCount: number;
    activeFilters: Record<string, any>;
    onFilterChange: (k: string, v: any) => void;
    onClearFilters: () => void;
    primaryAction?: ActionConfig;
    secondaryActions?: ActionConfig[];
}

export function Toolbar<T>({ 
    title, searchQuery, onSearchChange, enableSearch, searchPlaceholder, filterConfig,
    activeFilterCount, activeFilters, onFilterChange, onClearFilters, primaryAction, secondaryActions 
}: ToolbarProps<T>) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const overflowActions = secondaryActions?.slice(2) || [];

    return (
      <div className="p-5 border-b border-slate-100 bg-white flex flex-col lg:flex-row justify-between items-center gap-4 rounded-t-2xl z-20 relative">
          <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3">
             {enableSearch && (
                 <Input icon={Search} placeholder={searchPlaceholder} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="w-full sm:w-64" />
             )}
             {filterConfig && filterConfig.length > 0 && (
                 <div className="relative" ref={filterRef}>
                     <Button variant={activeFilterCount > 0 ? 'primary' : 'secondary'} icon={Filter} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        Filters {activeFilterCount > 0 && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{activeFilterCount}</span>}
                     </Button>
                     {isFilterOpen && <FilterPanel filters={filterConfig} activeFilters={activeFilters} onFilterChange={onFilterChange} onClear={() => { onClearFilters(); setIsFilterOpen(false); }} onClose={() => setIsFilterOpen(false)} />}
                 </div>
             )}
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
             {title && <h3 className="font-semibold text-slate-900 hidden xl:block mr-2">{title}</h3>}
             {secondaryActions?.slice(0, 2).map((a, i) => <Button key={i} variant={a.variant || 'secondary'} icon={a.icon} onClick={a.onClick}>{a.label}</Button>)}
             {overflowActions.length > 0 && <Dropdown trigger={<Button variant="secondary" icon={MoreHorizontal} />} items={overflowActions.map(a => ({ label: a.label, icon: a.icon, onClick: a.onClick, variant: a.variant === 'danger' ? 'danger' : 'default' }))} />}
             {primaryAction && <Button variant={primaryAction.variant || 'primary'} icon={primaryAction.icon} onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
          </div>
      </div>
    );
}
