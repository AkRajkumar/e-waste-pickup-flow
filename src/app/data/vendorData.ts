export interface VendorPickupRequest {
  id: string;
  citizenName: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  status: 'new' | 'quoted' | 'accepted' | 'in-progress' | 'completed';
  items: {
    name: string;
    quantity: number;
  }[];
  images: string[];
  quotedPrice?: number;
  finalPrice?: number;
  certificateId?: string;
}

export const vendorPickupRequests: VendorPickupRequest[] = [
  {
    id: 'REQ001',
    citizenName: 'Rajesh Kumar',
    location: '123 MG Road, Bangalore',
    preferredDate: '2026-02-20',
    preferredTime: '10:00 AM',
    status: 'new',
    items: [
      { name: 'Desktop Computer', quantity: 1 },
      { name: 'Monitor', quantity: 2 },
      { name: 'Keyboard', quantity: 1 },
    ],
    images: [
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=200',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200',
    ],
  },
  {
    id: 'REQ002',
    citizenName: 'Priya Sharma',
    location: '456 Park Street, Delhi',
    preferredDate: '2026-02-21',
    preferredTime: '2:00 PM',
    status: 'accepted',
    items: [
      { name: 'Smartphone', quantity: 2 },
      { name: 'Tablet', quantity: 1 },
    ],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
    ],
    quotedPrice: 850,
  },
  {
    id: 'REQ003',
    citizenName: 'Amit Patel',
    location: '789 Lake View, Mumbai',
    preferredDate: '2026-02-15',
    preferredTime: '11:00 AM',
    status: 'completed',
    items: [
      { name: 'Television', quantity: 1 },
      { name: 'DVD Player', quantity: 1 },
    ],
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
    ],
    quotedPrice: 650,
    finalPrice: 650,
    certificateId: 'CERT-2026-REQ003',
  },
];
