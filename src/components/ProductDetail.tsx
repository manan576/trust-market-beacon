import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Shield, Truck, Gift, ShoppingCart, Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct } from '@/hooks/useProducts';
import { Product, ProductMerchant, Review } from '@/types/database';
import ReviewForm from './ReviewForm';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, merchant: ProductMerchant) => void;
}

const ProductDetail = ({ product: initialProduct, onBack, onAddToCart }: ProductDetailProps) => {
  const { data: product, refetch } = useProduct(initialProduct.id);
  const [selectedMerchant, setSelectedMerchant] = useState<ProductMerchant | null>(null);
  const [reviewSort, setReviewSort] = useState('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (product?.merchants && product.merchants.length > 0 && !selectedMerchant) {
      setSelectedMerchant(product.merchants[0]);
    }
  }, [product, selectedMerchant]);

  if (!product || !selectedMerchant) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  // Filter reviews for current merchant and fetch current customer credibility
  const merchantReviews = product.reviews?.filter(review => 
    review.merchant_id === selectedMerchant.merchant_id
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
    if (credibilityScore >= 70) {
      return 'High Credibility';
    } else if (credibilityScore >= 50) {
      return 'Good Credibility';
    } else if (credibilityScore >= 30) {
      return 'Moderate Credibility';
    } else {
      return 'Low Credibility';
    }
  };

  const getCredibilityColor = (credibilityScore: number) => {
    if (credibilityScore >= 70) {
      return 'bg-green-500';
    } else if (credibilityScore >= 50) {
      return 'bg-blue-500';
    } else if (credibilityScore >= 30) {
      return 'bg-orange-500';
    } else {
      return 'bg-red-500';
    }
  };

  const sortReviews = (reviews: Review[], sortBy: string) => {
    switch (sortBy) {
      case 'newest':
        return [...reviews].sort((a, b) => new Date(b.review_date).getTime() - new Date(a.review_date).getTime());
      case 'oldest':
        return [...reviews].sort((a, b) => new Date(a.review_date).getTime() - new Date(b.review_date).getTime());
      case 'credibility':
        return [...reviews].sort((a, b) => (b.credibility_score || 0) - (a.credibility_score || 0));
      case 'rating':
        return [...reviews].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return reviews;
    }
  };

  const sortedReviews = sortReviews(merchantReviews, reviewSort);

  const handleAddToCart = (merchant: ProductMerchant) => {
    if (onAddToCart) {
      onAddToCart(product, merchant);
    }
  };

  const handleReviewAdded = () => {
    setShowReviewForm(false);
    refetch(); // Refresh product data to show new review
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
            src={product.image || '/placeholder.svg'} 
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-3">{product.short_description}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(product.overall_rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700 ml-2">
                {(product.overall_rating || 0).toFixed(1)} overall rating
              </span>
            </div>
          </div>

          {/* Merchant Selection */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Choose Merchant</h3>
              <div className="space-y-3">
                {product.merchants?.map((merchantData) => (
                  <div 
                    key={merchantData.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMerchant.id === merchantData.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMerchant(merchantData)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium">{merchantData.merchant?.name}</h4>
                          <Badge 
                            variant="outline"
                            className={`${getCreditTagColor(merchantData.merchant?.credit_tag || '')} border-0 font-medium px-3 py-1 rounded-full`}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {merchantData.merchant?.credit_tag}
                          </Badge>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(merchantData.rating || 0) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {merchantData.rating} from this merchant ({merchantData.total_reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{merchantData.price}
                        </div>
                        {merchantData.original_price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{merchantData.original_price}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Offers */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {merchantData.offers?.map((offer, index) => (
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
                        Delivery by {merchantData.delivery_date}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button 
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleAddToCart(merchantData)}
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
                  Reviews for {selectedMerchant.merchant?.name}
                </h3>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {showReviewForm ? 'Cancel' : 'Write Review'}
                  </Button>
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
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mb-6">
                  <ReviewForm
                    productId={product.id}
                    merchantId={selectedMerchant.merchant_id}
                    merchantName={selectedMerchant.merchant?.name || ''}
                    onReviewAdded={handleReviewAdded}
                  />
                </div>
              )}

              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="font-medium text-gray-600">
                            {review.customer?.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.customer?.name}</span>
                            <Badge 
                              variant="outline"
                              className={`${getCredibilityColor(review.customer?.credibility_score || 0)} text-white text-xs`}
                            >
                              {getCredibilityTag(review.customer?.credibility_score || 0)}
                            </Badge>
                            {review.verified_purchase && (
                              <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
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
                    </div>
                    <p className="text-gray-700 ml-13">{review.comment}</p>
                  </div>
                ))}
                
                {sortedReviews.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet for this merchant.</p>
                    <p className="text-sm text-gray-400 mt-1">Be the first to write a review!</p>
                  </div>
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
                  <p className="text-gray-600">{product.category?.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Brand</h4>
                  <p className="text-gray-600">Premium Brand</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Overall Rating</h4>
                  <p className="text-gray-600">{product.overall_rating} out of 5</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Total Reviews</h4>
                  <p className="text-gray-600">{selectedMerchant.total_reviews} customer reviews</p>
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
