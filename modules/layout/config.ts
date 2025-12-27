
import { LayoutDashboard, Truck, Wallet, Settings, Globe, User, Building, Shield, Bell, Key, Blocks, CreditCard } from 'lucide-react';
import { NavItem } from './components/SidebarItem';

type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    ]
  },
  {
    label: "Operations",
    items: [
      { 
        id: 'ops_parent', label: 'Shipments', icon: Truck,
        children: [
            { id: 'shipments', label: 'All Orders', view: 'shipments' },
            { id: 'tracking', label: 'Live Map', view: 'tracking' },
        ]
      },
      { 
        id: 'channels_parent', label: 'Channels', icon: Globe,
        children: [
            { id: 'channels_active', label: 'Active Channels', view: 'channels_active' },
            { id: 'channels_all', label: 'All Channels', view: 'channels_all' },
            { id: 'channels_orders', label: 'Channel Orders', view: 'channels_orders' },
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
            { id: 'wallet', label: 'Wallet & Cards', view: 'wallet' },
            { id: 'invoices', label: 'Invoices', view: 'invoices' },
        ]
      },
    ]
  },
  {
    label: "Configuration",
    items: [
      { 
        id: 'settings_parent', label: 'Settings', icon: Settings,
        children: [
            { id: 'settings_user', label: 'My Profile', view: 'settings_user', icon: User },
            { id: 'settings_company', label: 'Company Details', view: 'settings_company', icon: Building },
            { id: 'settings_payouts', label: 'Payout Settings', view: 'settings_payouts', icon: CreditCard },
            { id: 'settings_security', label: 'Security', view: 'settings_security', icon: Shield },
            { id: 'settings_notifications', label: 'Notifications', view: 'settings_notifications', icon: Bell },
            { id: 'settings_integrations', label: 'Integrations', view: 'settings_integrations', icon: Blocks },
            { id: 'settings_api', label: 'API Keys', view: 'settings_api', icon: Key },
        ]
      },
    ]
  }
];
