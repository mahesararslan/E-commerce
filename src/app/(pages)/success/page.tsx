'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import axios from 'axios';
import { OrderDetailsCard } from '@/components/OrderDetailsCard';
import Link from 'next/link';

interface Order {

}

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await axios.get('/api/order');
      setOrder(data.order);
      setLoading(false);
    }

    fetchOrder();
  }, []);


  useEffect(() => {
    toast({
      title: 'Payment Successful',
      description: 'Thank you for your purchase!',
      duration: 5000,
    });
  }, [toast]);

  if (loading) {
    return <PaymentSuccessSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Successful!</h1>
              <p className="text-xl text-muted-foreground">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
            </motion.div>
            
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <OrderDetailsCard order={order} />
              </motion.div>
            )}

            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className=" mb-2 text-white font-semibold bg-gradient-to-b from-teal-400 via-cyan-500 to-cyan-800 hover:scale-105 hover:from-teal-500 hover:to-cyan-700">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

// make a skeleton for the payment success page
export function PaymentSuccessSkeleton() {
  return (
    <div className="my-20 p-8 mx-auto px-4 py-8 flex justify-center items-center">
      <div className="flex flex-col items-center w-fit border-2 shadow-xl p-8 rounded-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold mb-4 animate-pulse">Payment Successful</h1>
        <p className="mb-4 animate-pulse">
          Amount Paid: <span className="text-xl font-bold font-mono">${(0).toFixed(2)}...</span>
        </p>
        {/* just two whute boxes that show a skeleton of two lines: */}
        <p className="mb-4 animate-pulse">Date: <span className="text-xl font-bold font-mono">...</span></p>
        <p className="mb-4 animate-pulse">Time: <span className="text-xl font-bold font-mono">...</span></p>
        <Button
          className="w-full text-white font-semibold bg-gradient-to-b from-teal-400 via-cyan-500 to-cyan-800 hover:scale-105 hover:from-teal-500 hover:to-cyan-700"
          disabled
        >
          Home
        </Button>
      </div>
    </div>
  );
}
