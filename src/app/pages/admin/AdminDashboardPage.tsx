import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { adminStats, cityData, vendorPerformance } from '../../data/adminData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-purple-600">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin/login'); }}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.totalRequests}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Active Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.activeVendors}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Citizen Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.citizenParticipation}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Carbon Savings (tons)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{adminStats.carbonSavings}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cities">City/Zone-wise</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Performance</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="cities">
            <Card>
              <CardHeader>
                <CardTitle>City / Zone-wise Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cityData.map((city) => (
                    <div key={city.city} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">{city.city}</p>
                        <p className="text-sm text-gray-500">Zone: {city.zone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Requests: {city.requests}</p>
                        <p className="text-sm text-green-600">Completed: {city.completed}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {vendorPerformance.map((vendor) => (
                    <div key={vendor.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">{vendor.name}</p>
                        <p className="text-sm text-gray-500">Rating: {vendor.rating} ⭐</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Pickups: {vendor.completedPickups}</p>
                        <p className={`text-sm ${vendor.complianceStatus === 'compliant' ? 'text-green-600' : 'text-red-600'}`}>
                          {vendor.complianceStatus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded">
                    <p className="text-sm text-gray-600">E-Waste Collected</p>
                    <p className="text-2xl font-bold">{adminStats.eWasteCollected} kg</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded">
                    <p className="text-sm text-gray-600">Carbon Savings</p>
                    <p className="text-2xl font-bold">{adminStats.carbonSavings} tons</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Button onClick={() => navigate('/admin/vendors')} variant="outline" className="h-20">Vendor Management</Button>
          <Button onClick={() => navigate('/admin/data')} variant="outline" className="h-20">Data Management</Button>
          <Button onClick={() => navigate('/admin/complaints')} variant="outline" className="h-20">Complaints</Button>
          <Button onClick={() => navigate('/admin/reports')} variant="outline" className="h-20">Reports</Button>
        </div>
      </div>
    </div>
  );
}
