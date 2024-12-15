'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { X, Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { useFetchCart } from '@/hooks/useFetchCart'

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

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart: cartItems } = useFetchCart();
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const { toast } = useToast()

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await fetch(`/api/user/${session?.user?.email}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      })
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
    try {
      await fetch(`/api/user/${session?.user?.email}/cart/${itemId}`, {
        method: 'DELETE',
      })
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
    try {
      await fetch(`/api/user/${session?.user?.email}/cart`, {
        method: 'DELETE',
      })
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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-lg z-50 flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {isLoading ? (
              <CartSkeleton />
            ) : cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button variant="outline" className="w-full mb-2" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button className="w-full mb-2">
              <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
            </Button>
            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CartSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-md" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  )
}

