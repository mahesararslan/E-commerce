"use client";

import { useEffect, useState, Suspense } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { useSearchParams } from "next/navigation";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { products, loading } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchQuery && products.length > 0) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) // @ts-ignore
        )
      );
    }
  }, [searchQuery, products]);

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
              Search Results for "{searchQuery}"
            </motion.h1>
            {filteredProducts.length === 0 && !loading ? (
              <p className="text-center text-lg">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard
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
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
