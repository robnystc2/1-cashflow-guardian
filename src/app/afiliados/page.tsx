import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
export default function Afiliados() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Programa de <span className="text-emerald-400">Afiliados</span></h1>
        <p className="text-xl text-zinc-300 mb-8">Gana un 30% recurrente recomendando la herramienta que todo freelancer necesita.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-4">💰 Comisión del 30% durante 12 meses</h2>
          <p className="text-zinc-300 mb-4">Por cada freelancer que se registre con tu enlace y se quede en CFG Pro, ganas el 30% de su suscripción cada mes durante un año.</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-zinc-800"><th className="py-2">Freelancers referidos</th><th className="py-2">Ganancia mensual</th><th className="py-2">Ganancia anual</th></tr></thead>
              <tbody>
                <tr className="border-b border-zinc-800"><td className="py-2">10</td><td className="py-2 text-emerald-400">87€/mes</td><td className="py-2 text-emerald-400">1.044€/año</td></tr>
                <tr className="border-b border-zinc-800"><td className="py-2">20</td><td className="py-2 text-emerald-400">174€/mes</td><td className="py-2 text-emerald-400">2.088€/año</td></tr>
                <tr><td className="py-2">50</td><td className="py-2 text-emerald-400">435€/mes</td><td className="py-2 text-emerald-400">5.220€/año</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Quiero ser afiliado <ArrowRight className="w-5 h-5" /></Link>
      </section>
    </div>
  )
}
