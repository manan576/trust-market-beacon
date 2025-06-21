export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  product_count: number;
  gradient: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  short_description: string;
  description: string;
  image: string;
  category_id: string;
  overall_rating: number;
  review_count: number;
  best_price: number;
  created_at: string;
  category?: Category;
  merchants?: ProductMerchant[];
  reviews?: Review[];
}

export interface Merchant {
  id: string;
  name: string;
  credit_tag: 'Excellent' | 'Good' | 'Moderate';
  rating: number;
  total_reviews: number;
  created_at: string;
  // ML model input parameters
  quality_return_rate?: number;
  defect_rate?: number;
  authenticity_score?: number;
  quality_sentiment?: number;
  on_time_delivery_rate?: number;
  shipping_accuracy?: number;
  order_fulfillment_rate?: number;
  inventory_accuracy?: number;
  avg_rating_normalized?: number;
  review_sentiment?: number;
  positive_review_ratio?: number;
  review_authenticity?: number;
  response_time_score?: number;
  query_resolution_rate?: number;
  service_satisfaction?: number;
  proactive_communication?: number;
}

export interface ProductMerchant {
  id: string;
  product_id: string;
  merchant_id: string;
  price: number;
  original_price?: number;
  shipping: string;
  in_stock: boolean;
  delivery_date: string;
  offers: string[];
  rating: number;
  total_reviews: number;
  created_at: string;
  merchant?: Merchant;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  credibility_score: number;
  join_date: string;
  total_orders: number;
  total_reviews: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  merchant_id: string;
  customer_id: string;
  rating: number;
  comment: string;
  credibility_score: number;
  review_date: string;
  verified_purchase: boolean;
  created_at: string;
  customer?: Customer;
  merchant?: Merchant;
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  merchant_id: string;
  order_number: string;
  product_name: string;
  price: number;
  status: string;
  order_date: string;
  created_at: string;
}
