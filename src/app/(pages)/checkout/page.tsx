'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { countries } from '@/lib/countries'
import { useFetchCart } from '@/hooks/useFetchCart'
import { useFetchProducts } from '@/hooks/useFetchProducts'

interface CheckoutFormData {
  name: string
  country: string
  city: string
  phoneNumber: string
  address: string
  postalCode: string
  paymentMethod: 'stripe' | 'cash'
}

interface CartItem {
  _id: string
  name: string
  price: number
  salePrice?: number
  image: string
  quantity: number
  isOnSale: boolean
}


export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cart } = useFetchCart();
  const { products } = useFetchProducts();
  const [cartItems, setCartItems] = useState<CartItem []>([])
  const [totalCost, setTotalCost] = useState(0);
  const { control, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      name: '',
      country: '',
      city: '',
      phoneNumber: '',
      address: '',
      postalCode: '',
      paymentMethod: 'stripe', // Provide a default value here
    },
  });

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
      setTotalCost(total);
    }
  }, [cartItems]);
  

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log("DATA:", data)
    if (data.paymentMethod === 'cash') {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Your order has been placed. You will receive a confirmation email shortly.')
    }
    else if (data.paymentMethod === 'stripe') {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Redirecting to Stripe payment gateway...')
    }
    // Simulate API call
    setIsSubmitting(false)
    // Handle response, e.g., redirect to confirmation page
  }

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
              Checkout
            </motion.h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Personal & Shipping Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => <Input {...field} id="name" placeholder="John Doe" />}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: 'Country is required' }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: 'City is required' }}
                      render={({ field }) => <Input {...field} id="city" placeholder="New York" />}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^\+?[1-9]\d{1,14}$/,
                          message: 'Please enter a valid phone number'
                        }
                      }}
                      render={({ field }) => <Input {...field} id="phoneNumber" placeholder="+1234567890" />}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Controller
                      name="address"
                      control={control}
                      rules={{ required: 'Address is required' }}
                      render={({ field }) => <Input {...field} id="address" placeholder="123 Main St" />}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Controller
                      name="postalCode"
                      control={control}
                      rules={{ required: 'Postal code is required' }}
                      render={({ field }) => <Input {...field} id="postalCode" placeholder="12345" />}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                  </div>
                </div>
              </motion.div>
              <div className="space-y-6">
                <motion.div
                  className="bg-card text-card-foreground rounded-lg p-6 shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                  <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{ required: 'Payment method is required' }}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="stripe" id="stripe" />
                          <Label htmlFor="stripe">Stripe</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash">Cash on Delivery</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
                </motion.div>
                <motion.div
                  className="bg-card text-card-foreground rounded-lg p-6 shadow-md"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex justify-between">
                        <img src={`${item.image}`} height={100} width={100} />
                        <div className='flex flex-col justify-center items-center'>
                          <span>{item.name} x {item.quantity}</span>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="md:col-span-2 flex justify-center mt-5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="submit" className='text-white font-semibold' size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </motion.div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

