import React, { useState } from 'react';
import { Card, EditableInput, EditableSelect, useToast } from '../../../common/components/Shared';
import { Landmark, CreditCard, ShieldCheck, Calendar, DollarSign } from 'lucide-react';

export const PayoutPreferences: React.FC = () => {
  const { toast } = useToast();
  const [bank, setBank] = useState({ holder: 'Logistics Pro Solutions LLC', name: 'Chase Bank', route: '*********', num: '************4422' });
  const [pref, setPref] = useState({ sched: 'weekly', curr: 'usd' });

  const saveBank = (k: string, v: string) => { setBank(p => ({...p, [k]: v})); toast.success('Banking Info Saved'); };
  const savePref = (k: string, v: string | number) => { setPref(p => ({...p, [k]: v as string})); toast.success('Preferences Updated'); };

  return (
    <div className="space-y-6">
        <Card title="Payout Status">
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
                    <div><h4 className="text-sm font-bold text-emerald-900">Verified Merchant Account</h4><p className="text-xs text-emerald-700">Ready to receive payouts.</p></div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-200">Active</span>
            </div>
        </Card>

        <Card title="Banking Information" subtitle="Primary account for settling funds.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="md:col-span-2"><EditableInput label="Account Holder Name" value={bank.holder} onSave={v => saveBank('holder', v)} icon={CreditCard} /></div>
                <EditableInput label="Bank Name" value={bank.name} onSave={v => saveBank('name', v)} icon={Landmark} />
                <EditableInput label="Routing Number (ACH)" value={bank.route} onSave={v => saveBank('route', v)} type="password" />
                <div className="md:col-span-2"><EditableInput label="Account Number" value={bank.num} onSave={v => saveBank('num', v)} type="password" /></div>
            </div>
        </Card>

        <Card title="Payout Preferences" subtitle="Configure payout schedule and currency.">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <EditableSelect label="Payout Schedule" icon={Calendar} value={pref.sched} onSave={v => savePref('sched', v)} options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }, { label: 'Monthly', value: 'monthly' }]} />
                <EditableSelect label="Currency" icon={DollarSign} value={pref.curr} onSave={v => savePref('curr', v)} options={[{ label: 'USD', value: 'usd' }, { label: 'EUR', value: 'eur' }, { label: 'GBP', value: 'gbp' }]} />
             </div>
        </Card>
    </div>
  );
};