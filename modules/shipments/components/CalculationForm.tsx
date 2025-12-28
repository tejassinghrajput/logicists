import React, { useState } from 'react';
import { Button, Select, Input } from '../../../common/components/Shared';
import { useCountries } from '../../../common/hooks/useCountries';
import { DimensionInputs } from './DimensionInputs';

export const CalculationForm = ({ onCalculate, loading }: any) => {
  const { countries, loading: ld } = useCountries();
  const [f, setF] = useState({ origin: 'US', dest: 'GB', weight: '', l: '', b: '', h: '', unit: 'cm' });
  const up = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  
  const allOpts = countries.map(c => ({ label: c.label, value: c.iso2 }));
  const destOpts = allOpts.filter(o => o.value !== f.origin);
  const originOpts = allOpts.filter(o => o.value !== f.dest);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="bg-white rounded-[3.5rem] border border-slate-300 shadow-2xl overflow-hidden ring-1 ring-slate-100/50">
        <div className="p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Select label="Origin Country" options={originOpts} value={f.origin} onChange={v => up('origin', v)} loading={ld} searchable />
            <Select label="Destination Country" options={destOpts} value={f.dest} onChange={v => up('dest', v)} loading={ld} searchable />
          </div>
          <div className="h-px bg-slate-200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-end">
            <Input label="Shipment Weight" info="Gross weight in kg." value={f.weight} onChange={e => up('weight', e.target.value)} unit="kg" type="number" placeholder="0.0" />
            <DimensionInputs values={f} onChange={up} />
          </div>
        </div>
        <div className="bg-slate-50 p-10 border-t border-slate-200 flex justify-center">
          <Button onClick={onCalculate} disabled={loading} className="px-16 !rounded-xl h-12 text-base font-bold tracking-tight shadow-brand">
            {loading ? 'Processing...' : 'Get Rates'}
          </Button>
        </div>
      </div>
    </div>
  );
};