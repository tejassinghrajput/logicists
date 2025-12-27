import { LayoutDashboard, Truck, Wallet, Settings, Globe, User, Building, Shield, Bell, Key, Blocks, CreditCard } from 'lucide-react';
import { NavItem } from './components/SidebarItem';

type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  { label: "Platform", items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' }] },
  {
    label: "Operations",
    items: [
      { 
        id: 'ops_parent', label: 'Shipments', icon: Truck,
        children: [
            { id: 'shipments', label: 'All Orders', path: '/shipments' },
            { id: 'tracking', label: 'Live Map', path: '/tracking' },
        ]
      },
      { 
        id: 'channels_parent', label: 'Channels', icon: Globe,
        children: [
            { id: 'channels_active', label: 'Active Channels', path: '/channels/active' },
            { id: 'channels_all', label: 'All Channels', path: '/channels/all' },
            { id: 'channels_orders', label: 'Channel Orders', path: '/channels/orders' },
        ]
      },
    ]
  },
  {
    label: "Finance",
    items: [
      { 
        id: 'fin_parent', label: 'Billing', icon: Wallet,
        children: [
            { id: 'wallet', label: 'Wallet & Cards', path: '/wallet' },
            { id: 'invoices', label: 'Invoices', path: '/invoices' },
        ]
      },
    ]
  },
  {
    label: "Activity",
    items: [
        {
            id: 'notifications_parent', label: 'Notifications', icon: Bell,
            children: [
                { id: 'notifications_all', label: 'All Activity', path: '/notifications/all' },
                { id: 'notifications_alerts', label: 'Alerts', path: '/notifications/alerts' },
                { id: 'notifications_announcements', label: 'Announcements', path: '/notifications/announcements' },
            ]
        }
    ]
  },
  {
    label: "Configuration",
    items: [
      { 
        id: 'settings_parent', label: 'Settings', icon: Settings,
        children: [
            { id: 'settings_user', label: 'My Profile', path: '/settings/profile', icon: User },
            { id: 'settings_company', label: 'Company Details', path: '/settings/company', icon: Building },
            { id: 'settings_payouts', label: 'Payout Settings', path: '/settings/payouts', icon: CreditCard },
            { id: 'settings_security', label: 'Security', path: '/settings/security', icon: Shield },
            { id: 'settings_notifications', label: 'Notifications', path: '/settings/notifications', icon: Bell },
            { id: 'settings_integrations', label: 'Integrations', path: '/settings/integrations', icon: Blocks },
            { id: 'settings_api', label: 'API Keys', path: '/settings/api', icon: Key },
        ]
      },
    ]
  }
];