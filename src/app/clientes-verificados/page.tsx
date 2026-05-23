import Link from 'next/link'
import { Shield, Check, ArrowRight } from 'lucide-react'
export default function ClientesVerificados() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4"><Shield className="w-10 h-10 text-amber-400" /></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Directorio de <span className="text-amber-400">Pagadores Verificados</span></h1>
        <p className="text-xl text-zinc-300 mb-8">El primer directorio de solvencia de pago freelance del mundo hispanohablante. Busca si una empresa tiene badge antes de aceptar un proyecto.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><Check className="w-8 h-8 text-emerald-400 mx-auto mb-3" /><h3 className="font-bold mb-2">Verificación gratuita</h3><p className="text-sm text-zinc-400">Las empresas se verifican sin coste. Solo necesitan historial de pagos en CFG.</p></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" /><h3 className="font-bold mb-2">Criterios ORO/PLATA/BRONCE</h3><p className="text-sm text-zinc-400">ORO: 0 impagos en 12 meses. PLATA: menos del 5%. BRONCE: en seguimiento.</p></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><ArrowRight className="w-8 h-8 text-emerald-400 mx-auto mb-3" /><h3 className="font-bold mb-2">Directorio público</h3><p className="text-sm text-zinc-400">Próximamente: busca empresas verificadas antes de enviar una propuesta.</p></div>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/20">Verificar mi empresa <ArrowRight className="w-5 h-5" /></Link>
      </section>
    </div>
  )
}
