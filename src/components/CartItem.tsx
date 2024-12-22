import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { clearCartAsync, removeFromCartAsync, updateQuantityAsync } from '@/store/slices/cartSlice'

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
      <Image src={image} alt={name} width={80} height={80} className="rounded-md" />
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

