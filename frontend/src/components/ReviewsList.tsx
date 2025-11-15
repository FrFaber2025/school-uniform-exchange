import React from "react";

interface Review {
  rating: number;
  comment: string;
  createdAt: string | number | Date;
  buyerName?: string;
}

interface ReviewsListProps {
  reviews: Review[];
  maxReviews?: number;
}

export default function ReviewsList({ reviews, maxReviews }: ReviewsListProps) {
  const displayed = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    ));

  return (
    <div className="space-y-4">
      {displayed.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        displayed.map((review, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-1 text-yellow-500">
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-800 mb-2">{review.comment}</p>
            {review.buyerName && (
              <p className="text-sm text-gray-500 italic">
                — {review.buyerName}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
