"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, CreditCard, MapPin, Phone, User, Calendar } from 'lucide-react'
import { useFetchProducts } from "@/hooks/useFetchProducts"
import { useEffect, useState } from "react"

interface Product {
  productId: string
  quantity: number
}

interface OrderDetails {
  _id: string
  userId: string
  products: Product[]
  totalAmount: number
  paymentMethod: string
  orderStatus: string
  shippingAddress: string
  country: string
  city: string
  postalCode: string
  phoneNumber: string
  recieverName: string
  createdAt: string
}

interface OrderDetailsCardProps {
  order: OrderDetails
}

export function OrderDetailsCard({ order }: OrderDetailsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  const {products} = useFetchProducts();
  const [orderProducts, setOrderProducts] = useState<any []>([]);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const items = order.products.map(({ productId, quantity }) => {
        const product = products.find((p) => p._id === productId);
        return product
            ? { ...product, id: productId, quantity, image: product.images[0], salePrice: product.isOnSale ? product.salePrice : null }
            : null;
    });

    setOrderProducts(items.filter(Boolean) as any []);

    }, [products, order.products]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500'
      case 'processing': return 'bg-blue-500'
      case 'shipped': return 'bg-purple-500'
      case 'delivered': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }



  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Order ID:</span>
          <span className="font-medium">{order._id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Order Status:</span>
          <Badge className={`${getStatusColor(order.orderStatus)} text-white`}>
            {order.orderStatus.toUpperCase()}
          </Badge>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          {orderProducts.map((product, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span>{product.name}</span>
              <span>
                {product.quantity} x ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between items-center font-semibold">
          <span>Total Amount:</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary" />
            <span>{order.paymentMethod}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>{`${order.city}, ${order.country}`}</span>
          </div>
          <div className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-primary" />
            <span>{order.shippingAddress}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-primary" />
            <span>{order.phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            <span>{order.recieverName}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

