
import React, { useState, useMemo } from 'react';
import { MenuList } from '../Shared';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import { Column, FilterDefinition, ActionConfig, RowAction } from './types';

export * from './types';

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[]; 
  filterConfig?: FilterDefinition<T>[]; 
  title?: string;
  primaryAction?: ActionConfig;
  secondaryActions?: ActionConfig[];
  rowActions?: (item: T) => RowAction<T>[]; 
}

export function DataTable<T extends Record<string, any>>(props: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [activeMenu, setActiveMenu] = useState<{ x: number, y: number, items: any[], isOpen: boolean } | null>(null);

  const filteredData = useMemo(() => {
      if (!props.data) return [];
      return props.data.filter(item => {
          if (props.enableSearch && searchQuery) {
              const query = searchQuery.toLowerCase();
              const matches = props.searchKeys 
                ? props.searchKeys.some(key => String(item[key]).toLowerCase().includes(query))
                : Object.values(item).some(val => String(val).toLowerCase().includes(query));
              if (!matches) return false;
          }
          for (const key in activeFilters) {
              if (activeFilters[key] && String(item[key]) !== String(activeFilters[key])) return false;
          }
          return true;
      });
  }, [props.data, searchQuery, activeFilters, props.searchKeys, props.enableSearch]);

  const handleOpenRowMenu = (e: React.MouseEvent, actions: RowAction<T>[], item: T) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveMenu({
          x: window.innerWidth - rect.right < 200 ? window.innerWidth - 220 : rect.left,
          y: window.innerHeight - rect.bottom < 200 ? rect.top - (actions.length * 40) - 20 : rect.bottom + 5,
          isOpen: true,
          items: actions.map(a => ({ label: a.label, icon: a.icon, variant: a.variant === 'danger' ? 'danger' : 'default', onClick: () => a.onClick(item) }))
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100/50 relative">
      <Toolbar {...props} searchQuery={searchQuery} onSearchChange={setSearchQuery} activeFilterCount={Object.keys(activeFilters).filter(k => activeFilters[k]).length} activeFilters={activeFilters} onFilterChange={(k, v) => setActiveFilters(p => ({...p, [k]: v}))} onClearFilters={() => setActiveFilters({})} />
      <Table {...props} data={filteredData} onOpenRowMenu={handleOpenRowMenu} />
      {activeMenu && (
          <div className="fixed z-[9999] w-48 bg-white rounded-xl shadow-xl border border-slate-100 ring-1 ring-slate-900/5 animate-scale-in" style={{ top: activeMenu.y, left: activeMenu.x }}>
             <MenuList items={activeMenu.items} onClose={() => setActiveMenu(null)} />
             <div className="fixed inset-0 -z-10" onClick={() => setActiveMenu(null)} />
          </div>
      )}
    </div>
  );
}
