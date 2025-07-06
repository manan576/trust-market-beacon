
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onCategorySelect: (categoryName: string) => void;
}

const HomePage = ({ onCategorySelect }: HomePageProps) => {
  return (
    <div className="space-y-4">
      {/* Yellow promotional banner */}
      <div style={{ backgroundColor: '#ffc220' }} className="rounded-lg p-6 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Get 50% off a year of Walmart+ to shop hot Deals first
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
              Join Walmart+
            </Button>
          </div>
        </div>
      </div>

      {/* Asymmetrical Grid Layout - Walmart Style */}
      <div className="grid grid-cols-12 gap-4 h-[600px]">
        {/* Left Column - Beauty New Arrivals (Tall) */}
        <div className="col-span-12 md:col-span-3 row-span-2">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#f7d5d3' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mb-4">
                  New Arrivals
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hot, new beauty from $10</h3>
                <div className="flex space-x-2 mb-6">
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* Center Large Tile - Hot July 4th Savings */}
        <div className="col-span-12 md:col-span-6">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#87ceeb' }}>
            <div className="p-8 h-full flex flex-col justify-center relative">
              <p className="text-gray-800 mb-2">Get it in as fast as an hour*</p>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Hot July 4th savings</h2>
              
              {/* Product Images */}
              <div className="flex space-x-4 mb-6">
                <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>
                <div className="w-24 h-24 bg-blue-400 rounded-lg"></div>
                <div className="w-24 h-24 bg-red-400 rounded-lg"></div>
              </div>
              
              <Button className="bg-white text-black hover:bg-gray-100 w-fit rounded-full px-6 py-2 mb-4">
                Shop now
              </Button>
              
              <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold w-fit">
                Rollbacks
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Teacher Supplies */}
        <div className="col-span-12 md:col-span-3">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#87ceeb' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Tons of classroom supplies for teachers</h3>
                <div className="w-20 h-20 bg-yellow-400 rounded mb-4"></div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row of Asymmetrical Grid */}
      <div className="grid grid-cols-12 gap-4 h-[300px]">
        {/* Home Appliances */}
        <div className="col-span-12 md:col-span-3">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#87ceeb' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Save on home appliances</h3>
                <div className="w-20 h-24 bg-gray-400 rounded mb-4"></div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* Summer Home Trends */}
        <div className="col-span-12 md:col-span-3">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#f4c2a1' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Summer home trends</h3>
                <div className="w-20 h-16 bg-blue-300 rounded mb-4"></div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop home
              </Button>
            </div>
          </div>
        </div>

        {/* Up to 60% Off */}
        <div className="col-span-12 md:col-span-3">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#ffc220' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Up to 60% off</h3>
                <div className="w-16 h-20 bg-gray-600 rounded mb-4"></div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* Skincare Offer */}
        <div className="col-span-12 md:col-span-3">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#f5e6d3' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Save on La Roche-Posay Anthelios</h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-12 h-16 bg-orange-400 rounded"></div>
                  <div className="w-12 h-16 bg-orange-400 rounded"></div>
                </div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-4 h-[200px]">
        {/* Jurassic World Movie */}
        <div className="col-span-12 md:col-span-6">
          <div className="h-full rounded-lg overflow-hidden" style={{ backgroundColor: '#e6f3ff' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">New Jurassic World movie</h3>
                <div className="w-24 h-16 bg-green-400 rounded mb-4"></div>
              </div>
              <Button variant="link" className="text-blue-600 p-0 h-auto self-start">
                Shop toys & more
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Promotional Space */}
        <div className="col-span-12 md:col-span-6">
          <div className="h-full rounded-lg overflow-hidden bg-gray-100">
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Shop by Category</h3>
              <Button 
                onClick={() => onCategorySelect('electronics')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
              >
                Browse All Categories
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Features Section */}
      <div className="bg-gray-50 rounded-lg p-8 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Trust TrustMart?</h2>
          <p className="text-lg text-gray-600">Our innovative trust system ensures you shop with confidence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Merchant Credit Tags</h3>
            <p className="text-gray-600 text-sm">Every merchant gets a verified credit rating: Excellent, Good, or Moderate based on their track record.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Credibility Scores</h3>
            <p className="text-gray-600 text-sm">Customer reviews are scored for trustworthiness with color-coded credibility indicators.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Smart Sorting</h3>
            <p className="text-gray-600 text-sm">Sort reviews by credibility to see the most trustworthy opinions first.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
