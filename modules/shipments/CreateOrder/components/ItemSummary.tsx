import React from 'react';
import { Card } from '../../../../common/components/Shared';
import { Package, User, MapPin, Truck, Hash, Tag, Info } from 'lucide-react';

export const ItemSummary: React.FC<{ data: any }> = ({ data }) => (
  <div className="space-y-4 sm:space-y-6 animate-slide-up">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Card title="Parties Involved" className="shadow-sm">
        <div className="space-y-4 sm:space-y-6">
          <Section icon={User} label="Seller / Sender" title={data.seller?.name} sub={data.seller?.addr1} />
          <Section icon={MapPin} label="Buyer / Recipient" title={data.buyer?.name} sub={`${data.buyer?.city}, ${data.buyer?.pin}`} />
          <Section icon={Truck} label="Collection Point" title={data.pickup?.nickname} sub={data.pickup?.address} />
        </div>
      </Card>
      <Card title="Shipment Manifest" className="shadow-sm">
        <div className="space-y-4 sm:space-y-6">
          <Section icon={Info} label="Export Compliance" title={data.order?.purpose?.toUpperCase()} sub={`Invoice: ${data.order?.inv || 'Pending'}`} />
          <Section icon={Package} label="Package Volume" title={`${data.pkg.l}x${data.pkg.b}x${data.pkg.h} ${data.pkg.unit}`} sub="Gross Size" />
          <div className="p-3 sm:p-4 bg-slate-900 rounded-xl sm:rounded-2xl text-white flex justify-between items-center shadow-lg">
            <div><p className="text-[8px] sm:text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Items</p><p className="font-bold text-base sm:text-lg">{data.items.length} Units</p></div>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white/10" />
          </div>
        </div>
      </Card>
    </div>
    <Card title="Itemized Inventory" className="shadow-sm">
      <div className="divide-y divide-slate-100">
        {data.items.map((it: any, i: number) => (
          <div key={i} className="py-4 sm:py-5 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0"><Package className="w-5 h-5 sm:w-6 sm:h-6"/></div>
              <div className="min-w-0"><h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{it.name || 'Product'}</h4><p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">{it.desc || 'No description'}</p></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-10">
              <Detail icon={Hash} label="SKU" val={it.sku || '---'} />
              <Detail icon={Tag} label="HSN" val={it.hsn || '---'} />
              <Detail icon={Info} label="Weight" val={`${it.weight || 0} KG`} />
              <Detail icon={Info} label="Value" val={`$${it.val || 0}`} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const Section = ({ icon: I, label, title, sub }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-2 sm:p-2.5 bg-slate-50 rounded-lg sm:rounded-xl text-slate-400 mt-0.5"><I className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
    <div className="min-w-0"><p className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</p><p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{title || 'Not Set'}</p><p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight line-clamp-1">{sub}</p></div>
  </div>
);

const Detail = ({ icon: I, label, val }: any) => (
  <div className="flex flex-col min-w-[60px]"><span className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1 mb-0.5"><I className="w-2.5 h-2.5"/> {label}</span><span className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">{val}</span></div>
);