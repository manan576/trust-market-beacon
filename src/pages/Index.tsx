
import { useState } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/Cart';

const Index = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'category', 'product', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    setSelectedProduct(null);
  };

  const handleShowCart = () => {
    setCurrentView('cart');
  };

  const handleCloseCart = () => {
    if (selectedProduct) {
      setCurrentView('product');
    } else if (selectedCategory) {
      setCurrentView('category');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={handleShowCart}
        onLogoClick={handleBackToHome}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'cart' && (
          <Cart 
            items={cartItems}
            onClose={handleCloseCart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        )}
        
        {currentView === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={handleBackToCategory}
            onAddToCart={addToCart}
          />
        )}
        
        {currentView === 'category' && (
          <ProductGrid 
            onProductClick={handleProductClick}
            selectedCategory={selectedCategory}
          />
        )}
        
        {currentView === 'home' && (
          <HomePage onCategorySelect={handleCategorySelect} />
        )}
      </main>
    </div>
  );
};

export default Index;
