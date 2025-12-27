
import React from 'react';
import { Card, Button, Input, Select, useToast } from '../../../common/components/Shared';
import { Landmark, CreditCard, ShieldCheck, Calendar, DollarSign } from 'lucide-react';

export const PayoutSettings: React.FC = () => {
  const { toast } = useToast();
  return (
    <div className="space-y-6">
        <Card title="Payout Status">
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-emerald-900">Verified Merchant Account</h4>
                        <p className="text-xs text-emerald-700 mt-0.5">Your account is fully verified and ready to receive payouts.</p>
                    </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-200">Active</span>
            </div>
        </Card>

        <Card title="Banking Information" subtitle="Primary account for settling funds.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="md:col-span-2">
                    <Input label="Account Holder Name" defaultValue="Logistics Pro Solutions LLC" icon={CreditCard} />
                </div>
                <Input label="Bank Name" defaultValue="Chase Bank" icon={Landmark} />
                <Input label="Routing Number (ACH)" type="password" defaultValue="*********" placeholder="9 digits" />
                <div className="md:col-span-2">
                    <Input label="Account Number" type="password" defaultValue="************4422" />
                </div>
            </div>
            <div className="flex justify-end pt-6 border-t border-slate-50 mt-6">
                <Button variant="outline" onClick={() => toast.success('Banking Info Updated')}>Update Banking Info</Button>
            </div>
        </Card>

        <Card title="Payout Preferences" subtitle="Configure how and when you want to be paid.">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <Select 
                    label="Payout Schedule" 
                    icon={Calendar}
                    options={[
                        { label: 'Daily (Next Business Day)', value: 'daily' },
                        { label: 'Weekly (Every Wednesday)', value: 'weekly' },
                        { label: 'Monthly (1st of month)', value: 'monthly' }
                    ]}
                    defaultValue="weekly"
                />
                <Select 
                    label="Settlement Currency" 
                    icon={DollarSign}
                    options={[
                        { label: 'USD - US Dollar', value: 'usd' },
                        { label: 'EUR - Euro', value: 'eur' },
                        { label: 'GBP - British Pound', value: 'gbp' },
                        { label: 'CAD - Canadian Dollar', value: 'cad' }
                    ]}
                    defaultValue="usd"
                />
             </div>
             <div className="flex justify-end pt-6 border-t border-slate-50 mt-6">
                <Button variant="primary" onClick={() => toast.success('Preferences Saved')}>Save Preferences</Button>
            </div>
        </Card>
    </div>
  );
};
