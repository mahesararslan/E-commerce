// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/Footer"
import { ProductCard } from "@/components/ProductCard"
import { Pagination } from "@/components/Pagination"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import axios from 'axios'

// This would typically come from an API or database
const products = [
  { id: '1', name: 'Smartphone X', price: 999.99, image: '/placeholder.svg?height=300&width=300', categoryId: '1' },
  { id: '2', name: 'Laptop Pro', price: 1499.99, salePrice: 1299.99, image: '/placeholder.svg?height=300&width=300', categoryId: '2' },
  { id: '3', name: 'Tablet Ultra', price: 599.99, image: '/placeholder.svg?height=300&width=300', categoryId: '3' },
  { id: '4', name: 'Smartwatch Elite', price: 299.99, image: '/placeholder.svg?height=300&width=300', categoryId: '4' },
  { id: '5', name: 'Wireless Earbuds', price: 149.99, salePrice: 129.99, image: '/placeholder.svg?height=300&width=300', categoryId: '5' },
  { id: '6', name: 'Gaming Console X', price: 499.99, image: '/placeholder.svg?height=300&width=300', categoryId: '6' },
  { id: '7', name: 'Smart TV 4K', price: 799.99, image: '/placeholder.svg?height=300&width=300', categoryId: '7' },
  { id: '8', name: 'Digital Camera Pro', price: 899.99, image: '/placeholder.svg?height=300&width=300', categoryId: '8' },
  { id: '9', name: 'Bluetooth Speaker', price: 79.99, salePrice: 69.99, image: '/placeholder.svg?height=300&width=300', categoryId: '5' },
  { id: '10', name: 'Fitness Tracker', price: 99.99, image: '/placeholder.svg?height=300&width=300', categoryId: '4' },
  // Add more products as needed
]

const categories = [
  { id: '1', name: 'Smartphones' },
  { id: '2', name: 'Laptops' },
  { id: '3', name: 'Tablets' },
  { id: '4', name: 'Smartwatches' },
  { id: '5', name: 'Audio' },
  { id: '6', name: 'Gaming' },
  { id: '7', name: 'TVs' },
  { id: '8', name: 'Cameras' },
]

const ITEMS_PER_PAGE = 6

export default function CategoryPage() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {

    const response = await axios.get(`/api/products?categoryId=${id}`)
    setCategoryProducts(response.data)
      
    // Find the category name
    const category = categories.find(cat => cat.id === id)
    setCategoryName(category ? category.name : 'Unknown Category')
  }, [id])

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = categoryProducts.slice(startIndex, endIndex)

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {categoryName}
            </motion.h1>
            <div 
              ref={ref}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    image={product.image}
                    rating={4 + Math.random()}
                  />
                </motion.div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

