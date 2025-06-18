
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export interface Product {
  id: number
  name: string
  shortDescription: string
  description: string
  image: string
  category: string
  rating: number
  overallRating: number
  reviewCount: number
  bestPrice: number
  merchants: Merchant[]
  reviews: Review[]
}

export interface Merchant {
  id: number
  name: string
  creditTag: string
  price: number
  originalPrice?: number
  shipping: string
  inStock: boolean
  rating: number
  totalReviews: number
  deliveryDate: string
  offers: string[]
}

export interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: Date
  credibilityScore: number
  merchantId: number
}

export const useProducts = (category?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['products', category, searchQuery],
    queryFn: async () => {
      console.log('Fetching products from Supabase...')
      
      let query = supabase.from('products').select(`
        *,
        merchants(*),
        reviews(*)
      `)
      
      if (category) {
        query = query.eq('category', category)
      }
      
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching products:', error)
        throw error
      }
      
      console.log('Products fetched:', data)
      
      return data?.map((product: any) => ({
        id: product.id,
        name: product.name,
        shortDescription: product.short_description,
        description: product.description,
        image: product.image,
        category: product.category,
        rating: product.overall_rating,
        overallRating: product.overall_rating,
        reviewCount: product.review_count,
        bestPrice: product.best_price,
        merchants: product.merchants?.map((merchant: any) => ({
          id: merchant.id,
          name: merchant.name,
          creditTag: merchant.credit_tag,
          price: merchant.price,
          originalPrice: merchant.original_price,
          shipping: merchant.shipping,
          inStock: merchant.in_stock,
          rating: merchant.rating,
          totalReviews: merchant.total_reviews,
          deliveryDate: merchant.delivery_date,
          offers: merchant.offers
        })) || [],
        reviews: product.reviews?.map((review: any) => ({
          id: review.id,
          customerName: review.customer_name,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.date),
          credibilityScore: review.credibility_score,
          merchantId: review.merchant_id
        })) || []
      })) || []
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      console.log('Fetching product from Supabase:', productId)
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          merchants(*),
          reviews(*)
        `)
        .eq('id', productId)
        .single()
      
      if (error) {
        console.error('Error fetching product:', error)
        throw error
      }
      
      console.log('Product fetched:', data)
      
      return {
        id: data.id,
        name: data.name,
        shortDescription: data.short_description,
        description: data.description,
        image: data.image,
        category: data.category,
        rating: data.overall_rating,
        overallRating: data.overall_rating,
        reviewCount: data.review_count,
        bestPrice: data.best_price,
        merchants: data.merchants?.map((merchant: any) => ({
          id: merchant.id,
          name: merchant.name,
          creditTag: merchant.credit_tag,
          price: merchant.price,
          originalPrice: merchant.original_price,
          shipping: merchant.shipping,
          inStock: merchant.in_stock,
          rating: merchant.rating,
          totalReviews: merchant.total_reviews,
          deliveryDate: merchant.delivery_date,
          offers: merchant.offers
        })) || [],
        reviews: data.reviews?.map((review: any) => ({
          id: review.id,
          customerName: review.customer_name,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.date),
          credibilityScore: review.credibility_score,
          merchantId: review.merchant_id
        })) || []
      }
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  })
}
