import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarRating } from '@/components/starRating'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  salePrice?: number
  image: string
  rating: number
}

export function ProductCard({ id, name, price, salePrice, image, rating }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden flex flex-col"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
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
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="p-4 bg-muted/50 flex justify-between">
        <Button size="sm" className="w-[48%]">
          <ShoppingCart className="w-4 h-4 mr-2" />
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

