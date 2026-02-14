import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ewasteCategories } from '../data/mockData';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { SelectedItem } from '../pages/SchedulePickupPage';

interface Props {
  categoryId: string;
  selectedItems: SelectedItem[];
  onUpdateItems: (items: SelectedItem[]) => void;
  onNext: () => void;
}

export default function ItemSelection({ categoryId, selectedItems, onUpdateItems, onNext }: Props) {
  const category = ewasteCategories.find((cat) => cat.id === categoryId);

  const handleAddItem = (item: any) => {
    const existing = selectedItems.find((si) => si.itemId === item.id);
    if (existing) {
      onUpdateItems(
        selectedItems.map((si) =>
          si.itemId === item.id ? { ...si, quantity: si.quantity + 1 } : si
        )
      );
    } else {
      onUpdateItems([
        ...selectedItems,
        {
          itemId: item.id,
          itemName: item.name,
          categoryId: item.categoryId,
          quantity: 1,
          price: item.basePrice,
        },
      ]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    onUpdateItems(selectedItems.filter((si) => si.itemId !== itemId));
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    onUpdateItems(
      selectedItems
        .map((si) =>
          si.itemId === itemId
            ? { ...si, quantity: Math.max(0, si.quantity + change) }
            : si
        )
        .filter((si) => si.quantity > 0)
    );
  };

  const getItemQuantity = (itemId: string) => {
    return selectedItems.find((si) => si.itemId === itemId)?.quantity || 0;
  };

  if (!category) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Items - {category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {category.items.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">₹{item.basePrice} per {item.unit}</p>
                </div>
                {quantity > 0 ? (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => handleAddItem(item)}>
                    Add
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {selectedItems.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-2">Selected Items:</p>
            {selectedItems.map((item) => (
              <div key={item.itemId} className="flex justify-between text-sm mb-1">
                <span>{item.itemName}</span>
                <span>
                  {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={onNext}
          disabled={selectedItems.length === 0}
          className="w-full"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
