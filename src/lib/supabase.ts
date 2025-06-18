
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bcdforoqhpvusasrqkxq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZGZvcm9xaHB2dXNhc3Jxa3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzg3ODIsImV4cCI6MjA2NTg1NDc4Mn0.8BnSO771cgFfnj6Rw1O0ylre_Sel6_LgAAMFe95ke_o'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          short_description: string
          description: string
          image: string
          category: string
          overall_rating: number
          review_count: number
          best_price: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          short_description: string
          description: string
          image: string
          category: string
          overall_rating: number
          review_count: number
          best_price: number
          created_at?: string
        }
      }
      merchants: {
        Row: {
          id: number
          product_id: number
          name: string
          credit_tag: string
          price: number
          original_price?: number
          shipping: string
          in_stock: boolean
          rating: number
          total_reviews: number
          delivery_date: string
          offers: string[]
          created_at: string
        }
        Insert: {
          id?: number
          product_id: number
          name: string
          credit_tag: string
          price: number
          original_price?: number
          shipping: string
          in_stock: boolean
          rating: number
          total_reviews: number
          delivery_date: string
          offers: string[]
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: number
          merchant_id: number
          customer_name: string
          rating: number
          comment: string
          date: string
          credibility_score: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: number
          merchant_id: number
          customer_name: string
          rating: number
          comment: string
          date: string
          credibility_score: number
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          email: string
          credibility_score: number
          join_date: string
          total_orders: number
          total_reviews: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          credibility_score: number
          join_date: string
          total_orders: number
          total_reviews: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          product_id: number
          merchant_id: number
          product_name: string
          order_date: string
          price: number
          status: string
          merchant_name: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          product_id: number
          merchant_id: number
          product_name: string
          order_date: string
          price: number
          status: string
          merchant_name: string
          created_at?: string
        }
      }
    }
  }
}
