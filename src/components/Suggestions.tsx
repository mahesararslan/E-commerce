"use client";

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { updateRecentSearchesAsync } from '@/store/slices/recentSearchesSlice';

interface SuggestionsProps {
  searchQuery: string
  onSelect: (productId: string) => void
}

export function Suggestions({ searchQuery, onSelect }: SuggestionsProps) {
  const router = useRouter()
  const products = useSelector((state: RootState) => state.product.products)
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string }>>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
        .map(product => ({ id: product._id, name: product.name }))
      setSuggestions(filteredProducts)
    } else {
      setSuggestions([])
    }
  }, [searchQuery, products])

  const handleSelect = (productId: string) => {
    onSelect(productId)
    router.push(`/product/${productId}`)
    const product = products.find(product => product._id === productId) // @ts-ignore
    dispatch(updateRecentSearchesAsync(product.name))
  }

  if (suggestions.length === 0) return null

  return (
    <ul className="absolute z-10 w-full bg-background border border-input rounded-md shadow-lg mt-1">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className="px-4 py-2 hover:bg-accent cursor-pointer"
          onClick={() => handleSelect(suggestion.id)}
        >
          {suggestion.name}
        </li>
      ))}
    </ul>
  )
}

