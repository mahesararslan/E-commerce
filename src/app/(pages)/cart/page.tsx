'use client'

import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { CartItem } from "@/components/CartItem"
import { Button } from "@/components/ui/button"
import { RootState } from '@/store/store'
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { useFetchCart } from '@/hooks/useFetchCart'
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface CartItem {
    id: string
    name: string
    price: number
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
    const { products } = useFetchProducts();
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        if (!cart || !products || cart.length === 0 || products.length === 0) return;
        const items = cart.map(({ productId, quantity }) => {
            const product = products.find((p) => p._id === productId);
            return product
                ? { ...product, id: productId, quantity, image: product.images[0] }
                : null;
        });

        setCartItems(items.filter(Boolean) as CartItem[]);
    }, [cart, products]);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    
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
                        <CartItem
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            />
                    </motion.div>
                    ))}
                    <div className="mt-8 flex flex-col items-end">
                    <p className="text-xl font-semibold mb-4">
                        Total: ${totalPrice.toFixed(2)}
                    </p>
                    <Button size="lg" className="w-full text-white font-semibold bg-gradient-to-b from-teal-600 via-cyan-600 to-cyan-800 hover:scale-105 hover:from-teal-700 hover:to-cyan-900" onClick={() => {
                        router.push('/checkout')
                    }}>
                        Proceed to Checkout
                    </Button>
                    </div>
                </div>
                )}
            </div>
            </section>
        </main>
        </div>
    )
}

