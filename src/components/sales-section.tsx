"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const bestDeals = [
  { id: 1, name: "iPhone 16 Plus", price: 799, discount: 30, image: "/Iphone16.png" },
  { id: 2, name: "Wireless Headphones", price: 199, discount: 25, image: "/headphones.png" },
  { id: 3, name: "Macbook Air 15 M2", price: 1299, discount: 20, image: "/Macbook.png" },
  { id: 4, name: "HP Notebook 15 - 250 G10 i3", price: 999, discount: 15, image: "/HP_laptop.png" },
]

export function SalesSection() {
  const [hoveredDeal, setHoveredDeal] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Summer Sale Extravaganza
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-foreground/80 " >
            Up to <span className="highlight highlight-teal-400 p-2 animate-highlight-fade ">30% OFF</span> on Selected Items
          </p>
        </motion.div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-foreground">Best Deals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredDeal(deal.id)}
                onHoverEnd={() => setHoveredDeal(null)}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        width={300}
                        height={200}
                        className="w-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-semibold">
                        {deal.discount}% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{deal.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                          ${(deal.price * (1 - deal.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${deal.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={hoveredDeal === deal.id ? "default" : "outline"}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" variant="default">
            View All Deals
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

