import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductFiltersProps {
  onSortChange: (value: string) => void
  onSaleFilterChange: (checked: boolean) => void
}

export function ProductFilters({ onSortChange, onSaleFilterChange }: ProductFiltersProps) {
  const [saleOnly, setSaleOnly] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="sale-only" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          On Sale Only
        </Label>
        <Switch
          id="sale-only"
          checked={saleOnly}
          onCheckedChange={(checked) => {
            setSaleOnly(checked)
            onSaleFilterChange(checked)
          }}
        />
      </div>
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
