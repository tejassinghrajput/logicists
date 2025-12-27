
import React from 'react';
import { ShipmentStatus } from '../../types';

export const StatusBadge: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  const config = {
    pending: {
        bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-600/20', dot: 'bg-amber-500', label: 'Pending'
    },
    processing: {
        bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-600/20', dot: 'bg-sky-500', label: 'Processing'
    },
    in_transit: {
        bg: 'bg-brand-50', text: 'text-brand-700', ring: 'ring-brand-600/20', dot: 'bg-brand-500 animate-pulse', label: 'In Transit'
    },
    delivered: {
        bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-600/20', dot: 'bg-emerald-500', label: 'Delivered'
    },
    exception: {
        bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-600/20', dot: 'bg-rose-500', label: 'Exception'
    },
  };

  const style = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset transition-colors duration-200 ${style.bg} ${style.text} ${style.ring}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${style.dot}`} />
      {style.label}
    </span>
  );
};
