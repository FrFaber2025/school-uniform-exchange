import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useSubmitReview } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import type { Review } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

interface ReviewSubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller: Principal;
  transactionId: string;
  onSuccess?: () => void;
}

export default function ReviewSubmissionModal({ open, onOpenChange, seller, transactionId, onSuccess }: ReviewSubmissionModalProps) {
  const { identity } = useInternetIdentity();
  const submitReview = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!identity) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Please write a review with at least 10 characters');
      return;
    }

    const review: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      seller,
      buyer: identity.getPrincipal(),
      rating: BigInt(rating),
      comment: comment.trim(),
      transactionId,
      createdAt: BigInt(Date.now() * 1000000),
    };

    try {
      await submitReview.mutateAsync(review);
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (error.message?.includes('already submitted')) {
        toast.error('You have already reviewed this transaction');
      } else if (error.message?.includes('Cannot review your own')) {
        toast.error('You cannot review your own purchases');
      } else {
        toast.error('Failed to submit review. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          <DialogDescription>
            Share your experience with this seller to help other buyers make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details about your experience with this seller..."
              rows={5}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 characters (minimum 10)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={submitReview.isPending || rating === 0 || comment.trim().length < 10}
          >
            {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
