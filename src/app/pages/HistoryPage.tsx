import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Download, Calendar, Package, IndianRupee, Award } from 'lucide-react';
import { mockPickupHistory } from '../data/mockData';

export default function HistoryPage() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={() => navigate('/home')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">History & Certificates</h1>
          <p className="text-gray-600">View your past pickups and download certificates</p>
        </div>

        <Tabs defaultValue="pickups" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pickups">Pickup History</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="pickups" className="space-y-4">
            {mockPickupHistory.map((pickup) => (
              <Card key={pickup.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Pickup #{pickup.id}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(pickup.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge className={getStatusBadge(pickup.status)}>
                      {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Items */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium">Items</p>
                      </div>
                      <div className="space-y-1">
                        {pickup.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-600 pl-6">
                            {item.itemName} × {item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <p className="text-sm">
                          {pickup.scheduledDate} at {pickup.scheduledTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <p className="text-sm">{pickup.vendor.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <p className="text-sm font-semibold text-green-600">
                          ₹{pickup.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {pickup.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            {mockPickupHistory
              .filter((p) => p.certificateId)
              .map((pickup) => (
                <Card key={pickup.certificateId}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold mb-1">
                            E-Waste Recycling Certificate
                          </p>
                          <p className="text-sm text-gray-600">
                            Certificate ID: {pickup.certificateId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Issued on: {new Date(pickup.date).toLocaleDateString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Pickup ID: {pickup.id}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-900">
                        This certificate confirms that your e-waste was properly recycled 
                        in compliance with environmental regulations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {mockPickupHistory.filter((p) => p.certificateId).length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-gray-600">
                    Certificates are issued after successful e-waste pickups
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
