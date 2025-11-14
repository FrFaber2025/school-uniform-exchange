import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Review } from '../backend';

interface ReviewsListProps {
  reviews: Review[];
  maxReviews?: number;
}

export default function ReviewsList({ reviews, maxReviews }: ReviewsListProps) {
  const displayReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayReviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Number(review.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(Number(review.createdAt) / 1000000).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
