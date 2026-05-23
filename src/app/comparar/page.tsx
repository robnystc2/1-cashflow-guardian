import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
const comparativas = [
  { name: 'Bonsai', slug: '/vs-bonsai', desc: 'Descubre por qué CFG es la alternativa tras la compra por Zoom.' },
  { name: 'HoneyBook', slug: '/vs-honeybook', desc: 'CFG es la opción para el mercado hispanohablante.' },
  { name: 'FreshBooks', slug: '/vs-freshbooks', desc: 'Facturación + protección anti-impago en un solo lugar.' },
  { name: 'Wave', slug: '/vs-wave', desc: 'Gratis no siempre significa protegido.' },
  { name: 'Copilot', slug: '/vs-copilot', desc: 'Para freelancers, no solo para agencias.' },
  { name: 'Upwork', slug: '/vs-upwork', desc: 'Cobra lo mismo sin perder el 20% en comisiones.' },
]
export default function Comparar() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Comparativas <span className="text-emerald-400">CFG vs</span></h1>
        <p className="text-zinc-300 text-center mb-10">Elige con datos reales.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparativas.map((c, i) => (
            <Link key={i} href={c.slug} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-700 transition-all flex justify-between items-center">
              <div><h2 className="font-semibold">CFG vs {c.name}</h2><p className="text-sm text-zinc-400 mt-1">{c.desc}</p></div>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
