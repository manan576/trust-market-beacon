
import { useState, useEffect } from 'react';
import { ArrowLeft, User, TestTube, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCustomer } from '@/hooks/useCustomers';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const CustomerManagement = () => {
  const customerId = '550e8400-e29b-41d4-a716-446655440001'; // Arjun Mehra
  const { data: customer, refetch } = useCustomer(customerId);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    customer_tenure_months: 0,
    purchase_value_rupees: 0,
    last_review_text: '',
    last_star_rating: 0,
    last_verified_purchase: 0,
  });

  // Update form data when customer data loads
  useEffect(() => {
    if (customer) {
      setFormData({
        customer_tenure_months: customer.customer_tenure_months || 0,
        purchase_value_rupees: customer.purchase_value_rupees || 0,
        last_review_text: customer.last_review_text || '',
        last_star_rating: customer.last_star_rating || 0,
        last_verified_purchase: customer.last_verified_purchase || 0,
      });
    }
  }, [customer]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field.includes('_months') || field.includes('_rating') || field.includes('_purchase') 
        ? parseInt(value.toString()) || 0
        : field.includes('_rupees') 
        ? parseFloat(value.toString()) || 0 
        : value
    }));
  };

  const handleUpdateCustomer = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating customer with data:', formData);
      
      const { error } = await supabase
        .from('customers')
        .update(formData)
        .eq('id', customerId);

      if (error) {
        console.error('Error updating customer:', error);
        toast.error('Failed to update customer parameters');
        return;
      }

      toast.success('Customer parameters updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer parameters');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTestCredibilityAPI = async () => {
    setIsTesting(true);
    try {
      console.log('Testing customer credibility API with data:', formData);
      
      const { data, error } = await supabase.functions.invoke('update-customer-credibility', {
        body: {
          customer_id: customerId,
          test_mode: true,
          manual_data: formData
        }
      });

      if (error) {
        console.error('Error calling credibility API:', error);
        toast.error(`Failed to test credibility API: ${error.message}`);
        return;
      }

      console.log('API response:', data);
      
      if (data.success) {
        toast.success(`Credibility API test successful! New score: ${data.credibility_score}`);
        refetch();
      } else {
        toast.error(`API test failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error testing credibility API:', error);
      toast.error('Failed to test credibility API');
    } finally {
      setIsTesting(false);
    }
  };

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Customer Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Customer Name</Label>
              <Input value={customer.name} disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={customer.email || 'N/A'} disabled />
            </div>
            <div>
              <Label>Current Credibility Score</Label>
              <Input value={customer.credibility_score || 0} disabled />
            </div>
            <div>
              <Label>Total Orders</Label>
              <Input value={customer.total_orders} disabled />
            </div>
            <div>
              <Label>Total Reviews</Label>
              <Input value={customer.total_reviews} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Editable Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>ML Model Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tenure">Customer Tenure (Months)</Label>
              <Input
                id="tenure"
                type="number"
                value={formData.customer_tenure_months}
                onChange={(e) => handleInputChange('customer_tenure_months', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="purchase_value">Purchase Value (Rupees)</Label>
              <Input
                id="purchase_value"
                type="number"
                step="0.01"
                value={formData.purchase_value_rupees}
                onChange={(e) => handleInputChange('purchase_value_rupees', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="review_text">Last Review Text</Label>
              <Textarea
                id="review_text"
                value={formData.last_review_text}
                onChange={(e) => handleInputChange('last_review_text', e.target.value)}
                placeholder="Enter review text for testing..."
              />
            </div>
            <div>
              <Label htmlFor="star_rating">Last Star Rating</Label>
              <Input
                id="star_rating"
                type="number"
                min="1"
                max="5"
                value={formData.last_star_rating}
                onChange={(e) => handleInputChange('last_star_rating', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="verified_purchase">Last Verified Purchase (0 or 1)</Label>
              <Input
                id="verified_purchase"
                type="number"
                min="0"
                max="1"
                value={formData.last_verified_purchase}
                onChange={(e) => handleInputChange('last_verified_purchase', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          onClick={handleUpdateCustomer}
          disabled={isUpdating}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isUpdating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Update Parameters
        </Button>
        
        <Button
          onClick={handleTestCredibilityAPI}
          disabled={isTesting}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {isTesting ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TestTube className="h-4 w-4 mr-2" />
          )}
          Test Credibility API
        </Button>
      </div>
    </div>
  );
};

export default CustomerManagement;
