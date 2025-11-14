import { Star } from 'lucide-react';

interface SellerRatingProps {
  rating: number;
  reviewCount: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SellerRating({ rating, reviewCount, showCount = true, size = 'md' }: SellerRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  if (reviewCount === 0) {
    return (
      <div className={`flex items-center gap-1 text-muted-foreground ${textSizeClasses[size]}`}>
        <Star className={sizeClasses[size]} />
        <span>No reviews yet</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${textSizeClasses[size]}`}>
      <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {showCount && (
        <span className="text-muted-foreground">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
      )}
    </div>
  );
}
