import { Shipment } from '../common/types';

export const SHIPMENTS: Shipment[] = [
  {
    id: 'SH-1001',
    trackingNumber: 'TRK-88392102',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    status: 'in_transit',
    customer: 'Acme Corp',
    estimatedDelivery: '2023-10-25',
    weight: '120 kg',
    type: 'Express',
    events: []
  },
  {
    id: 'SH-1002',
    trackingNumber: 'TRK-99281100',
    origin: 'Seattle, WA',
    destination: 'Miami, FL',
    status: 'exception',
    customer: 'Globex Inc',
    estimatedDelivery: '2023-10-26',
    weight: '450 kg',
    type: 'Freight',
    events: []
  }
];