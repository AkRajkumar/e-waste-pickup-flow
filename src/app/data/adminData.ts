export interface AdminStats {
  totalRequests: number;
  activeVendors: number;
  citizenParticipation: number;
  eWasteCollected: number;
  carbonSavings: number;
}

export interface CityData {
  city: string;
  zone: string;
  requests: number;
  completed: number;
}

export interface VendorPerformance {
  id: string;
  name: string;
  rating: number;
  completedPickups: number;
  complianceStatus: 'compliant' | 'warning' | 'blacklisted';
  licenseExpiry: string;
}

export interface Complaint {
  id: string;
  type: 'citizen' | 'vendor';
  complainant: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
}

export const adminStats: AdminStats = {
  totalRequests: 1250,
  activeVendors: 45,
  citizenParticipation: 8500,
  eWasteCollected: 125000,
  carbonSavings: 450,
};

export const cityData: CityData[] = [
  { city: 'Bangalore', zone: 'South', requests: 450, completed: 420 },
  { city: 'Delhi', zone: 'North', requests: 380, completed: 350 },
  { city: 'Mumbai', zone: 'West', requests: 320, completed: 300 },
  { city: 'Chennai', zone: 'South', requests: 100, completed: 95 },
];

export const vendorPerformance: VendorPerformance[] = [
  { id: 'V001', name: 'GreenTech Recyclers', rating: 4.8, completedPickups: 1250, complianceStatus: 'compliant', licenseExpiry: '2026-12-31' },
  { id: 'V002', name: 'EcoWaste Solutions', rating: 4.6, completedPickups: 980, complianceStatus: 'compliant', licenseExpiry: '2026-10-15' },
  { id: 'V003', name: 'Sustainable E-Waste Co.', rating: 4.9, completedPickups: 1580, complianceStatus: 'compliant', licenseExpiry: '2027-03-20' },
  { id: 'V004', name: 'Clean Planet Recycling', rating: 3.2, completedPickups: 150, complianceStatus: 'warning', licenseExpiry: '2026-06-30' },
];

export const complaints: Complaint[] = [
  { id: 'C001', type: 'citizen', complainant: 'Rajesh Kumar', subject: 'Vendor did not arrive on time', status: 'resolved', date: '2026-02-10' },
  { id: 'C002', type: 'vendor', complainant: 'GreenTech Recyclers', subject: 'Citizen provided wrong address', status: 'in-progress', date: '2026-02-15' },
  { id: 'C003', type: 'citizen', complainant: 'Priya Sharma', subject: 'Incorrect pricing', status: 'open', date: '2026-02-18' },
];

export const categoryWiseData = [
  { category: 'Computers & Laptops', quantity: 45000, percentage: 36 },
  { category: 'Mobile Devices', quantity: 30000, percentage: 24 },
  { category: 'Home Appliances', quantity: 25000, percentage: 20 },
  { category: 'Audio & Video', quantity: 15000, percentage: 12 },
  { category: 'Batteries & Power', quantity: 10000, percentage: 8 },
];
