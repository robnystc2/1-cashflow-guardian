'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, FileText, FolderKanban, Info, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

type FilterType = 'all' | 'gold' | 'silver' | 'bronze'

export default function ClientsManager({ userId }: { userId: string }) {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const supabase = createClient()

  const fetchClients = async () => { 
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
    if (!data) return

    const clientsWithScore = await Promise.all(data.map(async (client: any) => {
      const { data: invoices } = await supabase
        .from('invoices')
        .select('status, subtotal, paid_date, due_date')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      const paidInvs = invoices?.filter(inv => inv.status === 'paid') || []
      const pendingInvs = invoices?.filter(inv => inv.status !== 'paid') || []
      const totalBilled = invoices?.reduce((sum, inv) => sum + Number(inv.subtotal), 0) || 0
      const totalPaid = paidInvs.reduce((sum, inv) => sum + Number(inv.subtotal), 0) || 0
      const paymentRate = invoices && invoices.length > 0 ? (paidInvs.length / invoices.length) * 100 : 0
      const lastPayment = paidInvs.length > 0 ? paidInvs[0].paid_date : null
      
      const avgPaymentDays = paidInvs.length > 0 
        ? paidInvs.reduce((sum, inv) => {
            const paid = new Date(inv.paid_date!)
            const due = new Date(inv.due_date)
            return sum + (paid.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
          }, 0) / paidInvs.length
        : 0

      let score = 'gold'
      if (avgPaymentDays > 15) score = 'bronze'
      else if (avgPaymentDays > 7) score = 'silver'
      else if (avgPaymentDays < -5) score = 'gold_plus'

      return { 
        ...client, 
        score, 
        avgPaymentDays: Math.round(avgPaymentDays), 
        totalInvoices: invoices?.length || 0,
        pendingInvoices: pendingInvs.length,
        totalBilled,
        paymentRate,
        lastPayment
      }
    }))

    setClients(clientsWithScore)
  }

  useEffect(() => { fetchClients() }, [])

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'gold_plus': return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-900/50 text-yellow-400 border border-yellow-700">ORO+</span>
      case 'gold': return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-900/50 text-emerald-400 border border-emerald-700">ORO</span>
      case 'silver': return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-700 text-zinc-300 border border-zinc-600">PLATA</span>
      case 'bronze': return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-900/50 text-red-400 border border-red-700">BRONCE</span>
      default: return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-700 text-zinc-300">-</span>
    }
  }

  const getTooltipText = (days: number) => {
    if (days === 0) return 'Paga puntual'
    if (days > 0) return `+${days} días de retraso`
    return `Paga ${Math.abs(days)} días antes`
  }

  const counts = {
    all: clients.length,
    gold: clients.filter(c => c.score === 'gold' || c.score === 'gold_plus').length,
    silver: clients.filter(c => c.score === 'silver').length,
    bronze: clients.filter(c => c.score === 'bronze').length,
  }

  const filteredClients = filter === 'all' ? clients : clients.filter(c => {
    if (filter === 'gold') return c.score === 'gold' || c.score === 'gold_plus'
    if (filter === 'silver') return c.score === 'silver'
    if (filter === 'bronze') return c.score === 'bronze'
    return true
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('clients').insert({ name, email, company, country, user_id: userId })
    if (error) alert(error.message); else { setName(''); setEmail(''); setCompany(''); setCountry(''); fetchClients() }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-semibold">Añadir cliente</h2>
        <p className="text-xs text-zinc-500">Agrega un cliente y el sistema evaluará su comportamiento de pago.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="name">Nombre</Label><Input id="name" value={name} onChange={e=>setName(e.target.value)} className="bg-zinc-950 border-zinc-700" required /></div>
          <div><Label htmlFor="email">Correo</Label><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="bg-zinc-950 border-zinc-700" required /></div>
          <div><Label htmlFor="company">Empresa</Label><Input id="company" value={company} onChange={e=>setCompany(e.target.value)} className="bg-zinc-950 border-zinc-700" /></div>
          <div><Label htmlFor="country">País</Label><Input id="country" value={country} onChange={e=>setCountry(e.target.value)} className="bg-zinc-950 border-zinc-700" /></div>
        </div>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500" disabled={loading}><Plus className="w-4 h-4 mr-2"/>Agregar cliente</Button>
      </form>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tus clientes</h2>
          <div className="flex gap-2">
            {(['all', 'gold', 'silver', 'bronze'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  filter === f ? 'bg-white text-black font-medium' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'gold' ? 'Oro' : f === 'silver' ? 'Plata' : 'Bronce'}
                <span className="ml-1 opacity-70">({counts[f]})</span>
              </button>
            ))}
          </div>
        </div>
        {filteredClients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-400 text-sm">
              {filter === 'gold' ? 'Ningún cliente alcanza el nivel Oro aún. Sigue facturando.' :
               filter === 'silver' ? 'No hay clientes Plata en este momento.' :
               filter === 'bronze' ? 'No hay clientes Bronce. ¡Buen trabajo!' :
               'No tienes clientes aún. Añade tu primer cliente y el sistema calificará su comportamiento de pago.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-2 text-zinc-400 text-sm">Nombre</th>
                <th className="py-2 text-zinc-400 text-sm">Facturación</th>
                <th className="py-2 text-zinc-400 text-sm">PayScore</th>
                <th className="py-2 text-zinc-400 text-sm">Último pago</th>
                <th className="py-2 text-zinc-400 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(c => (
                <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-2">
                    <Link href={`/clients/${c.id}`} className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                      {c.name}
                      {c.pendingInvoices > 0 && (
                        <span className="relative group">
                          <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-900/50 text-red-400 font-bold cursor-help">{c.pendingInvoices}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {c.pendingInvoices} factura{c.pendingInvoices !== 1 ? 's' : ''} pendiente{c.pendingInvoices !== 1 ? 's' : ''}
                          </div>
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-300">€{c.totalBilled.toFixed(0)}</span>
                      <div className="w-16 bg-zinc-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            c.paymentRate >= 80 ? 'bg-emerald-500' : 
                            c.paymentRate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${c.paymentRate}%` }} 
                        />
                      </div>
                      <span className="text-xs text-zinc-500">{c.paymentRate.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="relative group inline-flex items-center gap-1">
                      {getScoreBadge(c.score)}
                      <Info className="w-3 h-3 text-zinc-500 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {getTooltipText(c.avgPaymentDays)}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-sm text-zinc-400">
                    {c.lastPayment ? (
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {new Date(c.lastPayment).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <Link href={`/invoices?create=true&client=${c.id}`} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 transition-colors">
                        <FileText className="w-3 h-3" /> Facturar
                      </Link>
                      <Link href={`/projects?client=${c.id}`} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 transition-colors">
                        <FolderKanban className="w-3 h-3" /> Proyectos
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
