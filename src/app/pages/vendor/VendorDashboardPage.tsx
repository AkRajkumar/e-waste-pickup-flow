import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { vendorPickupRequests } from '../../data/vendorData';

export default function VendorDashboardPage() {
  const navigate = useNavigate();

  const newRequests = vendorPickupRequests.filter(r => r.status === 'new');
  const activePickups = vendorPickupRequests.filter(r => r.status === 'accepted' || r.status === 'in-progress');
  const completedPickups = vendorPickupRequests.filter(r => r.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-green-600">Vendor Dashboard</h1>
          <Button variant="outline" onClick={() => { localStorage.removeItem('isVendorAuthenticated'); navigate('/vendor/login'); }}>Logout</Button>
        </div>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new">New Requests ({newRequests.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activePickups.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedPickups.length})</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            {newRequests.map(request => (
              <Card key={request.id} className="cursor-pointer hover:shadow-lg" onClick={() => navigate(`/vendor/request/${request.id}`)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Request #{request.id}</CardTitle>
                      <p className="text-sm text-gray-500">{request.citizenName}</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm"><strong>Items:</strong> {request.items.length} items</p>
                  <p className="text-sm"><strong>Location:</strong> {request.location}</p>
                  <p className="text-sm"><strong>Preferred Time:</strong> {request.preferredDate} at {request.preferredTime}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activePickups.map(request => (
              <Card key={request.id} className="cursor-pointer hover:shadow-lg" onClick={() => navigate(`/vendor/pickup/${request.id}`)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Pickup #{request.id}</CardTitle>
                      <p className="text-sm text-gray-500">{request.citizenName}</p>
                    </div>
                    <Badge variant="secondary">{request.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm"><strong>Quote:</strong> ₹{request.quotedPrice}</p>
                  <p className="text-sm"><strong>Location:</strong> {request.location}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPickups.map(request => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Pickup #{request.id}</CardTitle>
                      <p className="text-sm text-gray-500">{request.citizenName}</p>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm"><strong>Amount:</strong> ₹{request.finalPrice}</p>
                  <p className="text-sm"><strong>Certificate:</strong> {request.certificateId}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments & Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Payment history and invoices will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
