"use client"

import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, ShoppingCart, Heart, User } from 'lucide-react'
import { useTheme } from "next-themes"

export function Navbar() {
  const { setTheme, theme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">DeviceHaven</span>
        </Link>
        <div className="hidden md:flex md:w-1/3">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/products" className="hidden sm:inline-block">Products</Link>
          <Link href="/wishlist" className="hidden sm:inline-block"><Heart className="h-5 w-5" /></Link>
          <Link href="/cart"><ShoppingCart className="h-5 w-5" /></Link>
          <Link href="/profile"><User className="h-5 w-5" /></Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

