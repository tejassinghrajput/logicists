
import React, { useEffect, useState } from 'react';
import { DataTable, Column, FilterDefinition } from '../../common/components/DataTable';
import { Invoice } from '../../common/types';
import { getInvoices } from '../../common/utils/storage';
import { FileText, Download } from 'lucide-react';
import { InvoiceStats } from './components/InvoiceStats';

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = getInvoices();
    if (response.status === 200) setInvoices(response.data);
    setLoading(false);
  }, []);

  const stats = {
      totalDue: invoices.filter(i => i.status !== 'paid').reduce((acc, curr) => acc + curr.amount, 0),
      overdue: invoices.filter(i => i.status === 'overdue').reduce((acc, curr) => acc + curr.amount, 0),
      paidCount: invoices.filter(i => i.status === 'paid').length
  };
  
  const filterConfig: FilterDefinition<Invoice>[] = [{ key: 'status', label: 'Payment Status', type: 'select', options: [{ label: 'All', value: '' }, { label: 'Paid', value: 'paid' }, { label: 'Pending', value: 'pending' }] }];

  const columns: Column<Invoice>[] = [
    { header: 'Invoice Details', accessorKey: 'invoiceNumber', cell: (inv) => <div className="flex flex-col"><span className="text-sm font-bold text-slate-900 group-hover:text-brand-600">{inv.invoiceNumber}</span><span className="text-xs text-slate-500">{inv.itemsCount} Items</span></div> },
    { header: 'Customer', accessorKey: 'customer', className: 'text-sm font-medium text-slate-900' },
    { header: 'Issue Date', accessorKey: 'issueDate', className: 'text-sm text-slate-500' },
    { header: 'Due Date', accessorKey: 'dueDate', className: 'text-sm text-slate-500' },
    { header: 'Status', accessorKey: 'status', cell: (inv) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide ${inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{inv.status}</span> },
    { header: 'Amount', className: 'text-right text-sm font-bold text-slate-900', cell: (inv) => `$${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` }
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div><h1 className="text-3xl font-bold text-slate-900 tracking-tight">Invoices</h1><p className="text-slate-500 mt-1">Track payments and manage billing documents.</p></div>
      </div>
      <InvoiceStats {...stats} />
      <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
         <DataTable columns={columns} data={invoices} isLoading={loading} emptyMessage="No invoices found." enableSearch={true} searchPlaceholder="Search..." searchKeys={['invoiceNumber', 'customer']} filterConfig={filterConfig} secondaryActions={[{ label: 'Export CSV', icon: Download, onClick: () => {} }]} primaryAction={{ label: 'Create Invoice', icon: FileText, onClick: () => {} }} rowActions={(inv) => [{ label: 'Download PDF', icon: Download, onClick: () => {} }]} />
      </div>
    </>
  );
};
