import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Recycle, User, Building, Shield } from 'lucide-react';

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15}}></div>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
          <g fill="white">
            <circle cx="200" cy="150" r="40" opacity="0.3"/>
            <circle cx="400" cy="100" r="30" opacity="0.2"/>
            <circle cx="800" cy="200" r="50" opacity="0.3"/>
            <circle cx="1000" cy="150" r="35" opacity="0.2"/>
            <rect x="150" y="400" width="60" height="80" rx="5" opacity="0.3"/>
            <rect x="500" y="500" width="50" height="70" rx="5" opacity="0.2"/>
            <rect x="900" y="450" width="55" height="75" rx="5" opacity="0.3"/>
            <path d="M300,600 L320,580 L340,600 L360,580 L380,600" stroke="white" strokeWidth="3" fill="none" opacity="0.2"/>
            <path d="M700,650 L720,630 L740,650 L760,630 L780,650" stroke="white" strokeWidth="3" fill="none" opacity="0.2"/>
            <circle cx="250" cy="700" r="25" opacity="0.2"/>
            <circle cx="950" cy="680" r="30" opacity="0.3"/>
            <rect x="600" y="250" width="45" height="60" rx="5" opacity="0.2"/>
          </g>
        </svg>
      </div>
      <Card className="w-full max-w-2xl shadow-2xl relative z-10 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Recycle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">E-Waste Management System</CardTitle>
          <p className="text-gray-500 mt-2">Select your role to continue</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-blue-400" onClick={() => navigate('/citizen/login')}>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <div className="p-4 bg-blue-100 rounded-full">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">Citizen</h3>
              <p className="text-sm text-gray-500 text-center">Schedule e-waste pickup</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-green-400" onClick={() => navigate('/vendor/login')}>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <div className="p-4 bg-green-100 rounded-full">
                <Building className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">Vendor</h3>
              <p className="text-sm text-gray-500 text-center">CPCB/SPCB Authorized</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-purple-400" onClick={() => navigate('/admin/login')}>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <div className="p-4 bg-purple-100 rounded-full">
                <Shield className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">Admin</h3>
              <p className="text-sm text-gray-500 text-center">System Management</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
