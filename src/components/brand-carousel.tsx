"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

const brands = [
  { name: 'Apple', logo: '/apple.png' },
  { name: 'Samsung', logo: '/samsung.png' },
  { name: 'Xiaomi', logo: '/xiaomi.png' },
  { name: 'LG', logo: '/LG.png' },
  { name: 'HP', logo: '/hp.png' },
  { name: 'Sony', logo: '/sony.png' },
  { name: 'Dell', logo: '/dell.png' },
  { name: 'Dawlance', logo: '/dawlance.png' },
  { name: 'Apple', logo: '/apple.png' },
  { name: 'Samsung', logo: '/samsung.png' },
  { name: 'Xiaomi', logo: '/xiaomi.png' },
  { name: 'LG', logo: '/LG.png' },
  { name: 'HP', logo: '/hp.png' },
  { name: 'Sony', logo: '/sony.png' },
  { name: 'Dell', logo: '/dell.png' },
  { name: 'Dawlance', logo: '/dawlance.png' },
  { name: 'Apple', logo: '/apple.png' },
  { name: 'Samsung', logo: '/samsung.png' },
  { name: 'Xiaomi', logo: '/xiaomi.png' },
  { name: 'LG', logo: '/LG.png' },
  { name: 'HP', logo: '/hp.png' },
  { name: 'Sony', logo: '/sony.png' },
  { name: 'Dell', logo: '/dell.png' },
  { name: 'Dawlance', logo: '/dawlance.png' },
]

export function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth
      const animationDuration = scrollWidth / 70 // Adjust speed here

      scrollContainer.style.setProperty('--scroll-width', `${scrollWidth}px`)
      scrollContainer.style.setProperty('--animation-duration', `${animationDuration}s`)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-background via-primary/5 to-background py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Trusted Brands</h2>
        <div className="relative">
          <div ref={scrollRef} className="flex animate-infinite-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex-none mx-6 w-24 h-24 md:w-32 md:h-32">
                <div className="group relative h-full flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
