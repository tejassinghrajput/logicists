import React, { useState } from 'react';
import { Card, Button } from '../../../common/components/Shared';
import { AddressFieldset } from './components/AddressFieldset';
import { PickupSelector } from './components/PickupSelector';

export const Step1Addresses: React.FC<any> = ({ data, onNext }) => {
  const [s, setS] = useState(data.seller || {});
  const [b, setB] = useState(data.buyer || {});
  const [p, setP] = useState(data.pickup);

  const isValid = s.name && s.addr1 && b.name && b.addr1 && p !== null && p !== undefined;

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-8 sm:space-y-10">
          <AddressFieldset title="Seller / Sender Details" data={s} onChange={p => setS({...s, ...p})} />
          <div className="h-px bg-slate-100" />
          <AddressFieldset title="Buyer / Recipient Details" data={b} onChange={p => setB({...b, ...p})} />
        </div>
      </Card>
      <PickupSelector selected={p} onSelect={setP} />
      <div className="flex flex-col sm:flex-row sm:justify-end pt-4 px-1 sm:px-0">
        <Button onClick={() => onNext({ seller: s, buyer: b, pickup: p })} disabled={!isValid} className="w-full sm:w-auto sm:px-12 h-12 sm:h-14 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs">
          Continue to Shipping Details →
        </Button>
      </div>
    </div>
  );
};