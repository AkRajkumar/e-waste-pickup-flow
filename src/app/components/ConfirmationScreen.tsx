import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Calendar, MapPin, Package, IndianRupee } from 'lucide-react';
import { vendors } from '../data/mockData';
import type { SelectedItem } from '../pages/SchedulePickupPage';

interface Props {
  selectedItems: SelectedItem[];
  selectedVendor: string;
  scheduledDate: string;
  scheduledTime: string;
  uploadedImages: File[];
}

export default function ConfirmationScreen({
  selectedItems,
  selectedVendor,
  scheduledDate,
  scheduledTime,
  uploadedImages,
}: Props) {
  const navigate = useNavigate();
  const vendor = vendors.find((v) => v.id === selectedVendor);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleConfirm = () => {
    // Mock: Save pickup request
    const pickupId = 'PU' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    localStorage.setItem('lastPickupId', pickupId);
    
    // Navigate to success page
    navigate('/pickup-success');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Pickup Request</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Items Summary */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Items</h3>
          </div>
          <div className="space-y-2">
            {selectedItems.map((item) => (
              <div key={item.itemId} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                <span>{item.itemName} × {item.quantity}</span>
                <span className="font-medium">₹{item.quantity * item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Info */}
        {vendor && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold">Vendor</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{vendor.name}</p>
              <p className="text-sm text-gray-600">{vendor.address}</p>
              <p className="text-sm text-gray-600">{vendor.phone}</p>
            </div>
          </div>
        )}

        {/* Schedule Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Scheduled Pickup</h3>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium">
              {new Date(scheduledDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-600">{scheduledTime}</p>
          </div>
        </div>

        {/* Images */}
        {uploadedImages.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Uploaded Images</h3>
            <p className="text-sm text-gray-600">{uploadedImages.length} image(s) attached</p>
          </div>
        )}

        {/* Total Amount */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Estimated Amount</span>
            </div>
            <span className="text-2xl font-semibold text-green-600">₹{totalAmount}</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-yellow-900">
            Please ensure items are ready for pickup at the scheduled time. 
            Vendor will inspect items and provide final quote.
          </p>
        </div>

        <Button onClick={handleConfirm} className="w-full">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Confirm Pickup Request
        </Button>
      </CardContent>
    </Card>
  );
}
