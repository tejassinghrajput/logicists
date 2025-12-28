import React from 'react';
import { Card, Button, useToast } from '../../../common/components/Shared';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Package, CreditCard, ChevronRight } from 'lucide-react';

export const Step6Review: React.FC<any> = ({ data, onBack }) => {
  const { toast } = useToast(); const nav = useNavigate();
  const ship = () => { toast.success('Order Placed!', { description: 'Redirecting to your orders...' }); setTimeout(() => nav('/shipments'), 1500); };

  const Row = ({ icon: I, label, val }: any) => (
    <div className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400"><I className="w-4 h-4" /></div>
      <div><p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</p><p className="text-sm font-bold text-slate-900 leading-tight">{val}</p></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4"><Row icon={User} label="Buyer" val={data.buyer.name} /><Row icon={MapPin} label="Destination" val={data.buyer.addr1} /></div>
        <div className="space-y-4"><Row icon={MapPin} label="Pickup" val={data.pickup?.nickname} /><Row icon={Package} label="Package" val={`${data.pkg.weight} KG • ${data.pkg.l}x${data.pkg.b}x${data.pkg.h} CM`} /></div>
        <Card title="Payment & Courier" className="col-span-2">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-4"><img src={data.courier?.logo} className="w-12 h-12 object-contain" /><div><p className="font-black tracking-tighter text-slate-900 uppercase">{data.courier?.name}</p><p className="text-xs text-slate-500 font-bold">{data.order.payment} Settlement</p></div></div>
              <div className="text-right"><p className="text-2xl font-black text-slate-900 tracking-tighter">₹ {data.courier?.price}</p></div>
           </div>
        </Card>
      </div>
      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <div className="flex gap-4">
           <Button variant="secondary" onClick={ship}>Save as Draft</Button>
           <Button onClick={ship} className="px-12 bg-slate-900 hover:bg-black">Place Order & Ship Now <ChevronRight className="w-4 h-4 ml-2"/></Button>
        </div>
      </div>
    </div>
  );
};