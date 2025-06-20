
-- Check current RLS policies on reviews table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'reviews';

-- Disable RLS on reviews table to allow public access for now
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Or alternatively, create a permissive policy that allows all operations
-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews;
-- CREATE POLICY "Allow all operations on reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
