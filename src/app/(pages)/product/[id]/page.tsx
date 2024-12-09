'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProductImage } from '@/components/ProductImage'
import { ProductInfo } from '@/components/ProductInfo'
import { ReviewSection } from '@/components/ReviewSection'
import { SimilarProducts } from '@/components/SimilarProducts' // Ensure this path is correct or update it to the correct path
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  rating?: number
  category: string
}

export default function ProductPage() {
  const { id } = useParams()
  const { data: session, status } = useSession()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`/api/product/${id}`)
        setProduct(res.data.product)
        console.log("Product: ",product)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (isLoading) {
    return <ProductPageSkeleton />
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ProductImage images={product.images} />
          <ProductInfo product={product} session={session} />
        </div>
        <ReviewSection productId={product.id} session={session} />
        <SimilarProducts category={product.category} currentProductId={product.id} />
      </main>
    </div>
  )
}

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-64 w-full mb-16" />
        <Skeleton className="h-64 w-full" />
      </main>
    </div>
  )
}

