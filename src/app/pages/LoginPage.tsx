import { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { useNavigate } from 'react-router';
import { Recycle, Smartphone, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      setCountdown(30);
      // Mock: In real app, this would call an API to send OTP
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Mock: In real app, this would verify OTP with backend
      // For demo, any 6-digit OTP works
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userPhone', phone);
      navigate('/home');
    }
  };

  const handleResendOTP = () => {
    setCountdown(30);
    // Mock: Resend OTP
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 p-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15}}></div>
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
              <Recycle className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">E-Waste Management</CardTitle>
          <CardDescription>
            {otpSent ? 'Enter the OTP sent to your mobile' : 'Sign in to schedule your e-waste pickup'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 border rounded-md bg-gray-50">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    <span>+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOTP} 
                disabled={phone.length !== 10}
                className="w-full"
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
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
                <p className="text-sm text-center text-gray-600">
                  OTP sent to +91 {phone}
                </p>
              </div>
              <Button 
                onClick={handleVerifyOTP} 
                disabled={otp.length !== 6}
                className="w-full"
              >
                Verify & Continue
              </Button>
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in {countdown}s
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                }}
                className="text-sm text-gray-600 hover:underline w-full text-center"
              >
                Change mobile number
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
