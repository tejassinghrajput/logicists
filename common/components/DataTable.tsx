
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, X, LucideIcon, MoreHorizontal } from 'lucide-react';
import { Button, Input, Select, Dropdown, MenuList, DropdownItem } from './Shared';

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface FilterDefinition<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'select';
    options?: { label: string; value: string | number }[]; 
}

export interface ActionConfig {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

export interface RowAction<T> {
    label: string;
    icon?: LucideIcon;
    onClick: (item: T) => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

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

// Fixed Position Menu Interface
interface PositionedMenu {
    x: number;
    y: number;
    items: DropdownItem[];
    isOpen: boolean;
}

export function DataTable<T extends Record<string, any>>({ 
  columns, 
  data, 
  isLoading, 
  onRowClick, 
  emptyMessage = "No data found.",
  enableSearch = true,
  searchPlaceholder = "Search...",
  searchKeys,
  filterConfig,
  title,
  primaryAction,
  secondaryActions,
  rowActions
}: DataTableProps<T>) {
  
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  
  // Floating Menu State
  const [activeMenu, setActiveMenu] = useState<PositionedMenu | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Global Click Listener for Menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterPopoverOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
         setActiveMenu(null);
      }
    }
    // Handle scroll to close floating menus as they might detach
    function handleScroll() {
       if (activeMenu) setActiveMenu(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [filterRef, activeMenu]);


  // --- Filtering Logic ---
  const filteredData = useMemo(() => {
      if (!data) return [];
      
      return data.filter(item => {
          if (enableSearch && searchQuery) {
              const query = searchQuery.toLowerCase();
              const matchesSearch = searchKeys 
                ? searchKeys.some(key => String(item[key]).toLowerCase().includes(query))
                : Object.values(item).some(val => String(val).toLowerCase().includes(query));
              if (!matchesSearch) return false;
          }

          if (filterConfig && Object.keys(activeFilters).length > 0) {
              for (const key in activeFilters) {
                  const filterValue = activeFilters[key];
                  if (filterValue && filterValue !== '') {
                      if (String(item[key]) !== String(filterValue)) return false;
                  }
              }
          }
          return true;
      });
  }, [data, searchQuery, activeFilters, searchKeys, enableSearch, filterConfig]);

  // --- Toolbar Actions Logic ---
  const renderToolbarActions = () => {
      const visibleSecondary = secondaryActions?.slice(0, 2) || [];
      const overflowSecondary = secondaryActions?.slice(2) || [];

      return (
          <>
            {visibleSecondary.map((action, idx) => (
                <Button 
                    key={idx}
                    variant={action.variant || 'secondary'} 
                    icon={action.icon}
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            ))}
            {overflowSecondary.length > 0 && (
                <Dropdown 
                    trigger={<Button variant="secondary" icon={MoreHorizontal} />}
                    items={overflowSecondary.map(action => ({
                        label: action.label,
                        icon: action.icon,
                        onClick: action.onClick,
                        variant: action.variant === 'danger' ? 'danger' : 'default'
                    }))}
                />
            )}
            {primaryAction && (
                <Button 
                   variant={primaryAction.variant || 'primary'} 
                   icon={primaryAction.icon}
                   onClick={primaryAction.onClick}
                >
                   {primaryAction.label}
                </Button>
            )}
          </>
      );
  };

  // --- Row Actions Handlers ---
  const handleOpenRowMenu = (e: React.MouseEvent, actions: RowAction<T>[], item: T) => {
      e.stopPropagation();
      e.preventDefault();
      
      const rect = e.currentTarget.getBoundingClientRect();
      const MENU_WIDTH = 200;
      
      // Basic collision detection
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceRight = window.innerWidth - rect.right;
      
      let x = rect.left + (rect.width / 2) - MENU_WIDTH + 20; // Align right-ish
      if (spaceRight < MENU_WIDTH) x = window.innerWidth - MENU_WIDTH - 20;
      
      let y = rect.bottom + 5;
      // If close to bottom, flip up.
      if (spaceBelow < 200) {
          y = rect.top - 5 - (actions.length * 40) - 20; // Approx height
      }

      setActiveMenu({
          x,
          y,
          isOpen: true,
          items: actions.map(action => ({
            label: action.label,
            icon: action.icon,
            variant: action.variant === 'danger' ? 'danger' : 'default',
            onClick: () => action.onClick(item)
          }))
      });
  };

  // --- Row Actions Cell ---
  const renderRowActionsCell = (item: T) => {
      const actions = rowActions ? rowActions(item) : [];
      if (actions.length === 0) return null;

      const visibleActions = actions.slice(0, 2);
      const overflowActions = actions.slice(2);

      return (
          <div className="flex justify-end items-center gap-1" onClick={(e) => e.stopPropagation()}>
              {visibleActions.map((action, idx) => (
                  <Button 
                      key={idx}
                      variant={action.variant || 'ghost'}
                      size="sm"
                      icon={action.icon}
                      onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item);
                      }}
                      tooltip={action.label}
                  />
              ))}

