
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import CustomerProfile from '../components/CustomerProfile';
import Cart from '../components/Cart';
import { seedSampleData } from '../utils/seedData';
import { Product, ProductMerchant } from '@/types/database';

interface CartItem {
  id: string;
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

  // Seed data on first load
  useEffect(() => {
    const hasSeededData = localStorage.getItem('hasSeededData');
    if (!hasSeededData) {
      seedSampleData().then(() => {
        localStorage.setItem('hasSeededData', 'true');
        console.log('Sample data has been seeded!');
      });
    }
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
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

  const handleAddToCart = (product: Product, merchant: ProductMerchant) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.merchant.name === merchant.merchant?.name
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.merchant.name === merchant.merchant?.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: merchant.price || 0,
        image: product.image || '/placeholder.svg',
        quantity: 1,
        merchant: {
          name: merchant.merchant?.name || '',
          creditTag: merchant.merchant?.credit_tag || ''
        }
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
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
            product={selectedProduct}
            onBack={handleBackToCategory}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {!showCart && (currentView === 'category' || currentView === 'search') && (
          <ProductGrid 
            onProductClick={handleProductClick}
            selectedCategory={selectedCategory || undefined}
            searchQuery={searchQuery}
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
