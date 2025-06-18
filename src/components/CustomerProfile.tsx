
import { ArrowLeft, Star, Shield, Package, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCustomer, useCustomerOrders, useCustomerReviews } from '../hooks/useCustomer';

interface CustomerProfileProps {
  onBack: () => void;
}

const CustomerProfile = ({ onBack }: CustomerProfileProps) => {
  const { data: customer, isLoading: customerLoading, error: customerError } = useCustomer();
  const { data: orders = [], isLoading: ordersLoading } = useCustomerOrders();
  const { data: reviews = [], isLoading: reviewsLoading } = useCustomerReviews();

  if (customerLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  if (customerError || !customer) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading profile. Please try again.</p>
        <Button onClick={onBack} className="mt-4 bg-orange-500 hover:bg-orange-600">
          Go Back
        </Button>
      </div>
    );
  }

  const getCredibilityBadge = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-400 text-white' };
    if (score >= 60) return { label: 'Good', color: 'bg-orange-400 text-white' };
    return { label: 'Moderate', color: 'bg-blue-400 text-white' };
  };

  const credibilityBadge = getCredibilityBadge(customer.credibilityScore);

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{customer.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{customer.name}</h1>
              <p className="text-gray-600 mb-4">{customer.email}</p>
              <div className="flex items-center space-x-4">
                <Badge className={`${credibilityBadge.color} border-0 font-medium px-3 py-1`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {credibilityBadge.label}
                </Badge>
                <span className="text-sm text-gray-600">
                  Credibility Score: <span className="font-bold text-lg">{customer.credibilityScore}/100</span>
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">Member since</div>
              <div className="font-semibold">{customer.joinDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{customer.totalOrders}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{customer.totalReviews}</div>
            <div className="text-sm text-gray-600">Reviews Written</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{customer.credibilityScore}%</div>
            <div className="text-sm text-gray-600">Credibility Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Orders and Reviews */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                  <span className="ml-2">Loading orders...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{order.productName}</h4>
                          <p className="text-sm text-gray-600">Order #{order.id} • {order.merchantName}</p>
                          <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">${order.price}</div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No orders found.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Product Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviewsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                  <span className="ml-2">Loading reviews...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.productName}</h4>
                            <p className="text-sm text-gray-600">{review.merchantName}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No reviews found.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfile;
