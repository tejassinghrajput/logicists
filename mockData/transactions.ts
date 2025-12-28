import { Transaction } from '../common/types';

export const TRANSACTIONS: Transaction[] = [
  { id: 'TX-1', date: '2023-10-24', description: 'Monthly Subscription', amount: -299.00, type: 'debit', status: 'completed', method: 'Visa' },
  { id: 'TX-2', date: '2023-10-23', description: 'Adjustment Credit', amount: 45.50, type: 'credit', status: 'completed', method: 'Wallet' }
];