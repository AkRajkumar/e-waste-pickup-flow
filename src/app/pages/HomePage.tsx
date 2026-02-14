import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Recycle, 
  Calendar, 
  MapPin, 
  History, 
  ListOrdered,
  LogOut,
  MessageSquare
} from 'lucide-react';

const menuItems = [
  {
    icon: ListOrdered,
    title: 'View Rate List',
    description: 'Check current e-waste rates',
    path: '/rates',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Calendar,
    title: 'Schedule Pickup',
    description: 'Book a new e-waste collection',
    path: '/schedule',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: MapPin,
    title: 'Track Recycler',
    description: 'Live tracking of your pickup',
    path: '/track',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: History,
    title: 'History & Certificates',
    description: 'View past pickups and certificates',
    path: '/history',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: MessageSquare,
    title: 'Feedback & Complaints',
    description: 'Share feedback or raise issues',
    path: '/feedback',
    color: 'bg-pink-100 text-pink-600',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const userPhone = localStorage.getItem('userPhone');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userPhone');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Recycle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="font-semibold">E-Waste Management</h1>
              <p className="text-sm text-gray-600">+91 {userPhone}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Welcome Back!</h2>
          <p className="text-gray-600">
            Manage your e-waste responsibly and contribute to a greener planet
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start">
                    Open →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-green-600">12</p>
                <p className="text-sm text-gray-600">Total Pickups</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-blue-600">₹8,450</p>
                <p className="text-sm text-gray-600">Total Earned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-purple-600">45 kg</p>
                <p className="text-sm text-gray-600">E-Waste Recycled</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
