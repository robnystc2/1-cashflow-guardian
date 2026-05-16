'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, FileText, Users, Settings, Bell, FolderKanban, Gift, BarChart3, HelpCircle, Clock } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Panel', href: '/overview' },
  { icon: FolderKanban, label: 'Proyectos', href: '/projects' },
  { icon: FileText, label: 'Facturas', href: '/invoices' },
  { icon: Users, label: 'Clientes', href: '/clients' },
  { icon: Bell, label: 'Recordatorios', href: '/reminders' },
  { icon: Gift, label: 'Referidos', href: '/referrals' },
  { icon: BarChart3, label: 'Informes', href: '/reports' },
  { icon: HelpCircle, label: 'Soporte', href: '/support' },
  { icon: Settings, label: 'Ajustes', href: '/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('trial_ends_at, plan').eq('id', user.id).single()
        if (profile && profile.trial_ends_at && profile.plan === 'trial') {
          const diff = Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          setTrialDaysLeft(diff > 0 ? diff : 0)
        }
      }
    }
    fetchProfile()
  }, [])

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          CashFlow Guardian
        </h2>
        <p className="text-xs text-zinc-600 mt-1">Plan Pro · Activo</p>
        {trialDaysLeft !== null && trialDaysLeft > 0 && (
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
            <Clock className="w-3 h-3" /> {trialDaysLeft} día{trialDaysLeft > 1 ? 's' : ''} de prueba
          </div>
        )}
      </div>
      <nav className="space-y-1 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : ''}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-300 truncate">testdirecto</p>
            <p className="text-xs text-zinc-500">Plan Pro</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
