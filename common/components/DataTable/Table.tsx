import React from 'react';
import { Button } from '../Shared';
import { Column, RowAction } from './types';
import { Search, MoreHorizontal } from 'lucide-react';

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => RowAction<T>[];
  onOpenRowMenu: (e: React.MouseEvent, actions: RowAction<T>[], item: T) => void;
}

export function Table<T>({ columns, data, isLoading, emptyMessage, onRowClick, rowActions, onOpenRowMenu }: TableProps<T>) {
  return (
    <div className="w-full">
      {/* Table View - Visible on all screens with horizontal scroll */}
      <div className="block w-full overflow-x-auto relative z-0 no-scrollbar">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.headerClassName || ''}`}>
                  {col.header}
                </th>
              ))}
              {rowActions && <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-16 text-center text-slate-400"><div className="animate-pulse font-medium">Loading data...</div></td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-20 text-center"><div className="flex flex-col items-center"><Search className="w-10 h-10 text-slate-300 mb-3"/><p className="text-slate-900 font-semibold text-lg">{emptyMessage}</p></div></td></tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr key={rowIdx} className={`group hover:bg-slate-50/60 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(item)}>
                  {columns.map((col, colIdx) => {
                    const isWhitespaceOverridden = col.className?.includes('whitespace-');
                    const whitespaceClass = isWhitespaceOverridden ? '' : 'whitespace-nowrap';
                    return (
                      <td key={colIdx} className={`px-6 py-5 ${whitespaceClass} ${col.className || ''}`}>
                        {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                      </td>
                    );
                  })}
                  {rowActions && (
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                             {/* Responsive Actions: Hide direct buttons on small screens, show menu */}
                             <div className="hidden md:flex gap-1.5">
                                 {rowActions(item).slice(0, 2).map((a, i) => (
                                     <Button key={i} variant={a.variant || 'ghost'} size="sm" icon={a.icon} onClick={(e) => { e.stopPropagation(); a.onClick(item); }} tooltip={a.label} />
                                 ))}
                             </div>
                             {/* Menu Button: Always visible if there are actions, handles all actions on mobile */}
                             {(rowActions(item).length > 2 || true) && (
                                <div className="md:hidden">
                                     <Button variant="ghost" size="sm" icon={MoreHorizontal} onClick={(e) => onOpenRowMenu(e, rowActions(item), item)} />
                                </div>
                             )}
                             {/* Desktop overflow menu */}
                             {rowActions(item).length > 2 && (
                                <div className="hidden md:block">
                                     <Button variant="ghost" size="sm" icon={MoreHorizontal} onClick={(e) => onOpenRowMenu(e, rowActions(item).slice(2), item)} />
                                </div>
                             )}
                          </div>
                      </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}