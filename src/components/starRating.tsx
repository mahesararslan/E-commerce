import { Star, StarHalf } from 'lucide-react'
import { useEffect } from 'react'

interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        } else {
          return <Star key={i} className="w-4 h-4 text-gray-300" />
        }
      })}
      {/* <span className="ml-1 text-sm text-muted-foreground">{rating ? Number(rating.toFixed(1)) : 4}</span>   */}
    </div>
  )
}

