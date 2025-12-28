import React from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { DropdownProps } from './types';
import { SelectOptions } from './SelectOptions';

export const SelectDropdown: React.FC<DropdownProps & { isMobile: boolean }> = (p) => {
  if (!p.isOpen) return null;
  const content = (
    <div className="flex flex-col h-full min-h-0 bg-white" data-select-portal="true">
      {p.searchable && (
        <div className="p-3 border-b border-slate-100 bg-slate-50/30">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-500" />
            <input 
              autoFocus 
              placeholder="Search..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all" 
              value={p.search} 
              onChange={e => p.onSearch(e.target.value)} 
            />
          </div>
        </div>
      )}
      <div className="overflow-y-auto min-h-0 flex-1 p-2 custom-scrollbar overscroll-contain">
        <SelectOptions loading={p.loading} options={p.options} value={p.value} onSelect={p.onSelect} />
      </div>
    </div>
  );

  return createPortal(
    p.isMobile ? (
      <div className="fixed inset-0 z-[10000] flex flex-col justify-end">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={p.onClose} />
        <div className="relative bg-white w-full max-h-[80vh] min-h-0 rounded-t-3xl shadow-2xl flex flex-col animate-slide-up">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-black text-slate-900">{p.label || 'Select'}</h3>
            <button onClick={p.onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X className="w-5 h-5" /></button>
          </div>
          {content}
        </div>
      </div>
    ) : (
      <div className="fixed z-[9999] rounded-2xl border border-slate-100 bg-white shadow-2xl animate-scale-in origin-top overflow-hidden flex flex-col" style={{ top: p.position.top, left: p.position.left, width: p.position.width, maxHeight: '320px' }}>
        {content}
      </div>
    ), document.body
  );
};