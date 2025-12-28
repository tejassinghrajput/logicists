import React, { useState } from 'react';
import { Card, Input, Button, Select } from '../../../common/components/Shared';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Step1Buyer: React.FC<any> = ({ data, onNext }) => {
  const [f, setF] = useState({ country: 'United States', pin: '', state: '', city: '', curr: 'INR', addr1: '', addr2: '', mobile: '', name: '', email: '', ...data });
  const [expanded, setExpanded] = useState(false);
  
  const isValid = f.pin && f.state && f.city && f.addr1 && f.mobile && f.name && f.email;

  return (
    <div className="space-y-6">
      <Card title="Where is the order being delivered to?">
        <div className="grid grid-cols-2 gap-6">
          <Input label="Country" value={f.country} readOnly disabled className="bg-slate-50 opacity-60" />
          <Input label="Pincode *" value={f.pin} onChange={e => setF({...f, pin: e.target.value})} placeholder="e.g. 110001" />
          <Input label="State *" value={f.state} onChange={e => setF({...f, state: e.target.value})} />
          <Input label="City *" value={f.city} onChange={e => setF({...f, city: e.target.value})} />
          <Input label="Currency" value={f.curr} readOnly disabled className="bg-slate-50 opacity-60 col-span-2 md:col-span-1" />
          <Input label="Address Line 1 *" value={f.addr1} onChange={e => setF({...f, addr1: e.target.value})} className="col-span-2" />
          <Input label="Address Line 2" value={f.addr2} onChange={e => setF({...f, addr2: e.target.value})} className="col-span-2" />
        </div>
      </Card>
      <Card title="Buyer's Info">
        <div className="grid grid-cols-2 gap-6">
          <div className="relative group">
            <span className="absolute left-3.5 top-[34px] text-sm font-bold text-slate-400">+1</span>
            <Input label="Mobile Number *" value={f.mobile} onChange={e => setF({...f, mobile: e.target.value})} className="pl-10" />
          </div>
          <Input label="Full Name *" value={f.name} onChange={e => setF({...f, name: e.target.value})} />
          <Input label="Email ID *" value={f.email} onChange={e => setF({...f, email: e.target.value})} className="col-span-2" />
          <button onClick={() => setExpanded(!expanded)} className="col-span-2 text-xs font-black text-brand-600 uppercase flex items-center gap-1.5 pt-2 hover:text-brand-700 transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? 'Hide Extra Details' : 'Add Alternate Mobile, Company Name, GSTIN'}
          </button>
          {expanded && <div className="col-span-2 grid grid-cols-2 gap-4 animate-scale-in origin-top">
             <Input label="Alt Mobile" /><Input label="Company Name" /><Input label="GSTIN" className="col-span-2" />
          </div>}
        </div>
      </Card>
      <div className="flex justify-end"><Button onClick={() => onNext({ buyer: f })} disabled={!isValid} className="px-12">Next → Pickup Details</Button></div>
    </div>
  );
};