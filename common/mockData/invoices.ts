
import { Invoice } from '../types';

export const MOCK_INVOICES: Invoice[] = [
    { id: 'inv-1', invoiceNumber: 'INV-2023-001', issueDate: '2023-10-01', dueDate: '2023-10-15', amount: 1250.00, status: 'paid', customer: 'Acme Corp', itemsCount: 3 },
    { id: 'inv-2', invoiceNumber: 'INV-2023-002', issueDate: '2023-10-05', dueDate: '2023-10-19', amount: 3400.50, status: 'pending', customer: 'Globex Inc', itemsCount: 12 },
    { id: 'inv-3', invoiceNumber: 'INV-2023-003', issueDate: '2023-09-15', dueDate: '2023-09-30', amount: 850.00, status: 'overdue', customer: 'Stark Industries', itemsCount: 2 },
    { id: 'inv-4', invoiceNumber: 'INV-2023-004', issueDate: '2023-10-10', dueDate: '2023-10-24', amount: 2100.00, status: 'pending', customer: 'Wayne Enterprises', itemsCount: 5 },
    { id: 'inv-5', invoiceNumber: 'INV-2023-005', issueDate: '2023-10-12', dueDate: '2023-10-26', amount: 500.00, status: 'paid', customer: 'Cyberdyne Systems', itemsCount: 1 },
    { id: 'inv-6', invoiceNumber: 'INV-2023-006', issueDate: '2023-10-18', dueDate: '2023-11-01', amount: 7500.00, status: 'pending', customer: 'Massive Dynamic', itemsCount: 24 },
];
