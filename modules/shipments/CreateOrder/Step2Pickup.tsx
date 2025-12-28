import React, { useState } from 'react';
import { Card, Input, Button } from '../../../common/components/Shared';
import { Search, MapPin, Plus, CheckCircle2 } from 'lucide-react';
import { ADDRESSES } from '../../../mockData/pickupAddresses';

export const Step2Pickup: React.FC<any> = ({ selected, onNext, onBack }) => {
  const [sel, setSel] = useState(selected);
  const [query, setQuery] = useState('');
  
  const filtered = ADDRESSES.filter(a => a.nickname.toLowerCase().includes(query.toLowerCase()) || a.phone.includes(query));

  return (
    <div className="space-y-6">
      <Card title="Where is the order being sent from?">
        <Input icon={Search} placeholder="Search by nickname or phone number..." value={query} onChange={e => setQuery(e.target.value)} className="mb-8 h-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(a => (
            <div key={a.id} onClick={() => setSel(a)} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative group ${
              sel?.id === a.id ? 'border-brand-600 bg-brand-50 shadow-brand' : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50'
            }`}>
              {a.primary && <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Primary</span>}
              <div className="flex items-start gap-3">
                 <div className={`p-2.5 rounded-xl ${sel?.id === a.id ? 'bg-white text-brand-600' : 'bg-slate-100 text-slate-400'}`}><MapPin className="w-5 h-5" /></div>
                 <div>
                    <h4 className="font-bold text-slate-900 mb-1">{a.nickname}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed pr-6">{a.address}</p>
                    <p className="text-xs font-bold text-slate-400 mt-2">{a.phone}</p>
                 </div>
              </div>
              {sel?.id === a.id && <CheckCircle2 className="absolute bottom-4 right-4 w-5 h-5 text-brand-600" />}
            </div>
          ))}
          <button className="p-5 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-brand-300 hover:bg-brand-50/20 transition-all text-slate-400 hover:text-brand-600 group">
             <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
             <span className="text-xs font-bold uppercase tracking-widest">Add New Pickup Address</span>
          </button>
        </div>
      </Card>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={() => onNext({ pickup: sel })} disabled={!sel} className="px-12">Next → Order Details</Button>
      </div>
    </div>
  );
};