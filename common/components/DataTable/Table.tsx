import React from 'react';
import { Button } from '../Shared';
import { Column, RowAction } from './types';
import { TableHeader } from './TableHeader';
import { Search, MoreHorizontal } from 'lucide-react';

interface TableProps<T> {
  columns: Column<T>[]; data: T[]; isLoading?: boolean; emptyMessage?: string;
  onRowClick?: (item: T) => void; rowActions?: (item: T) => RowAction<T>[];
  onOpenRowMenu: (e: React.MouseEvent, actions: RowAction<T>[], item: T) => void;
  sort: { key: keyof T; dir: 'asc' | 'desc' } | null; onSort: (key: keyof T) => void;
}

export function Table<T>({ columns, data, isLoading, emptyMessage, onRowClick, rowActions, onOpenRowMenu, sort, onSort }: TableProps<T>) {
  return (
    <div className="w-full">
      <div className="block w-full overflow-x-auto relative z-0">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/50">
            <tr>
              {columns.map((col, idx) => <TableHeader key={idx} col={col} sort={sort} onSort={onSort} />)}
              {rowActions && <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-16 text-center text-slate-400"><div className="animate-pulse font-medium">Loading data...</div></td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-20 text-center"><div className="flex flex-col items-center"><Search className="w-10 h-10 text-slate-300 mb-3"/><p className="text-slate-900 font-semibold text-lg">{emptyMessage}</p></div></td></tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr key={rowIdx} className={`hover:bg-slate-50/80 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(item)}>
                  {columns.map((col, colIdx) => (
                      <td key={colIdx} className={`px-6 py-4 text-sm ${col.className?.includes('whitespace-')?'':'whitespace-nowrap'} ${col.className||''}`}>{col.cell?col.cell(item):(col.accessorKey?String(item[col.accessorKey]):null)}</td>
                  ))}
                  {rowActions && (
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                             <div className="hidden md:flex gap-1.5">{rowActions(item).slice(0, 2).map((a, i) => <Button key={i} variant={a.variant||'ghost'} size="sm" icon={a.icon} onClick={(e) => {e.stopPropagation();a.onClick(item)}} tooltip={a.label} />)}</div>
                             {(rowActions(item).length > 2 || true) && <div className="md:hidden"><Button variant="ghost" size="sm" icon={MoreHorizontal} onClick={(e) => onOpenRowMenu(e, rowActions(item), item)} /></div>}
                             {rowActions(item).length > 2 && <div className="hidden md:block"><Button variant="ghost" size="sm" icon={MoreHorizontal} onClick={(e) => onOpenRowMenu(e, rowActions(item).slice(2), item)} /></div>}
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