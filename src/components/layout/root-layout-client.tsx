'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import NotificationsBell from '@/components/notifications/notifications-bell'
import { createClient } from '@/lib/supabase/client'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const dashboardRoutes = ['/overview', '/projects', '/invoices', '/clients', '/reminders', '/settings', '/onboarding', '/referrals', '/reports', '/support']
  const isDashboard = dashboardRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user && isDashboard) router.push('/login')
    })
  }, [pathname])

  if (isDashboard) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-12 border-b border-zinc-800 flex items-center justify-end px-4 bg-zinc-950">
            <NotificationsBell />
          </header>
          <main className="flex-1 overflow-auto bg-zinc-950">{children}</main>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
