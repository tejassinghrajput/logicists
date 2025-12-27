
import React from 'react';
import { Wallet as WalletIcon, TrendingUp } from 'lucide-react';

export const BalanceSection: React.FC = () => {
  return (
    <div className="lg:col-span-1">
        <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/50 to-slate-900 z-0"></div>
            <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-brand-500/20 blur-3xl rounded-full"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl"><WalletIcon className="w-6 h-6 text-brand-300" /></div>
                    <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">Active</span>
                </div>
                <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Balance</p>
                    <h2 className="text-4xl font-bold mt-2 tracking-tight">$14,250.00</h2>
                    <div className="flex items-center mt-3 text-sm text-emerald-400"><TrendingUp className="w-4 h-4 mr-1.5" /><span>+12.5% vs last month</span></div>
                </div>
            </div>
            <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Monthly Limit</span><span className="text-white font-medium">$50,000.00</span></div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden"><div className="bg-brand-500 h-full rounded-full" style={{ width: '28%' }}></div></div>
            </div>
        </div>
    </div>
  );
};
