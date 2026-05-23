import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
export default function VsFreshbooks() {
  const rows = [
    { feat: 'Protección anti-impago', comp: '✗', cfg: '✓ Garantía Blindaje Total' },
    { feat: 'Bloqueo de entrega', comp: '✗', cfg: '✓ Candado por hito' },
    { feat: 'PayScore de clientes', comp: '✗', cfg: '✓ Historial real' },
    { feat: 'Escudo Legal', comp: '✗', cfg: '✓ Carta legal personalizada' },
    { feat: 'Soporte en español', comp: '✗', cfg: '✓ Nativo' },
    { feat: 'Precio', comp: 'Variable', cfg: '29€/mes (con Garantía)' },
  ]
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">CFG vs <span className="text-zinc-400">Freshbooks</span></h1>
        <p className="text-xl text-zinc-300 mb-10">Descubre por qué CFG es la mejor alternativa para freelancers hispanohablantes.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-zinc-800 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Freshbooks</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-semibold">CFG</th></tr></thead>
            <tbody className="text-sm">
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800 hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-zinc-300">{row.feat}</td>
                  <td className="py-3 px-4 text-center text-zinc-400">{row.comp}</td>
                  <td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.cfg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Probar CFG por 1€ <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  )
}
