
import React, { useState, useMemo } from 'react';
import { DataTable } from '../../../common/components/DataTable';
import { Button } from '../../../common/components/Shared';
import { RefreshCw, ExternalLink, RotateCw } from 'lucide-react';
import { ChannelStats } from './ChannelStats';
import { getOrderColumns } from '../utils/columns';
import { CHANNEL_ORDERS } from '../../../mockData/channelOrders';
import { OrderLog } from '../types';

export const ChannelOrders: React.FC = () => {
    const MOCK_LOGS = CHANNEL_ORDERS as OrderLog[];
    const [activeTab, setActiveTab] = useState('all');
    const [isSyncing, setIsSyncing] = useState(false);
    
    const stats = useMemo(() => ({
        total: MOCK_LOGS.length,
        failed: MOCK_LOGS.filter(l => l.status === 'failed').length,
        pending: MOCK_LOGS.filter(l => l.status === 'pending').length,
        revenue: MOCK_LOGS.reduce((acc, l) => acc + (l.status === 'synced' ? l.amount : 0), 0)
    }), [MOCK_LOGS]);

    const tabs = [
        { id: 'all', label: 'All Orders', count: stats.total },
        { id: 'synced', label: 'Synced', count: stats.total - stats.failed - stats.pending },
        { id: 'pending', label: 'Pending', count: stats.pending },
        { id: 'failed', label: 'Failed', count: stats.failed },
    ];

    const filteredData = activeTab === 'all' ? MOCK_LOGS : MOCK_LOGS.filter(l => l.status === activeTab);
    const handleSync = () => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 2000); };

    return (
        <div className="space-y-8">
            <ChannelStats {...stats} />
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-1">
                <div className="flex space-x-6 overflow-x-auto pb-1 w-full md:w-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center pb-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap px-1 ${activeTab === tab.id ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                            {tab.label}<span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab===tab.id ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>{tab.count}</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 pb-3">
                    <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleSync} className={isSyncing ? 'animate-spin' : ''}>{isSyncing ? 'Syncing...' : 'Sync Now'}</Button>
                    <Button variant="primary" size="sm" icon={ExternalLink}>Export Logs</Button>
                </div>
            </div>
            <div className="animate-fade-in"><DataTable columns={getOrderColumns()} data={filteredData} enableSearch={true} rowActions={(row) => [{ label: 'Details', icon: ExternalLink, onClick: () => {} }, ...(row.status === 'failed' ? [{ label: 'Retry', icon: RotateCw, onClick: () => {}, variant: 'primary' as const }] : [])]} /></div>
        </div>
    );
}
