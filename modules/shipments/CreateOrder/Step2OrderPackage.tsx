import React, { useState } from 'react';
import { Card, Input, Select } from '../../../common/components/Shared';
import { ItemManager } from './components/ItemManager';
import { DimensionInputs } from '../components/DimensionInputs';
import { SummarySidebar } from './components/SummarySidebar';

export const Step2OrderPackage: React.FC<any> = ({ data, onNext, onBack }) => {
  const [f, setF] = useState(data.order || { purpose: 'csb5' });
  const [p, setP] = useState(data.pkg || { l: '', b: '', h: '', unit: 'cm' });
  const [items, setItems] = useState(data.items || [{ name: '', sku: '', hsn: '', weight: '', val: '', desc: '' }]);

  const dead = items.reduce((acc: number, it: any) => acc + (parseFloat(it.weight) || 0), 0);
  const vol = (parseFloat(p.l) || 0) * (parseFloat(p.b) || 0) * (parseFloat(p.h) || 0) / 5000;
  const app = Math.max(dead, vol);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8 animate-slide-up">
        <Card title="Customs Protocol (International Only)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label="Export Purpose" options={[{label:'CSB 4 (Gift / Sample)',value:'csb4'},{label:'CSB 5 (Commercial)',value:'csb5'}]} value={f.purpose} onChange={v => setF({...f, purpose: v})} />
            <Input label="Consignment Invoice #" value={f.inv} onChange={e => setF({...f, inv: e.target.value})} placeholder="e.g. INV/2024/001" />
          </div>
        </Card>
        <Card className="shadow-brand/5"><ItemManager items={items} setItems={setItems} /></Card>
        <Card title="Final Package Dimensions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <DimensionInputs values={p} onChange={(k, v) => setP({ ...p, [k]: v })} />
          </div>
        </Card>
      </div>
      <SummarySidebar dead={dead} vol={vol} app={app} onBack={onBack} onNext={() => onNext({ order: f, pkg: p, items })} />
    </div>
  );
};