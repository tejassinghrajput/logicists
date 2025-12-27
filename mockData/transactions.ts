
import { Transaction } from '../common/types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX-1', date: '2023-10-24', description: 'LogiFlow Subscription (Pro)', amount: -299.00, type: 'debit', status: 'completed', method: 'Visa •••• 4242' },
  { id: 'TX-2', date: '2023-10-23', description: 'Adjustment Credit #SH-1001', amount: 45.50, type: 'credit', status: 'completed', method: 'Wallet Balance' },
  { id: 'TX-3', date: '2023-10-22', description: 'Fuel Surcharge (Oct)', amount: -12.00, type: 'debit', status: 'completed', method: 'Mastercard •••• 8833' },
  { id: 'TX-4', date: '2023-10-21', description: 'Insurance Claim #9921', amount: 1200.00, type: 'credit', status: 'pending', method: 'Bank Transfer' },
  { id: 'TX-5', date: '2023-10-20', description: 'Express Delivery Fee', amount: -55.00, type: 'debit', status: 'completed', method: 'Visa •••• 4242' },
];
