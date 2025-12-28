import React, { useState } from 'react';
import { Card, Button, useToast } from '../../../common/components/Shared';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Wallet, Truck } from 'lucide-react';
import { COURIERS } from '../../../mockData/couriers';
import { ItemSummary } from './components/ItemSummary';

export const Step3RatesPlace: React.FC<any> = ({ data, onBack }) => {
  const [sel, setSel] = useState<any>(null);
  const { toast } = useToast(); const nav = useNavigate();
  const place = () => { toast.success('Order Placed Successfully!'); setTimeout(() => nav('/shipments'), 1200); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8 animate-slide-up">
        <div className="px-2"><h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Carrier Selection</h2></div>
        <div className="space-y-4">
          {COURIERS.map(c => (
            <div key={c.id} onClick={() => setSel(c)} className={`p-6 bg-white border-2 rounded-3xl cursor-pointer transition-all flex items-center justify-between group ${sel?.id === c.id ? 'border-brand-600 ring-4 ring-brand-100 shadow-lg' : 'border-slate-100 hover:border-brand-200'}`}>
              <div className="flex items-center gap-6"><img src={c.logo} className="w-20 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" /><div><h4 className="font-black text-slate-900 uppercase text-xs tracking-tight">{c.name}</h4><p className="text-[10px] text-slate-400 font-bold">Delivery by {c.eta}</p></div></div>
              <div className="flex items-center gap-6 text-right"><div><p className="text-[9px] font-black uppercase text-slate-400">Total Fare</p><p className="text-2xl font-black text-slate-900 tracking-tighter">₹ {c.price}</p></div>{sel?.id === c.id ? <CheckCircle2 className="w-7 h-7 text-brand-600" /> : <div className="w-7 h-7 rounded-full border-2 border-slate-100" />}</div>
            </div>
          ))}
        </div>
        <ItemSummary data={data} />
      </div>
      <div className="space-y-6 lg:sticky lg:top-8">
        <Card title="Wallet Balance" className="bg-slate-900 !text-white border-0 shadow-2xl overflow-hidden" noPadding>
          <div className="p-6 relative">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/10 rounded-2xl"><Wallet className="w-6 h-6 text-brand-300" /></div>
              <Button size="sm" variant="success" className="h-8 !text-[10px]">Add Credits</Button>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Available Funds</p>
            <p className="text-4xl font-black tracking-tight mt-1 text-white">₹ 14,250</p>
          </div>
          <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Projected Total</span>
            <span className="text-brand-400">₹ {sel?.price || '0'}</span>
          </div>
        </Card>
        <div className="flex flex-col gap-3">
          <Button onClick={place} disabled={!sel} fullWidth className="h-16 bg-slate-950 hover:bg-black shadow-xl text-lg font-black tracking-tight">Complete Shipment <ChevronRight className="w-5 h-5 ml-2"/></Button>
          <Button variant="outline" onClick={onBack} fullWidth className="h-12 border-slate-200">Go Back & Adjust Details</Button>
          <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-2xl border border-amber-100 mt-2">
            <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 flex-shrink-0"><Truck className="w-4 h-4" /></div>
            <p className="text-[10px] text-amber-800 font-bold leading-tight uppercase">Couriers are selected based on your aggregated dead weight of {data.items.reduce((acc: any, it: any) => acc + (parseFloat(it.weight) || 0), 0).toFixed(2)} KG.</p>
          </div>
        </div>
      </div>
    </div>
  );
};