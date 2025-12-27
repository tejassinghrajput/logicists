import React, { useState } from 'react';
import { Pencil, Check, X, LucideIcon } from 'lucide-react';

interface Option { label: string; value: string | number; }
interface Props {
  label: string; value: string | number; options: Option[];
  onSave: (v: string | number) => void; icon?: LucideIcon;
}

export const EditableSelect: React.FC<Props> = ({ label, value, options, onSave, icon: Icon }) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  
  const save = () => { onSave(temp); setEditing(false); };
  const cancel = () => { setTemp(value); setEditing(false); };
  const display = options.find(o => o.value === value)?.label || value;

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">{label}</label>
      {editing ? (
        <div className="flex gap-2 animate-scale-in">
           <div className="relative flex-1">
              {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-600"><Icon className="h-5 w-5"/></div>}
              <select 
                value={temp} 
                onChange={e=>setTemp(e.target.value)} 
                className={`block w-full rounded-xl border border-brand-500 bg-white shadow-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-500/10 py-2.5 sm:text-sm transition-all appearance-none ${Icon?'pl-10':'pl-4'}`}
              >
                  {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-600">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
           </div>
           <button onClick={save} className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm border border-transparent transition-colors active:scale-95"><Check className="w-5 h-5 stroke-[3px]"/></button>
           <button onClick={cancel} className="p-2.5 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl shadow-sm transition-colors active:scale-95"><X className="w-5 h-5 stroke-[3px]"/></button>
        </div>
      ) : (
        <div className="relative group">
            {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-hover:text-brand-500 transition-colors"><Icon className="h-5 w-5"/></div>}
            <div className={`flex items-center w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 hover:bg-white hover:border-brand-200 hover:shadow-sm transition-all duration-200 ${Icon?'pl-10':'pl-4'}`}>
               <span className="flex-1 truncate text-sm font-medium text-slate-700 group-hover:text-slate-900">{display}</span>
               <button onClick={()=>{setTemp(value);setEditing(true)}} className="text-slate-400 hover:text-brand-600 opacity-0 group-hover:opacity-100 transition-all p-1 transform translate-x-2 group-hover:translate-x-0"><Pencil className="w-4 h-4"/></button>
            </div>
        </div>
      )}
    </div>
  );
};