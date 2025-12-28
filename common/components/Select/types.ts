import { LucideIcon } from 'lucide-react';

export interface SelectOption { label: string; value: string | number; }

export interface SelectProps {
  label?: string; value?: string | number; defaultValue?: string | number;
  onChange?: (value: any) => void; options: SelectOption[];
  icon?: LucideIcon; placeholder?: string; searchable?: boolean;
  loading?: boolean; disabled?: boolean; className?: string;
}

export interface DropdownProps extends SelectProps {
  isOpen: boolean; onClose: () => void; search: string;
  onSearch: (v: string) => void; onSelect: (v: string | number) => void;
  position: { top: number; left: number; width: number };
}