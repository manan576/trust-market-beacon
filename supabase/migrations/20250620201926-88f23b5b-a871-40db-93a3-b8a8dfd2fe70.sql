
-- First, let's check if the customer exists and verify the name
SELECT id, name, email, credibility_score FROM customers WHERE id = '550e8400-e29b-41d4-a716-446655440001';

-- If the customer doesn't exist, let's create them
INSERT INTO customers (id, name, email, credibility_score, join_date, total_orders, total_reviews)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Arjun Mehra', 
  'arjun.mehra@email.com',
  85,
  '2023-01-15',
  25,
  20
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email;

-- Also, let's check the current reviews table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'reviews' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if we need to add a verified_purchase column to reviews table
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS verified_purchase BOOLEAN DEFAULT false;
