
import React from 'react';
import { Column, FilterDefinition } from '../../../common/components/DataTable';
import { Notification } from '../../../common/types';
import { Check, CheckCircle2, AlertTriangle, Info, Bell, Clock } from 'lucide-react';

export const NOTIFICATION_FILTERS: FilterDefinition<Notification>[] = [
    { 
        key: 'type', 
        label: 'Type', 
        type: 'select', 
        options: [
            { label: 'All Types', value: '' }, 
            { label: 'Success', value: 'success' }, 
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Info', value: 'info' }
        ] 
    },
    { 
        key: 'category', 
        label: 'Category', 
        type: 'select', 
        options: [
            { label: 'All Categories', value: '' }, 
            { label: 'General', value: 'general' }, 
            { label: 'Announcement', value: 'announcement' }
        ] 
    },
    {
        key: 'read',
        label: 'Read Status',
        type: 'select',
        options: [
            { label: 'All', value: '' },
            { label: 'Read', value: 'true' },
            { label: 'Unread', value: 'false' }
        ]
    }
];

export const getNotificationColumns = (): Column<Notification>[] => [
    { 
        header: 'Status', 
        accessorKey: 'type', 
        className: 'w-[60px] pl-6 align-middle',
        cell: (n) => {
            const icons = {
                success: { Icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                warning: { Icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
                error: { Icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
                info: { Icon: Info, color: 'text-brand-500', bg: 'bg-brand-50' }
            };
            const { Icon, color, bg } = icons[n.type] || icons.info;
            return <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg} ${color}`}><Icon className="w-5 h-5" /></div>;
        }
    },
    { 
        header: 'Notification Details', 
        accessorKey: 'message',
        className: 'w-full max-w-md', 
        cell: (n) => (
            <div className="py-1 pr-4">
                <div className={`text-sm font-bold ${n.read ? 'text-slate-600' : 'text-slate-900'}`}>{n.title}</div>
                {/* Use truncate to keep rows uniform; full text is in the modal */}
                <div className="text-sm text-slate-500 mt-1 truncate">{n.message}</div>
            </div>
        )
    },
    { 
        header: 'Category', 
        accessorKey: 'category',
        className: 'align-middle whitespace-nowrap',
        cell: (n) => (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                n.category === 'announcement' ? 'bg-violet-50 text-violet-700 border border-violet-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
            }`}>
                {n.category}
            </span>
        )
    },
    { 
        header: 'Time', 
        accessorKey: 'time',
        className: 'align-middle whitespace-nowrap text-right',
        cell: (n) => <div className="flex items-center justify-end text-xs text-slate-400 font-medium"><Clock className="w-3 h-3 mr-1.5" />{n.time}</div>
    },
    {
        header: 'State',
        accessorKey: 'read',
        className: 'align-middle whitespace-nowrap pl-4',
        cell: (n) => n.read 
            ? <span className="text-slate-400 text-xs font-bold flex items-center"><Check className="w-3 h-3 mr-1"/> Read</span> 
            : <span className="text-brand-600 text-xs font-bold bg-brand-50 px-2 py-1 rounded-full border border-brand-100 flex items-center w-fit"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></span>New</span>
    }
];
