import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export default function RecuperarDeuda() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">¿Tienes facturas <span className="text-red-400">antiguas</span> sin cobrar?</h1>
        <p className="text-xl text-zinc-300 mb-8">Activa el Protocolo de Recuperación y CFG enviará cartas legales automáticas a tus clientes morosos.</p>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 mb-8">
          <p className="text-sm text-zinc-400 mb-4">📋 Introduce los datos de la factura impagada y CFG se encarga del resto.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/20">Activar Protocolo de Recuperación <ArrowRight className="w-5 h-5" /></Link>
        </div>
        <p className="text-xs text-zinc-500">Disponible para facturas de hasta 50.000€ emitidas en los últimos 12 meses.</p>
      </section>
    </div>
  )
}
