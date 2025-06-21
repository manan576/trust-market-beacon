
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Merchant } from '@/types/database';

const MerchantManagement = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching merchants:', error);
      toast.error('Failed to fetch merchants');
    } else {
      setMerchants(data || []);
    }
  };

  const updateMerchantParameter = async (field: string, value: number) => {
    if (!selectedMerchant) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ [field]: value })
        .eq('id', selectedMerchant.id);

      if (error) {
        console.error('Error updating merchant:', error);
        toast.error('Failed to update merchant parameter');
      } else {
        toast.success('Merchant parameter updated! Grade will be updated automatically.');
        // Refresh merchant data
        await fetchMerchants();
        const updatedMerchant = merchants.find(m => m.id === selectedMerchant.id);
        if (updatedMerchant) {
          setSelectedMerchant(updatedMerchant);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update merchant parameter');
    } finally {
      setIsLoading(false);
    }
  };

  const getCreditTagColor = (creditTag: string) => {
    switch (creditTag) {
      case 'Excellent':
        return 'bg-green-500 text-white';
      case 'Good':
        return 'bg-orange-500 text-white';
      case 'Moderate':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const mlParameters = [
    { key: 'quality_return_rate', label: 'Quality Return Rate', max: 1 },
    { key: 'defect_rate', label: 'Defect Rate', max: 1 },
    { key: 'authenticity_score', label: 'Authenticity Score', max: 1 },
    { key: 'quality_sentiment', label: 'Quality Sentiment', max: 1 },
    { key: 'on_time_delivery_rate', label: 'On Time Delivery Rate', max: 1 },
    { key: 'shipping_accuracy', label: 'Shipping Accuracy', max: 1 },
    { key: 'order_fulfillment_rate', label: 'Order Fulfillment Rate', max: 1 },
    { key: 'inventory_accuracy', label: 'Inventory Accuracy', max: 1 },
    { key: 'avg_rating_normalized', label: 'Average Rating', max: 5 },
    { key: 'review_sentiment', label: 'Review Sentiment', max: 1 },
    { key: 'positive_review_ratio', label: 'Positive Review Ratio', max: 1 },
    { key: 'review_authenticity', label: 'Review Authenticity', max: 1 },
    { key: 'response_time_score', label: 'Response Time Score', max: 1 },
    { key: 'query_resolution_rate', label: 'Query Resolution Rate', max: 1 },
    { key: 'service_satisfaction', label: 'Service Satisfaction', max: 1 },
    { key: 'proactive_communication', label: 'Proactive Communication', max: 1 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Merchant Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Merchant List */}
        <Card>
          <CardHeader>
            <CardTitle>Merchants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {merchants.map((merchant) => (
              <div
                key={merchant.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedMerchant?.id === merchant.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMerchant(merchant)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{merchant.name}</span>
                  <Badge className={getCreditTagColor(merchant.credit_tag)}>
                    {merchant.credit_tag}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Parameter Editor */}
        {selectedMerchant && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Edit Parameters for {selectedMerchant.name}
                <Badge className={`ml-2 ${getCreditTagColor(selectedMerchant.credit_tag)}`}>
                  {selectedMerchant.credit_tag}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mlParameters.map((param) => (
                  <div key={param.key} className="space-y-2">
                    <Label htmlFor={param.key}>
                      {param.label} (0 - {param.max})
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id={param.key}
                        type="number"
                        min="0"
                        max={param.max}
                        step="0.01"
                        value={selectedMerchant[param.key as keyof Merchant] as number || 0}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          setSelectedMerchant({
                            ...selectedMerchant,
                            [param.key]: value
                          });
                        }}
                        disabled={isLoading}
                      />
                      <Button
                        size="sm"
                        onClick={() => updateMerchantParameter(param.key, selectedMerchant[param.key as keyof Merchant] as number || 0)}
                        disabled={isLoading}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MerchantManagement;
