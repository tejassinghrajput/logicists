import React from 'react';
import { Modal } from '../../../common/components/Shared';
import { ChargeDetailsTable } from './ChargeDetailsTable';

export const RateResultModal = ({ isOpen, onClose, data }: any) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Charge Details" size="xl">
    <div className="space-y-6">
      <div className="flex flex-col">
        <span className="text-xl font-black text-slate-900 italic tracking-tighter uppercase">
          {data.carrier}
        </span>
        <span className="text-[11px] text-slate-400 font-bold -mt-1">
          delivering happiness
        </span>
      </div>
      <ChargeDetailsTable price={data.price} weight={data.weight} />
    </div>
  </Modal>
);