
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

const Header = ({ cartCount, onCartClick, onLogoClick }: HeaderProps) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div 
            className="text-2xl font-bold cursor-pointer hover:text-orange-400 transition-colors"
            onClick={onLogoClick}
          >
            TrustMarket
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 bg-white text-black"
              />
              <Button 
                size="sm"
                className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="hover:text-orange-400 cursor-pointer transition-colors">
              Sign In
            </span>
            <Button 
              variant="ghost" 
              className="relative hover:text-orange-400"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
