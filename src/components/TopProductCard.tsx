import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarRating } from './starRating'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/models/product'

interface TopProductCardProps {
  _id: string
  name: string
  price: number
  images: string[]
  rating?: number
}

export function TopProductCard({ _id, name, price, images, rating }: TopProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const displayRating = rating || (4 + Math.random())

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <Link href={`/product/${_id}`}>
        <motion.div
      className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col h-full min-w-[300px] dark:border-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden h-[250px] w-full flex justify-center items-center">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Image
          src={images[currentImageIndex]}
          alt={name}
        //   layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
          height={220}
            width={220}
          onMouseEnter={nextImage}
        />
        <motion.div
          className="absolute top-2 right-2 z-20"
          whileHover={{ scale: 1.1 }}
        >
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white/80 hover:bg-white text-primary hover:text-primary-dark"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-2 truncate">{name}</h3>
          <StarRating rating={displayRating} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="rounded-lg text-white font-semibold px-5 bg-gradient-to-b from-cyan-300 via-teal-600 to-primary/10">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}

