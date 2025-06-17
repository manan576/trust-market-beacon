
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

const Header = ({ cartCount, onCartClick, onLogoClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'sports', name: 'Sports' },
    { id: 'everyday-essentials', name: 'Everyday Essentials' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TrustMarket</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button 
                className="absolute right-0 top-0 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-l-none rounded-r-lg"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex items-center space-x-8 py-4">
            <span className="text-sm font-medium text-gray-600">Categories:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-l-lg"
              />
              <Button 
                className="absolute right-0 top-0 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-l-none rounded-r-lg"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600 block">Categories:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
