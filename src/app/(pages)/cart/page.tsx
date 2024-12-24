'use client'

import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { CartItem, CartItemCustom } from "@/components/CartItem"
import { Button } from "@/components/ui/button"
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { useFetchCart } from '@/hooks/useFetchCart'
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { clearCartAsync, removeFromCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'

interface CartItem {
    id: string
    name: string
    price: number
    salePrice?: number
    image: string
    quantity: number
  }
  
  interface CartProps {
    isOpen: boolean
    onClose: () => void
  }

export default function CartPage() {
    const router = useRouter();
    const { cart, loading: isLoading } = useFetchCart();
    const { products, loading} = useFetchProducts();
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cart || !products || cart.length === 0 || products.length === 0) return;
        const items = cart.map(({ productId, quantity }) => {
            const product = products.find((p) => p._id === productId);
            return product
                ? { ...product, id: productId, quantity, image: product.images[0], salePrice: product.isOnSale ? product.salePrice : null }
                : null;
        });

        setCartItems(items.filter(Boolean) as CartItem[]);
    }, [cart, products]);

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
      0
    );

    
      const updateQuantity = async (itemId: string, newQuantity: number) => {
        try { // @ts-ignore
          dispatch(updateQuantityAsync({ productId: itemId, quantity: newQuantity }))
          setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ))
        } catch (error) {
          console.error('Error updating quantity:', error)
          toast({
            title: 'Error',
            description: 'Failed to update quantity. Please try again.',
            variant: 'destructive',
          })
        }
      }
    
      const removeItem = async (itemId: string) => {
        try { // @ts-ignore
          dispatch(removeFromCartAsync(itemId))
          setCartItems(cartItems.filter(item => item.id !== itemId))
        } catch (error) {
          console.error('Error removing item:', error)
          toast({
            title: 'Error',
            description: 'Failed to remove item. Please try again.',
            variant: 'destructive',
          })
        }
      }
    
      const clearCart = async () => {
        try { // @ts-ignore
          dispatch(clearCartAsync())
          setCartItems([])
        } catch (error) {
          console.error('Error clearing cart:', error)
          toast({
            title: 'Error',
            description: 'Failed to clear cart. Please try again.',
            variant: 'destructive',
          })
        }
      }

      if(loading || isLoading) {
        return <div>Loaing...</div>
      }

    return (
        <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
            <section className="py-16 bg-gradient-to-b from-background to-muted">
            <div className="container mx-auto px-4">
                <motion.div 
                className="flex items-center justify-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <ShoppingCart className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Your Cart</h1>
                </motion.div>
                {cartItems.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
                ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CartItemCustom
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            salePrice={item.salePrice}
                            image={item.image}
                            quantity={item.quantity}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            />
                    </motion.div>
                    ))}
                    <div className="mt-8 flex flex-col items-end">
                      <div className="flex items-center justify-between w-full py-6">
                          <p className="font-manrope font-bold text-3xl leading-9 text-gray-900 dark:text-gray-200">Total</p>
                          <h6 className="font-manrope font-bold text-3xl leading-9 text-cyan-600 dark:text-cyan-500">$405.00</h6>
                      </div>
                      <div className="w-full flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                        <button
                            onClick={clearCart}
                            className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-teal-50 justify-center transition-all duration-500 hover:bg-cyan-100">
                            <span className="px-2 font-semibold text-lg leading-8 text-cyan-600 dark:text-cyan-500">Clear Cart</span>
                            <Trash2 className="h-4 w-4 text-cyan-600 dark:text-cyan-500 scale-110 " />
                        </button>
                        <button
                            onClick={() => router.push('/checkout')}
                            className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-cyan-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-cyan-700">Continue
                            to Checkout
                            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                                fill="none">
                                <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                                    strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                      </div>
                    </div>
                </div>
                )}
            </div>
            </section>
        </main>
        </div>
    )
}



