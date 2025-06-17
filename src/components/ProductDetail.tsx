
import { useState } from 'react';
import { ArrowLeft, Star, Shield, Truck, Gift, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Merchant {
  id: string;
  name: string;
  creditTag: string;
  rating: number;
  totalReviews: number;
  price: number;
  originalPrice?: number;
  deliveryDate: string;
  offers: string[];
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  credibilityScore: number;
  merchantId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  rating: number;
  overallRating: number;
  merchants: Merchant[];
  reviews: Review[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

// Generate unique reviews for each merchant
const generateMerchantReviews = (productId: string, merchants: Merchant[]): Review[] => {
  const allReviews: Review[] = [];
  
  const customerNames = [
    'Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Emma Davis',
    'Frank Miller', 'Grace Wilson', 'Henry Moore', 'Ivy Taylor', 'Jack Anderson',
    'Karen Thomas', 'Liam Jackson', 'Mia White', 'Noah Harris', 'Olivia Martin',
    'Paul Thompson', 'Quinn Garcia', 'Ruby Martinez', 'Sam Robinson', 'Tina Clark',
    'Uma Rodriguez', 'Victor Lewis', 'Wendy Lee', 'Xavier Walker', 'Yara Hall',
    'Zoe Allen', 'Adam Young', 'Bella King', 'Chris Wright', 'Diana Lopez'
  ];

  const comments = [
    'Excellent product! Exactly what I was looking for.',
    'Great quality and fast shipping. Very satisfied.',
    'Good value for money. Would recommend to others.',
    'Product works as described. Happy with my purchase.',
    'Outstanding quality and customer service.',
    'Fast delivery and well packaged. Product is perfect.',
    'Exceeded my expectations. Will buy again.',
    'Solid product, good build quality.',
    'Very pleased with this purchase. Great seller.',
    'Perfect item, exactly as described in listing.',
    'Amazing product quality. Highly recommend!',
    'Good product but shipping took a while.',
    'Decent quality for the price point.',
    'Works well, no complaints so far.',
    'Impressive quality and attention to detail.',
    'Great customer service and quick response.',
    'Product arrived quickly and in perfect condition.',
    'Very happy with this purchase. Five stars!',
    'Good product, meets all my requirements.',
    'Excellent value and great communication from seller.'
  ];

  merchants.forEach((merchant, merchantIndex) => {
    for (let i = 0; i < 10; i++) {
      const reviewIndex = (merchantIndex * 10) + i;
      const customerIndex = reviewIndex % customerNames.length;
      const commentIndex = reviewIndex % comments.length;
      
      // Generate ratings that average to the merchant's rating
      const baseRating = merchant.rating;
      const variation = (Math.random() - 0.5) * 2; // -1 to 1
      let rating = Math.round(baseRating + variation);
      rating = Math.max(1, Math.min(5, rating)); // Clamp between 1 and 5
      
      allReviews.push({
        id: `${productId}-${merchant.id}-${i}`,
        customerName: customerNames[customerIndex],
        rating: rating,
        comment: comments[commentIndex],
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        credibilityScore: Math.random(),
        merchantId: merchant.id
      });
    }
  });

  return allReviews;
};

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [selectedMerchant, setSelectedMerchant] = useState(product.merchants[0]);
  const [reviewSort, setReviewSort] = useState('newest');

  // Generate all reviews for all merchants
  const allReviews = generateMerchantReviews(product.id, product.merchants);
  
  // Filter reviews for current merchant
  const merchantReviews = allReviews.filter(review => review.merchantId === selectedMerchant.id);

  const getCreditTagColor = (creditTag: string) => {
    switch (creditTag) {
      case 'Excellent':
        return 'bg-green-400 text-white';
      case 'Good':
        return 'bg-orange-400 text-white';
      case 'Moderate':
        return 'bg-blue-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCredibilityTag = (credibilityScore: number) => {
    if (credibilityScore > 0.75) {
      return 'High Credibility';
    } else if (credibilityScore > 0.5) {
      return 'Moderate Credibility';
    } else {
      return 'Low Credibility';
    }
  };

  const getCredibilityColor = (credibilityScore: number) => {
    if (credibilityScore > 0.75) {
      return 'bg-green-500';
    } else if (credibilityScore > 0.5) {
      return 'bg-blue-500';
    } else {
      return 'bg-red-500';
    }
  };

  const sortReviews = (reviews: Review[], sortBy: string) => {
    switch (sortBy) {
      case 'newest':
        return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return [...reviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'credibility':
        return [...reviews].sort((a, b) => b.credibilityScore - a.credibilityScore);
      case 'rating':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      default:
        return reviews;
    }
  };

  const sortedReviews = sortReviews(merchantReviews, reviewSort);

  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-3">{product.shortDescription}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(product.overallRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700 ml-2">
                {product.overallRating.toFixed(1)} overall rating
              </span>
            </div>
          </div>

          {/* Merchant Selection */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose Merchant</h3>
              <div className="space-y-3">
                {product.merchants.map((merchant) => (
                  <div 
                    key={merchant.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMerchant.id === merchant.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMerchant(merchant)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium">{merchant.name}</h4>
                          <Badge 
                            className={`${getCreditTagColor(merchant.creditTag)} border-0 font-medium px-3 py-1 rounded-full`}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {merchant.creditTag}
                          </Badge>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(merchant.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {merchant.rating} from this merchant ({merchant.totalReviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ${merchant.price}
                        </div>
                        {merchant.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${merchant.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Offers */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {merchant.offers.map((offer, index) => (
                          <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center">
                            <Gift className="h-3 w-3 mr-1" />
                            {offer}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="h-4 w-4 mr-2" />
                        Delivery by {merchant.deliveryDate}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Zap className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          <TabsTrigger value="details">Product Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  Reviews for {selectedMerchant.name}
                </h3>
                <Select value={reviewSort} onValueChange={setReviewSort}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="credibility">Highest Credibility</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="font-medium text-gray-600">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.customerName}</span>
                            <Badge 
                              variant="secondary"
                              className={`${getCredibilityColor(review.credibilityScore)} text-white text-xs`}
                            >
                              {getCredibilityTag(review.credibilityScore)}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1">
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
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Category</h4>
                  <p className="text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Brand</h4>
                  <p className="text-gray-600">Premium Brand</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Overall Rating</h4>
                  <p className="text-gray-600">{product.overallRating} out of 5</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Total Reviews</h4>
                  <p className="text-gray-600">{selectedMerchant.totalReviews} customer reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
