"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarRating } from './starRating'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useFetchWishlist } from '@/hooks/useFetchWishlist'
import { useDispatch } from 'react-redux'
import { addToWishlist, addToWishlistAsync, removeFromWishlist, removeFromWishlistAsync } from '@/store/slices/wishlistSlice'
import { useFetchCart } from '@/hooks/useFetchCart'
import { addToCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'

interface ProductCardProps {
  id: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  rating: number
}

export function ProductCard({ id, name, price, salePrice, images, rating }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { data: session } = useSession();
  const { wishlist, loading } = useFetchWishlist()
  const { cart } = useFetchCart();
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
    useEffect(() => {
      if(wishlist.length !== 0 && session?.user?.email) {
        setIsWishlisted(wishlist.includes(id));
      }
    }, [wishlist, id]);
  
    const addsToWishlist = async () => {
      try { // @ts-ignore
         // @ts-ignore
        dispatch(addToWishlistAsync(id));
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    };
  
    const removesFromWishlist = async () => {
      try {  // @ts-ignore
        dispatch(removeFromWishlistAsync(id));
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    };
  
    const toggleWishlist = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent Link navigation
      e.stopPropagation();
      if (isWishlisted) {
        removesFromWishlist();
      } else {
        addsToWishlist();
      }
    };

    
      const addToCart = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        try { // @ts-ignore
          if (cart.length !== 0 && session?.user?.email) {
            const cartItem = cart.find((item) => item.productId === id);
            if (cartItem) {
              const newQuantity = cartItem.quantity + 1; // @ts-ignore
              dispatch(updateQuantityAsync({ productId: id, quantity: newQuantity }));
              return;
            }
          }
          const props = {productId: id, quantity: 1}; // @ts-ignore
          dispatch(addToCartAsync(props));
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      }
    

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();    
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();  
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
        <button
              className="absolute right-2 top-2 z-10"
              onClick={toggleWishlist}
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
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
        <Button size="sm" className="w-full text-white font-semibold bg-gradient-to-b from-teal-600 via-cyan-600 to-cyan-800 hover:scale-105 hover:from-teal-700 hover:to-cyan-900"
          onClick={addToCart}
        >
          <ShoppingCart className=" h-4 mr-2 " />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}

