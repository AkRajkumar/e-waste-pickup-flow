import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { categoryWiseData, adminStats } from '../../data/adminData';

export default function DataManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total E-Waste Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.eWasteCollected} kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Certificates Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.totalRequests}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">125</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category-wise E-Waste Disposal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryWiseData.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.quantity} kg ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
