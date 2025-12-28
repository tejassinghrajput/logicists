import React from 'react';
import { Input, Button } from '../../../../common/components/Shared';
import { Plus, Trash2 } from 'lucide-react';

export const ItemManager: React.FC<any> = ({ items, setItems }) => {
  const add = () => setItems([...items, { name: '', sku: '', hsn: '', weight: '', val: '', desc: '' }]);
  const del = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));
  const up = (i: number, p: any) => setItems(items.map((it: any, idx: number) => idx === i ? {...it, ...p} : it));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-black uppercase text-slate-400 tracking-wider">Order Items</h3>
        <Button size="sm" variant="outline" icon={Plus} onClick={add} className="h-8 !text-[9px]">Add Item</Button>
      </div>
      {items.map((it: any, i: number) => (
        <div key={i} className="p-3 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 animate-scale-in relative">
          {items.length > 1 && (
            <button onClick={() => del(i)} className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors z-10">
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4"/>
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-0">
            <Input label="Product Name *" value={it.name} onChange={e => up(i, {name: e.target.value})} className="sm:col-span-2" />
            <Input label="SKU" value={it.sku} onChange={e => up(i, {sku: e.target.value})} />
            <Input label="HSN Code *" value={it.hsn} onChange={e => up(i, {hsn: e.target.value})} />
            <Input label="Weight (KG) *" type="number" value={it.weight} onChange={e => up(i, {weight: e.target.value})} />
            <Input label="Unit Price (USD) *" type="number" value={it.val} onChange={e => up(i, {val: e.target.value})} />
            <Input label="Item Description" value={it.desc} onChange={e => up(i, {desc: e.target.value})} className="sm:col-span-3" />
          </div>
        </div>
      ))}
    </div>
  );
};