"use client"

import { useEffect, useState } from 'react'
import { CategoryCarousel } from './category-carousel'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useFetchCategories } from '@/hooks/useFetchCategories'

export function Categories() {
  const { categories, loading } = useFetchCategories(); 

  return (
    <section className="py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center animate-fade-up">Featured categories</h2>
        <CategoryCarousel products={categories} />
      </div>
    </section>
  )
}



