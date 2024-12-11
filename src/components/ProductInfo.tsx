'use client'

import { useEffect, useState } from 'react'
import { Session } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/starRating'
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react'
import axios from 'axios'

interface ProductInfoProps {
  product: {
    _id: string
    name: string
    description: string
    price: number
    rating?: number
  }
  session: Session | null
}

export function ProductInfo({ product, session }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1) // @ts-ignore
  const Rating: number = product.rating ? product.rating.toFixed(1): Number((4 + Math.random()).toFixed(1))
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  // const displayRating = product.rating || 4 + Math.random();

  useEffect(() => {
    console.log('session:', session);
    const fetchWishlist = async () => { // @ts-ignore
      if (session?.user?.id) {
        try { // @ts-ignore
          const response = await axios.get(`/api/user`);
          if (response.data.wishlist) {
            setWishlist(response.data.wishlist);
          }
          else {
            setWishlist([]);
          }
          
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };

    fetchWishlist();
  }, [session]);

  useEffect(() => {
    setIsWishlisted(wishlist.includes(product._id));
  }, [wishlist, product._id]);

  const addToWishlist = async () => {
    try { // @ts-ignore
      await axios.post(`/api/user/wishlist`, { productId: _id });
      setWishlist((prevWishlist) => [...prevWishlist, product._id]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async () => {
    try { // @ts-ignore
      await axios.delete(`/api/user/wishlist/${product._id}`);
      setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== product._id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    if (isWishlisted) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const addToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex items-center space-x-2">
        <StarRating rating={Rating} />
        {/* <span className="text-sm text-muted-foreground">({product.rating ? product.rating.toFixed(1): (4 + Math.random()).toFixed(1)})</span> */}
      </div>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-muted-foreground">{product.description}</p>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={decrementQuantity}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 text-center"
        />
        <Button variant="outline" size="icon" onClick={incrementQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-4">
        <Button className="flex-1 text-white font-semibold" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4 text-white" /> Add to Cart
        </Button>
        <Button variant="outline" onClick={addToWishlist}>
          <Heart className="mr-2 h-4 w-4" /> {isWishlisted ? "Remove" : "Wishlist"}
        </Button>
      </div>
    </div>
  )
}

