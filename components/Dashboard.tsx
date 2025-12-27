import React from 'react';
import { Card, Button, StatusBadge } from './Shared';
import { MOCK_KPI_DATA, MOCK_SHIPMENTS, CHART_DATA } from '../constants';
import { ViewState } from '../types';
import { ArrowUpRight, ArrowDownRight, Box, Truck, AlertTriangle, DollarSign, ExternalLink, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  onNavigate: (view: ViewState, id?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const iconMap = {
    box: Box,
    truck: Truck,
    alert: AlertTriangle,
    dollar: DollarSign,
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your operations today.</p>
        </div>
        <div className="flex space-x-3">
           <Button variant="outline" size="sm" icon={Calendar}>Last 30 Days</Button>
           <Button variant="primary" size="sm" onClick={() => onNavigate('shipments')}>New Shipment</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_KPI_DATA.map((kpi, idx) => {
          const Icon = iconMap[kpi.icon];
          const isPositive = kpi.trend === 'up';
          return (
            <Card key={idx} className="relative overflow-hidden">
               <div className="flex items-start justify-between">
                 <div>
                    <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{kpi.value}</p>
                 </div>
                 <div className={`p-2 rounded-lg ${
                   kpi.icon === 'alert' ? 'bg-rose-50 text-rose-600' : 'bg-brand-50 text-brand-600'
                 }`}>
                   <Icon className="w-5 h-5" />
                 </div>
               </div>
               <div className="mt-4 flex items-center">
                 <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                   {Math.abs(kpi.change)}%
                 </span>
                 <span className="text-xs text-slate-400 ml-2">vs last month</span>
               </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card title="Shipment Volume" className="lg:col-span-2 min-h-[400px]">
           <div className="h-80 w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                 <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                 <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={32} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Shipments" action={<Button variant="ghost" size="sm" onClick={() => onNavigate('shipments')}>View All</Button>}>
          <div className="space-y-4 mt-2">
            {MOCK_SHIPMENTS.slice(0, 4).map((shipment) => (
              <div 
                key={shipment.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onNavigate('tracking', shipment.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-brand-600 transition-colors">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{shipment.trackingNumber}</p>
                    <p className="text-xs text-slate-500">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <StatusBadge status={shipment.status} />
                   <span className="text-[10px] text-slate-400 mt-1">{shipment.estimatedDelivery}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
