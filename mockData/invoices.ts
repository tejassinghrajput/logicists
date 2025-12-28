import { Invoice } from '../common/types';

export const INVOICES: Invoice[] = [
  { id: 'inv-1', invoiceNumber: 'INV-2023-001', issueDate: '2023-10-01', dueDate: '2023-10-15', amount: 1250.00, status: 'paid', customer: 'Acme Corp', itemsCount: 3 },
  { id: 'inv-2', invoiceNumber: 'INV-2023-002', issueDate: '2023-10-05', dueDate: '2023-10-19', amount: 3400.50, status: 'pending', customer: 'Globex Inc', itemsCount: 12 }
];