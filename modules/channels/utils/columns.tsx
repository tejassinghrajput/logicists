
import React from 'react';
import { Column } from '../../../common/components/DataTable';
import { OrderLog } from '../types';
import { CHANNEL_LOGOS } from '../../../mockData/channelLogos';
import { ShoppingBag, ExternalLink, CheckCircle2, AlertCircle, Clock, AlertTriangle } from 'lucide-react';

const StatusCell: React.FC<{status: string, msg?: string}> = ({status, msg}) => {
    const c = { synced: {i: CheckCircle2, s: 'bg-emerald-50 text-emerald-700 border-emerald-200'}, failed: {i: AlertCircle, s: 'bg-rose-50 text-rose-700 border-rose-200'}, pending: {i: Clock, s: 'bg-amber-50 text-amber-700 border-amber-200'} }[status] || {};
    const I = c.i || Clock;
    return <div className="flex flex-col items-start gap-1"><div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${c.s}`}><I className="w-3 h-3 mr-1.5" />{status}</div>{msg && <span className="text-[10px] text-rose-500 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{msg}</span>}</div>;
};

export const getOrderColumns = (): Column<OrderLog>[] => [
    { header: 'Channel', accessorKey: 'channel', cell: (row) => {
        const logo = (CHANNEL_LOGOS as any)[row.channel];
        return <div className="flex items-center gap-3"><div className="h-9 w-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1">{logo ? <img src={logo} alt={row.channel} className="object-contain" /> : <ShoppingBag className="w-4 h-4 text-slate-400"/>}</div><span className="font-bold text-slate-900 text-sm">{row.channel}</span></div>;
    }},
    { header: 'Order', accessorKey: 'orderNumber', cell: (row) => <div><div className="font-bold text-slate-900 text-sm hover:text-brand-600 cursor-pointer flex items-center gap-1">{row.orderNumber}<ExternalLink className="w-3 h-3 text-slate-300" /></div><div className="text-xs text-slate-500">{row.productPreview}</div></div>},
    { header: 'Customer', accessorKey: 'customer', cell: (row) => <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{row.customer.charAt(0)}</div><span className="text-sm font-medium text-slate-900">{row.customer}</span></div>},
    { header: 'Value', accessorKey: 'amount', cell: (row) => <span className="text-sm font-bold text-slate-900 font-mono">${row.amount.toFixed(2)}</span>},
    { header: 'Status', accessorKey: 'status', cell: (row) => <StatusCell status={row.status} msg={row.message} />},
    { header: 'Date', accessorKey: 'date', className: 'text-slate-400 text-xs font-medium' },
];
