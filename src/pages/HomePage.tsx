
import { useState } from 'react';
import { ShoppingBag, Smartphone, Heart, Sofa, Dumbbell, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useCategories';

interface HomePageProps {
  onCategorySelect: (categoryName: string) => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'Smartphone': Smartphone,
  'ShoppingBag': ShoppingBag,
  'Heart': Heart,
  'Sofa': Sofa,
  'Dumbbell': Dumbbell,
  'Coffee': Coffee
};

const HomePage = ({ onCategorySelect }: HomePageProps) => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="space-y-12">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Walmart-style promotional banner */}
      <div className="bg-walmart-yellow rounded-lg p-6 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Get 50% off a year of TrustMart+ to shop hot Deals first
            </h2>
            <p className="text-black/80 mb-4">Early Access starts in:</p>
            <div className="flex justify-center space-x-4 text-black font-bold">
              <div><span className="text-2xl">01</span><br/><span className="text-sm">day</span></div>
              <div><span className="text-2xl">:</span></div>
              <div><span className="text-2xl">04</span><br/><span className="text-sm">hours</span></div>
              <div><span className="text-2xl">:</span></div>
              <div><span className="text-2xl">45</span><br/><span className="text-sm">mins</span></div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3 rounded-full">
              Join TrustMart+
            </Button>
          </div>
        </div>
      </div>

      {/* Main promotional grid - Walmart style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Large promotional card */}
        <div className="lg:col-span-2">
          <Card className="h-full overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8 h-full flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">Get it in as fast as an hour*</h3>
                <h2 className="text-5xl font-bold mb-6">Hot July 4th savings</h2>
                <Button className="bg-white text-black hover:bg-gray-100 w-fit rounded-full px-6 py-2">
                  Shop now
                </Button>
                <div className="mt-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                    Rollbacks
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column promotional cards */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-primary text-white p-6">
                <h3 className="text-xl font-bold mb-2">Deals start 7/B at 12am ET</h3>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Explore Deals
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="bg-orange-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Summer home trends from ₹6</h3>
                <Button variant="link" className="text-primary p-0 h-auto">
                  Shop home →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Categories Section - Walmart style */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our curated selection of premium products</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Coffee;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
                onClick={() => onCategorySelect(category.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm capitalize text-foreground">{category.name.replace('-', ' ')}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.product_count} products
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Secondary promotional grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-pink-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Premium beauty. Victoria's Secret.</h3>
              <Button variant="link" className="text-primary p-0 h-auto">
                Shop now →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-yellow-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hot, new beauty from ₹10</h3>
              <Button variant="link" className="text-primary p-0 h-auto">
                Shop now →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Classroom supplies for teachers</h3>
              <Button variant="link" className="text-primary p-0 h-auto">
                Shop now →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-walmart-yellow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Up to 55% off</h3>
              <Button variant="link" className="text-primary p-0 h-auto">
                Shop now →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Features Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Trust TrustMart?</h2>
          <p className="text-lg text-muted-foreground">Our innovative trust system ensures you shop with confidence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Merchant Credit Tags</h3>
            <p className="text-muted-foreground text-sm">Every merchant gets a verified credit rating: Excellent, Good, or Moderate based on their track record.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Credibility Scores</h3>
            <p className="text-muted-foreground text-sm">Customer reviews are scored for trustworthiness with color-coded credibility indicators.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Smart Sorting</h3>
            <p className="text-muted-foreground text-sm">Sort reviews by credibility to see the most trustworthy opinions first.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
