
import React from 'react';
import { Card, Button } from '../../../common/components/Shared';
import { Plus, CreditCard } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  return (
    <div className="lg:col-span-2">
        <Card title="Payment Methods" action={<Button variant="ghost" size="sm" icon={Plus}>Add New</Button>} className="h-full border-0 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <CardItem brand="Visa" last4="4242" expiry="12/24" active />
                <CardItem brand="Mastercard" last4="8833" expiry="09/25" />
            </div>
        </Card>
    </div>
  );
};

const CardItem: React.FC<{ brand: string, last4: string, expiry: string, active?: boolean }> = ({ brand, last4, expiry, active }) => (
    <div className={`p-5 border rounded-xl relative group transition-all hover:shadow-md cursor-pointer ${active ? 'border-brand-200 bg-brand-50/30' : 'border-slate-200 bg-white opacity-80 hover:opacity-100 hover:border-slate-300'}`}>
        <div className="flex justify-between items-start mb-4">
            <CreditCard className={`w-8 h-8 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
            <div className={`h-4 w-4 rounded-full border ${active ? 'border-[3px] border-brand-500' : 'border border-slate-300'}`}></div>
        </div>
        <div className="mb-2"><p className="text-slate-500 text-xs uppercase">Card Number</p><p className="text-slate-900 font-mono font-medium text-lg">•••• •••• •••• {last4}</p></div>
        <div className="flex justify-between items-end">
            <div><p className="text-slate-500 text-xs uppercase">Expiry</p><p className="text-slate-900 font-medium">{expiry}</p></div>
            <div className="font-bold text-slate-400 italic">{brand}</div>
        </div>
    </div>
);
