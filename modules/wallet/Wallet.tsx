
import React, { useEffect, useState } from 'react';
import { Button } from '../../common/components/Shared';
import { DataTable, Column, FilterDefinition } from '../../common/components/DataTable';
import { Transaction } from '../../common/types';
import { getTransactions } from '../../common/utils/storage';
import { Download, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BalanceSection } from './components/BalanceSection';
import { PaymentMethods } from './components/PaymentMethods';

export const Wallet: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = getTransactions();
    if (response.status === 200) setTransactions(response.data);
    setLoading(false);
  }, []);
  
  const filterConfig: FilterDefinition<Transaction>[] = [
      { key: 'type', label: 'Transaction Type', type: 'select', options: [{ label: 'All', value: '' }, { label: 'Credit', value: 'credit' }, { label: 'Debit', value: 'debit' }] },
      { key: 'status', label: 'Status', type: 'select', options: [{ label: 'All', value: '' }, { label: 'Completed', value: 'completed' }, { label: 'Pending', value: 'pending' }] }
  ];

  const columns: Column<Transaction>[] = [
    { header: 'Date', accessorKey: 'date', className: 'text-sm text-slate-500' },
    { header: 'Description', accessorKey: 'description', cell: (tx) => <div className="flex items-center"><div className={`p-2 rounded-lg mr-3 ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{tx.type === 'credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}</div><span className="text-sm font-medium text-slate-900">{tx.description}</span></div> },
    { header: 'Status', accessorKey: 'status', cell: (tx) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{tx.status}</span> },
    { header: 'Amount', className: 'text-right', cell: (tx) => <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.amount > 0 ? '+' : ''}{Math.abs(tx.amount).toFixed(2)}</span> }
  ];

  return (
    <>
       <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div><h1 className="text-3xl font-bold text-slate-900 tracking-tight">Wallet</h1><p className="text-slate-500 mt-1">Manage payment methods and view transaction history.</p></div>
        <div className="flex space-x-3"><Button variant="secondary" icon={Download}>Statement</Button><Button variant="primary" icon={Plus}>Add Funds</Button></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-slide-up"><BalanceSection /><PaymentMethods /></div>
      <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
         <DataTable title="Recent Transactions" columns={columns} data={transactions} isLoading={loading} emptyMessage="No transactions found." enableSearch={true} searchPlaceholder="Search..." searchKeys={['description', 'method']} filterConfig={filterConfig} />
      </div>
    </>
  );
};
