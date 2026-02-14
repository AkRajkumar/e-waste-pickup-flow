import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Building, ArrowLeft } from 'lucide-react';

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ vendorId: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isVendorAuthenticated', 'true');
    localStorage.setItem('vendorId', credentials.vendorId);
    navigate('/vendor/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15}}></div>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
          <g fill="white">
            <circle cx="200" cy="150" r="40" opacity="0.3"/>
            <rect x="150" y="400" width="60" height="80" rx="5" opacity="0.3"/>
            <rect x="500" y="500" width="50" height="70" rx="5" opacity="0.2"/>
            <circle cx="800" cy="200" r="50" opacity="0.3"/>
            <path d="M300,600 L320,580 L340,600 L360,580 L380,600" stroke="white" strokeWidth="3" fill="none" opacity="0.2"/>
          </g>
        </svg>
      </div>
      <Card className="w-full max-w-md shadow-2xl relative z-10 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="absolute left-4 top-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg">
              <Building className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Vendor Login</CardTitle>
          <p className="text-sm text-gray-500">Authorized via CPCB/SPCB</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="vendorId">Vendor ID</Label>
              <Input
                id="vendorId"
                placeholder="Enter CPCB/SPCB Vendor ID"
                value={credentials.vendorId}
                onChange={(e) => setCredentials({ ...credentials, vendorId: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Login as Vendor</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