              {overflowActions.length > 0 && (
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={MoreHorizontal} 
                    onClick={(e) => handleOpenRowMenu(e, overflowActions, item)}
                 />
              )}
          </div>
      );
  };

  // --- Column Logic ---
  const effectiveColumns = useMemo(() => {
      if (!rowActions) return columns;
      return [
          ...columns,
          {
              header: 'Actions',
              headerClassName: 'text-right',
              className: 'text-right',
              cell: renderRowActionsCell
          } as Column<T>
      ];
  }, [columns, rowActions]);

  // --- Handlers ---
  const handleFilterChange = (key: string, value: any) => {
      setActiveFilters(prev => ({
          ...prev,
          [key]: value
      }));
  };

  const clearFilters = () => {
      setActiveFilters({});
      setIsFilterPopoverOpen(false);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(k => activeFilters[k]).length;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100/50 overflow-visible relative">
      
      {/* --- Toolbar --- */}
      <div className="p-5 border-b border-slate-100 bg-white flex flex-col lg:flex-row justify-between items-center gap-4 relative z-20 rounded-t-2xl">
          
          <div className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3">
             {/* Search */}
             {enableSearch && (
                 <Input 
                    placeholder={searchPlaceholder}
                    icon={Search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 lg:w-72"
                 />
             )}
             
             {/* Filter Button & Popover */}
             {filterConfig && filterConfig.length > 0 && (
                 <div className="relative" ref={filterRef}>
                     <Button 
                        variant={activeFilterCount > 0 ? 'primary' : 'secondary'} 
                        size="md" 
                        icon={Filter}
                        onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
                        className="relative w-full sm:w-auto"
                     >
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                {activeFilterCount}
                            </span>
                        )}
                     </Button>

                     {/* Filter Popover */}
                     {isFilterPopoverOpen && (
                         <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 animate-scale-in origin-top-left z-50">
                             <div className="flex justify-between items-center mb-4">
                                 <h4 className="font-bold text-slate-900">Filter Data</h4>
                                 <button onClick={clearFilters} className="text-xs text-brand-600 hover:text-brand-700 font-medium">Reset All</button>
                             </div>
                             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                 {filterConfig.map((config) => (
                                     <div key={String(config.key)}>
                                         {config.type === 'select' ? (
                                             <Select 
                                               label={config.label}
                                               options={config.options || []}
                                               value={activeFilters[String(config.key)] || ''}
                                               onChange={(e) => handleFilterChange(String(config.key), e.target.value)}
                                             />
                                         ) : (
                                             <Input 
                                               label={config.label}
                                               value={activeFilters[String(config.key)] || ''}
                                               onChange={(e) => handleFilterChange(String(config.key), e.target.value)}
                                             />
                                         )}
                                     </div>
                                 ))}
                             </div>
                             <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                                 <Button size="sm" fullWidth onClick={() => setIsFilterPopoverOpen(false)}>Apply Filters</Button>
                             </div>
                         </div>
                     )}
                 </div>
             )}
          </div>

          {/* Title & Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
             {title && <h3 className="font-semibold text-slate-900 hidden xl:block mr-2">{title}</h3>}
             {renderToolbarActions()}
          </div>
      </div>

      {/* --- Active Filter Tags --- */}
      {activeFilterCount > 0 && filterConfig && (
          <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-2">
              {Object.keys(activeFilters).map(key => {
                  const value = activeFilters[key];
                  if (!value) return null;
                  const config = filterConfig.find(f => f.key === key as keyof T);
                  if (!config) return null;
                  
                  let displayValue = value;
                  if (config.type === 'select' && config.options) {
                      const opt = config.options.find(o => String(o.value) === String(value));
                      if (opt) displayValue = opt.label;
                  }

                  return (
                      <span key={key} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                          <span className="text-brand-400 mr-1.5 font-normal">{config.label}:</span> {displayValue}
                          <button 
                            onClick={() => handleFilterChange(key, '')}
                            className="ml-1.5 hover:text-brand-900"
                          >
                              <X className="w-3 h-3" />
                          </button>
                      </span>
                  );
              })}
          </div>
      )}

      {/* --- Table --- */}
      <div className="overflow-x-auto relative z-0">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              {effectiveColumns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={effectiveColumns.length} className="px-6 py-12 text-center text-slate-400">
                  <div className="animate-pulse flex justify-center">Loading data...</div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
               <tr>
                <td colSpan={effectiveColumns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                          <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-slate-900 font-medium">{emptyMessage}</p>
                      {(searchQuery || activeFilterCount > 0) && (
                          <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
                      )}
                  </div>
                </td>
              </tr>
            ) : (
                filteredData.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`group hover:bg-slate-50/80 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {effectiveColumns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                      {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      {!isLoading && filteredData.length > 0 && (
         <div className="bg-white px-6 py-4 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
            <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">1-{filteredData.length}</span> of <span className="font-medium text-slate-900">{filteredData.length}</span> results</span>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
         </div>
      )}

      {/* --- Fixed Floating Menu (Portal-like) --- */}
      {activeMenu && activeMenu.isOpen && (
          <div 
            ref={menuRef}
            className="fixed z-[9999] w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 ring-1 ring-slate-900/5 animate-scale-in"
            style={{ 
                top: `${activeMenu.y}px`, 
                left: `${activeMenu.x}px`,
                transformOrigin: 'top right'
            }}
          >
              <MenuList items={activeMenu.items} onClose={() => setActiveMenu(null)} />
          </div>
      )}
    </div>
  );
}
