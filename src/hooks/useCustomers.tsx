
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Customer, Order, Review } from '@/types/database';

export const useCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ['customer', customerId],
    queryFn: async (): Promise<Customer | null> => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      if (error) {
        console.error('Error fetching customer:', error);
        throw error;
      }

      return data;
    }
  });
};

export const useCustomerOrders = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-orders', customerId],
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching customer orders:', error);
        throw error;
      }

      return data || [];
    }
  });
};

export const useCustomerReviews = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-reviews', customerId],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          merchant:merchants(*)
        `)
        .eq('customer_id', customerId)
        .order('review_date', { ascending: false });

      if (error) {
        console.error('Error fetching customer reviews:', error);
        throw error;
      }

      return data || [];
    }
  });
};
