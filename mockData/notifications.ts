
import { Notification } from '../common/types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'New Feature: AI Analytics', message: 'We have updated the dashboard.', time: 'Just now', type: 'info', category: 'announcement', read: false },
  { id: '2', title: 'Shipment #SH-1002 Delayed', message: 'Exception reported at Memphis hub.', time: '25 min ago', type: 'warning', category: 'general', read: false },
  { id: '3', title: 'Invoice Paid', message: 'Payment for Invoice #INV-2023-001 received.', time: '2 hours ago', type: 'success', category: 'general', read: true },
];
