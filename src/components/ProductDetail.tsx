
import { useState } from 'react';
import { ArrowLeft, Star, Badge, ShoppingCart, Plus, Minus, Shield, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Merchant {
  id: number;
  name: string;
  creditTag: 'Moderate' | 'Good' | 'Excellent' | 'Amazing';
  price: number;
  shipping: string;
  inStock: boolean;
}

interface Review {
  id: number;
  customerName: string;
  credibilityScore: number;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  merchantId: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  merchants: Merchant[];
  bestPrice: number;
  description?: string;
  reviews?: Review[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const getCreditTagColor = (tag: string) => {
  switch (tag) {
    case 'Amazing': return 'bg-green-100 text-green-800 border-green-300';
    case 'Excellent': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Good': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Moderate': return 'bg-gray-100 text-gray-800 border-gray-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getCredibilityTag = (score: number) => {
  if (score >= 85) return { label: 'Excellent', color: 'bg-green-100 text-green-800', icon: CheckCircle };
  if (score >= 70) return { label: 'Good', color: 'bg-blue-100 text-blue-800', icon: CheckCircle };
  if (score >= 50) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
  return { label: 'Suspicious', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
};

const ProductDetail = ({ product, onBack, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMerchant, setSelectedMerchant] = useState(product.merchants[0]);
  const [reviewSort, setReviewSort] = useState('credibility');

  const productWithDetails = {
    ...product,
    description: "High-quality product with premium features and excellent build quality. Perfect for everyday use with advanced technology and user-friendly design. Backed by warranty and excellent customer support.",
    reviews: [
      {
        id: 1,
        customerName: "Sarah M.",
        credibilityScore: 92,
        rating: 5,
        comment: "Absolutely love this product! Exceeded my expectations in every way. The quality is outstanding and delivery was super fast.",
        date: "2024-06-10",
        verifiedPurchase: true,
        merchantId: selectedMerchant.id
      },
      {
        id: 2,
        customerName: "Mike R.",
        credibilityScore: 78,
        rating: 4,
        comment: "Great quality and fast shipping. Highly recommend! Only minor issue was the packaging could be better.",
        date: "2024-06-08",
        verifiedPurchase: true,
        merchantId: selectedMerchant.id
      },
      {
        id: 3,
        customerName: "Jennifer K.",
        credibilityScore: 88,
        rating: 5,
        comment: "Perfect product, exactly as described. Will buy again! Customer service was also very helpful when I had questions.",
        date: "2024-06-05",
        verifiedPurchase: false,
        merchantId: selectedMerchant.id
      },
      {
        id: 4,
        customerName: "Alex T.",
        credibilityScore: 45,
        rating: 1,
        comment: "Terrible product, broke after one day. Don't waste your money on this garbage.",
        date: "2024-06-03",
        verifiedPurchase: false,
        merchantId: selectedMerchant.id
      },
      {
        id: 5,
        customerName: "Emily C.",
        credibilityScore: 95,
        rating: 4,
        comment: "Very good product with excellent build quality. Minor issues with setup but overall satisfied.",
        date: "2024-06-01",
        verifiedPurchase: true,
        merchantId: selectedMerchant.id
      }
    ]
  };

  const sortedReviews = [...(productWithDetails.reviews || [])].sort((a, b) => {
    switch (reviewSort) {
      case 'credibility':
        return b.credibilityScore - a.credibilityScore;
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 hover:bg-gray-100 text-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
            <img 
              src={productWithDetails.image} 
              alt={productWithDetails.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {productWithDetails.name}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(productWithDetails.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-3 text-lg text-gray-600 font-medium">
                  {productWithDetails.rating} ({productWithDetails.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {productWithDetails.description}
            </p>
          </div>

          {/* Merchant Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Choose Your Merchant</h3>
            <div className="space-y-3">
              {productWithDetails.merchants.map((merchant) => (
                <Card 
                  key={merchant.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedMerchant.id === merchant.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMerchant(merchant)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{merchant.name}</span>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCreditTagColor(merchant.creditTag)}`}>
                              <Badge className="h-3 w-3 mr-1" />
                              {merchant.creditTag}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Truck className="h-4 w-4 mr-1" />
                              {merchant.shipping === 'Free' ? 'Free shipping' : `Shipping: ${merchant.shipping}`}
                            </span>
                            <span className={`flex items-center ${merchant.inStock ? 'text-green-600' : 'text-red-600'}`}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {merchant.inStock ? 'In stock' : 'Out of stock'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${merchant.price}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={() => onAddToCart(productWithDetails)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              disabled={!selectedMerchant.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - ${selectedMerchant.price}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Reviews Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          <Select value={reviewSort} onValueChange={setReviewSort}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Sort reviews by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credibility">Highest Credibility</SelectItem>
              <SelectItem value="rating-high">Highest Rating</SelectItem>
              <SelectItem value="rating-low">Lowest Rating</SelectItem>
              <SelectItem value="date">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {sortedReviews.map((review) => {
            const credibilityTag = getCredibilityTag(review.credibilityScore);
            const CredibilityIcon = credibilityTag.icon;
            
            return (
              <Card key={review.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="font-semibold text-gray-900">{review.customerName}</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${credibilityTag.color}`}>
                        <CredibilityIcon className="h-3 w-3 mr-1" />
                        {credibilityTag.label}
                      </div>
                      {review.verifiedPurchase && (
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  
                  <div className="flex items-center mb-4">
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
                  
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
