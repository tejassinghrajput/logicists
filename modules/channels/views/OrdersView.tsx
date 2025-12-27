
import React from 'react';
import { ChannelOrders } from '../components/ChannelOrders';

export const OrdersView: React.FC = () => (
    <div className="space-y-6 animate-fade-in">
        <div><h1 className="text-3xl font-bold text-slate-900">Channel Orders</h1><p className="text-slate-500">Real-time order synchronization logs.</p></div>
        <ChannelOrders />
    </div>
);
