
import { supabase } from '@/lib/supabase';

export const seedSampleData = async () => {
  try {
    // Get categories to reference them
    const { data: categories } = await supabase.from('categories').select('*');
    if (!categories) return;

    const electronicsCategory = categories.find(c => c.name === 'electronics');
    const fashionCategory = categories.find(c => c.name === 'fashion');
    const beautyCategory = categories.find(c => c.name === 'beauty');
    const furnitureCategory = categories.find(c => c.name === 'furniture');
    const sportsCategory = categories.find(c => c.name === 'sports');
    const essentialsCategory = categories.find(c => c.name === 'everyday-essentials');

    // Insert sample products
    const { data: products } = await supabase.from('products').insert([
      {
        name: 'Wireless Bluetooth Headphones Pro',
        short_description: 'High-quality wireless headphones with noise cancellation',
        description: 'Perfect for music and calls with 30-hour battery life',
        image: '/placeholder.svg',
        category_id: electronicsCategory?.id,
        overall_rating: 4.3,
        review_count: 247,
        best_price: 69.99
      },
      {
        name: 'Premium Cotton T-Shirt',
        short_description: 'Soft premium cotton t-shirt with perfect fit',
        description: 'Breathable fabric and long-lasting quality',
        image: '/placeholder.svg',
        category_id: fashionCategory?.id,
        overall_rating: 4.0,
        review_count: 203,
        best_price: 24.99
      },
      {
        name: 'Anti-Aging Serum Premium',
        short_description: 'Advanced anti-aging serum with vitamin C',
        description: 'Reduces wrinkles and brightens skin tone',
        image: '/placeholder.svg',
        category_id: beautyCategory?.id,
        overall_rating: 4.5,
        review_count: 234,
        best_price: 79.99
      },
      {
        name: 'Modern Office Desk',
        short_description: 'Sleek contemporary desk with storage drawers',
        description: 'Perfect for home office or study room',
        image: '/placeholder.svg',
        category_id: furnitureCategory?.id,
        overall_rating: 4.2,
        review_count: 189,
        best_price: 299.99
      },
      {
        name: 'Professional Yoga Mat',
        short_description: 'Non-slip yoga mat with extra cushioning',
        description: 'Eco-friendly material perfect for all yoga styles',
        image: '/placeholder.svg',
        category_id: sportsCategory?.id,
        overall_rating: 4.3,
        review_count: 234,
        best_price: 39.99
      },
      {
        name: 'Organic Coffee Beans Premium',
        short_description: 'Single-origin organic coffee beans',
        description: 'Rich flavor with sustainable sourcing',
        image: '/placeholder.svg',
        category_id: essentialsCategory?.id,
        overall_rating: 4.5,
        review_count: 234,
        best_price: 19.99
      }
    ]).select('*');

    if (!products) return;

    // Get merchants
    const { data: merchants } = await supabase.from('merchants').select('*');
    if (!merchants) return;

    // Insert product-merchant relationships
    for (const product of products) {
      const randomMerchants = merchants.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      for (let i = 0; i < randomMerchants.length; i++) {
        const merchant = randomMerchants[i];
        const basePrice = product.best_price || 100;
        const priceVariation = i * 5;
        
        await supabase.from('product_merchants').insert({
          product_id: product.id,
          merchant_id: merchant.id,
          price: basePrice + priceVariation,
          original_price: i === 0 ? basePrice + 10 : undefined,
          shipping: i === 0 ? 'Free' : '$3.99',
          in_stock: true,
          delivery_date: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          offers: i === 0 ? ['Free shipping', '10% off'] : ['Express delivery', '5% cashback'],
          rating: merchant.rating,
          total_reviews: merchant.total_reviews
        });
      }
    }

    // Insert sample reviews
    const { data: customers } = await supabase.from('customers').select('*');
    if (!customers) return;

    const reviewComments = [
      'Excellent product! Exactly what I was looking for.',
      'Great quality and fast shipping. Very satisfied.',
      'Good value for money. Would recommend to others.',
      'Product works as described. Happy with my purchase.',
      'Outstanding quality and customer service.'
    ];

    for (const product of products) {
      const productMerchants = await supabase
        .from('product_merchants')
        .select('*')
        .eq('product_id', product.id);

      if (productMerchants.data) {
        for (const pm of productMerchants.data) {
          for (let i = 0; i < 5; i++) {
            const customer = customers[i % customers.length];
            const comment = reviewComments[i % reviewComments.length];
            
            await supabase.from('reviews').insert({
              product_id: product.id,
              merchant_id: pm.merchant_id,
              customer_id: customer.id,
              rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
              comment,
              credibility_score: Math.random(),
              review_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
            });
          }
        }
      }
    }

    // Insert sample orders for customers
    for (const customer of customers) {
      for (let i = 0; i < customer.total_orders; i++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const productMerchants = await supabase
          .from('product_merchants')
          .select('*')
          .eq('product_id', randomProduct.id);

        if (productMerchants.data && productMerchants.data.length > 0) {
          const randomPM = productMerchants.data[Math.floor(Math.random() * productMerchants.data.length)];
          
          await supabase.from('orders').insert({
            customer_id: customer.id,
            product_id: randomProduct.id,
            merchant_id: randomPM.merchant_id,
            order_number: `ORD-${Date.now()}-${i}`,
            product_name: randomProduct.name,
            price: randomPM.price,
            status: 'Delivered',
            order_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          });
        }
      }
    }

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
