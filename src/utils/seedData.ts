
import { supabase } from '@/lib/supabase';

export const seedSampleData = async () => {
  try {
    console.log('Starting to seed sample data...');

    // Check if data already exists
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('Sample data already exists, skipping seeding');
      return;
    }

    // Insert categories first
    const { data: categories } = await supabase
      .from('categories')
      .insert([
        {
          name: 'electronics',
          description: 'Latest gadgets and devices',
          icon: 'Smartphone',
          product_count: 5,
          gradient: 'from-blue-500 to-purple-600'
        },
        {
          name: 'fashion',
          description: 'Trendy clothing and accessories',
          icon: 'ShoppingBag',
          product_count: 5,
          gradient: 'from-pink-500 to-rose-600'
        },
        {
          name: 'beauty',
          description: 'Skincare, makeup & wellness',
          icon: 'Heart',
          product_count: 5,
          gradient: 'from-purple-500 to-pink-600'
        },
        {
          name: 'furniture',
          description: 'Home & office furniture',
          icon: 'Sofa',
          product_count: 5,
          gradient: 'from-orange-500 to-red-600'
        },
        {
          name: 'sports',
          description: 'Sports equipment & fitness gear',
          icon: 'Dumbbell',
          product_count: 5,
          gradient: 'from-green-500 to-teal-600'
        },
        {
          name: 'everyday-essentials',
          description: 'Daily necessities & household items',
          icon: 'Coffee',
          product_count: 5,
          gradient: 'from-amber-500 to-orange-600'
        }
      ])
      .select();

    if (!categories) {
      console.error('Failed to insert categories');
      return;
    }

    // Insert merchants
    const { data: merchants } = await supabase
      .from('merchants')
      .insert([
        { name: 'AudioTech Pro', credit_tag: 'Excellent', rating: 4.6, total_reviews: 89 },
        { name: 'SoundWave', credit_tag: 'Good', rating: 4.2, total_reviews: 67 },
        { name: 'TechDeals', credit_tag: 'Moderate', rating: 4.1, total_reviews: 91 },
        { name: 'Fashion Forward', credit_tag: 'Excellent', rating: 4.3, total_reviews: 78 },
        { name: 'StyleHub', credit_tag: 'Good', rating: 4.1, total_reviews: 89 },
        { name: 'CasualWear', credit_tag: 'Moderate', rating: 3.6, total_reviews: 36 },
        { name: 'Beauty Plus', credit_tag: 'Excellent', rating: 4.8, total_reviews: 89 },
        { name: 'Skincare Pro', credit_tag: 'Good', rating: 4.4, total_reviews: 78 },
        { name: 'Glow Beauty', credit_tag: 'Moderate', rating: 4.3, total_reviews: 67 },
        { name: 'Coffee Masters', credit_tag: 'Excellent', rating: 4.8, total_reviews: 89 },
        { name: 'Bean Source', credit_tag: 'Good', rating: 4.5, total_reviews: 67 },
        { name: 'Daily Brew', credit_tag: 'Moderate', rating: 4.2, total_reviews: 78 }
      ])
      .select();

    if (!merchants) {
      console.error('Failed to insert merchants');
      return;
    }

    // Find category IDs
    const electronicsCategory = categories.find(c => c.name === 'electronics');
    const fashionCategory = categories.find(c => c.name === 'fashion');
    const beautyCategory = categories.find(c => c.name === 'beauty');
    const furnitureCategory = categories.find(c => c.name === 'furniture');
    const sportsCategory = categories.find(c => c.name === 'sports');
    const essentialsCategory = categories.find(c => c.name === 'everyday-essentials');

    // Insert products
    const { data: products } = await supabase
      .from('products')
      .insert([
        // Electronics
        {
          name: 'Wireless Bluetooth Headphones',
          short_description: 'Premium noise-cancelling wireless headphones',
          description: 'Experience crystal-clear audio with these premium wireless headphones featuring active noise cancellation.',
          image: '/placeholder.svg',
          category_id: electronicsCategory?.id,
          overall_rating: 4.5,
          review_count: 156,
          best_price: 199.99
        },
        {
          name: 'Smartphone Pro Max',
          short_description: 'Latest flagship smartphone',
          description: 'The most advanced smartphone with cutting-edge technology and amazing camera capabilities.',
          image: '/placeholder.svg',
          category_id: electronicsCategory?.id,
          overall_rating: 4.7,
          review_count: 234,
          best_price: 999.99
        },
        // Fashion
        {
          name: 'Designer Leather Jacket',
          short_description: 'Genuine leather jacket',
          description: 'Stylish and durable leather jacket perfect for any season.',
          image: '/placeholder.svg',
          category_id: fashionCategory?.id,
          overall_rating: 4.3,
          review_count: 89,
          best_price: 299.99
        },
        {
          name: 'Premium Cotton T-Shirt',
          short_description: 'Comfortable cotton t-shirt',
          description: 'High-quality 100% cotton t-shirt with a perfect fit.',
          image: '/placeholder.svg',
          category_id: fashionCategory?.id,
          overall_rating: 4.2,
          review_count: 67,
          best_price: 29.99
        },
        // Beauty
        {
          name: 'Anti-Aging Face Serum',
          short_description: 'Advanced skincare serum',
          description: 'Powerful anti-aging serum with proven ingredients for younger-looking skin.',
          image: '/placeholder.svg',
          category_id: beautyCategory?.id,
          overall_rating: 4.6,
          review_count: 178,
          best_price: 89.99
        },
        {
          name: 'Luxury Makeup Set',
          short_description: 'Complete makeup collection',
          description: 'Professional-grade makeup set with everything you need for a perfect look.',
          image: '/placeholder.svg',
          category_id: beautyCategory?.id,
          overall_rating: 4.4,
          review_count: 145,
          best_price: 149.99
        },
        // Furniture
        {
          name: 'Ergonomic Office Chair',
          short_description: 'Comfortable office chair',
          description: 'Ergonomically designed office chair for maximum comfort during long work sessions.',
          image: '/placeholder.svg',
          category_id: furnitureCategory?.id,
          overall_rating: 4.5,
          review_count: 203,
          best_price: 399.99
        },
        // Sports
        {
          name: 'Professional Running Shoes',
          short_description: 'High-performance running shoes',
          description: 'Lightweight and durable running shoes designed for professional athletes.',
          image: '/placeholder.svg',
          category_id: sportsCategory?.id,
          overall_rating: 4.6,
          review_count: 267,
          best_price: 159.99
        },
        // Everyday Essentials
        {
          name: 'Premium Coffee Beans',
          short_description: 'Artisan roasted coffee',
          description: 'Single-origin coffee beans roasted to perfection for the ultimate coffee experience.',
          image: '/placeholder.svg',
          category_id: essentialsCategory?.id,
          overall_rating: 4.8,
          review_count: 189,
          best_price: 24.99
        }
      ])
      .select();

    if (!products) {
      console.error('Failed to insert products');
      return;
    }

    // Insert product-merchant relationships
    const productMerchantData = [];
    
    // Add multiple merchants for each product
    for (const product of products) {
      // Add 2-3 random merchants per product
      const shuffledMerchants = merchants.sort(() => 0.5 - Math.random());
      const selectedMerchants = shuffledMerchants.slice(0, Math.floor(Math.random() * 2) + 2);
      
      selectedMerchants.forEach((merchant, index) => {
        const basePrice = product.best_price || 100;
        const priceVariation = index * 10 + Math.random() * 20;
        const price = basePrice + priceVariation;
        
        productMerchantData.push({
          product_id: product.id,
          merchant_id: merchant.id,
          price: Number(price.toFixed(2)),
          original_price: index === 0 ? null : Number((price + 20).toFixed(2)),
          shipping: index === 0 ? 'Free shipping' : '$5.99',
          in_stock: true,
          delivery_date: index === 0 ? '2-3 days' : '3-5 days',
          offers: index === 0 ? ['Fast delivery', 'Easy returns'] : ['Standard delivery'],
          rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
          total_reviews: Math.floor(Math.random() * 100) + 20
        });
      });
    }

    const { error: merchantError } = await supabase
      .from('product_merchants')
      .insert(productMerchantData);

    if (merchantError) {
      console.error('Failed to insert product-merchant relationships:', merchantError);
      return;
    }

    // Insert customers
    const { data: customers } = await supabase
      .from('customers')
      .insert([
        {
          name: 'John Smith',
          email: 'john.smith@email.com',
          credibility_score: 87,
          join_date: '2023-03-01',
          total_orders: 24,
          total_reviews: 18
        },
        {
          name: 'Alice Johnson',
          email: 'alice.johnson@email.com',
          credibility_score: 92,
          join_date: '2023-01-15',
          total_orders: 18,
          total_reviews: 15
        },
        {
          name: 'Bob Williams',
          email: 'bob.williams@email.com',
          credibility_score: 78,
          join_date: '2023-06-10',
          total_orders: 12,
          total_reviews: 8
        },
        {
          name: 'Carol Davis',
          email: 'carol.davis@email.com',
          credibility_score: 85,
          join_date: '2023-02-20',
          total_orders: 15,
          total_reviews: 12
        }
      ])
      .select();

    console.log('Sample data seeded successfully!');
    console.log('Categories:', categories?.length);
    console.log('Merchants:', merchants?.length);
    console.log('Products:', products?.length);
    console.log('Product-Merchant relationships:', productMerchantData.length);
    console.log('Customers:', customers?.length);

  } catch (error) {
    console.error('Error seeding sample data:', error);
  }
};
