"use client";

import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { SalesSection } from "@/components/sales-section"
import { BrandCarousel } from "@/components/brand-carousel"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { AboutUsShort } from "@/components/about-us-short"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts } from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import { setCategories } from "@/store/slices/categorySlice";
import { TopProducts } from "@/components/top-products";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    if (products.length === 0) { // Only fetch if products are not already in state
      const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        dispatch(setProducts(data.products));
      };
      fetchProducts();
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        const { data } = await axios.get('/api/categories');
        console.log("Categories: ", data.categories);
        dispatch(setCategories(data.categories));
      };
      fetchCategories();
      setLoading(false);
    }
  }, [dispatch, categories.length]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Categories />
        <BrandCarousel />
        <WhyChooseUs />
        <TopProducts />
        <SalesSection />
        <AboutUsShort />
      </main>
    </div>
  )
}

