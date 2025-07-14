import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  onCategorySelect: (categoryName: string) => void;
}

const HomePage = ({ onCategorySelect }: HomePageProps) => {
  return (
    <div className="space-y-4">
      {/* Yellow promotional banner */}
      <div
        style={{ backgroundColor: "#ffc220" }}
        className="rounded-lg p-6 text-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Get 50% off a year of Walmart+ to shop hot Deals first
            </h2>
            <p className="text-black/80 mb-4">Early Access starts in:</p>
            <div className="flex justify-center space-x-4 text-black font-bold">
              <div>
                <span className="text-2xl">01</span>
                <br />
                <span className="text-sm">day</span>
              </div>
              <div>
                <span className="text-2xl">:</span>
              </div>
              <div>
                <span className="text-2xl">03</span>
                <br />
                <span className="text-sm">hours</span>
              </div>
              <div>
                <span className="text-2xl">:</span>
              </div>
              <div>
                <span className="text-2xl">11</span>
                <br />
                <span className="text-sm">mins</span>
              </div>
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
        {/* 1) Hot, new beauty from ₹100 */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: "#E0F7FA" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mb-2">
                  New Arrivals
                </span>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#001E60" }}
                >
                  Hot, new beauty from ₹100
                </h3>
                <img
                  src="./lipstick.png"
                  className="w-full h-55 object-cover rounded"
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
            style={{ backgroundColor: "#B3E5FC" }}
          >
            <div className="p-8 flex flex-col md:flex-row items-center h-full">
              <div className="flex-1">
                <p className="text-gray-800 mb-2">
                  Get it in as fast as an hour*
                </p>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{ color: "#001E60" }}
                >
                  Hot July 4th savings
                </h2>
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2">
                  Shop now
                </Button>
                <div className="inline-block bg-red-600 text-white px-4 py-1 rounded text-sm font-bold mt-4">
                  Rollbacks
                </div>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-2 md:ml-8 mt-6 md:mt-0">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/042/055/908/small_2x/ai-generated-a-wireless-mini-smart-bluetooth-speaker-with-vibrant-color-and-a-modern-design-isolated-on-transparent-background-png.png"
                  alt="Speaker"
                  className="w-full h-56 object-cover rounded-lg"
                />
                <div className="flex space-x-2 justify-end">
                  <img
                    src="https://wallpapers.com/images/hd/bright-orange-nike-air-sneaker-b2vcaqawagiq0myo.png"
                    alt="Blender"
                    className="w-full h-40 object-cover rounded-lg"
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
            style={{ backgroundColor: "#B2EBF2" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "#001E60" }}
                >
                  Tons of classroom supplies for teachers
                </h3>
                <img
                  src="./classroom.png"
                  className="w-full h-full object-cover rounded"
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
            style={{ backgroundColor: "#81D4FA" }}
          >
            <div className="p-6 flex flex-col h-full">
              {/* Title */}
              <h3
                className="text-lg text-center font-bold mb-4"
                style={{ color: "#001E60" }}
              >
                Save on home appliances
              </h3>

              {/* Image section */}
              <div className="flex flex-col gap-2 flex-grow">
                {/* Top image: increased from 35% to 40% */}
                <div className="flex-[0_0_40%]">
                  <img
                    src="https://www.freeiconspng.com/uploads/home-appliances-png-12.png"
                    alt="Home Appliances"
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Bottom image: slightly reduced from 65% to 60% */}
                <div className="flex-[0_0_60%]">
                  <img
                    src="https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/air-treatment/purifiers/Gen1/hp10/pdp/HP10-BlkNk-Specs.png?$responsive$&fmt=png-alpha&cropPathE=desktop&fit=stretch,1&wid=960"
                    alt="Air Purifier"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>

              {/* Button */}
              <Button variant="link" className="text-blue-600 p-0 mt-4">
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* 5) Summer home trends */}
        <div className="col-span-12 md:col-span-3">
          <div
            className="rounded-lg overflow-hidden h-full"
            style={{ backgroundColor: "#E1BEE7" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#001E60" }}
                >
                  Summer home trends
                </h3>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/034/630/930/small_2x/elegant-decorative-vases-and-planters-with-succulents-and-other-plants-on-transparent-background-interior-accessories-cut-out-home-decor-front-view-ai-generated-png.png"
                  alt="Home decor"
                  className="w-full h-48 object-cover rounded"
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
            style={{ backgroundColor: "#80CBC4" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#001E60" }}
                >
                  Up to 60% off
                </h3>
                <img
                  src="https://png.pngtree.com/png-vector/20240827/ourmid/pngtree-outdoor-furniture-black-and-white-furniture-png-image_13419578.png"
                  alt="Tower fan"
                  className="w-full h-48 object-cover rounded"
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
            style={{ backgroundColor: "#fae6b1" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-5"
                  style={{ color: "#001E60" }}
                >
                  Save on Sunscreens
                </h3>
                <div className="flex space-x-2">
                  <img
                    src="https://5.imimg.com/data5/ANDROID/Default/2024/6/424025708/YA/CA/IX/199601913/product-jpeg.jpg"
                    alt="Anthelios 1"
                    className="w-full h-40 object-cover"
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
            style={{ backgroundColor: "#F8BBD0" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Premium beauty. Victoria’s Secret.
                </h3>
                <img
                  src="https://cdn.platform.next/common/items/default/default/itemimages/3_4Ratio/SearchTP/Lge/P25412.jpg?im=Resize,width=450"
                  className="w-full h-45 object-cover rounded"
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
            style={{ backgroundColor: "#C8E6C9" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Don’t miss out!
                </h3>
                <p className="text-gray-600">
                  Get 50% off a year of Walmart+ & shop Deals first
                </p>
                <img
                  src="https://i.ytimg.com/vi/73J3YW4mhSc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDNora9h0szLm4dT5FeSsOAbzkZoQ"
                  alt="Walmart Deals"
                  className="w-full h-full object-contain"
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
            style={{ backgroundColor: "#D1C4E9" }}
          >
            <div className="p-6 flex flex-col h-full justify-center items-center">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#001E60" }}
              >
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
            style={{ backgroundColor: "#E3F2FD" }}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: "#001E60" }}
                >
                  New Jurassic World movie
                </h3>
                <img
                  src="https://i.ytimg.com/vi/ntN1L4egzxU/maxresdefault.jpg"
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
            style={{ backgroundColor: "#C5CAE9" }}
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
                  src="https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2025/mercedes.png"
                  alt="Walmart Deals"
                  className="w-full h-32 object-contain"
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
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#001E60" }}>
            Why TrustMart?
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
            <h3 className="text-lg font-bold mb-2" style={{ color: "#001E60" }}>
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
            <h3 className="text-lg font-bold mb-2" style={{ color: "#001E60" }}>
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
            <h3 className="text-lg font-bold mb-2" style={{ color: "#001E60" }}>
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
