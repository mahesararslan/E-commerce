// @ts-nocheck
'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { Pagination } from "@/components/pagination"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { ProductFilters, ProductFiltersSkeleton } from '@/components/ProductFilters'
import { SignInPopup } from '@/components/SigninPopup'

const ITEMS_PER_PAGE = 6

export default function CategoryPage() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('price_asc')
  const [saleOnly, setSaleOnly] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  // Fetch products and category name
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const response = await axios.get(`/api/products/${id}`)
        setCategoryProducts(response.data.products)
        const response2 = await axios.get(`/api/categories/${id}`)
        setCategoryName(response2.data.category.name)
      } catch (error) {
        console.error("Error fetching products or category:", error)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [id])

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let products = [...categoryProducts]

    // Apply "On Sale" filter
    if (saleOnly) {
      products = products.filter((product) => product.salePrice)
    }

    // Apply sorting
    if (sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price)
    }

    return products
  }, [categoryProducts, saleOnly, sort])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  if(loading) {
    return <CategoryPageSkeleton />
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
            <ProductFilters
              onSortChange={(value) => {
                alert("clicked on sort change")
                setSort(value)
              }}
              onSaleFilterChange={(checked) => setSaleOnly(checked)}
            />
            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : (
              <div 
                ref={ref}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
                        rating={product.rating}
                        setShowSignInPopup={setShowSignInPopup}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <SignInPopup isOpen={showSignInPopup} onClose={() => setShowSignInPopup(false)} />
    </div>
  )
}

// skeleton
function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Category Name</h1>
            <ProductFiltersSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
            {/* <PaginationSkeleton /> */}
          </div>
        </section>
      </main>
    </div>
  )
}
