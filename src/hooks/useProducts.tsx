
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/database';

export const useProducts = (categoryId?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['products', categoryId, searchQuery],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          merchants:product_merchants(
            *,
            merchant:merchants(*)
          )
        `);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order('name');

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data || [];
    }
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          merchants:product_merchants(
            *,
            merchant:merchants(*)
          ),
          reviews:reviews(
            *,
            customer:customers(*),
            merchant:merchants(*)
          )
        `)
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      return data;
    }
  });
};
