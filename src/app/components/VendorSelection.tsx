import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { vendors } from '../data/mockData';
import { MapPin, Star, Phone, CheckCircle2, Package } from 'lucide-react';

interface Props {
  selectedVendor: string;
  onSelectVendor: (vendorId: string) => void;
  onNext: () => void;
}

export default function VendorSelection({ selectedVendor, onSelectVendor, onNext }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Authorized Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor(vendor.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedVendor === vendor.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{vendor.name}</h3>
                    {vendor.certified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{vendor.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{vendor.completedPickups}+ pickups</span>
                    </div>
                  </div>
                </div>
                {selectedVendor === vendor.id && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {vendor.address}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {vendor.phone}
              </p>
            </div>
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!selectedVendor}
          className="w-full"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
