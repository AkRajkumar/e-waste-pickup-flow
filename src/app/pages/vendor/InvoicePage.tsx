import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { vendorPickupRequests } from '../../data/vendorData';

export default function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = vendorPickupRequests.find(r => r.id === id);

  if (!request) return <div>Invoice not found</div>;

  const handleSubmitToAdmin = () => {
    alert('Data submitted to Admin Portal successfully!');
    navigate('/vendor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice</CardTitle>
              <p className="text-sm text-gray-500">Invoice #{request.id}-INV</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Bill To:</p>
                <p className="text-sm">{request.citizenName}</p>
                <p className="text-sm text-gray-500">{request.location}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-semibold mb-2">Items</p>
                {request.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.quantity * 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{request.finalPrice || request.quotedPrice}</span>
              </div>

              <Button variant="outline" className="w-full">Download Invoice</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recycling Certificate</CardTitle>
              <p className="text-sm text-gray-500">Certificate #{request.certificateId || `CERT-${id}`}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Certified By:</p>
                <p className="text-sm">CPCB Authorized Vendor</p>
                <p className="text-sm text-gray-500">License: CPCB-2024-{id}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-semibold mb-2">E-Waste Collected</p>
                {request.items.map((item, idx) => (
                  <p key={idx} className="text-sm py-1">• {item.name} ({item.quantity} units)</p>
                ))}
              </div>

              <Separator />

              <div>
                <p className="text-sm"><strong>Disposal Method:</strong> Eco-friendly recycling</p>
                <p className="text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>

              <Button variant="outline" className="w-full">Download Certificate</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Button onClick={handleSubmitToAdmin} className="w-full">Submit Data to Admin Portal</Button>
        </div>
      </div>
    </div>
  );
}
