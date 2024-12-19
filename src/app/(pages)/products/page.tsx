// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';
import { Pagination } from '@/components/pagination';
import { ProductFilters } from '@/components/ProductFilters';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating: number;
}

const ITEMS_PER_PAGE = 12;

export default function AllProductsPage() {
  const { products: fetchedProducts, loading } = useFetchProducts(); // Fetch products
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // State for filters
  const [sortBy, setSortBy] = useState<string>(''); // '' | 'priceAsc' | 'priceDesc'
  const [saleOnly, setSaleOnly] = useState<boolean>(false);

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Main effect: Filter, sort, and paginate
  useEffect(() => {
    if (!fetchedProducts) return;

    let products = [...fetchedProducts]; // Clone to avoid mutating original

    // 1. Filtering: "On Sale Only"
    if (saleOnly) {
      products = products.filter((product) => product.salePrice !== undefined);
    }

    // 2. Sorting: Price Ascending or Descending
    if (sortBy === 'price_asc') {
      products.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortBy === 'price_desc') {
      products.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    }

    // 3. Pagination
    const totalItems = products.length;
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    setFilteredProducts(paginatedProducts);
  }, [fetchedProducts, saleOnly, sortBy, currentPage]);

  // Handlers
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset page
  };

  const handleSaleFilterChange = (checked: boolean) => {
    setSaleOnly(checked);
    setCurrentPage(1); // Reset page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
              All Products
            </motion.h1>

            {/* Filters */}
            <ProductFilters
              onSortChange={handleSortChange}
              onSaleFilterChange={handleSaleFilterChange}
            />

            {loading && <p className="text-center">Loading...</p>}

            {/* Products Grid */}
            { !loading && filteredProducts.length === 0 ? (
              <p className="text-center">No products found...</p>
            ) : (
              <>
                <div
                  ref={ref}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/product/${product._id}`}>
                      <ProductCard
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        salePrice={product.salePrice}
                        images={product.images}
                        rating={product.rating}
                      />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
