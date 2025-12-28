import React from 'react';
import { Calculator } from 'lucide-react';
import { RateResult } from './RateResult';
import { RATES } from '../../../mockData/rates';

export const ResultsView = ({ done, loading }: { done: boolean, loading: boolean }) => {
  if (loading) return (
    <div className="h-48 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 animate-pulse">
      <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Analyzing Logistics Network...</span>
    </div>
  );
  
  if (!done) return (
    <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
      <Calculator className="w-6 h-6 opacity-20 mb-2" />
      <p className="font-bold text-[11px] uppercase tracking-widest text-slate-500">Quotes will appear after calculation</p>
    </div>
  );

  return (
    <div className="space-y-4 w-full max-w-[1500px] mx-auto animate-fade-in pb-12 overflow-x-auto">
      <div className="flex items-center min-w-[1230px] px-2 mb-2">
        <H text="Courier Partner" w="w-[200px]" />
        <H text="Pickup Address" w="w-[180px]" />
        <H text="Delivery Address" w="w-[180px]" />
        <H text="Est. Delivery Date" w="w-[160px]" c />
        <H text="Zone" w="w-[100px]" c />
        <H text="Shipment" w="w-[120px]" c />
        <H text="Amount" w="w-[150px]" c />
        <H text="Details" w="w-[140px]" c />
      </div>
      <div className="flex flex-col gap-3 min-w-[1230px]">
        {RATES.map((r: any) => <RateResult key={r.id} {...r} />)}
      </div>
    </div>
  );
};

const H = ({ text, w, c }: { text: string, w: string, c?: boolean }) => (
  <span className={`${w} px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${c ? 'text-center' : ''}`}>
    {text}
  </span>
);