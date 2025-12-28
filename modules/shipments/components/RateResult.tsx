import React, { useState } from 'react';
import { MapPin, Truck } from 'lucide-react';
import { RateResultModal } from './RateResultModal';

const Col = ({ children, w }: any) => (
  <div className={`${w} px-4 py-5 flex flex-col justify-center border-r border-slate-100 last:border-0`}>
    {children}
  </div>
);

const Loc = ({ icon: I, color: c, label: l, pin: p, loc: t }: any) => (
  <div className="flex items-start gap-2 text-[11px]">
    <I className={`w-3.5 h-3.5 mt-0.5 ${c}`} />
    <div>
      <p className="text-slate-400 font-bold uppercase">{l}</p>
      <p className={`${c.replace('text-', 'text-')} font-black text-xs`}>{p}</p>
      <p className="text-slate-900 font-bold truncate">{t}</p>
    </div>
  </div>
);

export const RateResult: React.FC<any> = (r) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all items-stretch min-h-[110px]">
        <Col w="w-[200px] flex-shrink-0">
          <span className="text-sm font-black text-slate-900 italic tracking-tighter">{r.carrier}</span>
          <span className="text-[10px] text-slate-400 font-medium">delivering happiness</span>
        </Col>
        <Col w="w-[180px]"><Loc icon={MapPin} color="text-brand-500" label="Pickup" pin={r.pickup.pin} loc={r.pickup.loc} /></Col>
        <Col w="w-[180px]"><Loc icon={MapPin} color="text-sky-500" label="Delivery" pin={r.delivery.pin} loc={r.delivery.loc} /></Col>
        <Col w="w-[160px] text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Est. Delivery Date</p>
          <p className="text-sm font-black text-slate-800 tracking-tight">{r.estDate}</p>
        </Col>
        <Col w="w-[100px] text-center"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Zone</p><p className="text-sm font-black text-slate-900">{r.zone}</p></Col>
        <Col w="w-[120px] text-center"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Weight</p><p className="text-sm font-black text-slate-900">{r.weight}</p><Truck className="w-4 h-4 text-brand-400 mx-auto" /></Col>
        <Col w="w-[150px] text-center bg-slate-50/30"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total</p><p className="text-xl font-black text-slate-900 tracking-tighter">₹ {r.price}</p></Col>
        <div className="w-[140px] flex items-center justify-center p-4">
          <button onClick={() => setShow(true)} className="w-full bg-[#0f172a] hover:bg-slate-800 text-white py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all">Show Details</button>
        </div>
      </div>
      <RateResultModal isOpen={show} onClose={() => setShow(false)} data={r} />
    </>
  );
};