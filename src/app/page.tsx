import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { RecentProducts } from "@/components/recent-products"
import { SalesSection } from "@/components/sales-section"
import { ProductCarousel } from "@/components/product-carousel"
import { BrandCarousel } from "@/components/brand-carousel"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <RecentProducts />
        <BrandCarousel />
        <SalesSection />
      </main>
      <footer className="bg-muted py-6 text-center">
        <p>&copy; 2023 DeviceHaven. All rights reserved.</p>
      </footer>
    </div>
  )
}

