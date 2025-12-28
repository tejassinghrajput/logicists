import React from 'react';

export const ChargeDetailsTable = ({ price, weight }: { price: string; weight: string }) => {
  const total = parseFloat(price);
  const charges = parseFloat((total / 1.18).toFixed(2));
  const gst = parseFloat((total - charges).toFixed(2));

  const Row = ({ type, details, charge, tax, amt, isBold }: any) => (
    <div className={`grid grid-cols-12 border-b border-slate-200 ${isBold ? 'font-bold' : 'text-slate-600'}`}>
      <div className="col-span-2 px-4 py-4 border-r border-slate-200 text-sm flex items-center">{type}</div>
      <div className="col-span-3 px-4 py-4 border-r border-slate-200 text-sm flex flex-col items-center justify-center">
        {details && <><span className="font-bold text-slate-900">Base Weight</span><span>{details}</span></>}
      </div>
      <div className="col-span-2 px-4 py-4 border-r border-slate-200 text-sm text-right flex items-center justify-end">₹{charge}</div>
      <div className="col-span-2 px-4 py-4 border-r border-slate-200 text-sm text-right flex items-center justify-end">₹{tax}</div>
      <div className="col-span-3 px-4 py-4 text-sm text-right flex items-center justify-end">₹{amt}</div>
    </div>
  );

  return (
    <div className="w-full overflow-x-auto rounded-sm border border-slate-200">
      <div className="min-w-[600px] bg-white">
        <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2 px-4 py-3 border-r border-slate-200">Type</div>
          <div className="col-span-3 px-4 py-3 border-r border-slate-200">Details</div>
          <div className="col-span-2 px-4 py-3 border-r border-slate-200 text-right">Charges</div>
          <div className="col-span-2 px-4 py-3 border-r border-slate-200 text-right">GST(18%)</div>
          <div className="col-span-3 px-4 py-3 text-right">Amount</div>
        </div>
        <Row type="Forward" details={weight} charge={charges} tax={gst} amt={total} />
        <Row type="Total" charge={charges} tax={gst} amt={total} isBold />
      </div>
    </div>
  );
};