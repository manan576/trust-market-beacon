
-- Add missing columns to customers table for ML model input parameters
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS customer_tenure_months INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS purchase_value_rupees DECIMAL(10,2) DEFAULT 0.00;

-- Update the existing customer (Arjun Mehra) with initial values if they don't exist
UPDATE customers 
SET 
    customer_tenure_months = COALESCE(
        EXTRACT(MONTH FROM AGE(CURRENT_DATE, join_date))::INTEGER, 
        0
    ),
    purchase_value_rupees = COALESCE(purchase_value_rupees, 0.00)
WHERE id = '550e8400-e29b-41d4-a716-446655440001';

-- Create a function to update customer credibility when a review is posted
CREATE OR REPLACE FUNCTION trigger_customer_credibility_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Only trigger for the specific customer (Arjun Mehra)
    IF NEW.customer_id = '550e8400-e29b-41d4-a716-446655440001' THEN
        -- Call the edge function to update customer credibility
        PERFORM net.http_post(
            url := 'https://bcdforoqhpvusasrqkxq.supabase.co/functions/v1/update-customer-credibility',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object(
                'customer_id', NEW.customer_id,
                'review_id', NEW.id,
                'product_price', (
                    SELECT pm.price 
                    FROM product_merchants pm 
                    WHERE pm.product_id = NEW.product_id 
                    AND pm.merchant_id = NEW.merchant_id 
                    LIMIT 1
                )
            )::jsonb
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires after INSERT on reviews table
DROP TRIGGER IF EXISTS customer_credibility_updated ON reviews;
CREATE TRIGGER customer_credibility_updated
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION trigger_customer_credibility_update();
