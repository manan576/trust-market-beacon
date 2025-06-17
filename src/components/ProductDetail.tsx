
import { useState } from 'react';
import { ArrowLeft, Star, Badge, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: number;
  customerName: string;
  credibilityScore: number;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  merchant: {
    name: string;
    creditTag: 'Moderate' | 'Good' | 'Excellent' | 'Amazing';
  };
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

const getCredibilityColor = (score: number) => {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-yellow-100 text-yellow-800';
  if (score >= 40) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

const ProductDetail = ({ product, onBack, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const productWithDetails = {
    ...product,
    description: "High-quality product with premium features and excellent build quality. Perfect for everyday use with advanced technology and user-friendly design.",
    reviews: [
      {
        id: 1,
        customerName: "Sarah M.",
        credibilityScore: 92,
        rating: 5,
        comment: "Absolutely love this product! Exceeded my expectations in every way.",
        date: "2024-06-10",
        verifiedPurchase: true
      },
      {
        id: 2,
        customerName: "Mike R.",
        credibilityScore: 78,
        rating: 4,
        comment: "Great quality and fast shipping. Highly recommend!",
        date: "2024-06-08",
        verifiedPurchase: true
      },
      {
        id: 3,
        customerName: "Jennifer K.",
        credibilityScore: 85,
        rating: 5,
        comment: "Perfect product, exactly as described. Will buy again!",
        date: "2024-06-05",
        verifiedPurchase: false
      }
    ]
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
          <img 
            src={productWithDetails.image} 
            alt={productWithDetails.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {productWithDetails.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(productWithDetails.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg text-gray-600">
                  {productWithDetails.rating} ({productWithDetails.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${productWithDetails.price}
              </span>
              <div className={`px-3 py-2 rounded-full text-sm font-medium border flex items-center ${getCreditTagColor(productWithDetails.merchant.creditTag)}`}>
                <Badge className="h-4 w-4 mr-2" />
                Merchant: {productWithDetails.merchant.creditTag}
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {productWithDetails.description}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={() => onAddToCart(productWithDetails)}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p>Sold by: <span className="font-medium">{productWithDetails.merchant.name}</span></p>
              <p>Free shipping on orders over $25</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {productWithDetails.reviews?.map(review => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="font-medium">{review.customerName}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCredibilityColor(review.credibilityScore)}`}>
                      Credibility: {review.credibilityScore}/100
                    </div>
                    {review.verifiedPurchase && (
                      <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Verified Purchase
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                
                <div className="flex items-center mb-3">
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
                
                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
