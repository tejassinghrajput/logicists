
import React, { useEffect, useState } from 'react';
import { Shipment } from '../../common/types';
import { getShipments } from '../../common/utils/storage';
import { ArrowLeft } from 'lucide-react';
import { TrackingMap } from './components/TrackingMap';
import { TrackingTimeline } from './components/TrackingTimeline';

interface TrackingProps { shipmentId: string | null; onBack: () => void; }

export const Tracking: React.FC<TrackingProps> = ({ shipmentId, onBack }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const response = getShipments();
    if (response.status === 200) setShipments(response.data);
    setLoading(false);
  }, []);

  const shipment = shipments.find(s => s.id === shipmentId) || shipments[0];

  if (loading) return <div className="p-8 text-center text-slate-500">Loading tracking details...</div>;
  if (!shipment) return <div className="p-8 text-center text-slate-500">Shipment not found.</div>;

  return (
    <>
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div><h1 className="text-2xl font-bold text-slate-900">Tracking Details</h1><p className="text-sm text-slate-500">Real-time status updates</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
        <div className="lg:col-span-2 space-y-8"><TrackingMap shipment={shipment} /></div>
        <div className="lg:col-span-1"><TrackingTimeline events={shipment.events} /></div>
      </div>
    </>
  );
};
