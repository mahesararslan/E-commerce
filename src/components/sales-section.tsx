import { Button } from "@/components/ui/button"

export function SalesSection() {
  return (
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">Exclusive Offers</h2>
          <p className="text-xl">Limited-time deals you can't resist!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Summer Tech Blast", description: "Up to 30% off on selected gadgets" },
            { title: "Bundle & Save", description: "Get 15% off when you buy any 2 items" },
            { title: "Last Season's Gems", description: "Special Deal! 50% off on previous models" },
          ].map((deal, index) => (
            <div key={deal.title} className="bg-card text-card-foreground rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 animate-fade-up" style={{animationDelay: `${index * 100}ms`}}>
              <h3 className="text-2xl font-bold mb-4">{deal.title}</h3>
              <p className="mb-4">{deal.description}</p>
              <Button variant="outline" className="w-full bg-primary text-white transition-colors duration-300">Shop Now</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

