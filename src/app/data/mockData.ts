// Mock data for the E-Waste Management System

export interface EWasteCategory {
  id: string;
  name: string;
  icon: string;
  items: EWasteItem[];
}

export interface EWasteItem {
  id: string;
  name: string;
  categoryId: string;
  basePrice: number;
  unit: string;
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  distance: number;
  address: string;
  phone: string;
  certified: boolean;
  completedPickups: number;
}

export interface PickupRequest {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
  }[];
  vendor: {
    id: string;
    name: string;
  };
  totalAmount: number;
  scheduledDate: string;
  scheduledTime: string;
  certificateId?: string;
}

export const ewasteCategories: EWasteCategory[] = [
  {
    id: 'cat1',
    name: 'Computers & Laptops',
    icon: 'Laptop',
    items: [
      { id: 'item1', name: 'Desktop Computer', categoryId: 'cat1', basePrice: 500, unit: 'piece' },
      { id: 'item2', name: 'Laptop', categoryId: 'cat1', basePrice: 400, unit: 'piece' },
      { id: 'item3', name: 'Monitor', categoryId: 'cat1', basePrice: 150, unit: 'piece' },
      { id: 'item4', name: 'Keyboard', categoryId: 'cat1', basePrice: 20, unit: 'piece' },
      { id: 'item5', name: 'Mouse', categoryId: 'cat1', basePrice: 10, unit: 'piece' },
    ],
  },
  {
    id: 'cat2',
    name: 'Mobile Devices',
    icon: 'Smartphone',
    items: [
      { id: 'item6', name: 'Smartphone', categoryId: 'cat2', basePrice: 300, unit: 'piece' },
      { id: 'item7', name: 'Tablet', categoryId: 'cat2', basePrice: 250, unit: 'piece' },
      { id: 'item8', name: 'Smart Watch', categoryId: 'cat2', basePrice: 100, unit: 'piece' },
      { id: 'item9', name: 'Phone Charger', categoryId: 'cat2', basePrice: 5, unit: 'piece' },
    ],
  },
  {
    id: 'cat3',
    name: 'Home Appliances',
    icon: 'Tv',
    items: [
      { id: 'item10', name: 'Television', categoryId: 'cat3', basePrice: 600, unit: 'piece' },
      { id: 'item11', name: 'Refrigerator', categoryId: 'cat3', basePrice: 800, unit: 'piece' },
      { id: 'item12', name: 'Washing Machine', categoryId: 'cat3', basePrice: 700, unit: 'piece' },
      { id: 'item13', name: 'Microwave', categoryId: 'cat3', basePrice: 200, unit: 'piece' },
      { id: 'item14', name: 'Air Conditioner', categoryId: 'cat3', basePrice: 900, unit: 'piece' },
    ],
  },
  {
    id: 'cat4',
    name: 'Audio & Video',
    icon: 'Speaker',
    items: [
      { id: 'item15', name: 'Speakers', categoryId: 'cat4', basePrice: 80, unit: 'piece' },
      { id: 'item16', name: 'Headphones', categoryId: 'cat4', basePrice: 30, unit: 'piece' },
      { id: 'item17', name: 'DVD Player', categoryId: 'cat4', basePrice: 50, unit: 'piece' },
      { id: 'item18', name: 'Camera', categoryId: 'cat4', basePrice: 200, unit: 'piece' },
    ],
  },
  {
    id: 'cat5',
    name: 'Batteries & Power',
    icon: 'Battery',
    items: [
      { id: 'item19', name: 'Laptop Battery', categoryId: 'cat5', basePrice: 40, unit: 'piece' },
      { id: 'item20', name: 'Phone Battery', categoryId: 'cat5', basePrice: 20, unit: 'piece' },
      { id: 'item21', name: 'UPS', categoryId: 'cat5', basePrice: 150, unit: 'piece' },
      { id: 'item22', name: 'Power Bank', categoryId: 'cat5', basePrice: 25, unit: 'piece' },
    ],
  },
  {
    id: 'cat6',
    name: 'Other Electronics',
    icon: 'Cpu',
    items: [
      { id: 'item23', name: 'Printer', categoryId: 'cat6', basePrice: 180, unit: 'piece' },
      { id: 'item24', name: 'Scanner', categoryId: 'cat6', basePrice: 120, unit: 'piece' },
      { id: 'item25', name: 'Router', categoryId: 'cat6', basePrice: 50, unit: 'piece' },
      { id: 'item26', name: 'Set-top Box', categoryId: 'cat6', basePrice: 60, unit: 'piece' },
    ],
  },
];

export const vendors: Vendor[] = [
  {
    id: 'vendor1',
    name: 'GreenTech Recyclers',
    rating: 4.8,
    distance: 2.5,
    address: '123 Green Street, Eco Park',
    phone: '+91 98765 43210',
    certified: true,
    completedPickups: 1250,
  },
  {
    id: 'vendor2',
    name: 'EcoWaste Solutions',
    rating: 4.6,
    distance: 3.8,
    address: '456 Recycle Avenue, Green Zone',
    phone: '+91 98765 43211',
    certified: true,
    completedPickups: 980,
  },
  {
    id: 'vendor3',
    name: 'Sustainable E-Waste Co.',
    rating: 4.9,
    distance: 5.2,
    address: '789 Earth Lane, Eco City',
    phone: '+91 98765 43212',
    certified: true,
    completedPickups: 1580,
  },
  {
    id: 'vendor4',
    name: 'Clean Planet Recycling',
    rating: 4.5,
    distance: 4.1,
    address: '321 Nature Road, Green District',
    phone: '+91 98765 43213',
    certified: true,
    completedPickups: 750,
  },
];

export const mockPickupHistory: PickupRequest[] = [
  {
    id: 'PU001',
    date: '2026-02-10',
    status: 'completed',
    items: [
      { itemId: 'item1', itemName: 'Desktop Computer', quantity: 1, price: 500 },
      { itemId: 'item3', itemName: 'Monitor', quantity: 2, price: 300 },
    ],
    vendor: { id: 'vendor1', name: 'GreenTech Recyclers' },
    totalAmount: 800,
    scheduledDate: '2026-02-10',
    scheduledTime: '10:00 AM',
    certificateId: 'CERT-2026-001',
  },
  {
    id: 'PU002',
    date: '2026-01-28',
    status: 'completed',
    items: [
      { itemId: 'item6', itemName: 'Smartphone', quantity: 2, price: 600 },
    ],
    vendor: { id: 'vendor3', name: 'Sustainable E-Waste Co.' },
    totalAmount: 600,
    scheduledDate: '2026-01-28',
    scheduledTime: '2:00 PM',
    certificateId: 'CERT-2026-002',
  },
  {
    id: 'PU003',
    date: '2026-02-15',
    status: 'pending',
    items: [
      { itemId: 'item10', itemName: 'Television', quantity: 1, price: 600 },
    ],
    vendor: { id: 'vendor2', name: 'EcoWaste Solutions' },
    totalAmount: 600,
    scheduledDate: '2026-02-16',
    scheduledTime: '11:00 AM',
  },
];
