import { useState } from 'react';
import { Star, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Merchant {
  id: number;
  name: string;
  creditTag: 'Moderate' | 'Good' | 'Excellent';
  price: number;
  originalPrice?: number;
  shipping: string;
  inStock: boolean;
  rating: number;
  totalReviews: number;
  deliveryDate: string;
  offers: string[];
}

interface Product {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  rating: number;
  overallRating: number;
  reviewCount: number;
  category: string;
  merchants: Merchant[];
  bestPrice: number;
}

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  selectedCategory?: string;
}

// Generate different delivery dates
const generateDeliveryDate = (merchantIndex: number) => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 2 + merchantIndex * 2); // 2, 4, 6 days etc.
  return baseDate.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Generate offers for merchants
const generateOffers = (merchantIndex: number) => {
  const allOffers = [
    ['Free shipping', '10% off'],
    ['Express delivery', '5% cashback'],
    ['Free returns', 'Buy 2 Get 1 Free'],
    ['Same day delivery', '15% off first order']
  ];
  return allOffers[merchantIndex % allOffers.length];
};

const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    shortDescription: "High-quality wireless headphones with noise cancellation\nPerfect for music and calls with 30-hour battery life",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 247,
    category: "electronics",
    bestPrice: 69.99,
    merchants: [
      { id: 1, name: "AudioTech Pro", creditTag: "Excellent", price: 79.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 2, name: "SoundWave", creditTag: "Good", price: 74.99, shipping: "$3.99", inStock: true, rating: 4.2, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 3, name: "TechDeals", creditTag: "Moderate", price: 69.99, shipping: "Free", inStock: false, rating: 4.1, totalReviews: 91, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 2,
    name: "Smart Phone 5G Latest Model",
    shortDescription: "Latest 5G smartphone with advanced camera system\nFast processor and all-day battery life",
    image: "/placeholder.svg",
    rating: 4.7,
    overallRating: 4.5,
    reviewCount: 892,
    category: "electronics",
    bestPrice: 799.99,
    merchants: [
      { id: 4, name: "MobileTech", creditTag: "Excellent", price: 849.99, shipping: "Free", inStock: true, rating: 4.8, totalReviews: 234, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 5, name: "PhoneHub", creditTag: "Good", price: 799.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 187, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 6, name: "GadgetWorld", creditTag: "Moderate", price: 829.99, shipping: "$9.99", inStock: true, rating: 4.3, totalReviews: 156, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV 55 inch",
    shortDescription: "Stunning 4K display with smart streaming capabilities\nBuilt-in apps and voice control features",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 456,
    category: "electronics",
    bestPrice: 599.99,
    merchants: [
      { id: 7, name: "ElectroWorld", creditTag: "Good", price: 649.99, shipping: "$25.99", inStock: true, rating: 4.3, totalReviews: 123, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 8, name: "TV Central", creditTag: "Excellent", price: 599.99, shipping: "Free", inStock: true, rating: 4.5, totalReviews: 198, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 9, name: "HomeElectronics", creditTag: "Moderate", price: 619.99, shipping: "$15.99", inStock: true, rating: 3.9, totalReviews: 135, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 4,
    name: "Wireless Gaming Keyboard",
    shortDescription: "Mechanical gaming keyboard with RGB backlighting\nWireless connectivity and programmable keys",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 312,
    category: "electronics",
    bestPrice: 89.99,
    merchants: [
      { id: 10, name: "GameGear Plus", creditTag: "Excellent", price: 99.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 87, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 11, name: "ProGaming", creditTag: "Good", price: 89.99, shipping: "$1.99", inStock: true, rating: 4.2, totalReviews: 112, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 12, name: "TechAccessories", creditTag: "Moderate", price: 94.99, shipping: "$3.99", inStock: true, rating: 3.7, totalReviews: 113, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 5,
    name: "Portable Power Bank 20000mAh",
    shortDescription: "High-capacity power bank with fast charging\nCompact design with multiple charging ports",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 189,
    category: "electronics",
    bestPrice: 39.99,
    merchants: [
      { id: 13, name: "PowerSolutions", creditTag: "Good", price: 44.99, shipping: "$2.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 14, name: "ChargeIt", creditTag: "Excellent", price: 39.99, shipping: "Free", inStock: true, rating: 4.7, totalReviews: 89, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 15, name: "MobilePower", creditTag: "Moderate", price: 42.99, shipping: "$1.99", inStock: true, rating: 4.0, totalReviews: 33, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },

  // Fashion - with different ratings
  {
    id: 6,
    name: "Premium Cotton T-Shirt",
    shortDescription: "Soft premium cotton t-shirt with perfect fit\nBreathable fabric and long-lasting quality",
    image: "/placeholder.svg",
    rating: 4.2,
    overallRating: 4.0,
    reviewCount: 203,
    category: "fashion",
    bestPrice: 24.99,
    merchants: [
      { id: 16, name: "Fashion Forward", creditTag: "Excellent", price: 29.99, shipping: "$3.99", inStock: true, rating: 4.3, totalReviews: 78, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 17, name: "StyleHub", creditTag: "Good", price: 24.99, shipping: "Free", inStock: true, rating: 4.1, totalReviews: 89, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 18, name: "CasualWear", creditTag: "Moderate", price: 27.99, shipping: "$2.99", inStock: true, rating: 3.6, totalReviews: 36, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 7,
    name: "Designer Leather Jacket",
    shortDescription: "Genuine leather jacket with modern design\nPerfect for all seasons and occasions",
    image: "/placeholder.svg",
    rating: 4.8,
    overallRating: 4.6,
    reviewCount: 194,
    category: "fashion",
    bestPrice: 199.99,
    merchants: [
      { id: 19, name: "Leather Luxe", creditTag: "Excellent", price: 219.99, shipping: "Free", inStock: true, rating: 4.9, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 20, name: "Fashion Elite", creditTag: "Good", price: 199.99, shipping: "Free", inStock: true, rating: 4.5, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 21, name: "StyleCraft", creditTag: "Moderate", price: 209.99, shipping: "$5.99", inStock: true, rating: 4.4, totalReviews: 49, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  // ... keep existing code for other products with similar updates

  // Everyday Essentials - New Category
  {
    id: 26,
    name: "Organic Coffee Beans Premium",
    shortDescription: "Single-origin organic coffee beans\nRich flavor with sustainable sourcing",
    image: "/placeholder.svg",
    rating: 4.7,
    overallRating: 4.5,
    reviewCount: 234,
    category: "everyday-essentials",
    bestPrice: 19.99,
    merchants: [
      { id: 78, name: "Coffee Masters", creditTag: "Excellent", price: 22.99, shipping: "Free", inStock: true, rating: 4.8, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 79, name: "Bean Source", creditTag: "Good", price: 19.99, shipping: "$2.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 80, name: "Daily Brew", creditTag: "Moderate", price: 21.99, shipping: "$1.99", inStock: true, rating: 4.2, totalReviews: 78, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 27,
    name: "Eco-Friendly Dish Soap",
    shortDescription: "Natural dish soap with plant-based ingredients\nEffective cleaning without harsh chemicals",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 167,
    category: "everyday-essentials",
    bestPrice: 8.99,
    merchants: [
      { id: 81, name: "Green Clean", creditTag: "Excellent", price: 9.99, shipping: "$1.99", inStock: true, rating: 4.5, totalReviews: 56, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 82, name: "EcoHome", creditTag: "Good", price: 8.99, shipping: "Free", inStock: true, rating: 4.2, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 83, name: "Natural Solutions", creditTag: "Moderate", price: 9.49, shipping: "$0.99", inStock: true, rating: 3.8, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 28,
    name: "Bamboo Toothbrush Set",
    shortDescription: "Sustainable bamboo toothbrushes pack of 4\nBiodegradable with soft bristles",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 123,
    category: "everyday-essentials",
    bestPrice: 12.99,
    merchants: [
      { id: 84, name: "Eco Dental", creditTag: "Excellent", price: 14.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 45, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 85, name: "Green Living", creditTag: "Good", price: 12.99, shipping: "$1.99", inStock: true, rating: 4.3, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 86, name: "Sustainable Life", creditTag: "Moderate", price: 13.99, shipping: "$2.99", inStock: true, rating: 4.0, totalReviews: 22, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 29,
    name: "Multi-Purpose Cleaning Spray",
    shortDescription: "All-natural multi-surface cleaning spray\nSafe for family and pets with fresh scent",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 189,
    category: "everyday-essentials",
    bestPrice: 6.99,
    merchants: [
      { id: 87, name: "Pure Clean", creditTag: "Excellent", price: 7.99, shipping: "$1.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 88, name: "Home Essentials", creditTag: "Good", price: 6.99, shipping: "Free", inStock: true, rating: 4.3, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 89, name: "Clean & Safe", creditTag: "Moderate", price: 7.49, shipping: "$0.99", inStock: true, rating: 3.8, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 30,
    name: "Reusable Water Bottle Steel",
    shortDescription: "Insulated stainless steel water bottle 32oz\nKeeps drinks cold for 24h, hot for 12h",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 278,
    category: "everyday-essentials",
    bestPrice: 24.99,
    merchants: [
      { id: 90, name: "Hydro Pro", creditTag: "Excellent", price: 27.99, shipping: "Free", inStock: true, rating: 4.7, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 91, name: "Bottle Shop", creditTag: "Good", price: 24.99, shipping: "$2.99", inStock: true, rating: 4.4, totalReviews: 123, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 92, name: "Eco Bottles", creditTag: "Moderate", price: 26.99, shipping: "$1.99", inStock: true, rating: 4.1, totalReviews: 66, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  }
];

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
        return b.overallRating - a.overallRating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const getCategoryTitle = () => {
    if (!selectedCategory) return 'All Products';
    const categoryMap: { [key: string]: string } = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'beauty': 'Beauty Products',
      'furniture': 'Furniture',
      'sports': 'Sports',
      'everyday-essentials': 'Everyday Essentials'
    };
    return categoryMap[selectedCategory] || selectedCategory;
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
                            i < Math.floor(product.overallRating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {product.overallRating.toFixed(1)} ({product.reviewCount})
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
