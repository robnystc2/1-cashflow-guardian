'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Calculator, FileText, ArrowRight } from 'lucide-react'
export default function Herramientas() {
  const [horas, setHoras] = useState(160)
  const [ingresoDeseado, setIngresoDeseado] = useState(3000)
  const [gastos, setGastos] = useState(500)
  const tarifaHora = Math.round((ingresoDeseado + gastos) / horas)
  const tarifaProtegida = Math.round(tarifaHora * 1.30)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Herramientas <span className="text-emerald-400">gratuitas</span></h1>
        <p className="text-zinc-300 text-center mb-12">Todo lo que necesitas para blindar tu negocio freelance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <Calculator className="w-8 h-8 text-emerald-400 mb-3" />
            <h2 className="text-xl font-bold mb-4">Calculadora de tarifa freelance</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-zinc-400">Horas facturables al mes</label><input type="range" min="20" max="200" value={horas} onChange={e => setHoras(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-sm">{horas}h</span></div>
              <div><label className="text-xs text-zinc-400">Ingreso deseado (€/mes)</label><input type="range" min="500" max="10000" step="100" value={ingresoDeseado} onChange={e => setIngresoDeseado(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-sm">{ingresoDeseado}€</span></div>
              <div><label className="text-xs text-zinc-400">Gastos fijos (€/mes)</label><input type="range" min="0" max="3000" step="50" value={gastos} onChange={e => setGastos(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-sm">{gastos}€</span></div>
              <div className="bg-zinc-800 rounded-xl p-4 text-center mt-4"><p className="text-xs text-zinc-400">Tu tarifa mínima por hora</p><p className="text-3xl font-bold text-emerald-400">{tarifaHora}€/h</p><p className="text-xs text-zinc-500 mt-1">Con el riesgo de impago (71%), deberías cobrar al menos <span className="text-amber-400 font-semibold">{tarifaProtegida}€/h</span> para mantener ese ingreso real. Cobrar menos te hace perder dinero sin saberlo. Cobrar menos te hace perder dinero sin saberlo.</p></div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <FileText className="w-8 h-8 text-emerald-400 mb-3" />
            <h2 className="text-xl font-bold mb-4">Contrato de hitos descargable</h2>
            <p className="text-sm text-zinc-300 mb-4">Plantilla gratuita de contrato con hitos. Adaptable a España y México. Incluye cláusulas de bloqueo de entrega.</p>
            <ul className="space-y-2 text-xs text-zinc-400 mb-4">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Cláusula de hitos</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Protección por bloqueo</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Jurisdicción configurable</li>
            </ul>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-full text-sm transition-all w-full">Descargar PDF (gratis)</button>
          </div>
        </div>
        <div className="text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105">Blindarme con CFG <ArrowRight className="w-5 h-5" /></Link></div>
      </section>
    </div>
  )
}
