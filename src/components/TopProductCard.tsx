"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { StarRating } from './starRating';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToWishlistAsync, removeFromWishlistAsync } from '@/store/slices/wishlistSlice'
import { useFetchWishlist } from '@/hooks/useFetchWishlist';
import { addToCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice';
import { useFetchCart } from '@/hooks/useFetchCart';
import { useRouter } from 'next/navigation';
import { SignInPopup } from './SigninPopup';

interface TopProductCardProps {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating?: number;
}

export function TopProductCard({ _id, name, price, salePrice, images, rating }: TopProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist, loading } = useFetchWishlist()
  const { cart } = useFetchCart();
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const displayRating = rating || 4 + Math.random();
  const { data: session } = useSession();
  const router = useRouter();
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  useEffect(() => {
    if(wishlist.length !== 0 && session?.user?.email) {
      setIsWishlisted(wishlist.includes(_id));
    }
  }, [wishlist, _id]);

  const addsToWishlist = async () => {

    try { // @ts-ignore
      dispatch(addToWishlistAsync(_id));
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };  

  const removesFromWishlist = async () => {
    try { // @ts-ignore
      dispatch(removeFromWishlistAsync(_id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation

    if (!session?.user?.email) {
      setShowSignInPopup(true);
      return;
    }

    if (isWishlisted) {
      removesFromWishlist();
    } else {
      addsToWishlist();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) {
      setShowSignInPopup(true);
      return;
    }

    try { // @ts-ignore
      if (cart.length !== 0 && session?.user?.email) {
        const cartItem = cart.find((item) => item.productId === _id);
        if (cartItem) {
          const newQuantity = cartItem.quantity + 1; // @ts-ignore
          dispatch(updateQuantityAsync({ productId: _id, quantity: newQuantity }));
          return;
        }
      }
      const props = {productId: _id, quantity: 1}; // @ts-ignore
      dispatch(addToCartAsync(props));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  return (
    <div>
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
            <button
              className="absolute right-2 top-2 z-10"
              onClick={toggleWishlist}
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </motion.div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2 truncate">{name}</h3>
            <div className='flex items-center justify-between'>
              <StarRating rating={displayRating} />
              <span className="text-xl font-bold text-primary">${salePrice ? salePrice.toFixed(2) : price.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="w-full  text-white bg-gradient-to-b from-teal-600 via-cyan-600 to-cyan-800 hover:scale-105 hover:from-teal-700 hover:to-cyan-900"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </Link>
      <SignInPopup isOpen={showSignInPopup} onClose={() => setShowSignInPopup(false)} />
      </div>
  );
}


export function ProductCardSkeleton() {
  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col h-full min-w-[300px] dark:border-x-2">
      <div className="aspect-square bg-gray-300 animate-pulse" />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2 animate-pulse" />
          <div className="bg-gray-300 h-4 w-1/2 animate-pulse" />
        </div>
        <div className="mt-4 w-full">
          <div className="bg-gray-300 h-10 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}