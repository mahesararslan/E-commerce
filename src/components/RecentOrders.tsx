"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useEffect, useState } from "react";
import axios from "axios"

interface Order {
  _id: string
  createdAt: string
  orderStatus: string
  totalAmount: number
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders')
      setOrders(response.data.orders)
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) {
    return <RecentOrdersSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length > 0 ? orders.map((order) => (
            <div key={order._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order #{order._id}</p>
                <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
              </div>
              <div className="text-right">
                <Badge variant={order.orderStatus === 'shipped' ? 'default' : 'secondary'}>
                  {order.orderStatus}
                </Badge>
                <p className="mt-1">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          )) : (
            <div className="text-center">
              <p>No orders found</p>
              <Link href="/products">
                <Button variant="default">Shop Now</Button>
              </Link>                
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


// make skeleton for RecentOrders
function RecentOrdersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((order) => (
            <div key={order} className="flex items-center justify-between">
              <div>
                <div className="w-40 h-4 bg-gray-200 rounded"></div>
                <div className="w-32 h-3 bg-gray-200 rounded mt-2"></div>
              </div>
              <div className="text-right">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

