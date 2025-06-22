
-- Add columns to track last review details for ML API input
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS last_review_text TEXT,
ADD COLUMN IF NOT EXISTS last_star_rating INTEGER,
ADD COLUMN IF NOT EXISTS last_verified_purchase INTEGER DEFAULT 0;

-- Update existing data to set initial values
UPDATE customers 
SET 
    last_review_text = '',
    last_star_rating = 0,
    last_verified_purchase = 0
WHERE last_review_text IS NULL OR last_star_rating IS NULL OR last_verified_purchase IS NULL;
