import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, SlidersHorizontal, Plus } from 'lucide-react';
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

    const mobileMenuItems = [];
    if (filterConfig && filterConfig.length > 0) {
        mobileMenuItems.push({ label: `Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`, icon: Filter, onClick: () => setIsFilterOpen(true) });
    }
    if (primaryAction) {
        mobileMenuItems.push({ label: primaryAction.label, icon: primaryAction.icon || Plus, onClick: primaryAction.onClick, variant: 'default' as const });
    }
    if (secondaryActions) {
        secondaryActions.forEach(action => {
             mobileMenuItems.push({ label: action.label, icon: action.icon, onClick: action.onClick });
        });
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                if (window.innerWidth >= 768) setIsFilterOpen(false);
            }
        };
        if (isFilterOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterOpen]);

    return (
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col xl:flex-row justify-between items-center gap-4 relative z-20">
          <div className="flex items-center gap-3 w-full">
             {enableSearch && (
                 <div className="flex-1">
                    <Input icon={Search} placeholder={searchPlaceholder} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="w-full shadow-sm" />
                 </div>
             )}

             <div className="hidden md:flex items-center gap-3">
                 {filterConfig && filterConfig.length > 0 && (
                     <div className="relative" ref={filterRef}>
                         <Button variant={activeFilterCount > 0 ? 'primary' : 'secondary'} icon={Filter} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            Filters {activeFilterCount > 0 && <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold">{activeFilterCount}</span>}
                         </Button>
                         {isFilterOpen && (
                             <div className="absolute top-full right-0 mt-2 z-50">
                                 <FilterPanel filters={filterConfig} activeFilters={activeFilters} onFilterChange={onFilterChange} onClear={() => { onClearFilters(); setIsFilterOpen(false); }} onClose={() => setIsFilterOpen(false)} className="w-80 origin-top-right" />
                             </div>
                         )}
                     </div>
                 )}
                 {secondaryActions?.slice(0, 2).map((a, i) => <Button key={i} variant={a.variant || 'secondary'} icon={a.icon} onClick={a.onClick}>{a.label}</Button>)}
                 {overflowActions.length > 0 && <Dropdown trigger={<Button variant="secondary" icon={MoreHorizontal} />} items={overflowActions.map(a => ({ label: a.label, icon: a.icon, onClick: a.onClick, variant: a.variant === 'danger' ? 'danger' : 'default' }))} />}
                 {primaryAction && <Button variant={primaryAction.variant || 'primary'} icon={primaryAction.icon} onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
             </div>

             <div className="md:hidden flex-shrink-0">
                 <Dropdown align="right" trigger={<Button variant="secondary" icon={SlidersHorizontal} className="h-11 w-11 p-0" />} items={mobileMenuItems} />
             </div>
          </div>

          {isFilterOpen && (
             <div className="md:hidden absolute top-full left-0 right-0 z-50 px-4 mt-2">
                 <FilterPanel filters={filterConfig || []} activeFilters={activeFilters} onFilterChange={onFilterChange} onClear={() => { onClearFilters(); setIsFilterOpen(false); }} onClose={() => setIsFilterOpen(false)} className="w-full origin-top" />
             </div>
          )}
      </div>
    );
}