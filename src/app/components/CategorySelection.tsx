import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ewasteCategories } from '../data/mockData';
import { 
  Laptop, 
  Smartphone, 
  Tv, 
  Speaker, 
  Battery, 
  Cpu 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Laptop,
  Smartphone,
  Tv,
  Speaker,
  Battery,
  Cpu,
};

interface Props {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onNext: () => void;
}

export default function CategorySelection({ selectedCategory, onSelectCategory, onNext }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select E-Waste Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ewasteCategories.map((category) => {
            const Icon = iconMap[category.icon] || Cpu;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`p-4 border rounded-lg hover:shadow-md transition-all ${
                  selectedCategory === category.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <Icon className={`w-10 h-10 mx-auto mb-3 ${
                  selectedCategory === category.id ? 'text-green-600' : 'text-gray-600'
                }`} />
                <p className="font-medium text-center">{category.name}</p>
                <p className="text-xs text-gray-600 text-center mt-1">
                  {category.items.length} items
                </p>
              </button>
            );
          })}
        </div>
        <Button
          onClick={onNext}
          disabled={!selectedCategory}
          className="w-full mt-6"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
