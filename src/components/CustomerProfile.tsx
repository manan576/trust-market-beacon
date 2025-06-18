
import { ArrowLeft, Star, Shield, Package, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomerProfileProps {
  onBack: () => void;
}

const CustomerProfile = ({ onBack }: CustomerProfileProps) => {
  // Mock customer data
  const customer = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    credibilityScore: 87,
    joinDate: 'March 2023',
    totalOrders: 24,
    totalReviews: 18
  };

  const getCredibilityBadge = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-400 text-white' };
    if (score >= 60) return { label: 'Good', color: 'bg-orange-400 text-white' };
    return { label: 'Moderate', color: 'bg-blue-400 text-white' };
  };

  const credibilityBadge = getCredibilityBadge(customer.credibilityScore);

  // Mock past orders
  const pastOrders = [
    {
      id: 'ORD-001',
      productName: 'Wireless Bluetooth Headphones Pro',
      orderDate: '2024-01-15',
      price: 79.99,
      status: 'Delivered',
      merchant: 'AudioTech Pro'
    },
    {
      id: 'ORD-002',
      productName: 'Smart Phone 5G Latest Model',
      orderDate: '2024-01-08',
      price: 849.99,
      status: 'Delivered',
      merchant: 'MobileTech'
    },
    {
      id: 'ORD-003',
      productName: 'Premium Cotton T-Shirt',
      orderDate: '2023-12-22',
      price: 29.99,
      status: 'Delivered',
      merchant: 'Fashion Forward'
    },
    {
      id: 'ORD-004',
      productName: 'Organic Coffee Beans Premium',
      orderDate: '2023-12-15',
      price: 22.99,
      status: 'Delivered',
      merchant: 'Coffee Masters'
    },
    {
      id: 'ORD-005',
      productName: 'Reusable Water Bottle Steel',
      orderDate: '2023-11-28',
      price: 27.99,
      status: 'Delivered',
      merchant: 'Hydro Pro'
    },
    {
      id: 'ORD-006',
      productName: 'Designer Leather Jacket',
      orderDate: '2023-11-10',
      price: 219.99,
      status: 'Delivered',
      merchant: 'Leather Luxe'
    }
  ];

  // Mock past reviews
  const pastReviews = [
    {
      id: 'REV-001',
      productName: 'Wireless Bluetooth Headphones Pro',
      rating: 5,
      comment: 'Excellent sound quality and battery life. Highly recommend!',
      date: '2024-01-18',
      merchant: 'AudioTech Pro'
    },
    {
      id: 'REV-002',
      productName: 'Smart Phone 5G Latest Model',
      rating: 4,
      comment: 'Great phone with fast performance. Camera could be better.',
      date: '2024-01-12',
      merchant: 'MobileTech'
    },
    {
      id: 'REV-003',
      productName: 'Premium Cotton T-Shirt',
      rating: 5,
      comment: 'Very soft and comfortable. Perfect fit and great quality.',
      date: '2023-12-28',
      merchant: 'Fashion Forward'
    },
    {
      id: 'REV-004',
      productName: 'Organic Coffee Beans Premium',
      rating: 4,
      comment: 'Rich flavor and good aroma. A bit pricey but worth it.',
      date: '2023-12-20',
      merchant: 'Coffee Masters'
    },
    {
      id: 'REV-005',
      productName: 'Reusable Water Bottle Steel',
      rating: 5,
      comment: 'Keeps drinks cold for hours. Perfect for gym and work.',
      date: '2023-12-02',
      merchant: 'Hydro Pro'
    }
  ];

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
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{order.productName}</h4>
                      <p className="text-sm text-gray-600">Order #{order.id} • {order.merchant}</p>
                      <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${order.price}</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Product Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastReviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.productName}</h4>
                        <p className="text-sm text-gray-600">{review.merchant}</p>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerProfile;
