import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const menuWidth = 192; // w-48
      const spaceRight = window.innerWidth - rect.right;
      
      // Calculate optimized position
      let x = rect.left;
      if (spaceRight < menuWidth) {
          x = rect.right - menuWidth;
      }
      
      const spaceBottom = window.innerHeight - rect.bottom;
      let y = rect.bottom + 5;
      // If close to bottom, show above
      if (spaceBottom < 250) {
           y = rect.top - (actions.length * 40) - 10;
      }

      setActiveMenu({
          x: Math.max(16, x),
          y,
          isOpen: true,
          items: actions.map(a => ({ 
              label: a.label, 
              icon: a.icon, 
              variant: a.variant === 'danger' ? 'danger' : 'default', 
              onClick: () => a.onClick(item) 
          }))
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100/50 relative">
      <Toolbar {...props} searchQuery={searchQuery} onSearchChange={setSearchQuery} activeFilterCount={Object.keys(activeFilters).filter(k => activeFilters[k]).length} activeFilters={activeFilters} onFilterChange={(k, v) => setActiveFilters(p => ({...p, [k]: v}))} onClearFilters={() => setActiveFilters({})} />
      <Table {...props} data={filteredData} onOpenRowMenu={handleOpenRowMenu} />
      
      {activeMenu && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-start justify-start" onClick={() => setActiveMenu(null)}>
             <div 
                className="fixed w-48 bg-white rounded-xl shadow-xl border border-slate-100 ring-1 ring-slate-900/5 animate-scale-in origin-top-right" 
                style={{ top: activeMenu.y, left: activeMenu.x }}
                onClick={e => e.stopPropagation()}
             >
                 <MenuList items={activeMenu.items} onClose={() => setActiveMenu(null)} />
             </div>
          </div>,
          document.body
      )}
    </div>
  );
}