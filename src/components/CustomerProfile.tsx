
import { ArrowLeft, Star, Package, Award, Calendar, Mail, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCustomer, useCustomerOrders, useCustomerReviews } from '@/hooks/useCustomers';

interface CustomerProfileProps {
  onBack: () => void;
}

const CustomerProfile = ({ onBack }: CustomerProfileProps) => {
  // Using a sample customer ID - in a real app this would come from authentication
  const sampleCustomerId = '550e8400-e29b-41d4-a716-446655440001'; // This would be from auth context
  
  const { data: customer } = useCustomer(sampleCustomerId);
  const { data: orders = [] } = useCustomerOrders(sampleCustomerId);
  const { data: reviews = [] } = useCustomerReviews(sampleCustomerId);

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading customer profile...</p>
      </div>
    );
  }

  const getCredibilityColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCredibilityLabel = (score: number) => {
    if (score >= 70) return 'High Credibility';
    if (score >= 50) return 'Good Credibility';
    if (score >= 30) return 'Moderate Credibillity';
    return 'Low Credibility';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">{customer.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{customer.name}</h1>
            <p className="text-blue-100 mb-3 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {customer.email}
            </p>
            <div className="flex items-center space-x-4">
              <Badge className={`${getCredibilityColor(customer.credibility_score)} text-white px-3 py-1`}>
                <Award className="h-4 w-4 mr-2" />
                {getCredibilityLabel(customer.credibility_score)}
              </Badge>
              <span className="text-blue-100 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Member since {new Date(customer.join_date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{customer.total_orders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{reviews.length}</h3>
            <p className="text-gray-600">Reviews Written</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{customer.credibility_score}</h3>
            <p className="text-gray-600">Credibility Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            My Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">
                        Review for {review.merchant?.name}
                      </h4>
                      <Badge 
                        variant="outline"
                        className={`${getCredibilityColor(customer.credibility_score)} text-white text-xs`}
                      >
                        {getCredibilityLabel(customer.credibility_score)}
                      </Badge>
                      {review.verified_purchase && (
                        <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < (review.rating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(review.review_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reviews written yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{order.product_name}</h4>
                  <p className="text-sm text-gray-600">Order #{order.order_number}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{order.price}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          {orders.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfile;
