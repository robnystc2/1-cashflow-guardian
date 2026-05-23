import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Articulo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <article className="py-16 px-4 max-w-2xl mx-auto">
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Legal</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Contrato freelance: las 7 cláusulas obligatorias para 2026</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Junio 2026 · 7 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>Un buen contrato freelance no solo te protege legalmente, sino que también establece expectativas claras con el cliente desde el primer día. Estas son las 7 cláusulas que todo contrato debe incluir en 2026.</p>
          <ol className="list-decimal pl-5 space-y-4">
            <li><strong>Objeto del contrato:</strong> Define exactamente qué entregables incluye el proyecto y cuáles no.</li>
            <li><strong>Hitos y pagos:</strong> Divide el proyecto en fases con pagos asociados a cada una.</li>
            <li><strong>Condiciones de pago:</strong> Plazos, método de pago e intereses de demora aplicables.</li>
            <li><strong>Propiedad intelectual:</strong> Especifica cuándo se transfiere la propiedad al cliente (al pago completo).</li>
            <li><strong>Bloqueo de entrega:</strong> El freelancer puede retener entregables si hay facturas pendientes.</li>
            <li><strong>Resolución de conflictos:</strong> Arbitraje o jurisdicción aplicable.</li>
            <li><strong>Confidencialidad:</strong> Protege la información de ambas partes.</li>
          </ol>
          <p>En CFG, el contrato se genera automáticamente con todas estas cláusulas adaptadas a tu país y tipo de proyecto.</p>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">Consigue tu contrato blindado en 3 minutos</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Generar mi contrato <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}
