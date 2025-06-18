
import { useState } from 'react';
import { ArrowLeft, Star, Shield, Truck, Gift, ShoppingCart, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct, Product, Merchant } from '../hooks/useProducts';

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  onAddToCart?: (product: Product, merchant: Merchant) => void;
}

const ProductDetail = ({ productId, onBack, onAddToCart }: ProductDetailProps) => {
  const { data: product, isLoading, error } = useProduct(productId);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [reviewSort, setReviewSort] = useState('newest');

  // Set initial merchant when product loads
  if (product && product.merchants.length > 0 && !selectedMerchant) {
    setSelectedMerchant(product.merchants[0]);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-600">Loading product details...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading product details. Please try again.</p>
        <Button onClick={onBack} className="mt-4 bg-orange-500 hover:bg-orange-600">
          Go Back
        </Button>
      </div>
    );
  }

  // Filter reviews for current merchant
  const merchantReviews = product.reviews?.filter(review => 
    review.merchantId === selectedMerchant?.id
  ) || [];

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

  const sortReviews = (reviews: any[], sortBy: string) => {
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

  const handleAddToCart = (merchant: Merchant) => {
    if (onAddToCart && product) {
      onAddToCart(product, merchant);
    }
  };

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
          {product.merchants.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Merchant</h3>
                <div className="space-y-3">
                  {product.merchants.map((merchant) => (
                    <div 
                      key={merchant.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedMerchant?.id === merchant.id 
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
                        <Button 
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handleAddToCart(merchant)}
                        >
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
          )}
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
                  Reviews {selectedMerchant ? `for ${selectedMerchant.name}` : ''}
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
                {sortedReviews.length > 0 ? (
                  sortedReviews.map((review) => (
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
                  ))
                ) : (
                  <p className="text-gray-500">No reviews available for this merchant.</p>
                )}
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
                  <p className="text-gray-600">{product.reviewCount} customer reviews</p>
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
