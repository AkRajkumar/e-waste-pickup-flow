import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp';
import { vendorPickupRequests } from '../../data/vendorData';

export default function PickupConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = vendorPickupRequests.find(r => r.id === id);
  const [otp, setOtp] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [photo, setPhoto] = useState<File | null>(null);

  if (!request) return <div>Pickup not found</div>;

  const handleComplete = () => {
    navigate(`/vendor/invoice/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/vendor/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Pickup Confirmation #{request.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Verify OTP from Citizen</Label>
              <div className="mt-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div>
              <Label>Upload Photo Proof</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="mt-2"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Final Quantity Entry</h3>
              {request.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Qty:</Label>
                    <Input
                      type="number"
                      className="w-20"
                      defaultValue={item.quantity}
                      onChange={(e) => setQuantities({ ...quantities, [item.name]: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleComplete} className="w-full" disabled={otp.length !== 6}>
              Complete Pickup & Generate Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
