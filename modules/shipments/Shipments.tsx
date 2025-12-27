import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../common/components/DataTable';
import { Shipment } from '../../common/types';
import { getShipments } from '../../common/utils/storage';
import { Plus, Eye, Pencil, Trash2, Download, Printer } from 'lucide-react';
import { SHIPMENT_FILTERS, getShipmentColumns } from './config';

export const Shipments: React.FC = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const response = getShipments(); if (response.status === 200) setShipments(response.data); setLoading(false); }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up mb-6">
        <div><h1 className="text-3xl font-bold text-slate-900 tracking-tight">Shipments</h1><p className="text-slate-500 mt-1">Manage and track your entire fleet.</p></div>
      </div>
      <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
        <DataTable 
            columns={getShipmentColumns()}
            data={shipments}
            isLoading={loading}
            onRowClick={(item) => navigate(`/tracking/${item.id}`)}
            emptyMessage="No shipments found."
            enableSearch={true}
            searchPlaceholder="Search..."
            searchKeys={['trackingNumber', 'customer', 'destination', 'origin']}
            filterConfig={SHIPMENT_FILTERS}
            secondaryActions={[{ label: 'Export CSV', icon: Download, onClick: () => {} }, { label: 'Print', icon: Printer, onClick: () => {} }]}
            primaryAction={{ label: 'Create Order', icon: Plus, onClick: () => {} }}
            rowActions={(s) => [
                { label: 'View Details', icon: Eye, onClick: (s) => navigate(`/tracking/${s.id}`) },
                { label: 'Edit Order', icon: Pencil, onClick: () => {} },
                { label: 'Delete', icon: Trash2, onClick: () => {}, variant: 'danger' }
            ]}
        />
      </div>
    </>
  );
};