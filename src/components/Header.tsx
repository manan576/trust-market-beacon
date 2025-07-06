
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'sports', name: 'Sports' },
    { id: 'everyday-essentials', name: 'Everyday Essentials' }
  ];

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
      {/* Main Header */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={onLogoClick}
            >
              <img
                src={'/logo1.png'}
                alt="TrustMart Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>

            {/* Location - Desktop */}
            <div className="hidden lg:flex items-center text-white mr-4">
              <MapPin className="h-5 w-5 mr-2" />
              <div className="text-sm">
                <div className="text-xs">Deliver to</div>
                <div className="font-medium">Sacramento 95829</div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-4">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search everything at TrustMart online and in store"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-4 border-0 rounded-l-full focus:outline-none focus:ring-2 focus:ring-walmart-yellow focus:border-transparent text-base"
                />
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-6 bg-walmart-yellow hover:bg-walmart-yellow-dark text-black border-0 rounded-l-none rounded-r-full flex-shrink-0 font-bold"
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
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Account */}
              <Button
                variant="ghost"
                className="hidden md:flex flex-col items-center text-white hover:bg-white/10 h-12 px-3"
                onClick={onProfileClick}
              >
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Account</span>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                className="relative text-white hover:bg-white/10 flex flex-col items-center h-12 px-3"
                onClick={onCartClick}
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-walmart-yellow text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 hidden md:block">₹0.00</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-primary border-t border-white/20">
        <div className="container mx-auto px-4">
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8 py-3">
              <button className="text-sm font-medium text-white hover:text-walmart-yellow transition-colors duration-200 px-3 py-1 rounded">
                Departments
              </button>
              <button className="text-sm font-medium text-white hover:text-walmart-yellow transition-colors duration-200 px-3 py-1 rounded">
                Services
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect?.(category.id)}
                  className="text-sm font-medium text-white hover:text-walmart-yellow transition-colors duration-200 px-3 py-1 rounded"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-white/20 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative flex">
                <Input
                  type="text"
                  placeholder="Search everything at TrustMart..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-4 border-0 rounded-l-full"
                />
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-6 bg-walmart-yellow hover:bg-walmart-yellow-dark text-black border-0 rounded-l-none rounded-r-full flex-shrink-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="px-4 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect?.(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-white hover:text-walmart-yellow transition-colors duration-200 px-3 py-2 rounded"
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
