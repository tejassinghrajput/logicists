
import React, { useEffect, useState } from 'react';
import { Card, Button, StatusBadge } from '../../common/components/Shared';
import { ViewState, KPI, Shipment } from '../../common/types';
import { getKPIs, getShipments } from '../../common/utils/storage';
import { CHART_DATA } from '../../mockData/charts';
import { ArrowUpRight, ArrowDownRight, Box, Truck, AlertTriangle, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps { onNavigate: (view: ViewState, id?: string) => void; }

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setKpis(getKPIs().data);
    setRecentShipments(getShipments().data.slice(0, 4));
    setLoading(false);
  }, []);

  const getKpiConfig = (iconType: string) => {
    switch (iconType) {
      case 'dollar': return { color: 'violet', icon: DollarSign };
      case 'truck': return { color: 'teal', icon: Truck };
      case 'alert': return { color: 'orange', icon: AlertTriangle };
      case 'box': default: return { color: 'brand', icon: Box };
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center p-12 text-slate-400">Loading...</div>;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time insights into your logistics operations.</p>
        </div>
        <div className="flex space-x-3">
           <Button variant="secondary" size="sm" icon={Calendar}>Last 30 Days</Button>
           <Button variant="primary" size="sm" icon={TrendingUp} onClick={() => onNavigate('shipments')}>New Shipment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {kpis.map((kpi, idx) => {
          const { color, icon: Icon } = getKpiConfig(kpi.icon);
          const isPos = kpi.trend === 'up';
          
          const bgMap: Record<string, string> = {
              violet: 'bg-violet-50 text-violet-600',
              teal: 'bg-teal-50 text-teal-600',
              orange: 'bg-orange-50 text-orange-600',
              brand: 'bg-brand-50 text-brand-600'
          };
          const bgClass = bgMap[color] || bgMap.brand;
          
          return (
            <Card key={idx} className="relative overflow-hidden group hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
               <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-2xl ${bgClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                   </div>
                   <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${isPos ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'}`}>
                      {isPos ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {Math.abs(kpi.change)}%
                   </span>
               </div>
               <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>
               </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card title="Shipment Volume" className="lg:col-span-2 min-h-[400px]">
           <div className="h-80 w-full mt-6">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                 <Tooltip cursor={{ stroke: '#8b5cf6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                 <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card title="Recent Activity" action={<Button variant="ghost" size="sm" onClick={() => onNavigate('shipments')}>View All</Button>}>
          <div className="space-y-3 mt-4">
            {recentShipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/20 transition-all cursor-pointer" onClick={() => onNavigate('tracking', shipment.id)}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{shipment.trackingNumber}</p>
                    <p className="text-xs text-slate-500 font-medium">{shipment.destination}</p>
                  </div>
                </div>
                <StatusBadge status={shipment.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
