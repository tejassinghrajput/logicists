
import React from 'react';
import { MapPin, Clock, Box } from 'lucide-react';
import { Card, StatusBadge } from '../../../common/components/Shared';
import { Shipment } from '../../../common/types';

export const TrackingMap: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
  return (
    <Card className="p-0 overflow-hidden shadow-soft border-0" noPadding>
        <div className="bg-slate-900 h-80 w-full flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="z-10 text-center p-6 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl transform transition-transform group-hover:scale-105">
                <MapPin className="w-10 h-10 text-brand-400 mx-auto mb-3 relative z-10 animate-pulse" />
                <p className="text-white font-semibold">Live Tracking</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Last seen: {shipment.currentLocation || shipment.origin}</p>
            </div>
        </div>
        <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{shipment.trackingNumber}</h2>
                    <div className="flex items-center space-x-3 mt-2">
                        <span className="text-slate-500 text-sm font-medium bg-slate-100 px-2 py-1 rounded">FedEx</span>
                        <span className="text-slate-400 text-sm">•</span>
                        <span className="text-slate-500 text-sm">{shipment.weight}</span>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 transform scale-110 origin-left"><StatusBadge status={shipment.status} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                 <InfoItem icon={MapPin} color="blue" label="Origin" value={shipment.origin} />
                 <InfoItem icon={MapPin} color="brand" label="Destination" value={shipment.destination} />
                 <InfoItem icon={Clock} color="purple" label="Estimated Arrival" value={shipment.estimatedDelivery} />
                 <InfoItem icon={Box} color="orange" label="Type" value={shipment.type} />
            </div>
        </div>
    </Card>
  );
};

const InfoItem: React.FC<{ icon: any, color: string, label: string, value: string }> = ({ icon: Icon, color, label, value }) => (
    <div className="flex items-start p-4 rounded-xl bg-slate-50/50 border border-slate-100">
        <div className={`p-2.5 rounded-lg mr-4 bg-${color}-100/50 text-${color}-600`}><Icon className="w-5 h-5" /></div>
        <div><p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{label}</p><p className="text-slate-900 font-semibold">{value}</p></div>
    </div>
);
