
export type ViewState = 
  | 'dashboard' | 'shipments' | 'tracking' | 'wallet' | 'invoices' 
  | 'settings_user' | 'settings_company' | 'settings_payouts'
  | 'settings_security' | 'settings_notifications' 
  | 'settings_integrations' | 'settings_api'
  | 'channels_active' | 'channels_all' | 'channels_orders';

export type UserRole = 'admin' | 'manager' | 'driver';
export type ShipmentStatus = 'pending' | 'processing' | 'in_transit' | 'delivered' | 'exception';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  errors: any | null;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  customer: string;
  estimatedDelivery: string;
  currentLocation?: string;
  weight: string;
  type: 'Standard' | 'Express' | 'Freight';
  events: ShipmentEvent[];
}

export interface ShipmentEvent {
  id: string;
  timestamp: string;
  location: string;
  description: string;
  status: ShipmentStatus;
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: 'box' | 'truck' | 'alert' | 'dollar';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  customer: string;
  itemsCount: number;
}

export interface ChartDataPoint { name: string; value: number; }

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'general' | 'announcement';
  read: boolean;
  actionUrl?: string;
}
