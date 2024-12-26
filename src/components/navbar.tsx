"use client"

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, ShoppingCart, Heart, User, Search, Menu } from 'lucide-react' 
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
import Image from 'next/image'
import { useFetchWishlist } from '@/hooks/useFetchWishlist'
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { useFetchCategories } from '@/hooks/useFetchCategories'
import { RecentSearches } from './RecentSearches'
import { useFetchRecentSearches } from '@/hooks/useFetchRecentSearches'
import { updateRecentSearchesAsync } from '@/store/slices/recentSearchesSlice'
import { useDispatch } from 'react-redux'
import { Cart } from './Cart'
import { useFetchCart } from '@/hooks/useFetchCart'
import { Suggestions } from './Suggestions'
import { Menuu, MenuItem, ProductItem } from './ProductsNavbar'


export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const {categories} = useFetchCategories();
  const { products } = useFetchProducts();
  const { wishlist } = useFetchWishlist();
  const { cart } = useFetchCart();
  const { recentSearches } = useFetchRecentSearches()
  const [searchQuery, setSearchQuery] = useState('')
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) { 
      // @ts-ignore
      dispatch(updateRecentSearchesAsync(searchQuery.trim()))
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)

    }
  }

  const handleRecentSearchSelect = (search: string) => {
    setSearchQuery(search)
    setShowRecentSearches(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

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
              <Image className='inline-block' src="/logo.png" alt="DeviceHaven" width={250} height={250} />
            </Link>
          </div>

          {/* Middle section */}
          <div className="hidden lg:flex justify-center relative">
            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pr-10 border-2 border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowRecentSearches(true)}
                onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
                ref={searchInputRef}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              {searchQuery.length > 0 && (
                <Suggestions
                  searchQuery={searchQuery}
                  onSelect={(productId) => {
                    setSearchQuery('')
                    router.push(`/product/${productId}`)
                  }}
                />
              )}
              {searchQuery === "" && showRecentSearches && (
                <RecentSearches onSelect={handleRecentSearchSelect} />
              )}
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center justify-end space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <Menuu setActive={setActive}  >
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="text-sm grid grid-cols-2 xl:grid-cols-3 gap-10 p-4">
                  {categories.map((category, index) => (
                    <ProductItem
                      key={category._id} // It's good practice to add a key when mapping item
                      title={category.name}
                      href={category._id}
                      src={category.image} 
                      description={category.description}
                      onClick={() => setActive(null)}
                    />
                  ))}
                </div>
              </MenuItem>
              </Menuu>
              {/* <DropdownMenu>
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
                  <div className="grid grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category._id} asChild>
                        <Link 
                          href={`/category/${category._id}`}
                          className="hover:bg-primary/10 rounded p-2 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <Link href="/wishlist" className="relative inline-block hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length > 5 ? '5+' : wishlist.length}
                  </span>
                )}
              </Link>
              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback className='bg-primary text-white'> 
                      {// @ts-ignore
                      }{session?.user?.firstName ? session.user.firstName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end"> 
                    {/* @ts-ignore */}
                    <DropdownMenuLabel>{session?.user?.name || (`${session?.user?.firstName} ${session?.user?.lastName}`) || ""}</DropdownMenuLabel>
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
                variant="none"
                size="icon"
                aria-label="Toggle Theme"
                className="h-5 w-5 hover:text-primary transition-colors relative "
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
            <Button variant="none" size="icon" onClick={() => setIsCartOpen(true) }  className="relative hover:text-primary transition-colors" >
              <ShoppingCart className="h-7 w-7 hover:scale-125 scale-110 hover:text-primary" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length > 5 ? '5+' : cart.length}
                  </span>
                )}
            </Button>
            
          </div>
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

