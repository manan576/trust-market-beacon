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
              <div><span className="text-2xl">03</span><br/><span className="text-sm">hours</span></div>
              <div><span className="text-2xl">:</span></div>
              <div><span className="text-2xl">11</span><br/><span className="text-sm">mins</span></div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-2 rounded-full">
              Join Walmart+
            </Button>
          </div>
        </div>
      </div>

      {/* Single Contiguous Grid */}
      <div className="grid grid-cols-12 gap-4 auto-rows-auto">
        {/* 1) Hot, new beauty from $10 */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#E0F7FA' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mb-2">
                  New Arrivals
                </span>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#001E60' }}>
                  Hot, new beauty from $10
                </h3>
                <img
                  src="image.png"
                  alt="Beauty"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 2) Hot July 4th savings */}
        <div className="col-span-12 md:col-span-6">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#B3E5FC' }}
          >
            <div className="p-8 flex flex-col md:flex-row items-center h-full">
              <div className="flex-1">
                <p className="text-gray-800 mb-2">Get it in as fast as an hour*</p>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#001E60' }}>
                  Hot July 4th savings
                </h2>
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2">
                  Shop now
                </Button>
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm font-bold mt-4">
                  Rollbacks
                </div>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-2 md:ml-8 mt-6 md:mt-0">
                <img
                  src="/images/speaker.png"
                  alt="Speaker"
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex space-x-2 justify-end">
                  <img
                    src="/images/blender.png"
                    alt="Blender"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <img
                    src="/images/book.png"
                    alt="Book"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3) Tons of classroom supplies for teachers */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#B2EBF2' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>
                  Tons of classroom supplies for teachers
                </h3>
                <img
                  src="/images/supplies.png"
                  alt="Classroom supplies"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 4) Save on home appliances (tall) */}
        <div className="col-span-12 md:col-span-3 row-span-2">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#81D4FA' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>
                  Save on home appliances
                </h3>
                <img
                  src="/images/fridge.png"
                  alt="Refrigerator"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 5) Summer home trends */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#E1BEE7' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>
                  Summer home trends
                </h3>
                <img
                  src="/images/room.png"
                  alt="Home decor"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop home
              </Button>
            </div>
          </div>
        </div>

        {/* 6) Up to 60% off */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#80CBC4' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>Up to 60% off</h3>
                <img
                  src="/images/fan.png"
                  alt="Tower fan"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 7) Save on La Roche-Posay Anthelios */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#C5CAE9' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>
                  Save on La Roche-Posay Anthelios
                </h3>
                <div className="flex space-x-2">
                  <img
                    src="/images/sunscreen1.png"
                    alt="Anthelios 1"
                    className="w-1/2 h-36 object-cover rounded"
                  />
                  <img
                    src="/images/sunscreen2.png"
                    alt="Anthelios 2"
                    className="w-1/2 h-36 object-cover rounded"
                  />
                </div>
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 8) Premium beauty. Victoria’s Secret. */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#F8BBD0' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Premium beauty. Victoria’s Secret.
                </h3>
                <img
                  src="/images/victoria.png"
                  alt="Victoria's Secret"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 9) Don’t miss out! */}
        <div className="col-span-12 md:col-span-6">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#C8E6C9' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Don’t miss out!
                </h3>
                <p className="text-gray-600 mb-4">
                  Get 50% off a year of Walmart+ & shop Deals first
                </p>
                <img
                  src="/images/walmart-deals.png"
                  alt="Walmart Deals"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Learn more
              </Button>
            </div>
          </div>
        </div>

        {/* 10) Shop by Category (fills blank) */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#D1C4E9' }}
          >
            <div className="p-6 flex flex-col h-full justify-center items-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#001E60' }}>
                Shop by Category
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Browse categories in the navigation bar above
              </p>
            </div>
          </div>
        </div>

        {/* 11) New Jurassic World movie */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#E3F2FD' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#001E60' }}>
                  New Jurassic World movie
                </h3>
                <img
                  src="/images/dinosaur.png"
                  alt="Jurassic World"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Shop toys & more
              </Button>
            </div>
          </div>
        </div>

        {/* Duplicate Don’t miss out! row (as in original) */}
        <div className="col-span-12 md:col-span-6">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: '#fae6b1' }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Don’t miss out!
                </h3>
                <p className="text-gray-600 mb-4">
                  Get 50% off a year of Walmart+ & shop Deals first
                </p>
                <img
                  src="/images/walmart-deals.png"
                  alt="Walmart Deals"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              <Button variant="link" className="text-blue-600 p-0">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Features Section */}
      <div className="bg-gray-50 rounded-lg p-8 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#001E60' }}>
            Why Trust TrustMart?
          </h2>
          <p className="text-lg text-gray-600">
            Our innovative trust system ensures you shop with confidence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#001E60' }}>
              Merchant Credit Tags
            </h3>
            <p className="text-gray-600 text-sm">
              Every merchant gets a verified credit rating: Excellent, Good, or
              Moderate based on their track record.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#001E60' }}>
              Credibility Scores
            </h3>
            <p className="text-gray-600 text-sm">
              Customer reviews are scored for trustworthiness with color-coded
              credibility indicators.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#001E60' }}>
              Smart Sorting
            </h3>
            <p className="text-gray-600 text-sm">
              Sort reviews by credibility to see the most trustworthy opinions
              first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;