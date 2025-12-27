import { KPI, Shipment, Transaction } from './types';

export const MOCK_KPI_DATA: KPI[] = [
  { label: 'Total Shipments', value: '1,245', change: 12.5, trend: 'up', icon: 'box' },
  { label: 'Active Deliveries', value: '324', change: 8.2, trend: 'up', icon: 'truck' },
  { label: 'Exceptions', value: '12', change: -2.4, trend: 'down', icon: 'alert' },
  { label: 'Revenue', value: '$45,231', change: 15.3, trend: 'up', icon: 'dollar' },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SH-1001',
    trackingNumber: 'TRK-88392102',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    status: 'in_transit',
    customer: 'Acme Corp',
    estimatedDelivery: '2023-10-25',
    currentLocation: 'Denver, CO',
    weight: '120 kg',
    type: 'Express',
    events: [
      { id: 'e1', timestamp: '2023-10-23 14:00', location: 'Denver, CO', description: 'Arrived at distribution center', status: 'in_transit' },
      { id: 'e2', timestamp: '2023-10-22 09:00', location: 'Chicago, IL', description: 'Departed facility', status: 'in_transit' },
      { id: 'e3', timestamp: '2023-10-21 16:30', location: 'New York, NY', description: 'Package picked up', status: 'processing' },
    ]
  },
  {
    id: 'SH-1002',
    trackingNumber: 'TRK-99281100',
    origin: 'Seattle, WA',
    destination: 'Miami, FL',
    status: 'exception',
    customer: 'Globex Inc',
    estimatedDelivery: '2023-10-26',
    currentLocation: 'Memphis, TN',
    weight: '450 kg',
    type: 'Freight',
    events: [
      { id: 'e4', timestamp: '2023-10-24 10:15', location: 'Memphis, TN', description: 'Clearance delay - Documentation missing', status: 'exception' },
      { id: 'e5', timestamp: '2023-10-22 08:00', location: 'Seattle, WA', description: 'Departed facility', status: 'in_transit' },
    ]
  },
  {
    id: 'SH-1003',
    trackingNumber: 'TRK-11223344',
    origin: 'Austin, TX',
    destination: 'Chicago, IL',
    status: 'delivered',
    customer: 'Stark Ind',
    estimatedDelivery: '2023-10-20',
    weight: '5 kg',
    type: 'Standard',
    events: [
      { id: 'e6', timestamp: '2023-10-20 15:45', location: 'Chicago, IL', description: 'Delivered to front desk', status: 'delivered' },
    ]
  },
  {
    id: 'SH-1004',
    trackingNumber: 'TRK-55667788',
    origin: 'San Francisco, CA',
    destination: 'Portland, OR',
    status: 'pending',
    customer: 'Cyberdyne',
    estimatedDelivery: '2023-10-28',
    weight: '12 kg',
    type: 'Standard',
    events: [
      { id: 'e7', timestamp: '2023-10-24 09:00', location: 'San Francisco, CA', description: 'Label created', status: 'pending' },
    ]
  },
    {
    id: 'SH-1005',
    trackingNumber: 'TRK-77441122',
    origin: 'Boston, MA',
    destination: 'London, UK',
    status: 'in_transit',
    customer: 'Wayne Ent',
    estimatedDelivery: '2023-11-01',
    currentLocation: 'Atlantic Ocean',
    weight: '2500 kg',
    type: 'Freight',
    events: [
      { id: 'e8', timestamp: '2023-10-24 20:00', location: 'Boston Port', description: 'Vessel departure', status: 'in_transit' },
    ]
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX-1', date: '2023-10-24', description: 'Monthly Subscription', amount: -299.00, type: 'debit', status: 'completed' },
  { id: 'TX-2', date: '2023-10-23', description: 'Shipping Adjustment #SH-1001', amount: 45.50, type: 'credit', status: 'completed' },
  { id: 'TX-3', date: '2023-10-22', description: 'Fuel Surcharge', amount: -12.00, type: 'debit', status: 'completed' },
  { id: 'TX-4', date: '2023-10-21', description: 'Insurance Claim Payout', amount: 1200.00, type: 'credit', status: 'pending' },
  { id: 'TX-5', date: '2023-10-20', description: 'Express Delivery Fee', amount: -55.00, type: 'debit', status: 'completed' },
];

export const CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 480 },
  { name: 'Fri', value: 390 },
  { name: 'Sat', value: 240 },
  { name: 'Sun', value: 180 },
];
