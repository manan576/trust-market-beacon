export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          gradient: string | null
          icon: string | null
          id: string
          name: string
          product_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          icon?: string | null
          id?: string
          name: string
          product_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          icon?: string | null
          id?: string
          name?: string
          product_count?: number | null
        }
        Relationships: []
      }
      "Customer Tower": {
        Row: {
          customer_id: string
          customer_name: string
          customer_tenure_months: number | null
          predicted_score: number | null
          purchase_score: string | null
          purchase_value_rupees: number | null
          review_authenticity_binary: string | null
          review_text: string | null
          star_rating: number | null
          target: string | null
          tenure_score: string | null
          verified_purchase: string | null
        }
        Insert: {
          customer_id: string
          customer_name: string
          customer_tenure_months?: number | null
          predicted_score?: number | null
          purchase_score?: string | null
          purchase_value_rupees?: number | null
          review_authenticity_binary?: string | null
          review_text?: string | null
          star_rating?: number | null
          target?: string | null
          tenure_score?: string | null
          verified_purchase?: string | null
        }
        Update: {
          customer_id?: string
          customer_name?: string
          customer_tenure_months?: number | null
          predicted_score?: number | null
          purchase_score?: string | null
          purchase_value_rupees?: number | null
          review_authenticity_binary?: string | null
          review_text?: string | null
          star_rating?: number | null
          target?: string | null
          tenure_score?: string | null
          verified_purchase?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string | null
          credibility_score: number | null
          customer_tenure_months: number | null
          email: string | null
          id: string
          join_date: string | null
          name: string
          Purchase_value: number | null
          purchase_value_rupees: number | null
          Tenure: number | null
          total_orders: number | null
          total_reviews: number | null
        }
        Insert: {
          created_at?: string | null
          credibility_score?: number | null
          customer_tenure_months?: number | null
          email?: string | null
          id?: string
          join_date?: string | null
          name: string
          Purchase_value?: number | null
          purchase_value_rupees?: number | null
          Tenure?: number | null
          total_orders?: number | null
          total_reviews?: number | null
        }
        Update: {
          created_at?: string | null
          credibility_score?: number | null
          customer_tenure_months?: number | null
          email?: string | null
          id?: string
          join_date?: string | null
          name?: string
          Purchase_value?: number | null
          purchase_value_rupees?: number | null
          Tenure?: number | null
          total_orders?: number | null
          total_reviews?: number | null
        }
        Relationships: []
      }
      merchants: {
        Row: {
          authenticity_score: number | null
          avg_rating_normalized: number | null
          created_at: string | null
          credit_tag: string | null
          defect_rate: number | null
          id: string
          inventory_accuracy: number | null
          name: string
          on_time_delivery_rate: number | null
          order_fulfillment_rate: number | null
          positive_review_ratio: number | null
          proactive_communication: number | null
          quality_return_rate: number | null
          quality_sentiment: number | null
          query_resolution_rate: number | null
          rating: number | null
          response_time_score: number | null
          review_authenticity: number | null
          review_sentiment: number | null
          service_satisfaction: number | null
          shipping_accuracy: number | null
          total_reviews: number | null
        }
        Insert: {
          authenticity_score?: number | null
          avg_rating_normalized?: number | null
          created_at?: string | null
          credit_tag?: string | null
          defect_rate?: number | null
          id?: string
          inventory_accuracy?: number | null
          name: string
          on_time_delivery_rate?: number | null
          order_fulfillment_rate?: number | null
          positive_review_ratio?: number | null
          proactive_communication?: number | null
          quality_return_rate?: number | null
          quality_sentiment?: number | null
          query_resolution_rate?: number | null
          rating?: number | null
          response_time_score?: number | null
          review_authenticity?: number | null
          review_sentiment?: number | null
          service_satisfaction?: number | null
          shipping_accuracy?: number | null
          total_reviews?: number | null
        }
        Update: {
          authenticity_score?: number | null
          avg_rating_normalized?: number | null
          created_at?: string | null
          credit_tag?: string | null
          defect_rate?: number | null
          id?: string
          inventory_accuracy?: number | null
          name?: string
          on_time_delivery_rate?: number | null
          order_fulfillment_rate?: number | null
          positive_review_ratio?: number | null
          proactive_communication?: number | null
          quality_return_rate?: number | null
          quality_sentiment?: number | null
          query_resolution_rate?: number | null
          rating?: number | null
          response_time_score?: number | null
          review_authenticity?: number | null
          review_sentiment?: number | null
          service_satisfaction?: number | null
          shipping_accuracy?: number | null
          total_reviews?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          merchant_id: string | null
          order_date: string | null
          order_number: string
          price: number
          product_id: string | null
          product_name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          order_date?: string | null
          order_number: string
          price: number
          product_id?: string | null
          product_name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          order_date?: string | null
          order_number?: string
          price?: number
          product_id?: string | null
          product_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_merchants: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          id: string
          in_stock: boolean | null
          merchant_id: string | null
          offers: string[] | null
          original_price: number | null
          price: number
          product_id: string | null
          rating: number | null
          shipping: string | null
          total_reviews: number | null
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          id?: string
          in_stock?: boolean | null
          merchant_id?: string | null
          offers?: string[] | null
          original_price?: number | null
          price: number
          product_id?: string | null
          rating?: number | null
          shipping?: string | null
          total_reviews?: number | null
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          id?: string
          in_stock?: boolean | null
          merchant_id?: string | null
          offers?: string[] | null
          original_price?: number | null
          price?: number
          product_id?: string | null
          rating?: number | null
          shipping?: string | null
          total_reviews?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_merchants_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_merchants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          best_price: number | null
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          overall_rating: number | null
          review_count: number | null
          short_description: string | null
        }
        Insert: {
          best_price?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          overall_rating?: number | null
          review_count?: number | null
          short_description?: string | null
        }
        Update: {
          best_price?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          overall_rating?: number | null
          review_count?: number | null
          short_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          badge: string | null
          comment: string | null
          created_at: string | null
          credibility_score: number | null
          customer_id: string | null
          id: string
          merchant_id: string | null
          product_id: string | null
          rating: number | null
          review_date: string | null
          verified_purchase: boolean | null
        }
        Insert: {
          badge?: string | null
          comment?: string | null
          created_at?: string | null
          credibility_score?: number | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          product_id?: string | null
          rating?: number | null
          review_date?: string | null
          verified_purchase?: boolean | null
        }
        Update: {
          badge?: string | null
          comment?: string | null
          created_at?: string | null
          credibility_score?: number | null
          customer_id?: string | null
          id?: string
          merchant_id?: string | null
          product_id?: string | null
          rating?: number | null
          review_date?: string | null
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
