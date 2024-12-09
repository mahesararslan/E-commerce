// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ProductCard } from "@/components/product-card"
import { Pagination } from "@/components/pagination"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import axios from 'axios'
import Link from 'next/link'

const ITEMS_PER_PAGE = 6

export default function CategoryPage() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    
    async function fetchProducts() {
      const response = await axios.get(`/api/products/${id}`)
      setCategoryProducts(response.data.products)
      const response2 = await axios.get(`/api/categories/${id}`)
      setCategoryName(response2.data.category.name)
      setLoading(false)

    }

    fetchProducts();
  }, [id])

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = categoryProducts.slice(startIndex, endIndex)

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  if (Loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      
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
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/product/${product._id}`} className='cursor-pointer'>
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      salePrice={product.salePrice}
                      images={product.images}
                      rating={4 + Math.random()}
                    />
                  </Link>
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
    </div>
  )
}
