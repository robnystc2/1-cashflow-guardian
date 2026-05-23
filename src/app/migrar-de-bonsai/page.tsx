import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export default function MigrarDeBonsai() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Migra de Bonsai a <span className="text-emerald-400">CashFlow Guardian</span></h1>
        <p className="text-xl text-zinc-300 mb-8">Bonsai fue adquirida por Zoom en 2025. Si estás buscando una alternativa independiente con protección anti-impago real, has llegado al sitio correcto.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8 text-left">
          <h3 className="font-bold text-lg mb-4">📋 Pasos para migrar en 10 minutos</h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-zinc-300">
            <li>Exporta tus clientes y proyectos desde Bonsai (CSV)</li>
            <li>Regístrate en CFG con tu email</li>
            <li>Importa tus datos en un solo clic</li>
            <li>Activa la Garantía Blindaje Total en cada proyecto</li>
          </ol>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Migrar ahora <ArrowRight className="w-5 h-5" /></Link>
      </section>
    </div>
  )
}
