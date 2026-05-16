'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, TrendingUp, AlertTriangle, Users, Send } from 'lucide-react'
import Link from 'next/link'

export default function ReportsDashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<any>(null)
  const [overdueInvoices, setOverdueInvoices] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Datos generales
      const { data: invoices } = await supabase.from('invoices').select('subtotal, status, paid_date, due_date').eq('user_id', userId)
      const totalInvoiced = invoices?.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.subtotal), 0) || 0
      const pending = invoices?.filter(i => i.status !== 'paid').reduce((s, i) => s + Number(i.subtotal), 0) || 0
      const totalClients = (await supabase.from('clients').select('*', { count: 'exact', head: true }).eq('user_id', userId)).count || 0
      const totalProjects = (await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', userId)).count || 0
      const overdue = invoices?.filter(i => i.status === 'overdue' || (i.due_date && new Date(i.due_date) < new Date())).length || 0
      const total = invoices?.length || 1
      const unpaidRate = ((overdue / total) * 100).toFixed(1)

      // Facturas vencidas para la tabla de acción
      const { data: overdueData } = await supabase
        .from('invoices')
        .select('*, client:clients(name)')
        .eq('user_id', userId)
        .not('status', 'eq', 'paid')
        .lte('due_date', new Date().toISOString().split('T')[0])
        .order('due_date', { ascending: true })

      setData({ totalInvoiced, pending, totalClients, totalProjects, overdue, unpaidRate })
      setOverdueInvoices(overdueData || [])
    }
    if (userId) fetchData()
  }, [userId])

  if (!data) return <div className="text-center py-8"><Loader2 className="animate-spin mx-auto" /></div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><TrendingUp className="w-5 h-5 text-emerald-400" /> Total facturado</div>
          <p className="text-3xl font-bold mt-2">€{data.totalInvoiced.toFixed(2)}</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><AlertTriangle className="w-5 h-5 text-amber-400" /> Tasa de impago</div>
          <p className="text-3xl font-bold mt-2">{data.unpaidRate}%</p>
          <p className="text-xs text-zinc-500">{data.overdue} facturas vencidas</p>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><Users className="w-5 h-5 text-cyan-400" /> Clientes / Proyectos</div>
          <p className="text-3xl font-bold mt-2">{data.totalClients} / {data.totalProjects}</p>
        </Card>
      </div>

      {/* Tabla de acción: Facturas vencidas */}
      {overdueInvoices.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Facturas vencidas — Actúa ahora
          </h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-2 text-zinc-400">Cliente</th>
                <th className="py-2 text-zinc-400">Importe</th>
                <th className="py-2 text-zinc-400">Vencimiento</th>
                <th className="py-2 text-zinc-400">Acción</th>
              </tr>
            </thead>
            <tbody>
              {overdueInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-zinc-800/50">
                  <td className="py-2">{inv.client?.name || 'Sin cliente'}</td>
                  <td className="py-2 text-red-400 font-semibold">€{inv.subtotal}</td>
                  <td className="py-2 text-zinc-500">{new Date(inv.due_date).toLocaleDateString('es')}</td>
                  <td className="py-2">
                    <Link href={`/invoices`}>
                      <Button size="sm" variant="outline" className="border-amber-700 text-amber-400 hover:bg-amber-950">
                        <Send className="w-3 h-3 mr-1" /> Enviar recordatorio
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
