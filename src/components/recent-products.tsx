import { ProductCarousel } from './product-carousel'

const products = [
  { id: 1, name: "Smartphones", image: "/smartphone.webp", description: "Sleek designs and cutting-edge features." },
  { id: 2, name: "Laptops", image: "/laptop.png", description: "Power-packed devices for work and play." },
  { id: 3, name: "Headphones", image: "/headphones.png", description: "Dive deep into sound with premium clarity."  },
  { id: 4, name: "Earbuds", image: "/earbuds.webp", description: "Immerse yourself in crystal-clear sound." },
  { id: 5, name: "Smart TV's", image: "/smart_TV.avif", description: "Redefine entertainment with vivid displays." },
  { id: 6, name: "Smartwatches", image: "/smartwatch.webp", description: "Stay connected and track your health easily."},
]

export function RecentProducts() {
  return (
    <section className="py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center animate-fade-up">Featured Products</h2>
        <ProductCarousel products={products} />
      </div>
    </section>
  )
}


// import { useEffect, useState } from 'react'
// import { ProductCarousel } from './product-carousel'

// interface Category {
//   id: number
//   name: string
//   image: string
//   description: string
// }

// export function RecentProducts() {
//   const [categories, setcategories] = useState<Category[]>([])

//   useEffect(()=> {
//     async function fetchcategories() {
//       const response = await fetch("/api/categories")
//       const data = await response.json()
//       console.log(data)
//       setcategories(data)
//     }

//     fetchcategories()
//   })

//   return (
//     <section className="py-20 bg-gradient-to-b">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-10 text-center animate-fade-up">Featured categories</h2>
//         <ProductCarousel products={categories} />
//       </div>
//     </section>
//   )
// }



