
import { UserProfile } from "@/components/UserProfile"
import { AccountStats } from "@/components/AccountStats"
import { RecentOrders } from "@/components/RecentOrders"
import { AccountSettings } from "@/components/AccountSettings"
import { UserPreferences } from "@/components/UserPreferneces"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <UserProfile />
            <AccountStats />
            <RecentOrders />
          </div>
          <div className="space-y-8">
            <AccountSettings />
            <UserPreferences />
          </div>
        </div>
      </main>
    </div>
  )
}

