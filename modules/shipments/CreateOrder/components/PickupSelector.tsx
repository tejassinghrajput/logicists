import React, { useState } from 'react';
import { ChevronDown, MapPin, CheckCircle2, Plus } from 'lucide-react';
import { ADDRESSES } from '../../../../mockData/pickupAddresses';

export const PickupSelector: React.FC<any> = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm transition-all">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-brand-50 rounded-xl text-brand-600"><MapPin className="w-5 h-5"/></div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Collection point</p>
            <p className="font-bold text-slate-900">{selected?.nickname || 'Choose Pickup Location'}</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open?'rotate-180':''}`} />
      </button>
      {open && <div className="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 animate-slide-up">
        {ADDRESSES.map(a => (
          <div key={a.id} onClick={() => onSelect(a)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative bg-white group ${selected?.id === a.id ? 'border-brand-600 ring-4 ring-brand-100' : 'border-slate-100 hover:border-brand-200'}`}>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">{a.nickname}</h4>
            <p className="text-[11px] text-slate-500 leading-tight mt-1">{a.address}</p>
            {selected?.id === a.id && <CheckCircle2 className="absolute top-4 right-4 w-4 h-4 text-brand-600" />}
          </div>
        ))}
        <button className="p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-3 hover:border-brand-300 hover:bg-brand-50/50 transition-all text-slate-400 hover:text-brand-600">
          <Plus className="w-4 h-4" /><span className="text-xs font-bold uppercase tracking-widest">Add New Warehouse</span>
        </button>
      </div>}
    </div>
  );
};