import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Column } from './types';

interface HeaderProps<T> {
    col: Column<T>;
    sort: { key: keyof T; dir: 'asc' | 'desc' } | null;
    onSort: (key: keyof T) => void;
    // Added optional key to resolve TS error in Table.tsx during column mapping
    key?: React.Key;
}

export function TableHeader<T>({ col, sort, onSort }: HeaderProps<T>) {
    const isSorted = sort?.key === col.accessorKey;
    const Icon = isSorted ? (sort?.dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
    
    return (
        <th 
            className={`px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none' : ''} ${col.headerClassName || ''}`}
            onClick={() => col.sortable && col.accessorKey && onSort(col.accessorKey)}
        >
            <div className="flex items-center gap-2 group">
                {col.header}
                {col.sortable && (
                    <Icon className={`w-3 h-3 transition-colors ${isSorted ? 'text-brand-600' : 'text-slate-300 group-hover:text-slate-400'}`} />
                )}
            </div>
        </th>
    );
}