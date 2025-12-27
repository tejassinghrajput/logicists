
import React from 'react';
import { Column, FilterDefinition } from '../../common/components/DataTable';
import { Shipment } from '../../common/types';
import { StatusBadge } from '../../common/components/Shared';

export const SHIPMENT_FILTERS: FilterDefinition<Shipment>[] = [
    { key: 'status', label: 'Status', type: 'select', options: [{ label: 'All', value: '' }, { label: 'In Transit', value: 'in_transit' }, { label: 'Delivered', value: 'delivered' }, { label: 'Pending', value: 'pending' }, { label: 'Exception', value: 'exception' }] },
    { key: 'type', label: 'Type', type: 'select', options: [{ label: 'All', value: '' }, { label: 'Standard', value: 'Standard' }, { label: 'Express', value: 'Express' }] }
];

export const getShipmentColumns = (): Column<Shipment>[] => [
    { 
        header: 'Tracking ID', accessorKey: 'trackingNumber', 
        cell: (s) => <div className="flex flex-col"><span className="text-sm font-bold text-slate-900 group-hover:text-brand-600">{s.trackingNumber}</span><span className="text-xs text-slate-400 font-mono mt-0.5">{s.id}</span></div> 
    },
    { 
        header: 'Customer', accessorKey: 'customer', 
        cell: (s) => <div className="flex items-center"><div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 mr-3">{s.customer.charAt(0)}</div><div className="text-sm font-medium text-slate-700">{s.customer}</div></div> 
    },
    { 
        header: 'Route', accessorKey: 'destination', 
        cell: (s) => <div className="flex flex-col"><span className="text-xs text-slate-400">From <strong className="text-slate-600 font-medium">{s.origin.split(',')[0]}</strong></span><span className="text-xs text-slate-400 mt-0.5">To <strong className="text-slate-600 font-medium">{s.destination.split(',')[0]}</strong></span></div> 
    },
    { header: 'Status', accessorKey: 'status', cell: (s) => <StatusBadge status={s.status} /> },
    { header: 'Type', accessorKey: 'type', cell: (s) => <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{s.type}</span> }
];
