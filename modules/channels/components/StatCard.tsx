
import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface Props { label: string; value: string | number; icon: LucideIcon; color: string; trend?: string; }

export const StatCard: React.FC<Props> = ({ label, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden group hover:border-brand-200 transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Icon className="w-16 h-16" /></div>
        <div className="flex justify-between items-start z-10">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
            <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}><Icon className="w-4 h-4" /></div>
        </div>
        <div className="flex items-end justify-between z-10">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
            {trend && <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full"><TrendingUp className="w-3 h-3 mr-1" />{trend}</span>}
        </div>
    </div>
);
