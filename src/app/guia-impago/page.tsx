import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export default function GuiaImpago() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Guía gratuita: <span className="text-emerald-400">Supervivencia del freelancer frente al impago</span></h1>
        <p className="text-zinc-300 mb-8">5.000 palabras con todo lo que necesitas saber para blindar tus cobros.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <p className="text-left text-zinc-300 text-sm">✅ Modelo de contrato con hitos</p>
          <p className="text-left text-zinc-300 text-sm mt-2">✅ Carta de reclamación extrajudicial</p>
          <p className="text-left text-zinc-300 text-sm mt-2">✅ Cómo negociar pagos por adelantado</p>
          <p className="text-left text-zinc-300 text-sm mt-2">✅ Checklist de blindaje legal</p>
          <p className="text-left text-zinc-300 text-sm mt-2">✅ Estrategias para clientes internacionales</p>
        </div>
        <div className="flex gap-2 max-w-sm mx-auto">
          <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
          <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Descargar gratis</button>
        </div>
        <p className="text-xs text-zinc-500 mt-3">Al descargar aceptas recibir consejos de cobro por email.</p>
      </section>
    </div>
  )
}
