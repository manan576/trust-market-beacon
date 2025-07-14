
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCategories } from '@/hooks/useCategories';
import walmartLogoWhite from '@/assets/walmart.png';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onProfileClick: () => void;
  onCategorySelect?: (categoryId: string) => void;
  onSearch?: (query: string) => void;
}

const Header = ({ cartCount, onCartClick, onLogoClick, onProfileClick, onCategorySelect, onSearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: categories = [] } = useCategories();

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header - Walmart Blue */}
      <div style={{ backgroundColor: '#0071dc' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Pickup/Delivery */}
            <div className="flex items-center space-x-6">
              <div 
                className="flex items-center cursor-pointer"
                onClick={onLogoClick}
              >
                <img src={walmartLogoWhite} alt="Walmart" className="w-8 h-8 mr-2" />
                <span className="text-white font-bold text-xl">Walmart</span>
              </div>

              {/* Pickup or Delivery Dropdown */}
              <div className="hidden lg:flex items-center text-white cursor-pointer hover:bg-white/10 px-3 py-2 rounded">
                <MapPin className="h-4 w-4 mr-2" />
                <div className="text-sm">
                  <div className="font-medium">Pickup or delivery?</div>
                  <div className="text-xs">Sacramento Supercenter</div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Search Bar - Center */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search everything at Walmart online and in store"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-12 border-0 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1 h-10 w-10 p-0 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Reorder */}
              <div className="hidden lg:flex flex-col items-center text-white hover:bg-white/10 px-3 py-2 rounded cursor-pointer">
                <div className="text-lg">⟲</div>
                <span className="text-xs">Reorder</span>
              </div>

              {/* My Items */}
              <div className="hidden lg:flex flex-col items-center text-white hover:bg-white/10 px-3 py-2 rounded cursor-pointer">
                <div className="text-lg">♡</div>
                <span className="text-xs">My Items</span>
              </div>

              {/* Account */}
              {/* Account */}
                <div 
                  className="hidden md:flex flex-col items-center text-white hover:bg-white/10 px-3 py-5 rounded cursor-pointer" 
                  onClick={onProfileClick}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs mt-1.5">Profile</span> {/* 👈 This moves text down slightly */}
                </div>


              {/* Cart */}
              <div className="relative text-white hover:bg-white/10 flex items-center px-3 py-2 rounded cursor-pointer" onClick={onCartClick}>
                <div className="relative mr-2">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">₹0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - White Background */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8 py-3">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => onCategorySelect && onCategorySelect(category.name)}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors capitalize"
                >
                  {category.name.replace('-', ' ')}
                </button>
              ))}
              <button className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">New Arrivals</button>
              <button className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Rollbacks & more</button>
              <button className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Trending</button>
              <button className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors">Walmart+</button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search everything at Walmart..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-12 border rounded-full"
                />
                <Button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1 h-10 w-10 p-0 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 space-y-1">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => {
                    onCategorySelect && onCategorySelect(category.name);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-800 hover:text-blue-600 px-3 py-2 capitalize"
                >
                  {category.name.replace('-', ' ')}
                </button>
              ))}
              <button className="block w-full text-left text-sm font-medium text-gray-800 hover:text-blue-600 px-3 py-2">New Arrivals</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
