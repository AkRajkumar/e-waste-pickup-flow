import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { adminStats } from '../../data/adminData';

export default function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="mb-4 shadow">← Back</Button>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>Period:</strong> February 2026</p>
              <p className="text-sm"><strong>Pickups:</strong> 450</p>
              <p className="text-sm"><strong>E-Waste:</strong> 12,500 kg</p>
              <p className="text-sm"><strong>Carbon Saved:</strong> 45 tons</p>
              <Button variant="outline" className="w-full mt-4">Download Report</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Annual Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>Period:</strong> 2026</p>
              <p className="text-sm"><strong>Pickups:</strong> {adminStats.totalRequests}</p>
              <p className="text-sm"><strong>E-Waste:</strong> {adminStats.eWasteCollected} kg</p>
              <p className="text-sm"><strong>Carbon Saved:</strong> {adminStats.carbonSavings} tons</p>
              <Button variant="outline" className="w-full mt-4">Download Report</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border rounded p-3">
              <p className="font-semibold">CPCB Compliance Report</p>
              <p className="text-sm text-gray-500">All vendors meet CPCB standards</p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
            <div className="border rounded p-3">
              <p className="font-semibold">SPCB Compliance Report</p>
              <p className="text-sm text-gray-500">State-level compliance verified</p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
            <div className="border rounded p-3">
              <p className="font-semibold">Audit Trail Report</p>
              <p className="text-sm text-gray-500">Complete transaction history</p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
