import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import CategorySelection from '../components/CategorySelection';
import ItemSelection from '../components/ItemSelection';
import ImageUpload from '../components/ImageUpload';
import PriceEstimation from '../components/PriceEstimation';
import VendorSelection from '../components/VendorSelection';
import DateTimeSelection from '../components/DateTimeSelection';
import ConfirmationScreen from '../components/ConfirmationScreen';

export type SelectedItem = {
  itemId: string;
  itemName: string;
  categoryId: string;
  quantity: number;
  price: number;
};

const steps = [
  'Select Category',
  'Select Items',
  'Upload Images',
  'Price Estimation',
  'Select Vendor',
  'Schedule Date & Time',
  'Confirm',
];

export default function SchedulePickupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('');

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/home');
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CategorySelection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ItemSelection
            categoryId={selectedCategory}
            selectedItems={selectedItems}
            onUpdateItems={setSelectedItems}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ImageUpload
            uploadedImages={uploadedImages}
            onUpdateImages={setUploadedImages}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <PriceEstimation
            selectedItems={selectedItems}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <VendorSelection
            selectedVendor={selectedVendor}
            onSelectVendor={setSelectedVendor}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <DateTimeSelection
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            onDateChange={setScheduledDate}
            onTimeChange={setScheduledTime}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <ConfirmationScreen
            selectedItems={selectedItems}
            selectedVendor={selectedVendor}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            uploadedImages={uploadedImages}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Progress Indicator */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index < currentStep
                          ? 'bg-green-600 text-white'
                          : index === currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <p className="text-xs mt-2 text-center max-w-[80px] hidden md:block">
                      {step}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-8 md:w-16 mx-2 ${
                        index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center mt-4 md:hidden text-sm font-medium">
              {steps[currentStep]}
            </p>
          </CardContent>
        </Card>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
}
