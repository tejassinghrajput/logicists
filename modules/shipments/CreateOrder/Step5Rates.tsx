import React, { useState } from 'react';
import { Card, Button } from '../../../common/components/Shared';
import { Truck, Wallet, CheckCircle2 } from 'lucide-react';
import { COURIERS } from '../../../mockData/couriers';

export const Step5Rates: React.FC<any> = ({ data, onNext, onBack }) => {
  const [sel, setSel] = useState(data.courier);
  const balance = 14250.00;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sticky top-0 z-10 py-4 bg-slate-50/90 backdrop-blur-md -mx-4 px-4 mb-4 border-b border-slate-200">
         <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Available Couriers</h2>
         <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
            <div className="flex flex-col"><span className="text-[9px] font-black uppercase text-slate-400">Wallet Balance</span><span className="text-sm font-bold text-slate-900">₹ {balance.toLocaleString()}</span></div>
            <Button size="sm" variant="success" className="h-8 !text-[9px]">Recharge</Button>
         </div>
      </div>
      <div className="space-y-4">
        {COURIERS.map(c => (
          <div key={c.id} onClick={() => setSel(c)} className={`p-6 bg-white border-2 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
            sel?.id === c.id ? 'border-brand-600 ring-4 ring-brand-100' : 'border-slate-100 hover:border-brand-200'
          }`}>
             <div className="flex items-center gap-6">
                <div className="w-16 h-10 bg-slate-50 rounded-lg flex items-center justify-center p-2"><img src={c.logo} className="max-h-full object-contain" /></div>
                <div><h4 className="font-black text-slate-900 tracking-tighter uppercase text-sm">{c.name}</h4><p className="text-xs text-slate-400 font-bold">Delivery by {c.eta}</p></div>
             </div>
             <div className="flex items-center gap-8">
                <div className="text-right"><p className="text-[10px] font-black uppercase text-slate-400 mb-0.5">{data.order.payment}</p><p className="text-xl font-black text-slate-900 tracking-tighter">₹ {c.price}</p></div>
                {sel?.id === c.id ? <CheckCircle2 className="w-6 h-6 text-brand-600" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200" />}
             </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={() => onNext({ courier: sel })} disabled={!sel} className="px-12">Next → Place Order</Button>
      </div>
    </div>
  );
};