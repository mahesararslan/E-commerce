import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { RecentProducts } from "@/components/recent-products"
import { SalesSection } from "@/components/sales-section"
import { BrandCarousel } from "@/components/brand-carousel"
import { Footer } from "@/components/footer"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutUsShort } from "@/components/about-us-short"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <RecentProducts />
        <BrandCarousel />
        <FeaturedProducts />
        <SalesSection />
        <AboutUsShort />
      </main>
      <Footer />
    </div>
  )
}

