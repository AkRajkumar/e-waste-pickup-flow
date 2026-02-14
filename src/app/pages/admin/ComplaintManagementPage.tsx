import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { complaints } from '../../data/adminData';

export default function ComplaintManagementPage() {
  const navigate = useNavigate();
  const [complaintList, setComplaintList] = useState(complaints);

  const citizenComplaints = complaintList.filter(c => c.type === 'citizen');
  const vendorComplaints = complaintList.filter(c => c.type === 'vendor');

  const handleResolve = (id: string) => {
    setComplaintList(complaintList.map(c => c.id === id ? { ...c, status: 'resolved' as const } : c));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Complaint Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="citizen">
              <TabsList>
                <TabsTrigger value="citizen">Citizen Complaints ({citizenComplaints.length})</TabsTrigger>
                <TabsTrigger value="vendor">Vendor Complaints ({vendorComplaints.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="citizen" className="space-y-4 mt-4">
                {citizenComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{complaint.subject}</h3>
                        <p className="text-sm text-gray-500">By: {complaint.complainant}</p>
                      </div>
                      <Badge variant={complaint.status === 'resolved' ? 'default' : complaint.status === 'in-progress' ? 'secondary' : 'outline'}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Date: {complaint.date}</p>
                    {complaint.status !== 'resolved' && (
                      <Button size="sm" onClick={() => handleResolve(complaint.id)}>Mark as Resolved</Button>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="vendor" className="space-y-4 mt-4">
                {vendorComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{complaint.subject}</h3>
                        <p className="text-sm text-gray-500">By: {complaint.complainant}</p>
                      </div>
                      <Badge variant={complaint.status === 'resolved' ? 'default' : complaint.status === 'in-progress' ? 'secondary' : 'outline'}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Date: {complaint.date}</p>
                    {complaint.status !== 'resolved' && (
                      <Button size="sm" onClick={() => handleResolve(complaint.id)}>Mark as Resolved</Button>
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
