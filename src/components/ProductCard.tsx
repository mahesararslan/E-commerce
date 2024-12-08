import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  isOnSale: boolean
  salePrice?: number
  stock: number
}

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative h-48 w-full items-center justify-center">
            <Image
              src={product.images[0]}
              alt={product.name}
              objectFit="cover"
              height={250}
              width={200}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full">
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

