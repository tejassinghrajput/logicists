
import React from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatsProps { totalDue: number; overdue: number; paidCount: number; }

export const InvoiceStats: React.FC<StatsProps> = ({ totalDue, overdue, paidCount }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
        <StatCard icon={Clock} color="blue" label="Total Outstanding" value={`$${totalDue.toLocaleString()}`} />
        <StatCard icon={AlertCircle} color="rose" label="Overdue Amount" value={`$${overdue.toLocaleString()}`} />
        <StatCard icon={CheckCircle2} color="emerald" label="Paid This Month" value={`${paidCount} Invoices`} />
    </div>
);

const StatCard: React.FC<{ icon: any, color: string, label: string, value: string }> = ({ icon: Icon, color, label, value }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center">
        <div className={`p-3 bg-${color}-50 rounded-xl text-${color}-600 mr-4`}><Icon className="w-6 h-6" /></div>
        <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p></div>
    </div>
);
