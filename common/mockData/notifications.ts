
import { Notification } from '../types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  { 
    id: '1', 
    title: 'New Feature: AI Analytics', 
    message: 'We have updated the dashboard with predictive shipping analytics. Check it out now!', 
    time: 'Just now', 
    type: 'info', 
    category: 'announcement', 
    read: false 
  },
  { 
    id: '2', 
    title: 'Shipment #SH-1002 Delayed', 
    message: 'Exception reported at Memphis hub. Documentation required.', 
    time: '25 min ago', 
    type: 'warning', 
    category: 'general', 
    read: false 
  },
  { 
    id: '3', 
    title: 'Invoice Paid', 
    message: 'Payment for Invoice #INV-2023-001 has been received successfully.', 
    time: '2 hours ago', 
    type: 'success', 
    category: 'general', 
    read: true 
  },
  { 
    id: '4', 
    title: 'System Maintenance', 
    message: 'Scheduled downtime on Sunday 2am - 4am EST for upgrades.', 
    time: '1 day ago', 
    type: 'info', 
    category: 'announcement', 
    read: true 
  },
  { 
    id: '5', 
    title: 'High Volume Alert', 
    message: 'Unusual spike in order volume detected in the Northeast region.', 
    time: '1 day ago', 
    type: 'info', 
    category: 'general', 
    read: true 
  },
];
