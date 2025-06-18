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
  searchQuery?: string;
}

// Generate different delivery dates
const generateDeliveryDate = (merchantIndex: number) => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 2 + merchantIndex * 2);
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
  // Electronics - keep existing code
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
  // ... keep existing electronics products

  // Fashion - Updated with 5 products
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
  {
    id: 31,
    name: "Denim Skinny Jeans",
    shortDescription: "Classic skinny fit jeans with stretch comfort\nVersatile design for casual and smart-casual looks",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 156,
    category: "fashion",
    bestPrice: 59.99,
    merchants: [
      { id: 93, name: "Denim Co", creditTag: "Good", price: 64.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 94, name: "Urban Style", creditTag: "Excellent", price: 59.99, shipping: "$2.99", inStock: true, rating: 4.2, totalReviews: 45, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 95, name: "Fashion House", creditTag: "Moderate", price: 62.99, shipping: "$3.99", inStock: true, rating: 3.7, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 32,
    name: "Casual Summer Dress",
    shortDescription: "Light and airy summer dress with floral print\nComfortable fit perfect for warm weather",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 189,
    category: "fashion",
    bestPrice: 45.99,
    merchants: [
      { id: 96, name: "Summer Styles", creditTag: "Excellent", price: 49.99, shipping: "Free", inStock: true, rating: 4.7, totalReviews: 78, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 97, name: "Dress Shop", creditTag: "Good", price: 45.99, shipping: "$1.99", inStock: true, rating: 4.3, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 98, name: "Fashion Trends", creditTag: "Moderate", price: 47.99, shipping: "$2.99", inStock: true, rating: 4.2, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 33,
    name: "Business Blazer Professional",
    shortDescription: "Tailored blazer for professional settings\nSlim fit design with premium fabric blend",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 123,
    category: "fashion",
    bestPrice: 89.99,
    merchants: [
      { id: 99, name: "Professional Wear", creditTag: "Excellent", price: 94.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 56, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 100, name: "Office Style", creditTag: "Good", price: 89.99, shipping: "$4.99", inStock: true, rating: 4.2, totalReviews: 34, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 101, name: "Business Attire", creditTag: "Moderate", price: 92.99, shipping: "$3.99", inStock: true, rating: 4.1, totalReviews: 33, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },

  // Beauty Products - 5 products
  {
    id: 34,
    name: "Anti-Aging Serum Premium",
    shortDescription: "Advanced anti-aging serum with vitamin C\nReduces wrinkles and brightens skin tone",
    image: "/placeholder.svg",
    rating: 4.7,
    overallRating: 4.5,
    reviewCount: 234,
    category: "beauty",
    bestPrice: 79.99,
    merchants: [
      { id: 102, name: "Beauty Plus", creditTag: "Excellent", price: 84.99, shipping: "Free", inStock: true, rating: 4.8, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 103, name: "Skincare Pro", creditTag: "Good", price: 79.99, shipping: "$2.99", inStock: true, rating: 4.4, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 104, name: "Glow Beauty", creditTag: "Moderate", price: 82.99, shipping: "$1.99", inStock: true, rating: 4.3, totalReviews: 67, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 35,
    name: "Moisturizing Face Cream",
    shortDescription: "Deep hydrating cream for all skin types\nNon-greasy formula with natural ingredients",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 178,
    category: "beauty",
    bestPrice: 34.99,
    merchants: [
      { id: 105, name: "Pure Skin", creditTag: "Good", price: 37.99, shipping: "$1.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 106, name: "Natural Beauty", creditTag: "Excellent", price: 34.99, shipping: "Free", inStock: true, rating: 4.2, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 107, name: "Beauty Essentials", creditTag: "Moderate", price: 36.99, shipping: "$2.99", inStock: true, rating: 3.9, totalReviews: 55, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 36,
    name: "Waterproof Mascara Long-Lasting",
    shortDescription: "Volumizing mascara that lasts all day\nWaterproof formula with curved brush applicator",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 145,
    category: "beauty",
    bestPrice: 18.99,
    merchants: [
      { id: 108, name: "Makeup Magic", creditTag: "Excellent", price: 21.99, shipping: "$1.99", inStock: true, rating: 4.4, totalReviews: 45, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 109, name: "Cosmetics Plus", creditTag: "Good", price: 18.99, shipping: "Free", inStock: true, rating: 4.0, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 110, name: "Beauty Box", creditTag: "Moderate", price: 20.99, shipping: "$0.99", inStock: true, rating: 3.9, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 37,
    name: "Vitamin C Face Cleanser",
    shortDescription: "Gentle cleanser with vitamin C and botanicals\nRemoves impurities while brightening complexion",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 198,
    category: "beauty",
    bestPrice: 24.99,
    merchants: [
      { id: 111, name: "Fresh Face", creditTag: "Good", price: 27.99, shipping: "$2.99", inStock: true, rating: 4.6, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 112, name: "Vitamin Beauty", creditTag: "Excellent", price: 24.99, shipping: "Free", inStock: true, rating: 4.3, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 113, name: "Clean Skin", creditTag: "Moderate", price: 26.99, shipping: "$1.99", inStock: true, rating: 4.0, totalReviews: 53, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 38,
    name: "Luxury Lipstick Set",
    shortDescription: "Premium lipstick collection in 5 shades\nLong-wearing formula with moisturizing properties",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 167,
    category: "beauty",
    bestPrice: 59.99,
    merchants: [
      { id: 114, name: "Lip Luxury", creditTag: "Excellent", price: 64.99, shipping: "Free", inStock: true, rating: 4.7, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 115, name: "Color Cosmetics", creditTag: "Good", price: 59.99, shipping: "$3.99", inStock: true, rating: 4.3, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 116, name: "Beauty Boutique", creditTag: "Moderate", price: 62.99, shipping: "$2.99", inStock: true, rating: 4.2, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },

  // Furniture - 5 products
  {
    id: 39,
    name: "Modern Office Desk",
    shortDescription: "Sleek contemporary desk with storage drawers\nPerfect for home office or study room",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 189,
    category: "furniture",
    bestPrice: 299.99,
    merchants: [
      { id: 117, name: "Office Plus", creditTag: "Good", price: 319.99, shipping: "$29.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 118, name: "Furniture Pro", creditTag: "Excellent", price: 299.99, shipping: "Free", inStock: true, rating: 4.2, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 119, name: "Home Solutions", creditTag: "Moderate", price: 309.99, shipping: "$19.99", inStock: true, rating: 3.9, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 40,
    name: "Comfortable Armchair",
    shortDescription: "Ergonomic armchair with premium upholstery\nPerfect for reading corner or living room",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 234,
    category: "furniture",
    bestPrice: 449.99,
    merchants: [
      { id: 120, name: "Comfort Seating", creditTag: "Excellent", price: 469.99, shipping: "Free", inStock: true, rating: 4.7, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 121, name: "Chair World", creditTag: "Good", price: 449.99, shipping: "$39.99", inStock: true, rating: 4.3, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 122, name: "Living Furniture", creditTag: "Moderate", price: 459.99, shipping: "$25.99", inStock: true, rating: 4.2, totalReviews: 67, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 41,
    name: "Dining Table Set 6-Seater",
    shortDescription: "Elegant dining table with 6 matching chairs\nSolid wood construction with modern finish",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 156,
    category: "furniture",
    bestPrice: 899.99,
    merchants: [
      { id: 123, name: "Dining Solutions", creditTag: "Good", price: 949.99, shipping: "$49.99", inStock: true, rating: 4.6, totalReviews: 56, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 124, name: "Wood Craft", creditTag: "Excellent", price: 899.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 125, name: "Home Dining", creditTag: "Moderate", price: 929.99, shipping: "$35.99", inStock: true, rating: 3.9, totalReviews: 33, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 42,
    name: "Storage Bookshelf 5-Tier",
    shortDescription: "Spacious 5-tier bookshelf for home or office\nSturdy construction with adjustable shelves",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 178,
    category: "furniture",
    bestPrice: 159.99,
    merchants: [
      { id: 126, name: "Storage Plus", creditTag: "Excellent", price: 169.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 127, name: "Book Storage", creditTag: "Good", price: 159.99, shipping: "$9.99", inStock: true, rating: 4.1, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 128, name: "Shelf Solutions", creditTag: "Moderate", price: 164.99, shipping: "$7.99", inStock: true, rating: 3.8, totalReviews: 55, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 43,
    name: "Queen Size Bed Frame",
    shortDescription: "Modern platform bed frame with headboard\nSturdy metal construction with wood accents",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 198,
    category: "furniture",
    bestPrice: 329.99,
    merchants: [
      { id: 129, name: "Bedroom Pro", creditTag: "Good", price: 349.99, shipping: "$39.99", inStock: true, rating: 4.5, totalReviews: 78, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 130, name: "Sleep Solutions", creditTag: "Excellent", price: 329.99, shipping: "Free", inStock: true, rating: 4.2, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 131, name: "Bed World", creditTag: "Moderate", price: 339.99, shipping: "$29.99", inStock: true, rating: 3.9, totalReviews: 53, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },

  // Sports - 5 products
  {
    id: 44,
    name: "Professional Yoga Mat",
    shortDescription: "Non-slip yoga mat with extra cushioning\nEco-friendly material perfect for all yoga styles",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 234,
    category: "sports",
    bestPrice: 39.99,
    merchants: [
      { id: 132, name: "Yoga Pro", creditTag: "Excellent", price: 44.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 133, name: "Fitness Gear", creditTag: "Good", price: 39.99, shipping: "$2.99", inStock: true, rating: 4.2, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 134, name: "Sport Equipment", creditTag: "Moderate", price: 42.99, shipping: "$1.99", inStock: true, rating: 4.1, totalReviews: 67, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 45,
    name: "Adjustable Dumbbells Set",
    shortDescription: "Space-saving adjustable dumbbells 5-50lbs\nQuick weight change system for home workouts",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 189,
    category: "sports",
    bestPrice: 299.99,
    merchants: [
      { id: 135, name: "Strength Training", creditTag: "Good", price: 319.99, shipping: "$19.99", inStock: true, rating: 4.7, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 136, name: "Home Gym", creditTag: "Excellent", price: 299.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 78, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 137, name: "Fitness World", creditTag: "Moderate", price: 309.99, shipping: "$9.99", inStock: true, rating: 4.1, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 46,
    name: "Running Shoes Athletic",
    shortDescription: "Lightweight running shoes with air cushioning\nBreathable mesh upper for maximum comfort",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 267,
    category: "sports",
    bestPrice: 89.99,
    merchants: [
      { id: 138, name: "Running Store", creditTag: "Excellent", price: 94.99, shipping: "Free", inStock: true, rating: 4.5, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 139, name: "Athletic Wear", creditTag: "Good", price: 89.99, shipping: "$3.99", inStock: true, rating: 4.1, totalReviews: 98, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 140, name: "Sport Shoes", creditTag: "Moderate", price: 92.99, shipping: "$2.99", inStock: true, rating: 4.0, totalReviews: 80, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 47,
    name: "Resistance Bands Set",
    shortDescription: "Complete resistance band set with door anchor\nMultiple resistance levels for full body workout",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 156,
    category: "sports",
    bestPrice: 24.99,
    merchants: [
      { id: 141, name: "Resistance Pro", creditTag: "Good", price: 27.99, shipping: "$1.99", inStock: true, rating: 4.4, totalReviews: 56, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 142, name: "Fit Equipment", creditTag: "Excellent", price: 24.99, shipping: "Free", inStock: true, rating: 4.1, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 143, name: "Exercise Gear", creditTag: "Moderate", price: 26.99, shipping: "$0.99", inStock: true, rating: 3.8, totalReviews: 33, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 48,
    name: "Water Bottle Sports 32oz",
    shortDescription: "Insulated sports bottle with straw lid\nKeeps drinks cold for 24h, leak-proof design",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 198,
    category: "sports",
    bestPrice: 19.99,
    merchants: [
      { id: 144, name: "Hydration Plus", creditTag: "Excellent", price: 22.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 78, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 145, name: "Sports Bottles", creditTag: "Good", price: 19.99, shipping: "$1.99", inStock: true, rating: 4.2, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 146, name: "Active Gear", creditTag: "Moderate", price: 21.99, shipping: "$1.49", inStock: true, rating: 4.1, totalReviews: 53, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },

  // Everyday Essentials - 5 products
  {
    id: 49,
    name: "Organic Coffee Beans Premium",
    shortDescription: "Single-origin organic coffee beans\nRich flavor with sustainable sourcing",
    image: "/placeholder.svg",
    rating: 4.7,
    overallRating: 4.5,
    reviewCount: 234,
    category: "everyday-essentials",
    bestPrice: 19.99,
    merchants: [
      { id: 147, name: "Coffee Masters", creditTag: "Excellent", price: 22.99, shipping: "Free", inStock: true, rating: 4.8, totalReviews: 89, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 148, name: "Bean Source", creditTag: "Good", price: 19.99, shipping: "$2.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 149, name: "Daily Brew", creditTag: "Moderate", price: 21.99, shipping: "$1.99", inStock: true, rating: 4.2, totalReviews: 78, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 50,
    name: "Eco-Friendly Dish Soap",
    shortDescription: "Plant-based dish soap with natural ingredients\nEffective cleaning without harsh chemicals",
    image: "/placeholder.svg",
    rating: 4.4,
    overallRating: 4.2,
    reviewCount: 189,
    category: "everyday-essentials",
    bestPrice: 8.99,
    merchants: [
      { id: 150, name: "Green Clean", creditTag: "Good", price: 9.99, shipping: "$1.99", inStock: true, rating: 4.5, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 151, name: "EcoSoap Co", creditTag: "Excellent", price: 8.99, shipping: "Free", inStock: true, rating: 4.2, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 152, name: "Natural Clean", creditTag: "Moderate", price: 9.49, shipping: "$0.99", inStock: true, rating: 3.9, totalReviews: 66, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 51,
    name: "Bamboo Toilet Paper 12-Pack",
    shortDescription: "Sustainable bamboo toilet paper ultra-soft\nBiodegradable and plastic-free packaging",
    image: "/placeholder.svg",
    rating: 4.3,
    overallRating: 4.1,
    reviewCount: 156,
    category: "everyday-essentials",
    bestPrice: 24.99,
    merchants: [
      { id: 153, name: "Bamboo Plus", creditTag: "Excellent", price: 27.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 56, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 154, name: "Eco Paper", creditTag: "Good", price: 24.99, shipping: "$2.99", inStock: true, rating: 4.1, totalReviews: 45, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 155, name: "Green Paper Co", creditTag: "Moderate", price: 26.99, shipping: "$1.99", inStock: true, rating: 3.8, totalReviews: 55, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 52,
    name: "Organic Honey Raw Unfiltered",
    shortDescription: "Pure raw honey from local beekeepers\nNo additives or processing for natural taste",
    image: "/placeholder.svg",
    rating: 4.6,
    overallRating: 4.4,
    reviewCount: 198,
    category: "everyday-essentials",
    bestPrice: 16.99,
    merchants: [
      { id: 156, name: "Honey Farm", creditTag: "Good", price: 18.99, shipping: "$1.99", inStock: true, rating: 4.7, totalReviews: 78, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 157, name: "Pure Honey Co", creditTag: "Excellent", price: 16.99, shipping: "Free", inStock: true, rating: 4.4, totalReviews: 67, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 158, name: "Natural Honey", creditTag: "Moderate", price: 17.99, shipping: "$0.99", inStock: true, rating: 4.1, totalReviews: 53, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  },
  {
    id: 53,
    name: "Stainless Steel Water Bottle",
    shortDescription: "Double-wall insulated water bottle 32oz\nKeeps drinks cold 24h, hot 12h, leak-proof",
    image: "/placeholder.svg",
    rating: 4.5,
    overallRating: 4.3,
    reviewCount: 167,
    category: "everyday-essentials",
    bestPrice: 22.99,
    merchants: [
      { id: 159, name: "Bottle Pro", creditTag: "Excellent", price: 25.99, shipping: "Free", inStock: true, rating: 4.6, totalReviews: 67, deliveryDate: generateDeliveryDate(0), offers: generateOffers(0) },
      { id: 160, name: "Steel Bottles", creditTag: "Good", price: 22.99, shipping: "$1.99", inStock: true, rating: 4.2, totalReviews: 56, deliveryDate: generateDeliveryDate(1), offers: generateOffers(1) },
      { id: 161, name: "Hydration Plus", creditTag: "Moderate", price: 24.99, shipping: "$2.99", inStock: true, rating: 4.0, totalReviews: 44, deliveryDate: generateDeliveryDate(2), offers: generateOffers(2) }
    ]
  }
];

const ProductGrid = ({ onProductClick, selectedCategory, searchQuery }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('relevance');
  
  let filteredProducts = products;

  // Filter by category
  if (selectedCategory) {
    filteredProducts = products.filter(product => product.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery) {
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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
    if (searchQuery) return `Search results for "${searchQuery}"`;
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

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
