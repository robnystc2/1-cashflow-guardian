import { createClient } from '@/lib/supabase/server'
import FinancialHealth from '@/components/dashboard/financial-health'
import CfoPanel from '@/components/dashboard/cfo-panel'
import { FolderKanban, FileText, UserPlus, Bell, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default async function OverviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let displayName = 'Emperador'
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
    if (profile?.full_name) displayName = profile.full_name
    else if (user.email) displayName = user.email.split('@')[0]
  }

  const hour = new Date().getUTCHours()
  let greeting = 'Buenos días'
  if (hour >= 12 && hour < 19) greeting = 'Buenas tardes'
  else if (hour >= 19 || hour < 5) greeting = 'Buenas noches'

  // Obtener datos para accesos rápidos dinámicos
  const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user?.id)
  const { count: invoiceCount } = await supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('user_id', user?.id).not('status', 'eq', 'paid')
  const { count: clientCount } = await supabase.from('clients').select('*', { count: 'exact', head: true }).eq('user_id', user?.id)

  const quickActions = [
    { 
      label: projectCount === 0 ? 'Crear tu primer proyecto' : 'Nuevo proyecto', 
      href: projectCount === 0 ? '/projects/new' : '/projects/new', 
      icon: FolderKanban, 
      color: 'text-emerald-400',
      primary: projectCount === 0
    },
    { 
      label: invoiceCount && invoiceCount > 0 ? `${invoiceCount} facturas pendientes` : 'Crear factura', 
      href: '/invoices', 
      icon: invoiceCount && invoiceCount > 0 ? AlertTriangle : FileText, 
      color: invoiceCount && invoiceCount > 0 ? 'text-amber-400' : 'text-cyan-400',
      primary: invoiceCount && invoiceCount > 0
    },
    { 
      label: clientCount === 0 ? 'Añadir tu primer cliente' : 'Añadir cliente', 
      href: '/clients', 
      icon: UserPlus, 
      color: 'text-blue-400',
      primary: clientCount === 0
    },
    { label: 'Ver recordatorios', href: '/reminders', icon: Bell, color: 'text-amber-400' },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {greeting}, {displayName}
        </h1>
        <p className="text-zinc-400 mt-1">Tu imperio financiero bajo control.</p>
      </div>
      
      <div className="mb-8">
        <CfoPanel />
      </div>

      <FinancialHealth />
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative rounded-xl p-5 transition-all group text-center ${
              item.primary 
                ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
            }`}
          >
            <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2 transition-transform group-hover:scale-110`} />
            <p className={`text-sm ${item.primary ? 'text-white font-medium' : 'text-zinc-300'} group-hover:text-white`}>
              {item.label}
            </p>
            {item.primary && (
              <span className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
