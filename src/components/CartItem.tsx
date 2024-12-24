import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { clearCartAsync, removeFromCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'
import { useState } from 'react'
import { set } from 'mongoose'

interface CartItemProps {
  id: string
  name: string
  price: number
  salePrice?: number
  image: string
  quantity: number
  updateQuantity: (itemId: string, newQuantity: number) => void
  removeItem: (itemId: string) => void
}

export function CartItem({ id, name, price, salePrice, image, quantity, updateQuantity, removeItem }: CartItemProps) {

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <Image src={image} alt={name} width={180} height={180} className="rounded-md" />
      <div className="flex-grow">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">${salePrice ? salePrice.toFixed(2) : price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button variant="outline" size="icon" onClick={() => updateQuantity(id, quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="destructive" size="icon" onClick={() => removeItem(id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}


export function CartItemCustom({ id, name, price, salePrice, image, quantity, updateQuantity, removeItem }: CartItemProps) {

  const [currQuantity, setCurrQuantity] = useState(quantity)

  return (
    <div className="dark:shadow-none grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-600 dark:border-gray-200 py-6">
                <div
                    className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box"><img src={image} alt="Product Image" className="xl:w-[140px] rounded-xl object-cover" /></div>
                    <div className="pro-data w-full max-w-sm ">
                        <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center dark:text-white ">
                          {name}
                        </h5> 
                      
                        <h6 className="font-medium text-lg leading-8 text-cyan-600 dark:text-cyan-500  max-[550px]:text-center">${salePrice ? salePrice.toFixed(2) : price.toFixed(2)}</h6>
                    </div>
                </div>
                <div
                    className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    
                    <div className="flex items-center w-full mx-auto justify-center">
                        <button
                            onClick={() => {
                              setCurrQuantity(Math.max(1, quantity - 1))
                              updateQuantity(id, Math.max(1, quantity - 1))
                            }}
                            className="group rounded-l-full px-6 py-[18px] border border-gray-600 dark:border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black dark:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                            </svg>
                        </button>
                        <span
                            className="border-y border-gray-600 dark:border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent dark:text-white dark:placeholder-white">
                            {quantity}
                            </span>
                        <button
                            onClick={() => {
                              setCurrQuantity(quantity + 1)
                              updateQuantity(id, quantity + 1)
                            }}
                            className="group rounded-r-full px-6 py-[18px] border border-gray-600 dark:border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 ">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black dark:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <h6
                        className="text-cyan-600 dark:text-cyan-500 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                        ${((salePrice ? salePrice : price) * quantity).toFixed(2)}
                    </h6>
                    <Button variant="none" className='scale-110 hover:scale-125 hover:bg-gray-200' size="icon" onClick={() => removeItem(id)}>
                      <Trash2 className="h-8 w-8 text-black dark:text-white " />
                    </Button>
                </div>
            </div>
  )
}