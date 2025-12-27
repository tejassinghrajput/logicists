import React from 'react';
import { Card, Button } from './Shared';
import { MOCK_TRANSACTIONS } from '../constants';
import { CreditCard, Download, PlusCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Wallet: React.FC = () => {
  return (
    <>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wallet & Billing</h1>
          <p className="text-slate-500 mt-1">Manage payment methods, invoices, and transaction history.</p>
        </div>
        <Button variant="primary" icon={PlusCircle}>Add Funds</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {/* Balance Card */}
               <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <CreditCard className="w-32 h-32 transform rotate-12" />
                  </div>
                  <div className="relative z-10">
                     <p className="text-slate-300 text-sm font-medium">Available Balance</p>
                     <h2 className="text-4xl font-bold mt-2">$14,250.00</h2>
                     <div className="mt-8 flex items-center space-x-4">
                        <div className="flex items-center">
                           <div className="w-8 h-5 bg-rose-500/20 rounded mr-2" /> 
                           <span className="text-sm font-mono text-slate-300">•••• 4242</span>
                        </div>
                        <span className="text-xs bg-brand-500 px-2 py-0.5 rounded text-white font-medium">Primary</span>
                     </div>
                  </div>
               </div>

               {/* Quick Actions / Stats */}
               <Card className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-slate-500 text-sm">Next Invoice</p>
                        <p className="text-slate-900 font-bold text-lg">Nov 01, 2023</p>
                     </div>
                     <Button variant="outline" size="sm">View</Button>
                  </div>
                   <div className="w-full h-px bg-slate-100" />
                   <div className="flex items-center justify-between">
                     <div>
                        <p className="text-slate-500 text-sm">Unbilled Usage</p>
                        <p className="text-slate-900 font-bold text-lg">$342.50</p>
                     </div>
                     <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">Pending</span>
                  </div>
               </Card>
            </div>
         </div>
         
         {/* Payment Method Preview */}
         <Card title="Payment Methods">
            <div className="space-y-4 mt-2">
               <div className="flex items-center justify-between p-3 border border-brand-200 bg-brand-50/50 rounded-lg">
                  <div className="flex items-center">
                     <CreditCard className="w-5 h-5 text-brand-600 mr-3" />
                     <div>
                        <p className="text-sm font-medium text-slate-900">Visa ending in 4242</p>
                        <p className="text-xs text-slate-500">Expires 12/24</p>
                     </div>
                  </div>
                  <div className="h-4 w-4 rounded-full border-4 border-brand-600" />
               </div>
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex items-center">
                     <CreditCard className="w-5 h-5 text-slate-400 mr-3" />
                     <div>
                        <p className="text-sm font-medium text-slate-900">Mastercard ending in 8833</p>
                        <p className="text-xs text-slate-500">Expires 09/25</p>
                     </div>
                  </div>
               </div>
               <Button variant="ghost" size="sm" className="w-full mt-2" icon={PlusCircle}>Add New Method</Button>
            </div>
         </Card>
      </div>

      <Card title="Transaction History" action={<Button variant="ghost" size="sm" icon={Download}>Export CSV</Button>}>
         <div className="overflow-x-auto">
            <table className="min-w-full">
               <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Amount</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_TRANSACTIONS.map((tx) => (
                     <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{tx.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{tx.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                              tx.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 
                              tx.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                           }`}>
                              {tx.status}
                           </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${
                           tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                           {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </>
  );
};
