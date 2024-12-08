import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarRating } from './starRating'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  rating: number
}

export function ProductCard({ id, name, price, salePrice, images, rating }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card text-card-foreground rounded-lg shadow-lg border-t-2 dark:border-t-0 border-gray-100 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square flex items-center justify-center h-[200px]">
        <Image
          src={images[currentImageIndex]}
          alt={name}
          width={180}
          height={180}
          className="transition-transform duration-300 hover:scale-105 object-contain max-h-[300px]"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background z-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <StarRating rating={rating} />
        <div className="mt-2">
          {salePrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-primary mr-2">${salePrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-cyan-400">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="p-4 bg-muted/50 flex justify-between">
        <Button size="sm" className="w-[48%] text-white hover:bg-cyan-900 font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2 " />
          Add to Cart
        </Button>
        <Button size="sm" variant="outline" className="w-[48%]">
          <Heart className="w-4 h-4 mr-2" />
          Wishlist
        </Button>
      </div>
    </motion.div>
  )
}

