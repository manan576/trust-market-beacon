
import { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/Cart';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onLogoClick={() => {
          setSelectedProduct(null);
          setShowCart(false);
        }}
      />
      
      <main className="container mx-auto px-4 py-6">
        {showCart ? (
          <Cart 
            items={cartItems}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ) : selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        ) : (
          <ProductGrid onProductClick={setSelectedProduct} />
        )}
      </main>
    </div>
  );
};

export default Index;
