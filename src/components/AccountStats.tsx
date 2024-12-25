"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { CalendarDays, ShoppingBag, DollarSign } from 'lucide-react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export function AccountStats({createdAt}: {createdAt?: Date}) {
  const [date, setDate] = useState<Date>(createdAt || new Date());
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const { data: session } = useSession()
    const router = useRouter()
  
    useEffect(() => {
      if(!session?.user?.email) {
        router.push('/signin')
        return;
      }
    }, [session])

  useEffect(() => {
    const fetchOrders = async () => {
      if(!session?.user?.email) return;
      const response = await axios.get('/api/orders')
      setOrders(response.data.orders)
    }
    fetchOrders()
  }, [])

  useEffect(() => { 
    let total = 0;
    orders.forEach((order) => { // @ts-ignore
      total += order.totalAmount;
    });
    setTotalSpent(total);
  }, [orders])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Member Since</p>
            <p className="text-2xl font-bold">{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Total Spent</p>
            <p className="text-2xl font-bold">{totalSpent}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

