import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../../common/components/Shared';

export const Step3Order: React.FC<any> = ({ data, onNext, onBack }) => {
  const [f, setF] = useState(data);
  const isInt = f.type === 'international';

  return (
    <div className="space-y-6">
      <Card title="Order Type">
        <div className="flex gap-4">
          {['domestic', 'international'].map(t => (
            <button key={t} onClick={() => setF({...f, type: t})} className={`flex-1 py-4 border-2 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${f.type === t ? 'bg-brand-600 border-brand-600 text-white shadow-brand' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'}`}>{t}</button>
          ))}
        </div>
      </Card>
      <Card title="Payment Mode">
        <div className="flex gap-4">
          {['prepaid', 'COD'].map(m => (
            <button key={m} onClick={() => setF({...f, payment: m})} className={`flex-1 py-4 border-2 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${f.payment === m ? 'bg-brand-600 border-brand-600 text-white shadow-brand' : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'}`}>{m}</button>
          ))}
        </div>
      </Card>
      {isInt && <Card title="International Customs Details" className="animate-scale-in">
        <div className="grid grid-cols-2 gap-6">
          <Select label="Purpose" options={[{label:'Commercial',value:'com'},{label:'Gift',value:'gift'}]} />
          <Input label="Description" placeholder="e.g. Cotton T-shirts" />
          <Input label="Declared Value" unit="USD" type="number" />
          <Input label="HSN Code" />
          <Input label="Invoice Number" /><Input label="Invoice Date" type="date" />
        </div>
      </Card>}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={() => onNext({ order: f })} className="px-12">Next → Package Details</Button>
      </div>
    </div>
  );
};