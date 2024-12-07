"use client"

export function ProductCard({ product, rating }: { product: any; rating: number }) {
  console.log(product);
    

    return (
      <div className="flex justify-center items-center">
        <div className="max-w-min rounded-xl p-6 h-auto flex flex-col justify-center">
        <div className="p-6 relative rounded-[32px] border-4 border-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-background">
          <div className="relative">
            {/* Background Image */}
            <div className="h-64 w-64">
              <img
                src={product.images[0]}
                alt="Product Image"
                className="w-64 object-cover rounded-2xl"
              />
              <div className="absolute flex flex-col top-0 right-0 p-3">
                <button className="transition ease-in duration-300 bg-gray-800 hover:text-cyan  -500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-auto justify-evenly">
              <div className="flex flex-wrap">
                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-400 whitespace-nowrap mr-3">{rating}</span>
                  
                </div>
                <div className="flex items-center w-full justify-between min-w-0 ">
                  <h2 className="text-lg mr-auto cursor-pointer text-foreground hover:text-cyan-700 truncate">
                    {product.name}
                  </h2>
                  <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                    INSTOCK
                  </div>
                </div>
              </div>
              <div className="text-xl text-cyan-600 font-semibold mt-1">$ {product.price}</div>
              <div className="flex space-x-2 text-sm font-medium justify-start mt-2">
                <button className="transition ease-in duration-300 text-sm font-medium mb-2 md:mb-0 bg-cyan-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-cyan-600 w-full flex justify-center ">
                  <span>Add Cart</span>
                </button>
                
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
  

// import { Heart } from 'lucide-react'

// export default function ProductCard() {
//   return (
//     <div className="p-[1px] relative rounded-[32px] bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
//       <div className="relative rounded-[32px] bg-[#1a1a1a] p-6 h-full">
//         <div className="space-y-4">
//           <div className="relative">
//             <button className="absolute right-2 top-2 z-10">
//               <Heart className="w-6 h-6 text-gray-400" />
//             </button>
//             <img
//               src="/placeholder.svg?height=300&width=300"
//               alt="Product"
//               className="w-full rounded-2xl"
//               width={300}
//               height={300}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-red-500">★</span>
//             <span className="text-gray-200">4.9</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold text-gray-200">Product Name</h3>
//             <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">INSTOCK</span>
//           </div>
//           <div className="text-2xl font-bold text-[#00f2fe]">$240.00</div>
//           <button className="w-full py-3 px-4 bg-[#00f2fe] hover:bg-[#00f2fe]/90 text-gray-900 font-medium rounded-xl transition-colors">
//             Add Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

