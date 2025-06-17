
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
  // Electronics
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 247,
    category: "electronics",
    bestPrice: 69.99,
    merchants: [
      { id: 1, name: "AudioTech Pro", creditTag: "Excellent", price: 79.99, shipping: "Free", inStock: true },
      { id: 2, name: "SoundWave", creditTag: "Good", price: 74.99, shipping: "$3.99", inStock: true },
      { id: 3, name: "TechDeals", creditTag: "Amazing", price: 69.99, shipping: "Free", inStock: false }
    ]
  },
  {
    id: 2,
    name: "Smart Phone 5G Latest Model",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 892,
    category: "electronics",
    bestPrice: 799.99,
    merchants: [
      { id: 4, name: "MobileTech", creditTag: "Amazing", price: 849.99, shipping: "Free", inStock: true },
      { id: 5, name: "PhoneHub", creditTag: "Excellent", price: 799.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV 55 inch",
    image: "/placeholder.svg",
    rating: 4.4,
    reviewCount: 156,
    category: "electronics",
    bestPrice: 599.99,
    merchants: [
      { id: 6, name: "ElectroWorld", creditTag: "Good", price: 649.99, shipping: "$25.99", inStock: true },
      { id: 7, name: "TV Central", creditTag: "Excellent", price: 599.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 4,
    name: "Wireless Gaming Keyboard",
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 312,
    category: "electronics",
    bestPrice: 89.99,
    merchants: [
      { id: 8, name: "GameGear Plus", creditTag: "Excellent", price: 99.99, shipping: "Free", inStock: true },
      { id: 9, name: "ProGaming", creditTag: "Amazing", price: 89.99, shipping: "$1.99", inStock: true }
    ]
  },
  {
    id: 5,
    name: "Portable Power Bank 20000mAh",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 89,
    category: "electronics",
    bestPrice: 39.99,
    merchants: [
      { id: 10, name: "PowerSolutions", creditTag: "Good", price: 44.99, shipping: "$2.99", inStock: true },
      { id: 11, name: "ChargeIt", creditTag: "Excellent", price: 39.99, shipping: "Free", inStock: true }
    ]
  },

  // Fashion
  {
    id: 6,
    name: "Premium Cotton T-Shirt",
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 203,
    category: "fashion",
    bestPrice: 24.99,
    merchants: [
      { id: 12, name: "Fashion Forward", creditTag: "Excellent", price: 29.99, shipping: "$3.99", inStock: true },
      { id: 13, name: "StyleHub", creditTag: "Good", price: 24.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 7,
    name: "Designer Leather Jacket",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 94,
    category: "fashion",
    bestPrice: 199.99,
    merchants: [
      { id: 14, name: "Leather Luxe", creditTag: "Amazing", price: 219.99, shipping: "Free", inStock: true },
      { id: 15, name: "Fashion Elite", creditTag: "Excellent", price: 199.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 8,
    name: "Running Sneakers Athletic",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 456,
    category: "fashion",
    bestPrice: 79.99,
    merchants: [
      { id: 16, name: "SportsWear Pro", creditTag: "Good", price: 89.99, shipping: "$4.99", inStock: true },
      { id: 17, name: "Athletic Gear", creditTag: "Excellent", price: 79.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 9,
    name: "Classic Denim Jeans",
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 321,
    category: "fashion",
    bestPrice: 49.99,
    merchants: [
      { id: 18, name: "Denim Depot", creditTag: "Moderate", price: 59.99, shipping: "$2.99", inStock: true },
      { id: 19, name: "Casual Wear", creditTag: "Good", price: 49.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 10,
    name: "Elegant Evening Dress",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 167,
    category: "fashion",
    bestPrice: 129.99,
    merchants: [
      { id: 20, name: "Elegant Attire", creditTag: "Amazing", price: 149.99, shipping: "Free", inStock: true },
      { id: 21, name: "Formal Fashion", creditTag: "Excellent", price: 129.99, shipping: "$5.99", inStock: true }
    ]
  },

  // Beauty Products
  {
    id: 11,
    name: "Anti-Aging Serum Vitamin C",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 234,
    category: "beauty",
    bestPrice: 34.99,
    merchants: [
      { id: 22, name: "Beauty Essentials", creditTag: "Excellent", price: 39.99, shipping: "Free", inStock: true },
      { id: 23, name: "Skincare Pro", creditTag: "Good", price: 34.99, shipping: "$2.99", inStock: true }
    ]
  },
  {
    id: 12,
    name: "Professional Makeup Palette",
    image: "/placeholder.svg",
    rating: 4.4,
    reviewCount: 189,
    category: "beauty",
    bestPrice: 59.99,
    merchants: [
      { id: 24, name: "Makeup Masters", creditTag: "Amazing", price: 64.99, shipping: "Free", inStock: true },
      { id: 25, name: "Cosmetic Corner", creditTag: "Excellent", price: 59.99, shipping: "$3.99", inStock: true }
    ]
  },
  {
    id: 13,
    name: "Organic Face Moisturizer",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 298,
    category: "beauty",
    bestPrice: 28.99,
    merchants: [
      { id: 26, name: "Natural Beauty", creditTag: "Good", price: 32.99, shipping: "$1.99", inStock: true },
      { id: 27, name: "Organic Care", creditTag: "Excellent", price: 28.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 14,
    name: "Hair Growth Shampoo",
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 156,
    category: "beauty",
    bestPrice: 19.99,
    merchants: [
      { id: 28, name: "Hair Solutions", creditTag: "Moderate", price: 24.99, shipping: "$2.99", inStock: true },
      { id: 29, name: "Wellness Store", creditTag: "Good", price: 19.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 15,
    name: "Luxury Perfume Collection",
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 78,
    category: "beauty",
    bestPrice: 89.99,
    merchants: [
      { id: 30, name: "Fragrance House", creditTag: "Amazing", price: 99.99, shipping: "Free", inStock: true },
      { id: 31, name: "Scent Studio", creditTag: "Excellent", price: 89.99, shipping: "$4.99", inStock: true }
    ]
  },

  // Furniture
  {
    id: 16,
    name: "Modern Office Chair Ergonomic",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 345,
    category: "furniture",
    bestPrice: 199.99,
    merchants: [
      { id: 32, name: "Office Furniture Pro", creditTag: "Excellent", price: 219.99, shipping: "Free", inStock: true },
      { id: 33, name: "Workspace Solutions", creditTag: "Good", price: 199.99, shipping: "$15.99", inStock: true }
    ]
  },
  {
    id: 17,
    name: "Wooden Coffee Table",
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 123,
    category: "furniture",
    bestPrice: 149.99,
    merchants: [
      { id: 34, name: "Wood Craft", creditTag: "Amazing", price: 169.99, shipping: "Free", inStock: true },
      { id: 35, name: "Home Decor Plus", creditTag: "Excellent", price: 149.99, shipping: "$12.99", inStock: true }
    ]
  },
  {
    id: 18,
    name: "Luxury Bed Frame King Size",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewContent: 89,
    category: "furniture",
    bestPrice: 599.99,
    merchants: [
      { id: 36, name: "Bedroom Essentials", creditTag: "Good", price: 649.99, shipping: "$35.99", inStock: true },
      { id: 37, name: "Sleep Comfort", creditTag: "Excellent", price: 599.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 19,
    name: "Dining Table Set 6 Chairs",
    image: "/placeholder.svg",
    rating: 4.4,
    reviewCount: 234,
    category: "furniture",
    bestPrice: 799.99,
    merchants: [
      { id: 38, name: "Dining Room Pro", creditTag: "Excellent", price: 849.99, shipping: "Free", inStock: true },
      { id: 39, name: "Furniture Warehouse", creditTag: "Good", price: 799.99, shipping: "$25.99", inStock: true }
    ]
  },
  {
    id: 20,
    name: "Comfortable Recliner Sofa",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 167,
    category: "furniture",
    bestPrice: 899.99,
    merchants: [
      { id: 40, name: "Living Room Luxe", creditTag: "Amazing", price: 949.99, shipping: "Free", inStock: true },
      { id: 41, name: "Comfort Furniture", creditTag: "Excellent", price: 899.99, shipping: "$19.99", inStock: true }
    ]
  },

  // Sports
  {
    id: 21,
    name: "Professional Tennis Racket",
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 178,
    category: "sports",
    bestPrice: 119.99,
    merchants: [
      { id: 42, name: "Sports Authority", creditTag: "Excellent", price: 129.99, shipping: "Free", inStock: true },
      { id: 43, name: "Tennis Pro Shop", creditTag: "Amazing", price: 119.99, shipping: "$4.99", inStock: true }
    ]
  },
  {
    id: 22,
    name: "Adjustable Dumbbells Set",
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 456,
    category: "sports",
    bestPrice: 299.99,
    merchants: [
      { id: 44, name: "Fitness Equipment", creditTag: "Good", price: 329.99, shipping: "$19.99", inStock: true },
      { id: 45, name: "Gym Gear Pro", creditTag: "Excellent", price: 299.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 23,
    name: "Yoga Mat Premium Quality",
    image: "/placeholder.svg",
    rating: 4.3,
    reviewCount: 234,
    category: "sports",
    bestPrice: 39.99,
    merchants: [
      { id: 46, name: "Yoga Essentials", creditTag: "Moderate", price: 44.99, shipping: "$2.99", inStock: true },
      { id: 47, name: "Wellness Gear", creditTag: "Good", price: 39.99, shipping: "Free", inStock: true }
    ]
  },
  {
    id: 24,
    name: "Mountain Bike 21 Speed",
    image: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 89,
    category: "sports",
    bestPrice: 449.99,
    merchants: [
      { id: 48, name: "Bike World", creditTag: "Amazing", price: 479.99, shipping: "Free", inStock: true },
      { id: 49, name: "Cycling Pro", creditTag: "Excellent", price: 449.99, shipping: "$24.99", inStock: true }
    ]
  },
  {
    id: 25,
    name: "Swimming Goggles Anti-Fog",
    image: "/placeholder.svg",
    rating: 4.2,
    reviewCount: 123,
    category: "sports",
    bestPrice: 19.99,
    merchants: [
      { id: 50, name: "Swim Gear", creditTag: "Good", price: 24.99, shipping: "$1.99", inStock: true },
      { id: 51, name: "Aqua Sports", creditTag: "Excellent", price: 19.99, shipping: "Free", inStock: true }
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
