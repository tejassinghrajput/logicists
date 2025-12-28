import * as I from 'lucide-react';
import { NavItem } from './components/SidebarItem';

export const NAV_GROUPS = [
  { label: "Platform", items: [{ id: 'dash', label: 'Dashboard', icon: I.LayoutDashboard, path: '/' }] },
  { label: "Operations", items: [
    { id: 'ops_parent', label: 'Shipments', icon: I.Truck, children: [
      { id: 's1', label: 'All Orders', path: '/shipments' },
      { id: 's2', label: 'Live Map', path: '/tracking' },
      { id: 's3', label: 'Rate Calculator', path: '/shipments/rates' },
    ]},
    { id: 'ch_parent', label: 'Channels', icon: I.Globe, children: [
      { id: 'c1', label: 'Active', path: '/channels/active' },
      { id: 'c2', label: 'Marketplace', path: '/channels/all' },
      { id: 'c3', label: 'Sync Logs', path: '/channels/orders' },
    ]},
    { id: 'notifications_parent', label: 'Notifications', icon: I.Bell, children: [
      { id: 'n1', label: 'All Activity', path: '/notifications/all' },
      { id: 'n2', label: 'System Alerts', path: '/notifications/alerts' },
      { id: 'n3', label: 'Announcements', path: '/notifications/announcements' },
    ]}
  ]},
  { label: "Finance", items: [{ 
    id: 'fin', label: 'Billing', icon: I.Wallet, children: [
      { id: 'f1', label: 'Wallet', path: '/wallet' },
      { id: 'f2', label: 'Invoices', path: '/invoices' },
    ]
  }]},
  { label: "Configuration", items: [{ 
    id: 'set', label: 'Settings', icon: I.Settings, children: [
      { id: 'st1', label: 'Profile', path: '/settings/profile', icon: I.User },
      { id: 'st2', label: 'Company', path: '/settings/company', icon: I.Building },
      { id: 'st3', label: 'Payouts', path: '/settings/payouts', icon: I.CreditCard },
      { id: 'st4', label: 'Security', path: '/settings/security', icon: I.Shield },
      { id: 'st5', label: 'API Keys', path: '/settings/api', icon: I.Key },
    ]
  }]}
];