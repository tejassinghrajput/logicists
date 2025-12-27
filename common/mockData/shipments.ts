import { Shipment } from '../types';

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
},
{
  id: 'SH-1011',
  trackingNumber: 'TRK-34343434',
  origin: 'Bangalore, IN',
  destination: 'Delhi, IN',
  status: 'in_transit',
  customer: 'Infosys',
  estimatedDelivery: '2023-10-28',
  currentLocation: 'Nagpur, IN',
  weight: '22 kg',
  type: 'Express',
  events: [
    { id: 'e15', timestamp: '2023-10-24 14:10', location: 'Nagpur, IN', description: 'Midway hub scan', status: 'in_transit' },
  ]
},
{
  id: 'SH-1012',
  trackingNumber: 'TRK-56565656',
  origin: 'Mumbai, IN',
  destination: 'Chennai, IN',
  status: 'pending',
  customer: 'Reliance',
  estimatedDelivery: '2023-10-30',
  weight: '95 kg',
  type: 'Standard',
  events: [
    { id: 'e16', timestamp: '2023-10-24 09:30', location: 'Mumbai, IN', description: 'Pickup scheduled', status: 'pending' },
  ]
},
{
  id: 'SH-1013',
  trackingNumber: 'TRK-78787878',
  origin: 'Berlin, DE',
  destination: 'Paris, FR',
  status: 'in_transit',
  customer: 'Siemens',
  estimatedDelivery: '2023-10-27',
  currentLocation: 'Frankfurt, DE',
  weight: '110 kg',
  type: 'Express',
  events: [
    { id: 'e17', timestamp: '2023-10-24 18:00', location: 'Frankfurt, DE', description: 'Transferred to EU hub', status: 'in_transit' },
  ]
},
{
  id: 'SH-1014',
  trackingNumber: 'TRK-90909090',
  origin: 'Tokyo, JP',
  destination: 'Osaka, JP',
  status: 'delivered',
  customer: 'Sony',
  estimatedDelivery: '2023-10-21',
  weight: '8 kg',
  type: 'Standard',
  events: [
    { id: 'e18', timestamp: '2023-10-21 10:05', location: 'Osaka, JP', description: 'Delivered to recipient', status: 'delivered' },
  ]
},
{
  id: 'SH-1015',
  trackingNumber: 'TRK-13579135',
  origin: 'Sydney, AU',
  destination: 'Melbourne, AU',
  status: 'in_transit',
  customer: 'Atlassian',
  estimatedDelivery: '2023-10-26',
  currentLocation: 'Canberra, AU',
  weight: '30 kg',
  type: 'Express',
  events: [
    { id: 'e19', timestamp: '2023-10-24 13:45', location: 'Canberra, AU', description: 'Linehaul transit', status: 'in_transit' },
  ]
},
{
  id: 'SH-1016',
  trackingNumber: 'TRK-24682468',
  origin: 'Madrid, ES',
  destination: 'Lisbon, PT',
  status: 'pending',
  customer: 'Zara',
  estimatedDelivery: '2023-10-29',
  weight: '55 kg',
  type: 'Standard',
  events: [
    { id: 'e20', timestamp: '2023-10-24 10:00', location: 'Madrid, ES', description: 'Order confirmed', status: 'pending' },
  ]
},
{
  id: 'SH-1017',
  trackingNumber: 'TRK-86428642',
  origin: 'Dubai, AE',
  destination: 'Riyadh, SA',
  status: 'in_transit',
  customer: 'Aramco',
  estimatedDelivery: '2023-10-28',
  currentLocation: 'Abu Dhabi, AE',
  weight: '780 kg',
  type: 'Freight',
  events: [
    { id: 'e21', timestamp: '2023-10-24 19:10', location: 'Abu Dhabi, AE', description: 'Cross-dock completed', status: 'in_transit' },
  ]
},
{
  id: 'SH-1018',
  trackingNumber: 'TRK-11112222',
  origin: 'Cape Town, ZA',
  destination: 'Johannesburg, ZA',
  status: 'exception',
  customer: 'Naspers',
  estimatedDelivery: '2023-10-26',
  currentLocation: 'Bloemfontein, ZA',
  weight: '140 kg',
  type: 'Standard',
  events: [
    { id: 'e22', timestamp: '2023-10-24 15:25', location: 'Bloemfontein, ZA', description: 'Weather disruption', status: 'exception' },
  ]
},
{
  id: 'SH-1019',
  trackingNumber: 'TRK-33334444',
  origin: 'Rome, IT',
  destination: 'Milan, IT',
  status: 'in_transit',
  customer: 'Ferrari',
  estimatedDelivery: '2023-10-27',
  currentLocation: 'Florence, IT',
  weight: '65 kg',
  type: 'Express',
  events: [
    { id: 'e23', timestamp: '2023-10-24 17:40', location: 'Florence, IT', description: 'Sorting completed', status: 'in_transit' },
  ]
},
{
  id: 'SH-1020',
  trackingNumber: 'TRK-55556666',
  origin: 'Mexico City, MX',
  destination: 'Guadalajara, MX',
  status: 'delivered',
  customer: 'Grupo Bimbo',
  estimatedDelivery: '2023-10-23',
  weight: '20 kg',
  type: 'Standard',
  events: [
    { id: 'e24', timestamp: '2023-10-23 12:30', location: 'Guadalajara, MX', description: 'Delivered', status: 'delivered' },
  ]
},
{
  id: 'SH-1021',
  trackingNumber: 'TRK-77778888',
  origin: 'Beijing, CN',
  destination: 'Shanghai, CN',
  status: 'in_transit',
  customer: 'Alibaba',
  estimatedDelivery: '2023-10-26',
  currentLocation: 'Jinan, CN',
  weight: '500 kg',
  type: 'Freight',
  events: [
    { id: 'e25', timestamp: '2023-10-24 21:00', location: 'Jinan, CN', description: 'Rail transit ongoing', status: 'in_transit' },
  ]
},
{
  id: 'SH-1022',
  trackingNumber: 'TRK-99990000',
  origin: 'Seoul, KR',
  destination: 'Busan, KR',
  status: 'pending',
  customer: 'Samsung',
  estimatedDelivery: '2023-10-29',
  weight: '48 kg',
  type: 'Standard',
  events: [
    { id: 'e26', timestamp: '2023-10-24 08:50', location: 'Seoul, KR', description: 'Awaiting pickup', status: 'pending' },
  ]
},
{
  id: 'SH-1023',
  trackingNumber: 'TRK-12131415',
  origin: 'Bangkok, TH',
  destination: 'Phuket, TH',
  status: 'in_transit',
  customer: 'CP Group',
  estimatedDelivery: '2023-10-27',
  currentLocation: 'Surat Thani, TH',
  weight: '33 kg',
  type: 'Express',
  events: [
    { id: 'e27', timestamp: '2023-10-24 14:55', location: 'Surat Thani, TH', description: 'Regional hub scan', status: 'in_transit' },
  ]
},
{
  id: 'SH-1024',
  trackingNumber: 'TRK-16171819',
  origin: 'São Paulo, BR',
  destination: 'Rio de Janeiro, BR',
  status: 'exception',
  customer: 'Petrobras',
  estimatedDelivery: '2023-10-26',
  currentLocation: 'Campinas, BR',
  weight: '210 kg',
  type: 'Freight',
  events: [
    { id: 'e28', timestamp: '2023-10-24 16:35', location: 'Campinas, BR', description: 'Mechanical inspection required', status: 'exception' },
  ]
},
{
  id: 'SH-1025',
  trackingNumber: 'TRK-20212223',
  origin: 'Zurich, CH',
  destination: 'Vienna, AT',
  status: 'in_transit',
  customer: 'Credit Suisse',
  estimatedDelivery: '2023-10-28',
  currentLocation: 'Innsbruck, AT',
  weight: '12 kg',
  type: 'Express',
  events: [
    { id: 'e29', timestamp: '2023-10-24 18:20', location: 'Innsbruck, AT', description: 'Border clearance completed', status: 'in_transit' },
  ]
},
];