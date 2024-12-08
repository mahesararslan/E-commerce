'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  images: string[]
}

export function ProductImage({ images }: ProductImageProps) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg">
        <Image
          src={mainImage}
          alt="Main product image"
          layout="fill"
          objectFit="contain"
          className="w-full h-full object-center"
        />
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden",
              mainImage === image && "ring-2 ring-primary"
            )}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={80}
              height={80}
              objectFit="cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

