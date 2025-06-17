
import { useState } from 'react';
import Header from '../components/Header';
import HomePage from './HomePage';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';

const Index = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'category', 'product'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={0}
        onCartClick={() => {}}
        onLogoClick={handleBackToHome}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={handleBackToCategory}
            onAddToCart={() => {}}
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
