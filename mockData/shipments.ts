
import { Shipment } from '../common/types';

export const MOCK_SHIPMENTS: Shipment[] = [
  {
  id: 'SH-1006',
  trackingNumber: 'TRK-33001122',
  origin: 'Dallas, TX',
  destination: 'Phoenix, AZ',
  status: 'in_transit',
  customer: 'Umbrella Corp',
  estimatedDelivery: '2023-10-27',
  currentLocation: 'El Paso, TX',
  weight: '85 kg',
  type: 'Express',
  events: [
    { id: 'e9', timestamp: '2023-10-24 11:30', location: 'El Paso, TX', description: 'Arrived at hub', status: 'in_transit' },
    { id: 'e10', timestamp: '2023-10-23 07:45', location: 'Dallas, TX', description: 'Picked up from shipper', status: 'processing' },
  ]
},
{
  id: 'SH-1007',
  trackingNumber: 'TRK-99887766',
  origin: 'San Jose, CA',
  destination: 'Las Vegas, NV',
  status: 'delivered',
  customer: 'Hooli',
  estimatedDelivery: '2023-10-22',
  weight: '18 kg',
  type: 'Standard',
  events: [
    { id: 'e11', timestamp: '2023-10-22 13:10', location: 'Las Vegas, NV', description: 'Delivered successfully', status: 'delivered' },
  ]
},
{
  id: 'SH-1008',
  trackingNumber: 'TRK-44112233',
  origin: 'Atlanta, GA',
  destination: 'Orlando, FL',
  status: 'pending',
  customer: 'Initech',
  estimatedDelivery: '2023-10-29',
  weight: '40 kg',
  type: 'Standard',
  events: [
    { id: 'e12', timestamp: '2023-10-24 08:20', location: 'Atlanta, GA', description: 'Shipment created', status: 'pending' },
  ]
},
{
  id: 'SH-1009',
  trackingNumber: 'TRK-66554433',
  origin: 'Houston, TX',
  destination: 'New Orleans, LA',
  status: 'in_transit',
  customer: 'Oscorp',
  estimatedDelivery: '2023-10-26',
  currentLocation: 'Lake Charles, LA',
  weight: '300 kg',
  type: 'Freight',
  events: [
    { id: 'e13', timestamp: '2023-10-24 16:00', location: 'Lake Charles, LA', description: 'Crossed state border', status: 'in_transit' },
  ]
},
{
  id: 'SH-1010',
  trackingNumber: 'TRK-12121212',
  origin: 'Detroit, MI',
  destination: 'Toronto, CA',
  status: 'exception',
  customer: 'Wonka Industries',
  estimatedDelivery: '2023-10-27',
  currentLocation: 'Windsor, ON',
  weight: '60 kg',
  type: 'Express',
  events: [
    { id: 'e14', timestamp: '2023-10-24 12:40', location: 'Windsor, ON', description: 'Customs inspection delay', status: 'exception' },
  ]
}
];
