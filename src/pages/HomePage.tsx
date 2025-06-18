
import { useState } from 'react';
import { ShoppingBag, Smartphone, Heart, Sofa, Dumbbell, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  productCount: number;
  gradient: string;
}

interface HomePageProps {
  onCategorySelect: (categoryId: string) => void;
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    description: 'Latest gadgets and devices',
    productCount: 5,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: ShoppingBag,
    description: 'Trendy clothing and accessories',
    productCount: 5,
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'beauty',
    name: 'Beauty Products',
    icon: Heart,
    description: 'Skincare, makeup & wellness',
    productCount: 5,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: Sofa,
    description: 'Home & office furniture',
    productCount: 5,
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Dumbbell,
    description: 'Sports equipment & fitness gear',
    productCount: 5,
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'everyday-essentials',
    name: 'Everyday Essentials',
    icon: Coffee,
    description: 'Daily necessities & household items',
    productCount: 5,
    gradient: 'from-amber-500 to-orange-600'
  }
];

const HomePage = ({ onCategorySelect }: HomePageProps) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Discover Trusted Products
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Shop with confidence using our credibility system. Every merchant is verified, every review is scored for trustworthiness.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-sm font-medium">🛡️ Verified Merchants</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-sm font-medium">⭐ Credible Reviews</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-sm font-medium">🚚 Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600">Explore our curated selection of premium products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden bg-white"
                onClick={() => onCategorySelect(category.id)}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${category.gradient} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 -translate-y-4">
                      <Icon className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 mb-4">{category.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">
                        {category.productCount} products
                      </span>
                      <Button 
                        variant="ghost" 
                        className="text-gray-900 hover:text-white hover:bg-gray-900 transition-colors"
                      >
                        Explore →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Trust Features Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Trust TrustMarket?</h2>
          <p className="text-xl text-gray-600">Our innovative trust system ensures you shop with confidence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Merchant Credit Tags</h3>
            <p className="text-gray-600">Every merchant gets a verified credit rating: Excellent, Good, or Moderate based on their track record.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Credibility Scores</h3>
            <p className="text-gray-600">Customer reviews are scored for trustworthiness with color-coded credibility indicators.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Sorting</h3>
            <p className="text-gray-600">Sort reviews by credibility to see the most trustworthy opinions first.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
