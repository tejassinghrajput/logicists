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
    <div className="overflow-x-auto relative z-0">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.headerClassName || ''}`}>
                {col.header}
              </th>
            ))}
            {rowActions && <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-50">
          {isLoading ? (
            <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-12 text-center text-slate-400"><div className="animate-pulse">Loading data...</div></td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-16 text-center"><div className="flex flex-col items-center"><Search className="w-8 h-8 text-slate-300 mb-2"/><p className="text-slate-900 font-medium">{emptyMessage}</p></div></td></tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr key={rowIdx} className={`group hover:bg-slate-50/80 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(item)}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                    {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                  </td>
                ))}
                {rowActions && (
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1" onClick={e => e.stopPropagation()}>
                           {rowActions(item).slice(0, 2).map((a, i) => <Button key={i} variant={a.variant || 'ghost'} size="sm" icon={a.icon} onClick={(e) => { e.stopPropagation(); a.onClick(item); }} tooltip={a.label} />)}
                           {rowActions(item).length > 2 && <Button variant="ghost" size="sm" icon={MoreHorizontal} onClick={(e) => onOpenRowMenu(e, rowActions(item).slice(2), item)} />}
                        </div>
                    </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}