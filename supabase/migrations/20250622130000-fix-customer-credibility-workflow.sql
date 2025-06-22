
-- Add missing columns to customers table if they don't exist
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS last_review_text TEXT,
ADD COLUMN IF NOT EXISTS last_star_rating INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_verified_purchase INTEGER DEFAULT 0;

-- Create or replace the trigger function for automatic credibility updates
CREATE OR REPLACE FUNCTION public.trigger_customer_credibility_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    -- Only trigger for the specific customer (Arjun Mehra)
    IF NEW.customer_id = '550e8400-e29b-41d4-a716-446655440001' THEN
        -- Call the edge function to update customer credibility
        PERFORM net.http_post(
            url := 'https://bcdforoqhpvusasrqkxq.supabase.co/functions/v1/update-customer-credibility',
            headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('request.jwt.claims', true)::json->>'anon_key' || '"}'::jsonb,
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
$function$;

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS reviews_credibility_update ON public.reviews;
CREATE TRIGGER reviews_credibility_update
    AFTER INSERT ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_customer_credibility_update();

-- Grant necessary permissions
GRANT ALL ON public.customers TO anon, authenticated;
GRANT ALL ON public.reviews TO anon, authenticated;
GRANT ALL ON public.product_merchants TO anon, authenticated;
