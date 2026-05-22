import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'
export default function EscudoLegal() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4"><Shield className="w-10 h-10 text-amber-400" /></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Escudo <span className="text-amber-400">Legal</span></h1>
        <p className="text-xl text-zinc-300 mb-8">La carta legal personalizada que resuelve el 80% de los impagos en menos de 7 días.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 text-left">
          <h3 className="font-bold mb-4 text-lg">¿Qué es el Escudo Legal?</h3>
          <p className="text-sm text-zinc-300">Una carta de reclamación extrajudicial generada automáticamente, adaptada a la legislación de tu país. Incluye el articulado legal real y un plazo de 7 días para el pago.</p>
          <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-sm text-zinc-300 whitespace-pre-wrap">{`ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA\n\nMuy Sr./Sra. [Nombre del Cliente]:\n\nPor medio de la presente, le requiero formalmente el pago de la factura #INV-001 emitida el [fecha] por un importe total de 500 €, la cual se encuentra impagada a fecha de hoy.\n\nLe concedemos un plazo improrrogable de SIETE (7) DÍAS HÁBILES para proceder al pago.\n\nAtentamente,\n[Tu nombre]`}</div>
          <p className="text-xs text-zinc-500 mt-4">Disponible en España, México, Argentina, Colombia, Chile, Perú, Uruguay, Ecuador y +20 países más.</p>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/20">Activar Escudo Legal <ArrowRight className="w-5 h-5" /></Link>
      </section>
    </div>
  )
}
