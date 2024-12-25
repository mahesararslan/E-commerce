"use client"
import StripePage from '@/components/StripePage';
import { Button } from '@/components/ui/button';
import { useFetchCart } from '@/hooks/useFetchCart';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import convertToSubCurrency from '@/lib/convertToSubCurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


interface CartItem {
    _id: string
    name: string
    price: number
    salePrice?: number
    image: string
    quantity: number
    isOnSale: boolean
  }

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("Stripe publishable key is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { products } = useFetchProducts();
      const {cart} = useFetchCart();
      const [cartItems, setCartItems] = useState<CartItem[]>([]);
      const [amount, setAmount] = useState(0);
    
      useEffect(() => {
          if (cart && products.length) {
            const items = cart.map(({ productId, quantity }) => {
              const product = products.find((p) => p._id === productId);
              return product ? { ...product, quantity, image: product.images[0] } : null;
            });
        
            setCartItems(items.filter(Boolean) as CartItem[]);
          }
        }, [cart, products]);
        
        useEffect(() => {
          if (cartItems.length) {
            const total = cartItems.reduce((total, item) => {
              return total + (item.isOnSale && item.salePrice ? item.salePrice * item.quantity : item.price * item.quantity);
            }, 0);
            setAmount(total);
          }
        }, [cartItems]);

        if(!session?.user) {
          return (
            <div className="min-h-screen flex flex-col justify-center items-center">
              <h1 className="text-3xl font-semibold">You need to be logged in to checkout</h1>
              <Button onClick={() => router.push('/signin')} className="mt-4 px-10 hover:scale-110">Login</Button>
            </div>
          )
        }

        if(!amount) {
            return <div>Loading...</div>
        }

    return (
      <div className='flex justify-center items-center' >
        
        <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen items-center xl:w-3/5">
          {/* Left Column - Picture */}
          <div className="hidden xl:block">
              <img className='inline-block w-[452px] h-[482px] rounded-md' src="/payment-page.jpeg" alt="DeviceHaven" />
          </div>
          
          {/* Right Column - Stripe Page */}
          <div className="flex justify-center items-center">
              <Elements 
                  stripe={stripePromise}
                  options={{
                      mode: 'payment',
                      amount: convertToSubCurrency(Number(amount)),
                      currency: 'usd',
                  }}
              >
                  <StripePage  amount={convertToSubCurrency(Number(amount))} />
              </Elements> 
          </div>
        </div>
      </div>
  
    )

}
