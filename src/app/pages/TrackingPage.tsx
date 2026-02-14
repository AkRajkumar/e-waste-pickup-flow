import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, MapPin, Phone, CheckCircle2, Package, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrackingPage() {
  const navigate = useNavigate();
  const [activePickup] = useState({
    id: 'PU0123',
    status: 'in-progress',
    vendor: {
      name: 'GreenTech Recyclers',
      phone: '+91 98765 43210',
      driver: 'Rajesh Kumar',
    },
    scheduledTime: '10:00 AM - 12:00 PM',
    estimatedArrival: '10:45 AM',
    currentLocation: 'Green Street, 2.5 km away',
  });

  const trackingSteps = [
    { id: 1, label: 'Request Confirmed', status: 'completed', icon: CheckCircle2 },
    { id: 2, label: 'Vendor Assigned', status: 'completed', icon: Package },
    { id: 3, label: 'Pickup In Progress', status: 'active', icon: Truck },
    { id: 4, label: 'Completed', status: 'pending', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={() => navigate('/home')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">Track Your Pickup</h1>
          <p className="text-gray-600">Real-time updates on your e-waste collection</p>
        </div>

        {/* Active Pickup Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pickup #{activePickup.id}</CardTitle>
              <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Live tracking map</p>
                  <p className="text-xs text-gray-500">Vendor location: {activePickup.currentLocation}</p>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{activePickup.vendor.name}</p>
                    <p className="text-sm text-gray-600">Driver: {activePickup.vendor.driver}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scheduled Time:</span>
                    <span className="font-medium">{activePickup.scheduledTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Arrival:</span>
                    <span className="font-medium text-green-600">{activePickup.estimatedArrival}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Pickup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : step.status === 'active'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${
                            step.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-medium">{step.label}</p>
                      {step.status === 'active' && (
                        <p className="text-sm text-blue-600">Currently in progress...</p>
                      )}
                      {step.status === 'completed' && (
                        <p className="text-sm text-green-600">✓ Completed</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* No Active Pickup State */}
        {/* Uncomment this to show when no pickup is active */}
        {/* <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Active Pickup</h3>
            <p className="text-gray-600 mb-6">
              You don't have any active pickups to track at the moment
            </p>
            <Button onClick={() => navigate('/schedule')}>
              Schedule New Pickup
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
