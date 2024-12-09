'use client';
// The product was in Excellent condition and arrived within 2 days. Very Satisfied!
import { useState, useEffect } from 'react';
import { Session } from 'next-auth';
// import { StarRating } from '@/components/starRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';

interface Review {
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
  session: Session | null;
}

export function ReviewSection({ productId, session }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, review: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/product/${productId}`);
        setReviews(res.data.product.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newReview.rating || !newReview.review.trim()) {
      setFormError('Both rating and review fields are required.');
      return;
    }

    if (!session) {
      setFormError('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await axios.post('/api/review', {
        productId,
        // @ts-ignore
        userName: session.user.name,
        rating: newReview.rating,
        review: newReview.review,
      });

      // Append the new review to the current state
      const newReviewWithDate = {
        ...response.data.newReview,
        createdAt: new Date().toISOString(),
      };
      setReviews((prevReviews) => [newReviewWithDate, ...prevReviews]);
      setNewReview({ rating: 0, review: '' }); // Reset the form
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (isLoading) {
    return <ReviewSectionSkeleton />;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl text-center font-bold">Customer Reviews</h2>
      {session && (
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <StarRating
            rating={newReview.rating}
            onChange={(rating) => setNewReview({ ...newReview, rating })}
            editable
          />
          <Textarea
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            placeholder="Write your review here..."
            required
          />
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <Button type="submit" className="text-white font-semibold">
            Submit Review
          </Button>
        </form>
      )}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.userName}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-muted-foreground mt-2">{review.review}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div>No reviews yet</div>
        )}
      </div>
    </div>
  );
}

function ReviewSectionSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// The StarRating component is not provided in the snippet. You can use the following implementation:
import { Star, StarHalf } from 'lucide-react'

interface StarRatingProps {
  rating: number
  editable?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({ rating, editable = false, onChange }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (editable) {
          return (
            <button  key={i} onClick={() => onChange && onChange(i + 1)}>
              {i < fullStars ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : i === fullStars && hasHalfStar ? <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : <Star className="w-4 h-4 text-gray-300" />}
            </button>
          )
        } else {
          return (
            <span key={i}>
              {i < fullStars ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : i === fullStars && hasHalfStar ? <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : <Star className="w-4 h-4 text-gray-300" />}
            </span>
          )
        }
      })}
      <span className="ml-1 text-sm text-muted-foreground">{rating && rating.toFixed(1)}</span>
    </div>
  )
}

