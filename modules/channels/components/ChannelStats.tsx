
import React from 'react';
import { Package, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { StatCard } from './StatCard';

interface Props { total: number; revenue: number; pending: number; failed: number; }

export const ChannelStats: React.FC<Props> = ({ total, revenue, pending, failed }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={total} icon={Package} color="brand" trend="+12%" />
        <StatCard label="Total Revenue" value={`$${revenue.toLocaleString()}`} icon={TrendingUp} color="emerald" trend="+5%" />
        <StatCard label="Pending Sync" value={pending} icon={Clock} color="amber" />
        <StatCard label="Sync Errors" value={failed} icon={AlertTriangle} color="rose" />
    </div>
);
