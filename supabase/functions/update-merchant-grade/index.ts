
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { merchant_id } = await req.json();
    console.log('Processing merchant grade update for:', merchant_id);

    // Fetch merchant data
    const { data: merchant, error: fetchError } = await supabase
      .from('merchants')
      .select(`
        id,
        quality_return_rate,
        defect_rate,
        authenticity_score,
        quality_sentiment,
        on_time_delivery_rate,
        shipping_accuracy,
        order_fulfillment_rate,
        inventory_accuracy,
        avg_rating_normalized,
        review_sentiment,
        positive_review_ratio,
        review_authenticity,
        response_time_score,
        query_resolution_rate,
        service_satisfaction,
        proactive_communication
      `)
      .eq('id', merchant_id)
      .single();

    if (fetchError) {
      console.error('Error fetching merchant:', fetchError);
      throw new Error('Failed to fetch merchant data');
    }

    console.log('Merchant data fetched:', merchant);

    // Prepare data for ML API
    const mlApiPayload = {
      quality_return_rate: merchant.quality_return_rate || 0,
      defect_rate: merchant.defect_rate || 0,
      authenticity_score: merchant.authenticity_score || 0,
      quality_sentiment: merchant.quality_sentiment || 0,
      on_time_delivery_rate: merchant.on_time_delivery_rate || 0,
      shipping_accuracy: merchant.shipping_accuracy || 0,
      order_fulfillment_rate: merchant.order_fulfillment_rate || 0,
      inventory_accuracy: merchant.inventory_accuracy || 0,
      avg_rating_normalized: merchant.avg_rating_normalized || 0,
      review_sentiment: merchant.review_sentiment || 0,
      positive_review_ratio: merchant.positive_review_ratio || 0,
      review_authenticity: merchant.review_authenticity || 0,
      response_time_score: merchant.response_time_score || 0,
      query_resolution_rate: merchant.query_resolution_rate || 0,
      service_satisfaction: merchant.service_satisfaction || 0,
      proactive_communication: merchant.proactive_communication || 0
    };

    console.log('Calling ML API with payload:', mlApiPayload);

    // Call the ML API
    const mlResponse = await fetch('https://merchant-api-tcmh.onrender.com/predict_merchant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlApiPayload),
    });

    if (!mlResponse.ok) {
      const errorText = await mlResponse.text();
      console.error('ML API error response:', errorText);
      throw new Error(`ML API returned ${mlResponse.status}: ${errorText}`);
    }

    const mlResult = await mlResponse.json();
    console.log('ML API response:', mlResult);

    const { grade } = mlResult;

    // Update merchant credit_tag with the new grade
    const { error: updateError } = await supabase
      .from('merchants')
      .update({ credit_tag: grade })
      .eq('id', merchant_id);

    if (updateError) {
      console.error('Error updating merchant grade:', updateError);
      throw new Error('Failed to update merchant grade');
    }

    console.log(`Successfully updated merchant ${merchant_id} with grade: ${grade}`);

    return new Response(JSON.stringify({ 
      success: true, 
      merchant_id, 
      new_grade: grade,
      trust_score: mlResult.trust_score 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in update-merchant-grade function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
