'use client'

import { useState } from 'react'
import { Session } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/starRating'
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react'

interface ProductInfoProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    rating: number
  }
  session: Session | null
}

export function ProductInfo({ product, session }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const addToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  const addToWishlist = () => {
    // Implement add to wishlist functionality
    console.log(`Added ${product.name} to wishlist`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex items-center space-x-2">
        <StarRating rating={product.rating} />
        <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
      </div>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-muted-foreground">{product.description}</p>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={decrementQuantity}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 text-center"
        />
        <Button variant="outline" size="icon" onClick={incrementQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-4">
        <Button className="flex-1" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <Button variant="outline" onClick={addToWishlist}>
          <Heart className="mr-2 h-4 w-4" /> Wishlist
        </Button>
      </div>
    </div>
  )
}

