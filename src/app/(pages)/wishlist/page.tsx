// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { WishlistCard } from "@/components/WishlistCard"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

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
  const products = useSelector((state: RootState) => state.product.products)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    const fetchWishlistProducts = async () => { // @ts-ignore
      if (session?.user?.id) {
        try { 
          const response = await axios.get(`/api/user`)
          const filteredProducts = products.filter((product: any) => 
            response.data.wishlist.includes(product._id)
          )
          setWishlistProducts(filteredProducts)
        } catch (error) {
          console.error('Error fetching wishlist products:', error)
          toast({
            title: "Error",
            description: "Failed to fetch wishlist products. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchWishlistProducts()
  }, [session, toast])

  

  const handleAddToCart = async () => {
    try { // @ts-ignore
      await axios.post(`/api/user/wishlist`, { productId: product._id });
      setWishlist((prevWishlist) => [...prevWishlist, product._id]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try { 
      await axios.delete(`/api/user/wishlist/${id}`);
      setWishlistProducts((prevWishlist) => prevWishlist.filter((prod) => prod._id !== id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Wishlist
            </motion.h1>
            {isLoading ? (
              <p className="text-center">Loading your wishlist...</p>
            ) : wishlistProducts.length === 0 ? (
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

