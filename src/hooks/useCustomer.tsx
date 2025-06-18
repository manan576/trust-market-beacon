
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Customer {
  id: string
  name: string
  email: string
  credibilityScore: number
  joinDate: string
  totalOrders: number
  totalReviews: number
}

export interface Order {
  id: string
  productName: string
  orderDate: string
  price: number
  status: string
  merchantName: string
}

export interface CustomerReview {
  id: string
  productName: string
  rating: number
  comment: string
  date: string
  merchantName: string
}

export const useCustomer = (customerId: string = 'customer-1') => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      console.log('Fetching customer data from Supabase...')
      
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single()
      
      if (error) {
        console.error('Error fetching customer:', error)
        throw error
      }
      
      console.log('Customer fetched:', data)
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        credibilityScore: data.credibility_score,
        joinDate: data.join_date,
        totalOrders: data.total_orders,
        totalReviews: data.total_reviews
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useCustomerOrders = (customerId: string = 'customer-1') => {
  return useQuery({
    queryKey: ['customer-orders', customerId],
    queryFn: async () => {
      console.log('Fetching customer orders from Supabase...')
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('order_date', { ascending: false })
      
      if (error) {
        console.error('Error fetching orders:', error)
        throw error
      }
      
      console.log('Orders fetched:', data)
      
      return data?.map((order: any) => ({
        id: order.id,
        productName: order.product_name,
        orderDate: order.order_date,
        price: order.price,
        status: order.status,
        merchantName: order.merchant_name
      })) || []
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useCustomerReviews = (customerId: string = 'customer-1') => {
  return useQuery({
    queryKey: ['customer-reviews', customerId],
    queryFn: async () => {
      console.log('Fetching customer reviews from Supabase...')
      
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          products(name),
          merchants(name)
        `)
        .eq('customer_name', 'John Smith') // Using name for now since we don't have customer_id in reviews
        .order('date', { ascending: false })
      
      if (error) {
        console.error('Error fetching reviews:', error)
        throw error
      }
      
      console.log('Reviews fetched:', data)
      
      return data?.map((review: any) => ({
        id: review.id,
        productName: review.products?.name || 'Unknown Product',
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        merchantName: review.merchants?.name || 'Unknown Merchant'
      })) || []
    },
    staleTime: 5 * 60 * 1000,
  })
}
