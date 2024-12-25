"use client" 

import { UserProfile } from "@/components/UserProfile"
import { AccountStats } from "@/components/AccountStats"
import { RecentOrders } from "@/components/RecentOrders"
import { AccountSettings } from "@/components/AccountSettings"
import { UserPreferences } from "@/components/UserPreferneces"
import { use, useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface User {
  firstName: string
  lastName: string
  email: string
  image: string
  createdAt: Date
}

export default function ProfilePage() {  
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(!session?.user?.email) {
      router.push('/signin')
      return;
    }
  }, [session])

  useEffect(() => {
    const fetchUser = async () => {
      if(!session?.user?.email) return;
      const response = await axios.get('/api/user')
      setUser(response.data.user)
      setLoading(false)
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <UserProfile loading={loading} firstName={user?.firstName || ""} lastName={user?.lastName || ""} email={user?.email || ""} image={user?.image} />
            <AccountStats createdAt={user?.createdAt} />
            <RecentOrders />
          </div>
          <div className="space-y-8">
            {/* <AccountSettings /> */}
            <UserPreferences />
          </div>
        </div>
      </main>
    </div>
  )
}

