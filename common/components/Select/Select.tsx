import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectProps } from './types';
import { SelectDropdown } from './SelectDropdown';

export const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleOpen = () => {
    if (props.disabled || props.loading) return;
    const r = ref.current?.getBoundingClientRect();
    if (r) { setPos({ top: r.bottom + 8, left: r.left, width: r.width }); setIsOpen(true); }
  };

  const filtered = props.searchable ? props.options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : props.options;
  const selected = props.options.find(o => String(o.value) === String(props.value));

  return (
    <div className={`w-full relative ${props.className}`} ref={ref}>
      {props.label && <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">{props.label}</label>}
      <button type="button" onClick={() => isOpen ? setIsOpen(false) : handleOpen()} className={`w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${isOpen ? 'border-brand-500 ring-4 ring-brand-500/10 bg-white shadow-sm' : 'border-slate-300 bg-white hover:border-slate-400'} ${props.disabled ? 'opacity-50' : ''}`}>
        <span className={`truncate ${selected ? "text-slate-900" : "text-slate-300"}`}>{selected ? selected.label : props.placeholder || 'Select...'}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <SelectDropdown {...props} isOpen={isOpen} isMobile={isMobile} position={pos} search={search} onSearch={setSearch} onClose={() => setIsOpen(false)} onSelect={v => { props.onChange?.(v); setIsOpen(false); setSearch(""); }} options={filtered} />
    </div>
  );
};