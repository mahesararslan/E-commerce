import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const orders = [
  { id: '1234', date: '2023-05-01', status: 'Delivered', total: 129.99 },
  { id: '1235', date: '2023-05-15', status: 'Shipped', total: 79.99 },
  { id: '1236', date: '2023-05-28', status: 'Processing', total: 199.99 },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                  {order.status}
                </Badge>
                <p className="mt-1">${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <Button asChild className="w-full mt-4">
          <Link href="/orders">View All Orders</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

