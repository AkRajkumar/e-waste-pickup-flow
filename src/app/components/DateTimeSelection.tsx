import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Calendar, Clock } from 'lucide-react';

interface Props {
  scheduledDate: string;
  scheduledTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
}

const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

export default function DateTimeSelection({
  scheduledDate,
  scheduledTime,
  onDateChange,
  onTimeChange,
  onNext,
}: Props) {
  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Pickup Date & Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-6">
          <div>
            <Label htmlFor="pickup-date" className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              Select Date
            </Label>
            <input
              id="pickup-date"
              type="date"
              min={minDate}
              max={maxDateStr}
              value={scheduledDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-600 mt-1">
              Available from tomorrow to next 30 days
            </p>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" />
              Select Time Slot
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onTimeChange(slot)}
                  className={`p-3 border rounded-lg text-sm transition-all ${
                    scheduledTime === slot
                      ? 'border-green-600 bg-green-50 font-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {scheduledDate && scheduledTime && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Your pickup is scheduled for:
              </p>
              <p className="text-blue-700">
                {new Date(scheduledDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {scheduledTime}
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={onNext}
          disabled={!scheduledDate || !scheduledTime}
          className="w-full"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
