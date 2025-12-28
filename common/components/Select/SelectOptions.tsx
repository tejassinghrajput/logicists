import React from 'react';
import { Check } from 'lucide-react';
import { SelectOption } from './types';

interface Props {
  loading?: boolean; options: SelectOption[]; value?: string | number;
  onSelect: (v: string | number) => void;
}

export const SelectOptions: React.FC<Props> = ({ loading, options, value, onSelect }) => {
  if (loading) return <div className="p-4 text-center text-xs text-slate-400">Loading...</div>;
  if (options.length === 0) return <div className="p-4 text-center text-xs text-slate-400">No options.</div>;

  return (
    <div className="flex flex-col gap-0.5">
      {options.map(opt => (
        <button
          key={opt.value} type="button" onClick={() => onSelect(opt.value)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
            String(value) === String(opt.value) ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="truncate text-left">{opt.label}</span>
          {String(value) === String(opt.value) && <Check className="h-4 w-4 shrink-0" />}
        </button>
      ))}
    </div>
  );
};