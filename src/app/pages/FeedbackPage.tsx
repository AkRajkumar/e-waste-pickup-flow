import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Star, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintText, setComplaintText] = useState('');

  const handleSubmitFeedback = () => {
    if (feedbackRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    // Mock: Submit feedback
    toast.success('Thank you for your feedback!');
    setFeedbackRating(0);
    setFeedbackText('');
  };

  const handleSubmitComplaint = () => {
    if (!complaintType || !complaintText) {
      toast.error('Please fill in all fields');
      return;
    }
    // Mock: Submit complaint
    toast.success('Complaint submitted successfully. We will respond within 24 hours.');
    setComplaintType('');
    setComplaintText('');
  };

  const complaintTypes = [
    'Pickup not arrived',
    'Wrong price quoted',
    'Vendor behavior',
    'Payment issue',
    'Certificate not received',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={() => navigate('/home')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">Feedback & Complaints</h1>
          <p className="text-gray-600">Share your experience or raise any issues</p>
        </div>

        <Tabs defaultValue="feedback" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feedback">
              <MessageSquare className="w-4 h-4 mr-2" />
              Give Feedback
            </TabsTrigger>
            <TabsTrigger value="complaint">
              <AlertCircle className="w-4 h-4 mr-2" />
              Raise Complaint
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Help us improve our service by sharing your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">How would you rate our service?</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFeedbackRating(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            rating <= feedbackRating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {feedbackRating > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      You rated: {feedbackRating} star{feedbackRating > 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="feedback-text">Additional Comments (Optional)</Label>
                  <Textarea
                    id="feedback-text"
                    placeholder="Tell us more about your experience..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleSubmitFeedback} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaint">
            <Card>
              <CardHeader>
                <CardTitle>Raise a Complaint</CardTitle>
                <CardDescription>
                  We're here to help. Let us know about any issues you've faced
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Type of Complaint</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {complaintTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setComplaintType(type)}
                        className={`p-3 border rounded-lg text-sm transition-all ${
                          complaintType === type
                            ? 'border-red-600 bg-red-50 font-medium'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="complaint-text">Describe Your Issue</Label>
                  <Textarea
                    id="complaint-text"
                    placeholder="Please provide details about your complaint..."
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Our team will review your complaint and respond within 24 hours. 
                    You'll receive updates via SMS and email.
                  </p>
                </div>

                <Button onClick={handleSubmitComplaint} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Complaint
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-1">How long does it take to get a response?</p>
              <p className="text-sm text-gray-600">
                We aim to respond to all complaints within 24 hours.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What if I'm not satisfied with the resolution?</p>
              <p className="text-sm text-gray-600">
                You can escalate your complaint by contacting our support team directly.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I track my complaint status?</p>
              <p className="text-sm text-gray-600">
                Yes, you'll receive updates via SMS and email as we work on your complaint.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
