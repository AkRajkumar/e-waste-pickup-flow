import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  uploadedImages: File[];
  onUpdateImages: (images: File[]) => void;
  onNext: () => void;
}

export default function ImageUpload({ uploadedImages, onUpdateImages, onNext }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...uploadedImages, ...files];
    onUpdateImages(newImages);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onUpdateImages(newImages);
    setPreviews(newPreviews);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Item Images</CardTitle>
        <CardDescription>
          Optional but recommended - helps vendors assess item condition and provide accurate pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG up to 10MB each
            </p>
          </label>
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2 text-sm text-blue-900">
              <ImageIcon className="w-4 h-4" />
              <span>{uploadedImages.length} image(s) uploaded</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={onNext} variant="outline" className="flex-1">
            Skip for now
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
