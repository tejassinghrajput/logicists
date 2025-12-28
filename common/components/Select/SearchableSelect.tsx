import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface Option { label: string; value: string; }
interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export const SearchableSelect: React.FC<Props> = ({ label, options, value, onChange, placeholder = "Select...", loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  const selectedLabel = options.find(o => o.value === value)?.label || "";

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border bg-white/50 px-4 py-2.5 text-sm transition-all ${
          isOpen ? 'border-brand-500 ring-4 ring-brand-500/10 bg-white' : 'border-slate-200 hover:border-slate-300 hover:bg-white'
        }`}
      >
        <span className={`truncate ${selectedLabel ? "text-slate-900" : "text-slate-400"}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-100 bg-white shadow-xl animate-scale-in origin-top">
          <div className="p-2 border-b border-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {loading ? (
              <div className="p-4 text-center text-xs text-slate-400">Loading data...</div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">No results found.</div>
            ) : (
              filtered.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setIsOpen(false); setSearch(""); }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    value === opt.value ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate text-left">{opt.label}</span>
                  {value === opt.value && <Check className="h-4 w-4 flex-shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};