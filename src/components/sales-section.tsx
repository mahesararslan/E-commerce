"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { CustomButton } from './CustomButton'
import { useFetchProducts } from '@/hooks/useFetchProducts'
import Link from 'next/link'
import { useFetchCart } from '@/hooks/useFetchCart'
import { addToCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { SignInPopup } from './SigninPopup'

interface Product {
  _id: string;
  name: string
  price: number
  images: string[]
  rating?: number
  salePrice: number | undefined
  isOnSale: boolean
}


export function SalesSection() {
  const { products, loading } = useFetchProducts();
  const { cart } = useFetchCart();
  const [hoveredDeal, setHoveredDeal] = useState<string | null>(null)
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  
    const addToCart = async (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();

      if (!session?.user?.email) {
        setShowSignInPopup(true);
        return;
      }

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

    if (loading) return <SalesSkeleton />

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Summer Sale Extravaganza
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-foreground/80 " >
            Up to <span className="highlight highlight-cyan-600 p-2 animate-highlight-fade text-white">30% OFF</span> on Selected Items
          </p>
        </motion.div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Best Deals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter((product) => product.isOnSale).slice(0, 4).map((deal, index) => (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredDeal(deal._id)}
                onHoverEnd={() => setHoveredDeal(null)}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/product/${deal._id}`} className="relative cursor-pointer">
                      <Image
                        src={deal.images[0]}
                        alt={deal.name}
                        width={300}
                        height={200}
                        className="w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-bold text-white">
                        { // @ts-ignore
                        Math.round(((deal.price-deal.salePrice)/deal.price) * 100)}% OFF
                      </div>
                    </Link>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{deal.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                          ${ // @ts-ignore
                          (deal.salePrice).toFixed(2)}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${deal.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className={hoveredDeal === deal._id ? "w-full text-white" : "w-full text-foreground hover:text-white"} variant={hoveredDeal === deal._id ? "default" : "outline"}
                      onClick={(e) => addToCart(e, deal._id)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CustomButton url="/products" >
            View All Deals
          </CustomButton>
        </motion.div>
      </div>
      <SignInPopup isOpen={showSignInPopup} onClose={() => setShowSignInPopup(false)} />
    </section>
  )
}

function SalesSkeleton() {

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-1/2 h-10 bg-gray-300 animate-pulse mb-4 mx-auto"></div>
          <div className="w-3/4 h-8 bg-gray-300 animate-pulse mx-auto"></div>
        </motion.div>
  
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-foreground text-center">
            BesT Deals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="overflow-hidden">
                  <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-bold text-white">
                    <div className="w-12 h-6 bg-gray-300 animate-pulse"></div>
                  </div>
                  <div className="p-4">
                  <Button className="w-full text-foreground hover:text-white" variant="default" >
                    Add to Cart
                  </Button>  
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
  
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className=" text-foreground hover:text-white" variant="default" >
            View All Deals
          </Button>  
        </motion.div>
      </div>
    </section>
  );
  
}