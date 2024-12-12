import React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoonIcon, SunIcon, ShoppingCart, Heart, User, Search, ChevronDown } from 'lucide-react'
import { useTheme } from "next-themes"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFetchCategories } from '@/hooks/useFetchCategories'


interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { setTheme, theme } = useTheme()
  const { data: session } = useSession()
  const { categories, loading } = useFetchCategories();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] pb-10 overflow-y-auto">
          <div className="flex flex-col p-4 space-y-4">
            <form className="relative w-full">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pr-10"
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

            {session ? (
                <div>
                  <div className="flex items-center space-x-4 p-2 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>

                </div>
                <Button variant="ghost" size="lg" onClick={() => signOut()}>
                  Sign out
                </Button>
                </div>
            ) : (
              <Button onClick={() => signIn()} className="w-full">
                Sign In
              </Button>
            )}

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="products">
                <AccordionTrigger>Products</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/category/${category._id}`}
                        className="text-sm hover:underline"
                        onClick={onClose}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/wishlist" className="flex items-center space-x-2 hover:text-primary transition-colors" onClick={onClose}>
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>

            <Link href="/cart" className="flex items-center space-x-2 hover:text-primary transition-colors" onClick={onClose}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
              <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

