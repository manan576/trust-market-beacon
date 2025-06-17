
import { useState } from 'react';
import { Star, Badge, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Merchant {
  id: number;
  name: string;
  creditTag: 'Moderate' | 'Good' | 'Excellent' | 'Amazing';
  price: number;
  shipping: string;
  inStock: boolean;
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
}

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  selectedCategory?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 247,
    category: "audio",
    bestPrice: 69.99,
    merchants: [
      { id: 1, name: "AudioTech Pro", creditTag: "Excellent", price: 79.99, shipping: "Free", inStock: true },
      { id: 2, name: "SoundWave", creditTag: "Good", price: 74.99, shipping: "$3.99", inStock: true },
      { id: 3, name: "TechDeals", creditTag: "Amazing", price: 69.99, shipping: "Free", inStock: false }
    ]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 156,
    category: "wearables",
    bestPrice: 189.99,
    merchants: [
      { id: 4, name: "WearableTech", creditTag: "Amazing", price: 199.99, shipping: "Free", inStock: true },
      { id: 5, name: "FitGear Plus", creditTag: "Excellent", price: 189.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 3,
    name: "Portable Phone Charger",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 89,
    category: "electronics",
    bestPrice: 19.99,
    merchants: [
      { id: 6, name: "PowerSolutions", creditTag: "Good", price: 24.99, shipping: "$2.99", inStock: true },
      { id: 7, name: "ChargeIt", creditTag: "Excellent", price: 22.99, shipping: "Free", inStock: true },
      { id: 8, name: "BatteryWorld", creditTag: "Amazing", price: 19.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    image: "/placeholder.svg",
    rating: 4.4,
    reviewCount: 312,
    category: "gaming",
    bestPrice: 54.99,
    merchants: [
      { id: 9, name: "GameGear Plus", creditTag: "Excellent", price: 59.99, shipping: "Free", inStock: true },
      { id: 10, name: "ProGaming", creditTag: "Amazing", price: 54.99, shipping: "$1.99", inStock: true }
    ]
  },
  {
    id: 5,
    name: "4K Webcam for Streaming",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 178,
    category: "photography",
    bestPrice: 119.99,
    merchants: [
      { id: 11, name: "StreamPro", creditTag: "Amazing", price: 129.99, shipping: "Free", inStock: true },
      { id: 12, name: "CameraTech", creditTag: "Good", price: 119.99, shipping: "$4.99", inStock: true }
    ]
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 203,
    category: "audio",
    bestPrice: 34.99,
    merchants: [
      { id: 13, name: "SoundWave", creditTag: "Moderate", price: 39.99, shipping: "$2.99", inStock: true },
      { id: 14, name: "AudioHub", creditTag: "Good", price: 34.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 7,
    name: "Gaming Laptop",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 94,
    category: "computers",
    bestPrice: 1299.99,
    merchants: [
      { id: 15, name: "TechMaster", creditTag: "Amazing", price: 1399.99, shipping: "Free", inStock: true },
      { id: 16, name: "ComputerWorld", creditTag: "Excellent", price: 1299.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 8,
    name: "Professional Camera",
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 67,
    category: "photography",
    bestPrice: 899.99,
    merchants: [
      { id: 17, name: "CameraPro", creditTag: "Amazing", price: 949.99, shipping: "Free", inStock: true },
      { id: 18, name: "PhotoGear", creditTag: "Excellent", price: 899.99, shipping: "$9.99", inStock: true }
    ]
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

const ProductGrid = ({ onProductClick, selectedCategory }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('relevance');
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.bestPrice - b.bestPrice;
      case 'price-high':
        return b.bestPrice - a.bestPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const getCategoryTitle = () => {
    if (!selectedCategory) return 'All Products';
    return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{getCategoryTitle()}</h1>
          <p className="text-gray-600">{sortedProducts.length} products found</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map(product => {
          const bestMerchant = product.merchants.reduce((best, current) => 
            current.price < best.price ? current : best
          );

          return (
            <Card 
              key={product.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-white"
              onClick={() => onProductClick(product)}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getCreditTagColor(bestMerchant.creditTag)}`}>
                      <Badge className="h-3 w-3 mr-1" />
                      Best: {bestMerchant.creditTag}
                    </div>
                  </div>
                  {product.bestPrice < bestMerchant.price && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      DEAL
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
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
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.bestPrice}
                        </span>
                        {product.bestPrice < bestMerchant.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${bestMerchant.price}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{product.merchants.length} merchants available</p>
                      <p>Starting from <span className="font-semibold">{bestMerchant.name}</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
