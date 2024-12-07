"use client"

import { useEffect, useState } from 'react'
import { ProductCarousel } from './product-carousel'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Category {
  _id: number
  name: string
  image: string
  description: string
}

export function RecentProducts() {
  const categories = useSelector((state: RootState) => state.category.categories);

  return (
    <section className="py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center animate-fade-up">Featured categories</h2>
        <ProductCarousel products={categories} />
      </div>
    </section>
  )
}



