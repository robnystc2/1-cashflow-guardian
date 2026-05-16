'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Activity, ShieldAlert, Loader2, Info, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

// Sparkline simple con barras
function Sparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-1 h-8">
      {data.map((val, i) => (
        <div
          key={i}
          className={`w-2 rounded-sm ${color} transition-all duration-500`}
          style={{ height: `${(val / max) * 100}%`, opacity: 0.3 + (i / data.length) * 0.7 }}
        />
      ))}
    </div>
  )
}

export default function CfoPanel() {
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cfo-insights')
      .then(res => res.json())
      .then(data => {
        setInsights({ ...data, trend: [3, 5, 2, 8, 6, 9] }) // Datos simulados, luego reales
        setLoading(false)
      })
  }, [])

  if (loading) return <Card className="bg-zinc-900 border-zinc-800 p-6 animate-pulse"><div className="h-4 bg-zinc-800 rounded w-3/4 mb-4" /><div className="h-8 bg-zinc-800 rounded w-1/2" /></Card>
  if (!insights) return null

  const maxAmount = Math.max(insights.expectedIncome, insights.projectedExpenses, 1)

  const getTooltipText = (days: number) => {
    if (days === 0) return 'Paga puntual'
    if (days > 0) return `+${days} días de retraso`
    return `Paga ${Math.abs(days)} días antes`
  }

  let tip = ''
  if (insights.status === 'red') tip = 'Revisa tus gastos y acelera los cobros pendientes.'
  else if (insights.status === 'yellow') tip = 'Considera facturar pronto para evitar déficit.'
  else if (insights.expectedIncome > 0) tip = `Cobra esa factura de ${insights.expectedIncome.toFixed(0)}€ para fortalecer tu posición.`
  else tip = 'Crea una factura para empezar a generar ingresos.'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* CFO Cassandra con Sparkline */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 relative overflow-hidden md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`relative w-8 h-8 rounded-full flex items-center justify-center ${
              insights.status === 'green' ? 'bg-emerald-900/50' :
              insights.status === 'yellow' ? 'bg-yellow-900/50' :
              'bg-red-900/50'
            }`}>
              <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                insights.status === 'green' ? 'bg-emerald-400' :
                insights.status === 'yellow' ? 'bg-yellow-400' :
                'bg-red-400'
              }`}></span>
              <Activity className={`w-5 h-5 relative z-10 ${
                insights.status === 'green' ? 'text-emerald-400' :
                insights.status === 'yellow' ? 'text-yellow-400' :
                'text-red-400'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-bold">CFO Cassandra</h2>
              <p className="text-xs text-zinc-500">Tendencia últimos 6 meses</p>
            </div>
          </div>
          <Sparkline data={insights.trend} color={insights.status === 'green' ? 'bg-emerald-500' : insights.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'} />
        </div>
        <p className="text-zinc-300 mb-3 text-sm leading-relaxed">{insights.phrase}</p>
        <p className="text-xs text-zinc-500 mb-4 italic">💡 {tip}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Ingresos prox. 30d</span>
            <span>€{insights.expectedIncome.toFixed(2)}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-700" style={{ width: `${(insights.expectedIncome / maxAmount) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Gastos est. 30d</span>
            <span>€{insights.projectedExpenses.toFixed(2)}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div className="bg-red-500 h-1.5 rounded-full transition-all duration-700" style={{ width: `${(insights.projectedExpenses / maxAmount) * 100}%` }} />
          </div>
        </div>
      </Card>

      {/* PayScore (sin cambios pero con más contexto) */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> PayScore
          </h2>
          {insights.clientScores?.length > 3 && (
            <Link href="/clients" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
              Todos <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        {insights.clientScores?.length === 0 ? (
          <p className="text-zinc-500 text-sm">No tienes clientes aún.</p>
        ) : (
          <ul className="space-y-3">
            {insights.clientScores?.slice(0, 3).map((client: any) => (
              <li key={client.id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 font-medium">{client.name}</span>
                  <div className="relative group">
                    <Info className="w-3.5 h-3.5 text-zinc-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {getTooltipText(client.avgPaymentDays)}
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                  client.score === 'gold_plus' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' :
                  client.score === 'gold' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' :
                  client.score === 'silver' ? 'bg-zinc-700 text-zinc-300 border border-zinc-600' :
                  'bg-red-900/50 text-red-400 border border-red-700'
                }`}>
                  {client.score === 'gold_plus' ? 'ORO+' : client.score === 'gold' ? 'ORO' : client.score === 'silver' ? 'PLATA' : 'BRONCE'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
