
import React from 'react';
import { Card, Button } from '../../../common/components/Shared';
import { ShipmentEvent } from '../../../common/types';
import { Box, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export const TrackingTimeline: React.FC<{ events: ShipmentEvent[] }> = ({ events }) => {
  return (
    <Card title="Shipment Progress" className="h-full border-0 shadow-soft">
        <div className="relative pl-4 mt-2 space-y-0">
            <div className="absolute top-2 left-[27px] bottom-6 w-0.5 bg-slate-200"></div>
            {events.map((event, idx) => {
                let Icon = Truck;
                let colorClass = "bg-blue-500 ring-blue-100";
                if (event.status === 'delivered') { Icon = CheckCircle2; colorClass = "bg-emerald-500 ring-emerald-100"; }
                else if (event.status === 'exception') { Icon = AlertCircle; colorClass = "bg-rose-500 ring-rose-100"; }
                else if (event.status === 'pending') { Icon = Box; colorClass = "bg-slate-400 border-slate-300"; }

                return (
                    <div key={event.id} className="relative pl-10 pb-10 last:pb-0 group">
                        <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-white z-10">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-offset-2 ring-offset-white ${colorClass} text-white shadow-sm transition-transform group-hover:scale-110`}>
                                <Icon className="w-5 h-5" />
                            </span>
                        </span>
                        <div className="flex flex-col pt-1.5 ml-2">
                            <span className="text-sm font-bold text-slate-900">{event.description}</span>
                            <span className="text-xs font-medium text-slate-500 mt-1">{event.location}</span>
                            <span className="text-xs text-slate-400 mt-1 bg-slate-50 inline-block px-2 py-0.5 rounded w-fit">{event.timestamp}</span>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="mt-12 pt-6 border-t border-slate-100"><Button variant="outline" size="sm" fullWidth icon={Box}>Download Proof of Delivery</Button></div>
    </Card>
  );
};
