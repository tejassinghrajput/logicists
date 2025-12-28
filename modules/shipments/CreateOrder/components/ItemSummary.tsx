import React from 'react';
import { Card } from '../../../../common/components/Shared';
import { Package, User, MapPin, Truck, Hash, Tag, Info } from 'lucide-react';

export const ItemSummary: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-6 animate-slide-up">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Source & Destination" className="shadow-sm">
        <div className="space-y-4">
          <Section icon={Truck} label="Pickup Point" title={data.pickup?.nickname} sub={data.pickup?.address} />
          <Section icon={User} label="Seller" title={data.seller?.name} sub={data.seller?.addr1} />
          <Section icon={MapPin} label="Buyer / Delivery" title={data.buyer?.name} sub={`${data.buyer?.addr1}, ${data.buyer?.city}`} />
        </div>
      </Card>
      <Card title="Package Details" className="shadow-sm">
        <div className="space-y-4">
          <Section icon={Info} label="Export Purpose" title={data.order?.purpose?.toUpperCase()} sub={`Invoice: ${data.order?.inv || 'N/A'}`} />
          <Section icon={Package} label="Dimensions" title={`${data.pkg.l}x${data.pkg.b}x${data.pkg.h} ${data.pkg.unit}`} sub="Final Box Size" />
          <div className="p-3 bg-slate-900 rounded-xl text-white flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Manifest Items</span>
            <span className="font-bold text-sm">{data.items.length} units</span>
          </div>
        </div>
      </Card>
    </div>
    <Card title="Itemized Contents" className="shadow-sm">
      <div className="divide-y divide-slate-100">
        {data.items.map((it: any, i: number) => (
          <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-600"><Package className="w-5 h-5"/></div>
              <div><h4 className="font-bold text-slate-900 text-sm">{it.name || 'Unnamed Product'}</h4><p className="text-xs text-slate-500 line-clamp-1">{it.desc || 'No description'}</p></div>
            </div>
            <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8">
              <Detail icon={Hash} label="SKU" val={it.sku || '---'} /><Detail icon={Tag} label="HSN" val={it.hsn || '---'} />
              <Detail icon={Info} label="Weight" val={`${it.weight || 0} KG`} /><Detail icon={Info} label="Value" val={`$${it.val || 0}`} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const Section = ({ icon: I, label, title, sub }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 mt-1"><I className="w-4 h-4" /></div>
    <div><p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</p><p className="text-sm font-bold text-slate-900">{title || '---'}</p><p className="text-[11px] text-slate-500 leading-tight">{sub}</p></div>
  </div>
);

const Detail = ({ icon: I, label, val }: any) => (
  <div className="flex flex-col"><span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1"><I className="w-2.5 h-2.5"/> {label}</span><span className="text-xs font-bold text-slate-700">{val}</span></div>
);