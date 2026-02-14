import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { vendorPerformance } from '../../data/adminData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';

export default function VendorManagementPage() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState(vendorPerformance);

  const handleBlacklist = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, complianceStatus: 'blacklisted' as const } : v));
  };

  const handleWarning = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, complianceStatus: 'warning' as const } : v));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Vendor Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                      <p className="text-sm text-gray-500">ID: {vendor.id}</p>
                    </div>
                    <Badge variant={vendor.complianceStatus === 'compliant' ? 'default' : vendor.complianceStatus === 'warning' ? 'secondary' : 'destructive'}>
                      {vendor.complianceStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <p className="font-semibold">{vendor.rating} ⭐</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Completed Pickups</p>
                      <p className="font-semibold">{vendor.completedPickups}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">License Expiry</p>
                      <p className="font-semibold">{vendor.licenseExpiry}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Authorization</p>
                      <p className="font-semibold text-green-600">CPCB Verified</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">Issue Warning</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Issue Warning</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to issue a warning to {vendor.name}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleWarning(vendor.id)}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Blacklist</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Blacklist Vendor</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to blacklist {vendor.name}? This action will suspend their operations.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleBlacklist(vendor.id)}>Blacklist</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
