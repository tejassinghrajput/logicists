import React from 'react';
import { Input, Button } from '../../../../common/components/Shared';
import { Plus, Trash2 } from 'lucide-react';

export const ItemManager: React.FC<any> = ({ items, setItems }) => {
  const add = () => setItems([...items, { name: '', sku: '', hsn: '', weight: '', val: '', desc: '' }]);
  const del = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));
  const up = (i: number, p: any) => setItems(items.map((it: any, idx: number) => idx === i ? {...it, ...p} : it));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-black uppercase text-slate-400">Order Items</h3><Button size="sm" variant="outline" icon={Plus} onClick={add}>Add Item</Button></div>
      {items.map((it: any, i: number) => (
        <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-scale-in">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-3 gap-4 flex-1">
              <Input label="Product Name *" value={it.name} onChange={e => up(i, {name: e.target.value})} className="col-span-2" />
              <Input label="SKU" value={it.sku} onChange={e => up(i, {sku: e.target.value})} />
              <Input label="HSN Code *" value={it.hsn} onChange={e => up(i, {hsn: e.target.value})} />
              <Input label="Item Weight (KG) *" type="number" value={it.weight} onChange={e => up(i, {weight: e.target.value})} />
              <Input label="Unit Price (USD) *" type="number" value={it.val} onChange={e => up(i, {val: e.target.value})} />
              <Input label="Item Description" value={it.desc} onChange={e => up(i, {desc: e.target.value})} className="col-span-3" />
            </div>
            {items.length > 1 && <button onClick={() => del(i)} className="ml-4 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>}
          </div>
        </div>
      ))}
    </div>
  );
};