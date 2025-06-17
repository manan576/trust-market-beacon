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

  // Generate unique reviews for each merchant
  const generateMerchantReviews = (merchantId: number): Review[] => {
    const reviewTemplates = [
      { rating: 5, comment: "Outstanding product quality! Exceeded all my expectations. Will definitely buy again from this seller." },
      { rating: 4, comment: "Very good product with excellent build quality. Fast shipping and great customer service." },
      { rating: 5, comment: "Perfect item exactly as described. Amazing seller with quick delivery and secure packaging." },
      { rating: 3, comment: "Decent product for the price. Some minor issues but overall satisfied with the purchase." },
      { rating: 4, comment: "Good quality product. Took a bit longer to arrive but worth the wait. Recommended!" },
      { rating: 5, comment: "Absolutely love this! Great value for money and excellent customer support." },
      { rating: 2, comment: "Product was okay but not what I expected. Packaging could be better." },
      { rating: 4, comment: "Solid product with good features. Seller was responsive and helpful." },
      { rating: 5, comment: "Amazing quality! Fast shipping and exactly what I ordered. Five stars!" },
      { rating: 1, comment: "Terrible experience. Product broke after one day. Waste of money." }
    ];

    const customerNames = [
      "Sarah M.", "Mike R.", "Jennifer K.", "Alex T.", "Emily C.",
      "David L.", "Rachel S.", "John D.", "Lisa P.", "Mark W."
    ];

    return reviewTemplates.map((template, index) => ({
      id: merchantId * 100 + index + 1,
      customerName: customerNames[index],
      credibilityScore: Math.floor(Math.random() * 60) + 40, // 40-100 range
      rating: template.rating,
      comment: template.comment,
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      verifiedPurchase: Math.random() > 0.3,
      merchantId: merchantId
    }));
  };

  const currentMerchantReviews = generateMerchantReviews(selectedMerchant.id);

  const sortedReviews = [...currentMerchantReviews].sort((a, b) => {
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
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-3 text-lg text-gray-600 font-medium">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              High-quality product with premium features and excellent build quality. Perfect for everyday use with advanced technology and user-friendly design. Backed by warranty and excellent customer support.
            </p>
          </div>

          {/* Merchant Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Choose Your Merchant</h3>
            <div className="space-y-3">
              {product.merchants.map((merchant) => (
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
              onClick={() => onAddToCart(product)}
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
          <h2 className="text-3xl font-bold text-gray-900">
            Customer Reviews for {selectedMerchant.name}
          </h2>
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
