"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MoonIcon, SunIcon, Search, Heart, User, ShoppingCart } from 'lucide-react'
import { useTheme } from "next-themes"

const categories = [
  "Smartphones", "Laptops", "Tablets", "Smartwatches", "Headphones", 
  "Cameras", "TVs", "Gaming Consoles", "Smart Home", "Audio Systems",
  "Wearables", "Printers", "Monitors", "Networking", "Storage"
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { setTheme, theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <Accordion type="single" collapsible>
              <AccordionItem value="products">
                <AccordionTrigger>Products</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                          className="block py-2 px-4 hover:bg-primary/10 rounded transition-colors"
                          onClick={onClose}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link href="/wishlist" className="flex items-center space-x-2 py-2 px-4 hover:bg-primary/10 rounded transition-colors" onClick={onClose}>
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link href="/profile" className="flex items-center space-x-2 py-2 px-4 hover:bg-primary/10 rounded transition-colors" onClick={onClose}>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link href="/cart" className="flex items-center space-x-2 py-2 px-4 hover:bg-primary/10 rounded transition-colors" onClick={onClose}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
                onClose()
              }}
              className="w-full justify-start"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">Toggle theme</span>
            </Button>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={onClose}>Log in</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup" onClick={onClose}>Sign up</Link>
              </Button>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

