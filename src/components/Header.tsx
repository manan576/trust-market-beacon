
import { ShoppingCart, Search, Menu, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

const Header = ({ cartCount, onCartClick, onLogoClick }: HeaderProps) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b border-slate-700">
          <div className="flex items-center space-x-6">
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Customer Service
            </span>
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Track Your Order
            </span>
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Help & FAQ
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Become a Seller
            </span>
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Sign In
            </span>
            <span className="text-sm hover:text-orange-400 cursor-pointer transition-colors">
              Register
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <div 
            className="text-3xl font-bold cursor-pointer hover:text-orange-400 transition-colors flex items-center"
            onClick={onLogoClick}
          >
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TrustMarket
            </span>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                placeholder="Search for products, brands, and more..."
                className="w-full pl-4 pr-16 py-3 bg-white text-black text-lg rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <Button 
                size="lg"
                className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600 px-6"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 hover:text-orange-400 text-white"
            >
              <User className="h-6 w-6" />
              <span className="hidden md:block">Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 hover:text-orange-400 text-white"
            >
              <Heart className="h-6 w-6" />
              <span className="hidden md:block">Wishlist</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="relative hover:text-orange-400 text-white"
              onClick={onCartClick}
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="hidden md:block">Cart</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="border-t border-slate-700">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-orange-400">
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
              </Button>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm hover:text-orange-400 transition-colors">Electronics</a>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors">Fashion</a>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors">Beauty Products</a>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors">Furniture</a>
                <a href="#" className="text-sm hover:text-orange-400 transition-colors">Sports</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-orange-400">🔥 Hot Deals</span>
              <span>|</span>
              <span className="hover:text-orange-400 cursor-pointer transition-colors">Flash Sale</span>
              <span>|</span>
              <span className="hover:text-orange-400 cursor-pointer transition-colors">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
