import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'


interface WishlistCardProps {
  id: string
  name: string
  price: number
  salePrice?: number
  images: string[]
  onRemove: (id: string) => void
  onAddToCart: (id: string) => void
}

export function WishlistCard({ id, name, price, salePrice, images, onRemove, onAddToCart }: WishlistCardProps) {


  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden dark:border-2 dark:border-gray-600">
      <Link href={`/product/${id}`} className="block hover:opacity-80 transition-opacity">
        <div className="p-4">
          {/* Layout for md and larger screens */}
          <div className="hidden md:grid md:grid-cols-4 md:items-center md:gap-4">
            <div className="flex items-center space-x-4">
              <Image
                src={images[0]}
                alt={name}
                width={120}
                height={120}
                className="rounded-md object-cover"
              />
              <span className="font-medium truncate">{name}</span>
            </div>
            <div className="text-center">
              {salePrice ? (
                <div>
                  <span className="text-primary font-bold">${salePrice.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-bold">${price.toFixed(2)}</span>
              )}
            </div>
            <div className="text-center">
              <Button className="text-white font-semibold hover:bg-cyan-500" size="sm" onClick={(e) => {
                e.preventDefault()
                onAddToCart(id)
                
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
            <div className="text-center">
              <Button className='hover:bg-red-500'
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault()
                  onRemove(id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Layout for smaller screens */}
          <div className="md:hidden">
            <div className="flex items-start mb-4">
              <div className="flex-grow">
                <h3 className="font-medium text-lg mb-1">{name}</h3>
                <div>
                  {salePrice ? (
                    <div>
                      <span className="text-primary font-bold">${salePrice.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">${price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="font-bold">${price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <Image
                src={images[0]}
                alt={name}
                width={80}
                height={80}
                className="rounded-md object-cover ml-4"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button size="sm" className='text-white font-semibold hover:bg-cyan-500' onClick={(e) => {
                e.preventDefault()
                onAddToCart(id)
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className='hover:bg-red-500'
                onClick={(e) => {
                  e.preventDefault()
                  onRemove(id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

