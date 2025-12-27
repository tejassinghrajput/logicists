import React from 'react';
import { Card, Button, StatusBadge } from './Shared';
import { MOCK_SHIPMENTS } from '../constants';
import { ArrowLeft, MapPin, Calendar, Box, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

interface TrackingProps {
  shipmentId: string | null;
  onBack: () => void;
}

export const Tracking: React.FC<TrackingProps> = ({ shipmentId, onBack }) => {
  const shipment = MOCK_SHIPMENTS.find(s => s.id === shipmentId) || MOCK_SHIPMENTS[0];

  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-slate-900">Tracking Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details and Map */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
             {/* Map Placeholder */}
             <div className="bg-slate-100 h-64 w-full flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="z-10 text-center">
                  <MapPin className="w-12 h-12 text-brand-500 mx-auto mb-2 animate-bounce" />
                  <p className="text-slate-500 font-medium">Live Map View Unavailable</p>
                  <p className="text-xs text-slate-400">Current Location: {shipment.currentLocation || shipment.origin}</p>
                </div>
             </div>
             <div className="p-6">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{shipment.trackingNumber}</h2>
                    <p className="text-slate-500 text-sm mt-1">Carrier: FedEx Express • {shipment.weight}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <StatusBadge status={shipment.status} />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                 <div className="flex items-start space-x-3">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Origin</p>
                     <p className="text-slate-900 font-medium">{shipment.origin}</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Destination</p>
                     <p className="text-slate-900 font-medium">{shipment.destination}</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                     <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Est. Delivery</p>
                     <p className="text-slate-900 font-medium">{shipment.estimatedDelivery}</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                     <Box className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold">Package Type</p>
                     <p className="text-slate-900 font-medium">{shipment.type}</p>
                   </div>
                 </div>
               </div>
             </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-1">
          <Card title="Shipment History" className="h-full">
            <div className="relative border-l-2 border-slate-200 ml-3 mt-4 space-y-8 pb-4">
              {shipment.events.map((event, idx) => {
                 // Determine icon based on status
                 let Icon = Truck;
                 let colorClass = "bg-blue-500 border-blue-100";
                 if (event.status === 'delivered') { Icon = CheckCircle2; colorClass = "bg-emerald-500 border-emerald-100"; }
                 else if (event.status === 'exception') { Icon = AlertCircle; colorClass = "bg-rose-500 border-rose-100"; }
                 else if (event.status === 'pending') { Icon = Box; colorClass = "bg-slate-400 border-slate-100"; }

                 return (
                  <div key={event.id} className="relative pl-8">
                    <span className={`absolute -left-[9px] top-1 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${colorClass}`}>
                      {idx === 0 && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{event.description}</span>
                      <span className="text-xs text-slate-500 mt-0.5">{event.location}</span>
                      <span className="text-xs text-slate-400 mt-1">{event.timestamp}</span>
                    </div>
                  </div>
                 );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
               <Button variant="outline" size="sm" className="w-full">Download Proof of Delivery</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
