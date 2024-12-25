import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ProductCardSkeleton, TopProductCard } from './TopProductCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { CustomButton } from './CustomButton'
import { useFetchProducts } from '@/hooks/useFetchProducts'

interface Product {
  _id: string;
  name: string
  price: number
  image: string
  rating?: number
}

interface TopProductsCarouselProps {
  products: Product[]
}

export function TopProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const {products, loading} = useFetchProducts()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (loading) return <Skeleton />  


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-b from-background to-primary/5 py-10"
    >
      <h1 className='mt-2 mb-12 text-4xl font-bold text-center' >Trending Products</h1>
      <div className="overflow-hidden" ref={emblaRef}>
        
        <div className="flex -ml-4">
          {products.map((product) => (
            <div key={product._id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 first:pl-0 flex justify-center">
              <TopProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className='w-full flex justify-center items-center mt-10' >
        <CustomButton url="/products" >All Products</CustomButton>
      </div>
    </motion.div>
  )
}

function Skeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-b from-background to-primary/5 py-10"
    >
      <h1 className='mt-2 mb-12 text-4xl font-bold text-center' >Trending Products</h1>
      <div className="flex -ml-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 first:pl-0 flex justify-center">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
    </motion.div>
  )
}