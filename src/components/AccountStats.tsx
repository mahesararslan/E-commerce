import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ShoppingBag, DollarSign } from 'lucide-react'

export function AccountStats() {
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
            <p className="text-2xl font-bold">Jan 2023</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Total Spent</p>
            <p className="text-2xl font-bold">$1,234.56</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

