
import React from 'react';
import { Card, Button } from '../../../../common/components/Shared';
import { RefreshCw, Check, AlertCircle, ArrowDown } from 'lucide-react';
import { INTEGRATION_LOGS } from '../../../../mockData/integrationLogs';

export const ChannelOrders: React.FC = () => {
    return (
        <Card title="Channel Orders" subtitle="Recent incoming orders from connected channels." action={<Button variant="ghost" size="sm" icon={RefreshCw}>Sync Now</Button>}>
            <div className="space-y-3">
                {INTEGRATION_LOGS.map((l, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                             <div className={`p-1.5 rounded-full ${l.status==='ok'?'bg-emerald-100 text-emerald-600':'bg-rose-100 text-rose-600'}`}>
                                 {l.status==='ok'?<Check className="w-3 h-3"/>:<AlertCircle className="w-3 h-3"/>}
                             </div>
                             <div>
                                 <span className="font-bold text-slate-700">{l.ch}</span>
                                 <span className="text-slate-300 mx-2">|</span>
                                 <span className="text-slate-900 font-mono">#{l.id}</span>
                                 <span className="text-slate-400 text-xs ml-2">({l.items} items)</span>
                             </div>
                        </div>
                        <div className="flex items-center text-xs text-slate-400 font-medium">
                            {l.date}
                            <div className="ml-3 p-1 rounded hover:bg-slate-200 text-slate-400 cursor-pointer"><ArrowDown className="w-3 h-3" /></div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
