
-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  product_count INTEGER DEFAULT 0,
  gradient TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  image TEXT,
  category_id UUID REFERENCES public.categories(id),
  overall_rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  best_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create merchants table
CREATE TABLE public.merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credit_tag TEXT CHECK (credit_tag IN ('Excellent', 'Good', 'Moderate')),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_merchants table (junction table)
CREATE TABLE public.product_merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  shipping TEXT,
  in_stock BOOLEAN DEFAULT true,
  delivery_date TEXT,
  offers TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, merchant_id)
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  credibility_score INTEGER DEFAULT 50,
  join_date DATE DEFAULT CURRENT_DATE,
  total_orders INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  credibility_score DECIMAL(3,2) DEFAULT 0.5,
  review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  product_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'Delivered',
  order_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - making data publicly readable for now
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.merchants FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.product_merchants FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.orders FOR SELECT USING (true);

-- Insert sample categories
INSERT INTO public.categories (name, description, icon, product_count, gradient) VALUES
('electronics', 'Latest gadgets and devices', 'Smartphone', 5, 'from-blue-500 to-purple-600'),
('fashion', 'Trendy clothing and accessories', 'ShoppingBag', 5, 'from-pink-500 to-rose-600'),
('beauty', 'Skincare, makeup & wellness', 'Heart', 5, 'from-purple-500 to-pink-600'),
('furniture', 'Home & office furniture', 'Sofa', 5, 'from-orange-500 to-red-600'),
('sports', 'Sports equipment & fitness gear', 'Dumbbell', 5, 'from-green-500 to-teal-600'),
('everyday-essentials', 'Daily necessities & household items', 'Coffee', 5, 'from-amber-500 to-orange-600');

-- Insert sample merchants
INSERT INTO public.merchants (name, credit_tag, rating, total_reviews) VALUES
('AudioTech Pro', 'Excellent', 4.6, 89),
('SoundWave', 'Good', 4.2, 67),
('TechDeals', 'Moderate', 4.1, 91),
('Fashion Forward', 'Excellent', 4.3, 78),
('StyleHub', 'Good', 4.1, 89),
('CasualWear', 'Moderate', 3.6, 36),
('Beauty Plus', 'Excellent', 4.8, 89),
('Skincare Pro', 'Good', 4.4, 78),
('Glow Beauty', 'Moderate', 4.3, 67),
('Coffee Masters', 'Excellent', 4.8, 89),
('Bean Source', 'Good', 4.5, 67),
('Daily Brew', 'Moderate', 4.2, 78);

-- Insert sample customers
INSERT INTO public.customers (name, email, credibility_score, join_date, total_orders, total_reviews) VALUES
('John Smith', 'john.smith@email.com', 87, '2023-03-01', 24, 18),
('Alice Johnson', 'alice.johnson@email.com', 92, '2023-01-15', 18, 15),
('Bob Williams', 'bob.williams@email.com', 78, '2023-06-10', 12, 8),
('Carol Davis', 'carol.davis@email.com', 85, '2023-02-20', 15, 12);
