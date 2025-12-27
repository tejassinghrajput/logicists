import React from 'react';
import { createPortal } from 'react-dom';
import { MenuList } from '../Shared';
import { Toolbar } from './Toolbar';
import { Table } from './Table';
import { Column, FilterDefinition, ActionConfig, RowAction } from './types';
import { useDataTable } from './useDataTable';
import { useRowMenu } from './useRowMenu';

export * from './types';

interface DataTableProps<T> {
  columns: Column<T>[]; data: T[]; isLoading?: boolean;
  onRowClick?: (item: T) => void; emptyMessage?: string;
  enableSearch?: boolean; searchPlaceholder?: string; searchKeys?: (keyof T)[]; 
  filterConfig?: FilterDefinition<T>[]; title?: string;
  primaryAction?: ActionConfig; secondaryActions?: ActionConfig[];
  rowActions?: (item: T) => RowAction<T>[]; 
}

export function DataTable<T extends Record<string, any>>(props: DataTableProps<T>) {
  const { search, setSearch, filters, setFilters, sort, handleSort, processedData } = useDataTable(props.data, props.enableSearch, props.searchKeys);
  const { menu, setMenu, open } = useRowMenu<T>();

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl relative flex flex-col">
      <Toolbar 
        {...props} searchQuery={search} onSearchChange={setSearch} 
        activeFilterCount={Object.keys(filters).filter(k => filters[k]).length} 
        activeFilters={filters} onFilterChange={(k, v) => setFilters(p => ({...p, [k]: v}))} 
        onClearFilters={() => setFilters({})} 
      />
      <Table 
        {...props} data={processedData} 
        onOpenRowMenu={open} sort={sort} onSort={handleSort} 
      />
      
      {menu && createPortal(
          <div className="fixed inset-0 z-[9999]" onClick={() => setMenu(null)}>
             <div 
                className={`fixed w-48 bg-white rounded-xl shadow-xl border border-slate-100 ring-1 ring-slate-900/5 animate-scale-in ${menu.origin}`} 
                style={{ top: menu.y, left: menu.x }} onClick={e => e.stopPropagation()}
             >
                 <MenuList items={menu.items} onClose={() => setMenu(null)} />
             </div>
          </div>,
          document.body
      )}
    </div>
  );
}