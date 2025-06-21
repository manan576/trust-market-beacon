
-- Add the required columns to the merchants table for ML model input parameters
ALTER TABLE merchants 
ADD COLUMN IF NOT EXISTS quality_return_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (quality_return_rate >= 0 AND quality_return_rate <= 1),
ADD COLUMN IF NOT EXISTS defect_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (defect_rate >= 0 AND defect_rate <= 1),
ADD COLUMN IF NOT EXISTS authenticity_score DECIMAL(3,2) DEFAULT 0.00 CHECK (authenticity_score >= 0 AND authenticity_score <= 1),
ADD COLUMN IF NOT EXISTS quality_sentiment DECIMAL(3,2) DEFAULT 0.00 CHECK (quality_sentiment >= 0 AND quality_sentiment <= 1),
ADD COLUMN IF NOT EXISTS on_time_delivery_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (on_time_delivery_rate >= 0 AND on_time_delivery_rate <= 1),
ADD COLUMN IF NOT EXISTS shipping_accuracy DECIMAL(3,2) DEFAULT 0.00 CHECK (shipping_accuracy >= 0 AND shipping_accuracy <= 1),
ADD COLUMN IF NOT EXISTS order_fulfillment_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (order_fulfillment_rate >= 0 AND order_fulfillment_rate <= 1),
ADD COLUMN IF NOT EXISTS inventory_accuracy DECIMAL(3,2) DEFAULT 0.00 CHECK (inventory_accuracy >= 0 AND inventory_accuracy <= 1),
ADD COLUMN IF NOT EXISTS avg_rating_normalized DECIMAL(3,2) DEFAULT 0.00 CHECK (avg_rating_normalized >= 0 AND avg_rating_normalized <= 5),
ADD COLUMN IF NOT EXISTS review_sentiment DECIMAL(3,2) DEFAULT 0.00 CHECK (review_sentiment >= 0 AND review_sentiment <= 1),
ADD COLUMN IF NOT EXISTS positive_review_ratio DECIMAL(3,2) DEFAULT 0.00 CHECK (positive_review_ratio >= 0 AND positive_review_ratio <= 1),
ADD COLUMN IF NOT EXISTS review_authenticity DECIMAL(3,2) DEFAULT 0.00 CHECK (review_authenticity >= 0 AND review_authenticity <= 1),
ADD COLUMN IF NOT EXISTS response_time_score DECIMAL(3,2) DEFAULT 0.00 CHECK (response_time_score >= 0 AND response_time_score <= 1),
ADD COLUMN IF NOT EXISTS query_resolution_rate DECIMAL(3,2) DEFAULT 0.00 CHECK (query_resolution_rate >= 0 AND query_resolution_rate <= 1),
ADD COLUMN IF NOT EXISTS service_satisfaction DECIMAL(3,2) DEFAULT 0.00 CHECK (service_satisfaction >= 0 AND service_satisfaction <= 1),
ADD COLUMN IF NOT EXISTS proactive_communication DECIMAL(3,2) DEFAULT 0.00 CHECK (proactive_communication >= 0 AND proactive_communication <= 1);

-- Create an edge function trigger that will call the ML API whenever merchant data is updated
CREATE OR REPLACE FUNCTION trigger_merchant_grade_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Call the edge function to update the merchant grade
    PERFORM net.http_post(
        url := 'https://bcdforoqhpvusasrqkxq.supabase.co/functions/v1/update-merchant-grade',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('merchant_id', NEW.id)::jsonb
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires on UPDATE of merchants table
DROP TRIGGER IF EXISTS merchant_data_updated ON merchants;
CREATE TRIGGER merchant_data_updated
    AFTER UPDATE ON merchants
    FOR EACH ROW
    EXECUTE FUNCTION trigger_merchant_grade_update();

-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;
