// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { WishlistCard } from "@/components/WishlistCard"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { removeFromWishlistAsync } from '@/store/slices/wishlistSlice'
import { useFetchCart } from '@/hooks/useFetchCart'
import { addToCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'
import { useFetchWishlist } from '@/hooks/useFetchWishlist'
import { useFetchProducts } from '@/hooks/useFetchProducts'

interface Product {
  id: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  isOnSale: boolean
}

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const {products} = useFetchProducts();
  const {wishlist, loading:isLoading} = useFetchWishlist();
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { toast } = useToast()
  const { cart } = useFetchCart();

  useEffect(() => {
        if (session?.user?.email) {      
          const items = wishlist.map((id) => {
            const product = products.find((p) => p._id === id);
            return product;
          });
          setWishlistProducts(items.filter(Boolean) as Product[]);
        }
    
  }, [session, toast])

  

  
    const handleAddToCart = async (id) => {
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
  

  const handleRemoveFromWishlist = async (id) => {
    try { 
      dispatch(removeFromWishlistAsync(id));
      setWishlistProducts((prevWishlist) => prevWishlist.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted dark:bg-background">
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Wishlist
            </motion.h1>
            { !session?.user?.email ? (
              <p className="text-center">Please sign in to view your wishlist.</p>
            ) :
            isLoading ? (
              <p className="text-center">Loading your wishlist...</p>
            ) : wishlist.length === 0 ? (
              <p className="text-center">Your wishlist is empty.</p>
            ) : (
              <div className="space-y-4">
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <WishlistCard
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      salePrice={product.isOnSale ? product.salePrice : undefined}
                      images={product.images}
                      onRemove={handleRemoveFromWishlist}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

