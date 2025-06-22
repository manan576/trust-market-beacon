
import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ReviewFormProps {
  productId: string;
  merchantId: string;
  merchantName: string;
  onReviewAdded: () => void;
}

const ReviewForm = ({ productId, merchantId, merchantName, onReviewAdded }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [verifiedPurchase, setVerifiedPurchase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (comment.trim().length < 1) {
      toast.error('Please write at least 1 character in your review');
      return;
    }

    setIsSubmitting(true);

    try {
      const customerId = '550e8400-e29b-41d4-a716-446655440001';
      
      console.log('Submitting review for customer:', customerId);
      console.log('Product ID:', productId);
      console.log('Merchant ID:', merchantId);
      console.log('Rating:', rating);
      console.log('Comment:', comment);
      console.log('Verified purchase:', verifiedPurchase);

      // Get the customer's current data
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('credibility_score, purchase_value_rupees')
        .eq('id', customerId)
        .single();

      if (customerError) {
        console.error('Error fetching customer:', customerError);
        toast.error('Failed to fetch customer data. Please try again.');
        return;
      }

      console.log('Current customer data:', customer);

      // Get product price for purchase value calculation
      const { data: productMerchant, error: priceError } = await supabase
        .from('product_merchants')
        .select('price')
        .eq('product_id', productId)
        .eq('merchant_id', merchantId)
        .single();

      if (priceError) {
        console.error('Error fetching product price:', priceError);
      }

      const productPrice = productMerchant?.price || 0;
      console.log('Product price:', productPrice);

      // Insert the review - this will automatically trigger the credibility update via database trigger
      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          merchant_id: merchantId,
          customer_id: customerId,
          rating: rating,
          comment: comment.trim(),
          credibility_score: customer.credibility_score || 0,
          verified_purchase: verifiedPurchase,
          review_date: new Date().toISOString()
        })
        .select('id')
        .single();

      if (reviewError) {
        console.error('Error submitting review:', reviewError);
        toast.error('Failed to submit review. Please try again.');
        return;
      }

      console.log('Review inserted successfully with ID:', reviewData.id);

      // The database trigger should automatically call the credibility update function
      // But we'll also manually trigger it to ensure it works
      try {
        const { data: credibilityResult, error: credibilityError } = await supabase.functions.invoke('update-customer-credibility', {
          body: {
            customer_id: customerId,
            review_id: reviewData.id,
            product_price: productPrice
          }
        });

        if (credibilityError) {
          console.error('Error calling credibility update function:', credibilityError);
        } else {
          console.log('Credibility update function result:', credibilityResult);
        }
      } catch (functionError) {
        console.error('Error invoking credibility update function:', functionError);
      }

      toast.success('Review submitted successfully! Credibility score is being updated.');
      
      setRating(0);
      setComment('');
      setVerifiedPurchase(false);
      onReviewAdded();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Write a Review for {merchantName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Rating *</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && (
                  <>
                    {rating} star{rating !== 1 ? 's' : ''}
                    {rating === 1 && ' - Poor'}
                    {rating === 2 && ' - Fair'}
                    {rating === 3 && ' - Good'}
                    {rating === 4 && ' - Very Good'}
                    {rating === 5 && ' - Excellent'}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Review *</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product from this merchant..."
              className="min-h-[120px]"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {comment.length}/500 characters
            </div>
          </div>

          {/* Verified Purchase Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified-purchase"
              checked={verifiedPurchase}
              onCheckedChange={(checked) => setVerifiedPurchase(checked as boolean)}
            />
            <label htmlFor="verified-purchase" className="text-sm">
              This is a verified purchase
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || comment.trim().length < 1}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
