'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, FolderKanban, Shield, Mail, Building, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ClientDetail({ clientId }: { clientId: string }) {
  const [client, setClient] = useState<any>(null)
  const [invoices, setInvoices] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [score, setScore] = useState<string>('gold')
  const [avgDays, setAvgDays] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Cliente
      const { data: c } = await supabase.from('clients').select('*').eq('id', clientId).single()
      setClient(c)

      // Facturas
      const { data: invs } = await supabase.from('invoices').select('*').eq('client_id', clientId).order('created_at', { ascending: false })
      setInvoices(invs || [])

      // Proyectos
      const { data: projs } = await supabase.from('projects').select('*').eq('client_id', clientId).order('created_at', { ascending: false })
      setProjects(projs || [])

      // Calcular PayScore
      const paidInvs = invs?.filter(inv => inv.status === 'paid') || []
      const avg = paidInvs.length > 0
        ? paidInvs.reduce((sum, inv) => {
            const paid = new Date(inv.paid_date!)
            const due = new Date(inv.due_date)
            return sum + (paid.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
          }, 0) / paidInvs.length
        : 0
      setAvgDays(Math.round(avg))
      if (avg > 15) setScore('bronze')
      else if (avg > 7) setScore('silver')
      else if (avg < -5) setScore('gold_plus')
      else setScore('gold')
    }
    fetchData()
  }, [clientId])

  if (!client) return null

  const getScoreBadge = (s: string) => {
    switch (s) {
      case 'gold_plus': return <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-900/50 text-yellow-400 border border-yellow-700">ORO+</span>
      case 'gold': return <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-900/50 text-emerald-400 border border-emerald-700">ORO</span>
      case 'silver': return <span className="px-3 py-1 rounded-full text-sm font-bold bg-zinc-700 text-zinc-300 border border-zinc-600">PLATA</span>
      case 'bronze': return <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-900/50 text-red-400 border border-red-700">BRONCE</span>
    }
  }

  const getScoreDescription = (s: string) => {
    switch (s) {
      case 'gold_plus': return 'Paga antes del vencimiento. Cliente excepcional.'
      case 'gold': return 'Paga puntual. Cliente confiable.'
      case 'silver': return 'Se retrasa ocasionalmente. Mantén seguimiento.'
      case 'bronze': return 'Se retrasa frecuentemente. Precaución.'
    }
  }

  return (
    <div className="space-y-6">
      {/* Tarjeta de perfil */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{client.name}</h2>
              {getScoreBadge(score)}
            </div>
            <p className="text-sm text-zinc-400">{getScoreDescription(score)} · Promedio de pago: {avgDays > 0 ? '+' : ''}{avgDays} días</p>
            <div className="flex gap-4 text-sm text-zinc-500 mt-2">
              {client.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {client.email}</span>}
              {client.company && <span className="flex items-center gap-1"><Building className="w-4 h-4" /> {client.company}</span>}
              {client.country && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {client.country}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/invoices?create=true&client=${client.id}`}>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500"><FileText className="w-4 h-4 mr-1" /> Nueva factura</Button>
            </Link>
            <Link href={`/projects/new?client=${client.id}`}>
              <Button size="sm" variant="outline" className="border-zinc-700"><FolderKanban className="w-4 h-4 mr-1" /> Nuevo proyecto</Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Facturas */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Facturas ({invoices.length})</h3>
        {invoices.length === 0 ? (
          <p className="text-zinc-500 text-sm">No hay facturas para este cliente.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-zinc-800"><th className="py-2 text-zinc-400">Número</th><th className="py-2 text-zinc-400">Importe</th><th className="py-2 text-zinc-400">Estado</th><th className="py-2 text-zinc-400">Vencimiento</th></tr></thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b border-zinc-800/50">
                  <td className="py-2 font-mono">{inv.invoice_number}</td>
                  <td className="py-2">€{inv.subtotal}</td>
                  <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-xs ${inv.status==='paid'?'bg-emerald-900/50 text-emerald-400':'bg-zinc-700 text-zinc-300'}`}>{inv.status}</span></td>
                  <td className="py-2">{inv.due_date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Proyectos */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Proyectos ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="text-zinc-500 text-sm">No hay proyectos con este cliente.</p>
        ) : (
          <div className="grid gap-2">
            {projects.map(proj => (
              <Link key={proj.id} href={`/projects/${proj.id}`} className="block bg-zinc-950 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                <span className="font-medium">{proj.name}</span>
                <span className="text-xs text-zinc-500 ml-2">· {proj.status}</span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
