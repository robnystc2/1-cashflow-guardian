import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'
export default function VsBonsai() {
  const rows = [
    { feat: 'Protección anti-impago', bonsai: '✗', cfg: '✓ Garantía Blindaje Total' },
    { feat: 'Bloqueo de entrega', bonsai: '✗', cfg: '✓ Candado por hito' },
    { feat: 'PayScore de clientes', bonsai: '✗', cfg: '✓ Historial real' },
    { feat: 'Escudo Legal automático', bonsai: '✗', cfg: '✓ Carta legal personalizada' },
    { feat: 'Precio', bonsai: 'Desde $17/mes', cfg: '29€/mes (con Garantía)' },
    { feat: 'Empresa matriz', bonsai: 'Zoom (adquirida 2025)', cfg: 'Independiente (Tenerife)' },
    { feat: 'Soporte en español', bonsai: '✗', cfg: '✓ Nativo' },
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4">CFG vs <span className="text-zinc-400">Bonsai</span></h1>
        <p className="text-xl text-zinc-300 mb-10">Bonsai fue comprada por Zoom en 2025. Descubre por qué CFG es la alternativa independiente.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-zinc-800 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-semibold">CFG</th></tr></thead>
            <tbody className="text-sm">
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800 hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-zinc-300">{row.feat}</td>
                  <td className="py-3 px-4 text-center text-zinc-400">{row.bonsai}</td>
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
