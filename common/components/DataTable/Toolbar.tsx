import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, SlidersHorizontal, Plus } from 'lucide-react';
import { Button, Input, Dropdown } from '../Shared';
import { FilterPanel } from './FilterPanel';

export function Toolbar<T>({ 
    searchQuery, onSearchChange, enableSearch, searchPlaceholder, filterConfig,
    activeFilterCount, activeFilters, onFilterChange, onClearFilters, primaryAction, secondaryActions 
}: any) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const sec = secondaryActions || [];

    const mobileItems = [
      ...(filterConfig?.length ? [{ label: `Filters (${activeFilterCount})`, icon: Filter, onClick: () => setIsFilterOpen(true) }] : []),
      ...(primaryAction ? [{ label: primaryAction.label, icon: primaryAction.icon || Plus, onClick: primaryAction.onClick }] : []),
      ...sec.map((a: any) => ({ label: a.label, icon: a.icon, onClick: a.onClick }))
    ];

    useEffect(() => {
        const hide = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isPortal = target.closest('[data-select-portal]');
            if (filterRef.current && !filterRef.current.contains(target) && !isPortal) {
                setIsFilterOpen(false);
            }
        };
        if (isFilterOpen) document.addEventListener("mousedown", hide);
        return () => document.removeEventListener("mousedown", hide);
    }, [isFilterOpen]);

    return (
      <div className="p-4 border-b border-slate-200 flex flex-col xl:flex-row justify-between items-center gap-4 relative z-20 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 w-full">
             {enableSearch && <div className="w-full max-w-sm"><Input icon={Search} placeholder={searchPlaceholder} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="h-9" /></div>}
             <div className="hidden md:flex flex-1 items-center justify-end gap-2.5">
                 {filterConfig?.length > 0 && (
                     <div className="relative" ref={filterRef}>
                         <Button size="sm" variant={activeFilterCount > 0 ? 'primary' : 'secondary'} icon={Filter} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            Filters {activeFilterCount > 0 && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{activeFilterCount}</span>}
                         </Button>
                         {isFilterOpen && <div className="absolute top-full right-0 mt-2 z-50"><FilterPanel filters={filterConfig} activeFilters={activeFilters} onFilterChange={onFilterChange} onClear={() => { onClearFilters(); setIsFilterOpen(false); }} onClose={() => setIsFilterOpen(false)} className="w-80 shadow-2xl" /></div>}
                     </div>
                 )}
                 {sec.slice(0, 3).map((a: any, i: number) => <Button key={i} size="sm" variant="secondary" icon={a.icon} onClick={a.onClick}>{a.label}</Button>)}
                 {sec.length > 3 && <Dropdown trigger={<Button size="sm" variant="secondary" icon={MoreHorizontal} />} items={sec.slice(3).map((a: any) => ({ ...a, variant: 'default' }))} />}
                 {primaryAction && <Button size="sm" variant="primary" icon={primaryAction.icon || Plus} onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
             </div>
             <div className="md:hidden"><Dropdown align="right" trigger={<Button variant="secondary" icon={SlidersHorizontal} className="h-9 w-9 p-0" />} items={mobileItems} /></div>
          </div>
          {isFilterOpen && <div className="md:hidden absolute top-full left-0 right-0 z-50 px-4 mt-2"><FilterPanel filters={filterConfig} activeFilters={activeFilters} onFilterChange={onFilterChange} onClear={() => setIsFilterOpen(false)} onClose={() => setIsFilterOpen(false)} /></div>}
      </div>
    );
}