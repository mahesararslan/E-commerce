"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, ShoppingCart, Heart, User, Search, ChevronDown, Menu } from 'lucide-react'
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from './sidebar'
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'


const categories = [
  "Smartphones", "Laptops", "Tablets", "Smartwatches", "Headphones", 
  "Cameras", "TVs", "Gaming Consoles", "Smart Home", "Audio Systems",
  "Wearables", "Printers", "Monitors", "Networking", "Storage"
]

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:grid lg:grid-cols-3">
          {/* Left section */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">DeviceHaven</span>
            </Link>
          </div>

          {/* Middle section */}
          <div className="hidden lg:flex justify-center">
            <form className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pr-10 border-2 border-primary/20 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center justify-end space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-1 hover:bg-transparent focus:bg-transparent active:bg-transparent"
                  >
                    <span>Products</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-screen max-w-3xl p-4 animate-in slide-in-from-top-5 duration-300"
                >
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} asChild>
                        <Link 
                          href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                          className="hover:bg-primary/10 rounded p-2 transition-colors"
                        >
                          {category}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/wishlist" className="hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {router.push("/profile")}} >Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
              )}
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
            <Link href="/cart" className="hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">View cart</span>
            </Link>
            
          </div>
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

