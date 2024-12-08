'use client'

import { useState, useEffect } from 'react'
import { Session } from 'next-auth'
import { StarRating } from '@/components/starRating'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewSectionProps {
  productId: string
  session: Session | null
}

export function ReviewSection({ productId, session }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/reviews/${productId}`)
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId, // @ts-ignore
          userId: session.user.id, // @ts-ignore
          userName: session.user.name,
          ...newReview
        }),
      })
      const data = await res.json()
      setReviews([data, ...reviews])
      setNewReview({ rating: 0, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  if (isLoading) {
    return <ReviewSectionSkeleton />
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      {session && (
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <StarRating
            rating={newReview.rating} // @ts-ignore
            onChange={(rating: any) => setNewReview({ ...newReview, rating })}
            editable
          />
          <Textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Write your review here..."
            required
          />
          <Button type="submit">Submit Review</Button>
        </form>
      )}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{review.userName}</p>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-muted-foreground mt-2">{review.comment}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
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
  )
}

