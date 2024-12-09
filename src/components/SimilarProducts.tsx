// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  rating?: number
}

interface SimilarProductsProps {
  category: string
  currentProductId: string
}

export function SimilarProducts({ category, currentProductId }: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' })
  const filteredProducts = products.filter((product) => product.id !== currentProductId)

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`/api/products/${category}`)
        setProducts(res.data.products)
      } catch (error) {
        console.error('Error fetching similar products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSimilarProducts()
  }, [category, currentProductId])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  if (isLoading) {
    return <SimilarProductsSkeleton />
  }

  if(filteredProducts.length === 0) {
    return <div></div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center ">Similar Products</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {filteredProducts.map((product: Product) => (
              <div key={product._id} className="flex-[0_0_25%] min-w-0 px-2"> 
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function SimilarProductsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="flex space-x-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-1/4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

