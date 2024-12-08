'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './product-card-2'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { CustomButton } from './CustomButton'

// interface Product {
//   _id: number
//   name: string
//   image: string
//   description: string
// }

// interface ProductCarouselProps {
//   products: Product[]
//   ratings: number[]
// }



export default function ProductCarousel() {
  const products = useSelector((state: RootState) => state.product.products).slice(0, 8)
  const ratings = [4.7, 4.9, 4.6, 4.7, 4.8, 4.9, 4.4];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl text-center font-bold mb-6">Trending Products</h1>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product: any, index: number) => (
              <div key={product._id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] p-4">
                <ProductCard product={product} rating={ratings[index]} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className='w-full flex justify-center items-center mt-10' >
      <CustomButton url="/products" >All Products</CustomButton>
    </div>
    </div>
  )
}

