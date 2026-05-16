'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, AlertTriangle, FolderKanban, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function FinancialHealth() {
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [pending, setPending] = useState(0)
  const [activeProjects, setActiveProjects] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    (async () => {
      const now = new Date()
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
      const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0).toISOString().split('T')[0]

      const { data: paid } = await supabase.from('invoices').select('subtotal').eq('status','paid').gte('paid_date',firstDay).lte('paid_date',lastDay)
      const totalIncome = paid?.reduce((a,b) => a + Number(b.subtotal), 0) || 0
      setIncome(totalIncome)

      const { data: exp } = await supabase.from('expenses').select('amount').gte('created_at',firstDay).lte('created_at',lastDay)
      const totalExp = exp?.reduce((a,b) => a + Number(b.amount), 0) || 0
      setExpenses(totalExp)

      const { data: pend } = await supabase.from('invoices').select('subtotal').not('status','eq','paid')
      const totalPending = pend?.reduce((a,b) => a + Number(b.subtotal), 0) || 0
      setPending(totalPending)

      // Proyectos activos (status = active)
      const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'active')
      setActiveProjects(count || 0)
    })()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-emerald-700 transition-colors group">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Ingresos este mes
        </div>
        <p className="text-3xl font-bold mt-3">€{income.toFixed(2)}</p>
        <Link href="/invoices" className="text-xs text-emerald-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Ver facturas <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-red-700 transition-colors group">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <TrendingDown className="w-5 h-5 text-red-400" />
          Gastos este mes
        </div>
        <p className="text-3xl font-bold mt-3">€{expenses.toFixed(2)}</p>
        <Link href="/expenses" className="text-xs text-red-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Ver gastos <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-amber-700 transition-colors group">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Facturas pendientes
        </div>
        <p className="text-3xl font-bold mt-3">€{pending.toFixed(2)}</p>
        <Link href="/reminders" className="text-xs text-amber-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Gestionar recordatorios <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-blue-700 transition-colors group">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <FolderKanban className="w-5 h-5 text-blue-400" />
          Proyectos activos
        </div>
        <p className="text-3xl font-bold mt-3">{activeProjects}</p>
        <Link href="/projects" className="text-xs text-blue-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Ver proyectos <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>
    </div>
  )
}
