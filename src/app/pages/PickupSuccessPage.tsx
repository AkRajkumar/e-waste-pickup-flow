import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Home, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function PickupSuccessPage() {
  const navigate = useNavigate();
  const pickupId = localStorage.getItem('lastPickupId') || 'PU0000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>

          <h2 className="text-2xl font-semibold text-center mb-2">
            Pickup Request Confirmed!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Your request has been successfully submitted
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-1">Pickup Request ID</p>
            <p className="text-xl font-semibold text-green-600">{pickupId}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">
                Vendor will contact you shortly to confirm pickup details
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">
                You'll receive live tracking updates on pickup day
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">
                Payment and certificate will be issued after successful pickup
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/home')} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button onClick={() => navigate('/track')} className="flex-1">
              <MapPin className="w-4 h-4 mr-2" />
              Track Pickup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
