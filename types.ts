export type ViewState = 'dashboard' | 'shipments' | 'tracking' | 'wallet' | 'settings';
export type UserRole = 'admin' | 'manager' | 'driver';

export type ShipmentStatus = 'pending' | 'processing' | 'in_transit' | 'delivered' | 'exception';

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
}
