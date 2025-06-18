
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import CustomerProfile from '../components/CustomerProfile';
import Cart from '../components/Cart';
import { seedDatabase } from '../utils/seedData';
import { Product, Merchant } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  merchant: {
    name: string;
    creditTag: string;
  };
}

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);

  // Check if database is seeded on component mount
  useEffect(() => {
    const checkSeeding = async () => {
      try {
        const response = await fetch('https://bcdforoqhpvusasrqkxq.supabase.co/rest/v1/products?select=count', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZGZvcm9xaHB2dXNhc3Jxa3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzg3ODIsImV4cCI6MjA2NTg1NDc4Mn0.8BnSO771cgFfnj6Rw1O0ylre_Sel6_LgAAMFe95ke_o',
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setIsSeeded(true);
        }
      } catch (error) {
        console.log('Database not seeded yet');
      }
    };
    
    checkSeeding();
  }, []);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      setIsSeeded(true);
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
    setSearchQuery('');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSearchQuery('');
    setShowCart(false);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    setSelectedProduct(null);
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    setSelectedCategory(null);
    setShowCart(false);
  };

  const handleAddToCart = (product: Product, merchant: Merchant) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.merchant.name === merchant.name
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.merchant.name === merchant.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: merchant.price,
        image: product.image,
        quantity: 1,
        merchant: {
          name: merchant.name,
          creditTag: merchant.creditTag
        }
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Show seeding button if database is not seeded
  if (!isSeeded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TrustMarket</h1>
          <p className="text-gray-600 mb-8">Initialize the database to start shopping</p>
          <Button 
            onClick={handleSeedDatabase} 
            disabled={isSeeding}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
          >
            {isSeeding ? 'Setting up database...' : 'Initialize Database'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onLogoClick={handleBackToHome}
        onProfileClick={handleProfileClick}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 py-8">
        {showCart && (
          <Cart 
            items={cartItems}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
          />
        )}
        
        {!showCart && currentView === 'profile' && (
          <CustomerProfile onBack={handleBackToHome} />
        )}
        
        {!showCart && currentView === 'product' && selectedProduct && (
          <ProductDetail 
            productId={selectedProduct.id}
            onBack={handleBackToCategory}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {!showCart && (currentView === 'category' || currentView === 'search') && (
          <ProductGrid 
            onProductClick={handleProductClick}
            selectedCategory={selectedCategory || undefined}
            searchQuery={searchQuery || undefined}
          />
        )}
        
        {!showCart && currentView === 'home' && (
          <HomePage onCategorySelect={handleCategorySelect} />
        )}
      </main>
    </div>
  );
};

export default Index;
