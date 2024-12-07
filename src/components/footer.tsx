"use client"

import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const categories = [
  "Smartphones", "Laptops", "Tablets", "Smartwatches", "Headphones", "Cameras", "Gaming", "TVs"
]

const pages = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-background via-primary/5 to-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link href={`/category/${category.toLowerCase()}`} className="hover:underline">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link href={page.href} className="hover:underline">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground text-fg-on-primary focus:ring-primary focus:border-primary"    
              />
              <Button type="submit" variant="outline" className='bg-primary text-white hover:bg-cyan-800 hover:text-white'>
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p>&copy; 2023 DeviceHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

