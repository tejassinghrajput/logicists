import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
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