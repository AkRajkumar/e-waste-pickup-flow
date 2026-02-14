import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { IndianRupee, AlertCircle } from 'lucide-react';
import type { SelectedItem } from '../pages/SchedulePickupPage';

interface Props {
  selectedItems: SelectedItem[];
  onNext: () => void;
}

export default function PriceEstimation({ selectedItems, onNext }: Props) {
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Estimation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {selectedItems.map((item) => (
            <div
              key={item.itemId}
              className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.itemName}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-semibold">₹{item.quantity * item.price}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Processing Fee</span>
            <span className="text-green-600">₹0</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold text-lg">Estimated Total</span>
            <span className="font-semibold text-lg text-green-600">
              ₹{totalAmount}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-900 mb-1">
                Final Price Subject to Inspection
              </p>
              <p className="text-xs text-yellow-800">
                The final amount may vary based on actual condition, model, and working status 
                of the items during pickup. Vendor will provide final quote before collection.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="w-5 h-5 text-green-600" />
            <p className="font-medium text-green-900">You will receive approximately:</p>
          </div>
          <p className="text-3xl font-semibold text-green-600">₹{totalAmount}</p>
          <p className="text-sm text-green-700 mt-1">
            Payment will be processed after successful pickup
          </p>
        </div>

        <Button onClick={onNext} className="w-full">
          Proceed to Select Vendor
        </Button>
      </CardContent>
    </Card>
  );
}
