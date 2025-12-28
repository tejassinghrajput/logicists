import React from 'react';
import { Input } from '../../../../common/components/Shared';

interface Props { title: string; data: any; onChange: (patch: any) => void; }

export const AddressFieldset: React.FC<Props> = ({ title, data, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input label="Name *" value={data.name || ''} onChange={e => onChange({name: e.target.value})} className="sm:col-span-2" />
      <Input label="Mobile *" value={data.mobile || ''} onChange={e => onChange({mobile: e.target.value})} />
      <Input label="Email *" value={data.email || ''} onChange={e => onChange({email: e.target.value})} />
      <Input label="Pincode *" value={data.pin || ''} onChange={e => onChange({pin: e.target.value})} />
      <Input label="City/State *" value={data.city || ''} onChange={e => onChange({city: e.target.value})} />
      <Input label="Address Line 1 *" value={data.addr1 || ''} onChange={e => onChange({addr1: e.target.value})} className="sm:col-span-2" />
    </div>
  </div>
);