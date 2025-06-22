
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customer_id, review_id, product_price, test_mode, manual_data } = await req.json();
    
    console.log('Processing customer credibility update for:', customer_id);
    console.log('Review ID:', review_id);
    console.log('Product price:', product_price);
    console.log('Test mode:', test_mode);
    console.log('Manual data:', manual_data);

    // Validate customer_id
    if (!customer_id) {
      console.error('Missing customer_id');
      throw new Error('Customer ID is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let reviewData, customerData, updatedPurchaseValue;

    if (test_mode && manual_data) {
      // Use manual data for testing
      console.log('Using manual test data');
      reviewData = {
        comment: manual_data.last_review_text || '',
        rating: manual_data.last_star_rating || 0,
        verified_purchase: manual_data.last_verified_purchase || 0
      };
      
      // Fetch customer data for purchase value
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('purchase_value_rupees')
        .eq('id', customer_id)
        .single();

      if (customerError) {
        console.error('Error fetching customer data:', customerError);
        throw new Error('Failed to fetch customer data');
      }

      customerData = {
        customer_tenure_months: manual_data.customer_tenure_months || 0,
        purchase_value_rupees: manual_data.purchase_value_rupees || customer.purchase_value_rupees || 0
      };
      
      updatedPurchaseValue = customerData.purchase_value_rupees;
    } else {
      // Normal mode - fetch review data
      if (!review_id) {
        console.error('Missing review_id for normal mode');
        throw new Error('Review ID is required for normal mode');
      }

      // Fetch the latest review details
      const { data: review, error: reviewError } = await supabase
        .from('reviews')
        .select('comment, rating, verified_purchase')
        .eq('id', review_id)
        .single();

      if (reviewError) {
        console.error('Error fetching review data:', reviewError);
        throw new Error('Failed to fetch review data');
      }

      console.log('Review data fetched:', review);
      reviewData = review;

      // Fetch customer data
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('customer_tenure_months, purchase_value_rupees')
        .eq('id', customer_id)
        .single();

      if (customerError) {
        console.error('Error fetching customer data:', customerError);
        throw new Error('Failed to fetch customer data');
      }

      console.log('Customer data fetched:', customer);
      customerData = customer;

      // Update purchase value if it's a verified purchase
      updatedPurchaseValue = customerData.purchase_value_rupees || 0;
      if (reviewData.verified_purchase && product_price) {
        updatedPurchaseValue = parseFloat(updatedPurchaseValue) + parseFloat(product_price);
        console.log('Updating purchase value from', customerData.purchase_value_rupees, 'to', updatedPurchaseValue);
      }
    }

    // Convert boolean to integer for verified_purchase
    const verifiedPurchaseInt = reviewData.verified_purchase === true || reviewData.verified_purchase === 1 ? 1 : 0;

    // Update customer with last review details and purchase value
    const updateData = {
      purchase_value_rupees: updatedPurchaseValue,
      last_review_text: reviewData.comment || '',
      last_star_rating: reviewData.rating || 0,
      last_verified_purchase: verifiedPurchaseInt
    };

    if (!test_mode) {
      const { error: updateCustomerError } = await supabase
        .from('customers')
        .update(updateData)
        .eq('id', customer_id);

      if (updateCustomerError) {
        console.error('Error updating customer data:', updateCustomerError);
        throw new Error('Failed to update customer data');
      }
    }

    // Prepare payload for ML API
    const mlPayload = {
      review_text: reviewData.comment || '',
      star_rating: reviewData.rating || 0,
      verified_purchase: verifiedPurchaseInt,
      customer_tenure_months: customerData.customer_tenure_months || 0,
      purchase_value_rupees: updatedPurchaseValue
    };

    console.log('Calling ML API with payload:', mlPayload);

    // Call Render FastAPI
    const mlResponse = await fetch('https://customer-api-vk2x.onrender.com/predict_customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlPayload)
    });

    if (!mlResponse.ok) {
      const errorText = await mlResponse.text();
      console.error('ML API request failed:', mlResponse.status, errorText);
      throw new Error(`ML API request failed: ${mlResponse.status} ${errorText}`);
    }

    const mlResult = await mlResponse.json();
    console.log('ML API response:', mlResult);

    // Extract credibility score from ML response
    const credibilityScore = mlResult.credibility_score;

    if (credibilityScore !== undefined && credibilityScore !== null) {
      // Update customer credibility score
      const { error: updateCredibilityError } = await supabase
        .from('customers')
        .update({ credibility_score: credibilityScore })
        .eq('id', customer_id);

      if (updateCredibilityError) {
        console.error('Error updating credibility score:', updateCredibilityError);
        throw new Error('Failed to update credibility score');
      }

      console.log('Successfully updated customer credibility score to:', credibilityScore);
    } else {
      console.error('No credibility score received from ML API');
      throw new Error('Invalid response from ML API');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        credibility_score: credibilityScore,
        updated_purchase_value: updatedPurchaseValue,
        ml_response: mlResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in update-customer-credibility function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
