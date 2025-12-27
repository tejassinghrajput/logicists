import React, { useState } from 'react';
import { Card, Button, Input, StatusBadge } from './Shared';
import { MOCK_SHIPMENTS } from '../constants';
import { ViewState, Shipment } from '../types';
import { Search, Filter, Plus, ChevronRight, MoreHorizontal } from 'lucide-react';

interface ShipmentsProps {
  onNavigate: (view: ViewState, id?: string) => void;
}

export const Shipments: React.FC<ShipmentsProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('');
  
  const filteredShipments = MOCK_SHIPMENTS.filter(s => 
    s.trackingNumber.toLowerCase().includes(filter.toLowerCase()) || 
    s.customer.toLowerCase().includes(filter.toLowerCase()) ||
    s.destination.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Shipments</h1>
           <p className="text-slate-500 mt-1">Manage and track all your active orders.</p>
        </div>
        <div className="flex space-x-3">
           <Button variant="secondary" icon={Filter}>Filters</Button>
           <Button variant="primary" icon={Plus}>Create Order</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <Input 
             placeholder="Search by tracking #, customer, or destination..." 
             icon={Search}
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
             className="max-w-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tracking / ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Route</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredShipments.map((shipment) => (
                <tr 
                  key={shipment.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('tracking', shipment.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-brand-600 hover:text-brand-700">{shipment.trackingNumber}</span>
                      <span className="text-xs text-slate-400">{shipment.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{shipment.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                       <span className="text-xs text-slate-500">From: {shipment.origin}</span>
                       <span className="text-xs text-slate-900 font-medium">To: {shipment.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {shipment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-brand-600 p-1">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No shipments found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};
