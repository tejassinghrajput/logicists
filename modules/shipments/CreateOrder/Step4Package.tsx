import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../../common/components/Shared';
import { SAVED_PACKAGES } from '../../../mockData/savedPackages';

export const Step4Package: React.FC<any> = ({ data, onNext, onBack }) => {
  const [f, setF] = useState(data);
  const [saved, setSaved] = useState('');

  const vol = (parseFloat(f.l) || 0) * (parseFloat(f.b) || 0) * (parseFloat(f.h) || 0) / 5000;
  const applicable = Math.max(parseFloat(f.weight) || 0, vol);

  const applySaved = (id: string) => {
    const pkg = SAVED_PACKAGES.find(p => p.id === id);
    if(pkg) { setF({...f, l: pkg.l, b: pkg.b, h: pkg.h}); setSaved(id); }
  };

  return (
    <div className="space-y-6">
      <Card title="Package Size & Weight" subtitle="Add size and weight to get accurate pricing.">
        <div className="grid grid-cols-5 gap-6 mb-8">
           <Input label="Dead Weight" unit="KG" className="col-span-2" value={f.weight} onChange={e => setF({...f, weight: e.target.value})} info="Min 0.5kg" />
           <div className="col-span-3 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 text-[10px] font-black uppercase text-slate-400">Dimensions in CM</div>
           <Input label="Length" value={f.l} onChange={e => setF({...f, l: e.target.value})} /><Input label="Breadth" value={f.b} onChange={e => setF({...f, b: e.target.value})} /><Input label="Height" value={f.h} onChange={e => setF({...f, h: e.target.value})} />
           <div className="col-span-2"><Select label="Saved Packages" options={SAVED_PACKAGES.map(p => ({label: p.name, value: p.id}))} value={saved} onChange={applySaved} /></div>
        </div>
        <div className="p-6 bg-slate-900 rounded-2xl flex items-center justify-between text-white shadow-xl">
           <div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Volumetric Weight</p><p className="text-xl font-bold">{vol.toFixed(2)} Kg</p></div>
           <div className="h-10 w-px bg-white/10" />
           <div className="space-y-1 text-right"><p className="text-[10px] font-black uppercase tracking-widest text-brand-400">Applicable Weight</p><p className="text-2xl font-black">{applicable.toFixed(2)} Kg</p></div>
        </div>
      </Card>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={() => onNext({ pkg: f })} disabled={!applicable} className="px-12">Next → Rates</Button>
      </div>
    </div>
  );
};