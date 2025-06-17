
import { Star, Badge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
}

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 247,
    merchant: { name: "AudioTech Pro", creditTag: "Excellent" }
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg", 
    rating: 4.3,
    reviewCount: 156,
    merchant: { name: "WearableTech", creditTag: "Amazing" }
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    price: 24.99,
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 89,
    merchant: { name: "PowerSolutions", creditTag: "Good" }
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    price: 59.99,
    image: "/placeholder.svg",
    rating: 4.4,
    reviewCount: 312,
    merchant: { name: "GameGear Plus", creditTag: "Excellent" }
  },
  {
    id: 5,
    name: "4K Webcam for Streaming",
    price: 129.99,
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 178,
    merchant: { name: "StreamPro", creditTag: "Amazing" }
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 203,
    merchant: { name: "SoundWave", creditTag: "Moderate" }
  }
];

const getCreditTagColor = (tag: string) => {
  switch (tag) {
    case 'Amazing': return 'bg-green-100 text-green-800 border-green-300';
    case 'Excellent': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Good': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Moderate': return 'bg-gray-100 text-gray-800 border-gray-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const ProductGrid = ({ onProductClick }: ProductGridProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card 
            key={product.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform"
            onClick={() => onProductClick(product)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">by {product.merchant.name}</span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCreditTagColor(product.merchant.creditTag)}`}>
                  <Badge className="h-3 w-3 mr-1" />
                  {product.merchant.creditTag}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
