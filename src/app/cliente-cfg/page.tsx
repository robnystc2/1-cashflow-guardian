import Link from 'next/link'
export default function ClienteCFG() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Tu proveedor usa <span className="text-emerald-400">CFG</span></h1>
        <p className="text-zinc-300 mb-8">Eso significa que es un profesional que protege sus proyectos con hitos y garantía de cobro.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <p className="text-sm text-zinc-400">Cuando trabajas con un freelancer que usa CFG, tienes la seguridad de que cada entrega está respaldada por un sistema justo para ambas partes.</p>
        </div>
      </section>
    </div>
  )
}
