
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';
import { Pagination } from '@/components/pagination';
import { ProductFilters } from '@/components/ProductFilters';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useFetchProducts } from '@/hooks/useFetchProducts';

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
  const { products: fetchedProducts } = useFetchProducts(); // Fetch all products initially
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState(''); // Sorting: '' | 'priceAsc' | 'priceDesc'
  const [saleOnly, setSaleOnly] = useState(false); // Toggle for "On Sale Only"

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Apply filtering and sorting logic
  useEffect(() => { // @ts-ignore
    let products = fetchedProducts;

    // Filter: Sale Only
    if (saleOnly) {
      products = products.filter(product => product.salePrice !== undefined);
    }

    // Sort: Price Ascending or Descending
    if (sortBy === 'priceAsc') {
      products.sort((a, b) => {
        const priceA = a.salePrice ?? a.price; // Use salePrice if available, otherwise price
        const priceB = b.salePrice ?? b.price;
        return priceA - priceB; // Ascending order
      });
    } else if (sortBy === 'priceDesc') {
      products.sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceB - priceA; // Descending order
      });
    }

    // Pagination
    const totalItems = products.length;
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE; // @ts-ignore
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [fetchedProducts, saleOnly, sortBy, currentPage]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSaleFilterChange = (checked: boolean) => {
    setSaleOnly(checked);
    setCurrentPage(1); // Reset to the first page
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
            <ProductFilters
              onSortChange={handleSortChange}
              onSaleFilterChange={handleSaleFilterChange}
            />
            {filteredProducts.length === 0 ? (
              <p className="text-center">No products found...</p>
            ) : (
              <>
                <div // @ts-ignore
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
                      <ProductCard // @ts-ignore
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        salePrice={product.salePrice}
                        images={product.images}
                        rating={product.rating}
                      />
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
