
import { useState } from 'react';
import { Star, ArrowUpDown, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts, Product } from '../hooks/useProducts';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

const ProductGrid = ({ onProductClick, selectedCategory, searchQuery }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('relevance');
  
  const { data: products = [], isLoading, error } = useProducts(selectedCategory, searchQuery);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading products. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Retry
        </Button>
      </div>
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.bestPrice - b.bestPrice;
      case 'price-high':
        return b.bestPrice - a.bestPrice;
      case 'rating':
        return b.overallRating - a.overallRating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const getCategoryTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (!selectedCategory) return 'All Products';
    const categoryMap: { [key: string]: string } = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'beauty': 'Beauty Products',
      'furniture': 'Furniture',
      'sports': 'Sports',
      'everyday-essentials': 'Everyday Essentials'
    };
    return categoryMap[selectedCategory] || selectedCategory;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{getCategoryTitle()}</h1>
          <p className="text-gray-600">{sortedProducts.length} products found</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map(product => {
          const bestMerchant = product.merchants?.length > 0 
            ? product.merchants.reduce((best, current) => 
                current.price < best.price ? current : best
              )
            : null;

          return (
            <Card 
              key={product.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-white"
              onClick={() => onProductClick(product)}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.overallRating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {product.overallRating.toFixed(1)} ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.bestPrice}
                        </span>
                        {bestMerchant && product.bestPrice < bestMerchant.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${bestMerchant.price}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{product.merchants?.length || 0} merchants available</p>
                      {bestMerchant && (
                        <p>Starting from <span className="font-semibold">{bestMerchant.name}</span></p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
