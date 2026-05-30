'use client'
import { useState } from 'react'
export default function CalculadoraIRPF() {
  const [ingresos, setIngresos] = useState(30000)
  const retencion = ingresos <= 12450 ? 19 : ingresos <= 20200 ? 24 : ingresos <= 35200 ? 30 : ingresos <= 60000 ? 37 : 45
  const cuota = Math.round(ingresos * retencion / 100)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Calculadora IRPF para autónomos</h1>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-xl mx-auto">
          <label className="text-sm text-zinc-300 block mb-2">Ingresos anuales estimados (€)</label>
          <input type="range" min="10000" max="150000" step="1000" value={ingresos} onChange={e => setIngresos(Number(e.target.value))} className="w-full accent-emerald-500" />
          <span className="text-xs text-zinc-400">{ingresos.toLocaleString('es-ES')}€</span>
          <div className="mt-6 bg-zinc-800 rounded-xl p-6">
            <p className="text-zinc-300">Tipo de retención: <strong className="text-emerald-400">{retencion}%</strong></p>
            <p className="text-2xl font-extrabold text-white mt-2">{cuota.toLocaleString('es-ES')}€</p>
            <p className="text-xs text-zinc-400 mt-1">Cuota estimada (sin deducciones)</p>
          </div>
          <p className="text-xs text-zinc-500 mt-4">Esta es una estimación orientativa. Consulta con tu gestor.</p>
        </div>
      </div>
    </div>
  )
}