
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
    const { customer_id, review_id, product_price } = await req.json();
    
    console.log('Processing customer credibility update for:', customer_id);
    console.log('Review ID:', review_id);
    console.log('Product price:', product_price);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the latest review details
    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .select('review_text, rating, verified_purchase, comment')
      .eq('id', review_id)
      .single();

    if (reviewError) {
      console.error('Error fetching review data:', reviewError);
      throw new Error('Failed to fetch review data');
    }

    console.log('Review data fetched:', reviewData);

    // Fetch customer data
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .select('customer_tenure_months, purchase_value_rupees')
      .eq('id', customer_id)
      .single();

    if (customerError) {
      console.error('Error fetching customer data:', customerError);
      throw new Error('Failed to fetch customer data');
    }

    console.log('Customer data fetched:', customerData);

    // Update purchase value if it's a verified purchase
    let updatedPurchaseValue = customerData.purchase_value_rupees || 0;
    if (reviewData.verified_purchase && product_price) {
      updatedPurchaseValue += parseFloat(product_price);
      
      const { error: updateError } = await supabase
        .from('customers')
        .update({ purchase_value_rupees: updatedPurchaseValue })
        .eq('id', customer_id);

      if (updateError) {
        console.error('Error updating purchase value:', updateError);
      } else {
        console.log('Updated purchase value to:', updatedPurchaseValue);
      }
    }

    // Prepare payload for ML API
    const mlPayload = {
      review_text: reviewData.comment || reviewData.review_text || '',
      star_rating: reviewData.rating || 0,
      verified_purchase: reviewData.verified_purchase ? 1 : 0,
      customer_tenure_months: customerData.customer_tenure_months || 0,
      purchase_value_rupees: updatedPurchaseValue
    };

    console.log('Calling ML API with payload:', mlPayload);

    // Call HuggingFace API
    const mlResponse = await fetch('https://av3005--customer-api-space.hf.space/api/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlPayload)
    });

    if (!mlResponse.ok) {
      throw new Error(`ML API request failed: ${mlResponse.status} ${mlResponse.statusText}`);
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
        updated_purchase_value: updatedPurchaseValue 
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
