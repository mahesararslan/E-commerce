'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useFetchCart } from '@/hooks/useFetchCart';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { Toaster } from '@/components/ui/toaster';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
  isOnSale: boolean;
}

export default function PaymentSuccessPage() {
  const { products } = useFetchProducts();
  const { cart } = useFetchCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [amount, setAmount] = useState(0);
  const [orderDate, setOrderDate] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

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

  useEffect(() => {
    toast({
      title: 'Payment Successful',
      description: 'Thank you for your purchase!',
      duration: 5000,
    });
  }, [toast]);

  // Set order date on client side
  useEffect(() => {
    setOrderDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="my-20 p-8 mx-auto px-4 py-8 flex justify-center items-center">
      <div className="flex flex-col items-center w-fit border-2 shadow-xl p-8 rounded-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
        <p className="mb-4">
          Amount Paid: <span className="text-xl font-bold font-mono">${(Number(amount)).toFixed(2)}</span>
        </p>
        {/* Display date after client-side hydration */}
        <p className="mb-4">Date: {orderDate}</p>
        <p>Thank you for your purchase.</p>
        <p className="mb-8">Your order has been processed successfully.</p>
        <Button
          className="w-full text-white font-semibold bg-gradient-to-b from-teal-400 via-cyan-500 to-cyan-800 hover:scale-105 hover:from-teal-500 hover:to-cyan-700"
          onClick={() => {
            router.push('/');
          }}
        >
          Home
        </Button>
      </div>
      <Toaster/>
    </div>
  );
}
