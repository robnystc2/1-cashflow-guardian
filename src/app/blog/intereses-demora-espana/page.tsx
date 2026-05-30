import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Articulo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <article className="py-16 px-4 max-w-2xl mx-auto">
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Cobro</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Intereses de demora en España 2026: cómo calcularlos y cobrarlos</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Junio 2026 · 5 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>La Ley 3/2004 de Morosidad establece que en operaciones comerciales entre empresas y autónomos, el acreedor tiene derecho a cobrar intereses de demora cuando el cliente se retrasa en el pago. Este derecho es automático: no necesitas que el contrato lo mencione expresamente.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">¿Cuánto puedes cobrar de intereses?</h2>
          <p>El tipo de interés de demora es el tipo de interés aplicado por el Banco Central Europeo (BCE) más 8 puntos porcentuales. En 2026, con el BCE en torno al 4%, el interés de demora legal es aproximadamente del 12% anual.</p>
          <p>Para una factura de 2.000€ con 90 días de retraso, los intereses serían:</p>
          <div className="bg-zinc-800 p-4 rounded-xl text-sm text-zinc-300">2.000€ × 12% × (90/365) = 59,18€ de intereses</div>

          <h2 className="text-xl font-bold mt-8 mb-4">Cómo reclamar los intereses</h2>
          <p>Debes incluir los intereses en la carta de reclamación extrajudicial y, si el caso llega a juicio, en la demanda. Muchos freelancers desconocen este derecho y pierden cientos de euros al año en intereses no reclamados.</p>
          <p>En CFG, el sistema calcula automáticamente los intereses de demora y los añade a la carta legal cuando un cliente se retrasa. No tienes que hacer ningún cálculo manual.</p>

          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">Deja que CFG calcule los intereses por ti</p>
            <p className="text-sm mt-2">Activa el blindaje y reclama hasta el último céntimo que te deben.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Empezar ahora <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}

<p className="text-xs text-zinc-500 mt-4">* Datos basados en encuestas internas a usuarios de CFG (2025-2026).</p>