
import { useState } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import CustomerProfile from '../components/CustomerProfile';
import Cart from '../components/Cart';

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
    setSearchQuery('');
  };

  const handleProductClick = (product) => {
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

  const handleAddToCart = (product, merchant) => {
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
            product={selectedProduct}
            onBack={handleBackToCategory}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {!showCart && (currentView === 'category' || currentView === 'search') && (
          <ProductGrid 
            onProductClick={handleProductClick}
            selectedCategory={selectedCategory}
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
