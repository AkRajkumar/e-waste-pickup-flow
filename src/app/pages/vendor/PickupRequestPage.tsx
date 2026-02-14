import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { vendorPickupRequests } from '../../data/vendorData';

export default function PickupRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = vendorPickupRequests.find(r => r.id === id);
  const [quote, setQuote] = useState({ price: '', notes: '' });

  if (!request) return <div>Request not found</div>;

  const handleSendQuote = () => {
    navigate('/vendor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/vendor/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Pickup Request #{request.id}</CardTitle>
            <p className="text-sm text-gray-500">From: {request.citizenName}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              {request.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Uploaded Images</h3>
              <div className="grid grid-cols-3 gap-2">
                {request.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`Item ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm">{request.location}</p>
            </div>

            <div>
              <h3 className="font-semibold">Preferred Date & Time</h3>
              <p className="text-sm">{request.preferredDate} at {request.preferredTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send Quote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">Quote Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter final price"
                value={quote.price}
                onChange={(e) => setQuote({ ...quote, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes for the citizen"
                value={quote.notes}
                onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
              />
            </div>
            <Button onClick={handleSendQuote} className="w-full">Send Quote to Citizen</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
