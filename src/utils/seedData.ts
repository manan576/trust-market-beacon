
import { supabase } from '../lib/supabase'

export const seedDatabase = async () => {
  console.log('Starting database seeding...')
  
  try {
    // Clear existing data
    await supabase.from('reviews').delete().neq('id', '')
    await supabase.from('merchants').delete().neq('id', '')
    await supabase.from('products').delete().neq('id', '')
    await supabase.from('orders').delete().neq('id', '')
    await supabase.from('customers').delete().neq('id', '')
    
    // Seed customer data
    const { error: customerError } = await supabase.from('customers').insert([
      {
        id: 'customer-1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        credibility_score: 87,
        join_date: 'March 2023',
        total_orders: 24,
        total_reviews: 18
      }
    ])
    
    if (customerError) throw customerError
    
    // Seed products data
    const productsData = [
      // Electronics
      {
        id: 1,
        name: "Wireless Bluetooth Headphones Pro",
        short_description: "High-quality wireless headphones with noise cancellation\nPerfect for music and calls with 30-hour battery life",
        description: "Premium wireless headphones with advanced noise cancellation technology.",
        image: "/placeholder.svg",
        category: "electronics",
        overall_rating: 4.3,
        review_count: 247,
        best_price: 69.99
      },
      {
        id: 2,
        name: "Smart Phone 5G Latest Model",
        short_description: "Latest 5G smartphone with advanced camera system\nPowerful processor and all-day battery life",
        description: "Cutting-edge smartphone with 5G connectivity and professional camera system.",
        image: "/placeholder.svg",
        category: "electronics",
        overall_rating: 4.6,
        review_count: 389,
        best_price: 849.99
      },
      // Fashion
      {
        id: 6,
        name: "Premium Cotton T-Shirt",
        short_description: "Soft premium cotton t-shirt with perfect fit\nBreathable fabric and long-lasting quality",
        description: "High-quality cotton t-shirt with superior comfort and durability.",
        image: "/placeholder.svg",
        category: "fashion",
        overall_rating: 4.0,
        review_count: 203,
        best_price: 24.99
      },
      {
        id: 7,
        name: "Designer Leather Jacket",
        short_description: "Genuine leather jacket with modern design\nPerfect for all seasons and occasions",
        description: "Stylish leather jacket crafted from genuine leather with contemporary design.",
        image: "/placeholder.svg",
        category: "fashion",
        overall_rating: 4.6,
        review_count: 194,
        best_price: 199.99
      },
      // Beauty
      {
        id: 34,
        name: "Anti-Aging Serum Premium",
        short_description: "Advanced anti-aging serum with vitamin C\nReduces wrinkles and brightens skin tone",
        description: "Professional-grade anti-aging serum with potent vitamin C formula.",
        image: "/placeholder.svg",
        category: "beauty",
        overall_rating: 4.5,
        review_count: 234,
        best_price: 79.99
      },
      // Furniture
      {
        id: 39,
        name: "Modern Office Desk",
        short_description: "Sleek contemporary desk with storage drawers\nPerfect for home office or study room",
        description: "Contemporary office desk with integrated storage solutions.",
        image: "/placeholder.svg",
        category: "furniture",
        overall_rating: 4.2,
        review_count: 189,
        best_price: 299.99
      },
      // Sports
      {
        id: 44,
        name: "Professional Yoga Mat",
        short_description: "Non-slip yoga mat with extra cushioning\nEco-friendly material perfect for all yoga styles",
        description: "Premium yoga mat with superior grip and cushioning for all practices.",
        image: "/placeholder.svg",
        category: "sports",
        overall_rating: 4.3,
        review_count: 234,
        best_price: 39.99
      },
      // Everyday Essentials
      {
        id: 49,
        name: "Organic Coffee Beans Premium",
        short_description: "Single-origin organic coffee beans\nRich flavor with sustainable sourcing",
        description: "Premium single-origin coffee beans with rich, complex flavor profile.",
        image: "/placeholder.svg",
        category: "everyday-essentials",
        overall_rating: 4.5,
        review_count: 234,
        best_price: 19.99
      }
    ]
    
    const { error: productsError } = await supabase.from('products').insert(productsData)
    if (productsError) throw productsError
    
    // Seed merchants data
    const merchantsData = [
      // For Headphones (product_id: 1)
      {
        product_id: 1,
        name: "AudioTech Pro",
        credit_tag: "Excellent",
        price: 79.99,
        shipping: "Free",
        in_stock: true,
        rating: 4.6,
        total_reviews: 89,
        delivery_date: "Wed, Dec 20",
        offers: ["Free shipping", "10% off"]
      },
      {
        product_id: 1,
        name: "SoundWave",
        credit_tag: "Good",
        price: 74.99,
        shipping: "$3.99",
        in_stock: true,
        rating: 4.2,
        total_reviews: 67,
        delivery_date: "Fri, Dec 22",
        offers: ["Express delivery", "5% cashback"]
      },
      // For T-Shirt (product_id: 6)
      {
        product_id: 6,
        name: "Fashion Forward",
        credit_tag: "Excellent",
        price: 29.99,
        shipping: "$3.99",
        in_stock: true,
        rating: 4.3,
        total_reviews: 78,
        delivery_date: "Wed, Dec 20",
        offers: ["Free shipping", "10% off"]
      }
    ]
    
    const { error: merchantsError } = await supabase.from('merchants').insert(merchantsData)
    if (merchantsError) throw merchantsError
    
    // Seed orders data
    const ordersData = [
      {
        id: 'ORD-001',
        customer_id: 'customer-1',
        product_id: 1,
        merchant_id: 1,
        product_name: 'Wireless Bluetooth Headphones Pro',
        order_date: '2024-01-15',
        price: 79.99,
        status: 'Delivered',
        merchant_name: 'AudioTech Pro'
      },
      {
        id: 'ORD-002',
        customer_id: 'customer-1',
        product_id: 2,
        merchant_id: 1,
        product_name: 'Smart Phone 5G Latest Model',
        order_date: '2024-01-08',
        price: 849.99,
        status: 'Delivered',
        merchant_name: 'MobileTech'
      }
    ]
    
    const { error: ordersError } = await supabase.from('orders').insert(ordersData)
    if (ordersError) throw ordersError
    
    // Seed reviews data
    const reviewsData = [
      {
        product_id: 1,
        merchant_id: 1,
        customer_name: 'John Smith',
        rating: 5,
        comment: 'Excellent sound quality and battery life. Highly recommend!',
        date: '2024-01-18',
        credibility_score: 0.85
      },
      {
        product_id: 2,
        merchant_id: 1,
        customer_name: 'John Smith',
        rating: 4,
        comment: 'Great phone with fast performance. Camera could be better.',
        date: '2024-01-12',
        credibility_score: 0.82
      }
    ]
    
    const { error: reviewsError } = await supabase.from('reviews').insert(reviewsData)
    if (reviewsError) throw reviewsError
    
    console.log('Database seeding completed successfully!')
    
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}
