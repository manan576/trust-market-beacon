
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
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
      {/* Top Bar */}
      <div className="bg-[#131A22]">
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
    className="h-16 w-auto object-contain"
    style={{ maxWidth: "180px" }} // Tweak this value as needed
  />
</div>


            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-4 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-6 bg-orange-400 hover:bg-orange-500 text-black border-0 rounded-l-none rounded-r-lg flex-shrink-0"
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
                className="md:hidden text-white hover:bg-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              <div className="flex items-center">
                <img
                  src="https://flagcdn.com/in.svg"
                  alt="IN"
                  className="h-5 w-5 mr-1 rounded-sm"
                />
                <span className="text-xs font-semibold text-white">EN</span>
              </div>
              {/* Profile Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-700"
                onClick={onProfileClick}
              >
                <User className="h-6 w-6" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-gray-700"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#232F3E]">
        <div className="container mx-auto px-4">
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8 py-4">
              <span className="text-sm font-medium text-gray-300">Categories:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect?.(category.id)}
                  className="text-sm font-medium text-white hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-600"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-600 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="px-4">
              <div className="relative flex">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 pl-4 pr-4 border-0 rounded-l-lg"
                />
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-6 bg-orange-400 hover:bg-orange-500 text-black border-0 rounded-l-none rounded-r-lg flex-shrink-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="px-4 space-y-2">
              <span className="text-sm font-medium text-gray-300 block">Categories:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect?.(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-white hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-600"
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
