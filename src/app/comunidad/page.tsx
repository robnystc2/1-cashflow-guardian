import Link from 'next/link'
import { Shield } from 'lucide-react'
export default function Comunidad() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">CFG</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4"><Shield className="w-10 h-10 text-emerald-400" /></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Comunidad <span className="text-emerald-400">Blindada</span></h1>
        <p className="text-xl text-zinc-300 mb-8">El foro privado donde los freelancers comparten qué clientes pagan y cuáles no.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <p className="text-zinc-400">Próximamente. Déjanos tu email y te avisaremos cuando abra.</p>
          <div className="flex gap-2 max-w-sm mx-auto mt-4">
            <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Avísame</button>
          </div>
        </div>
      </section>
    </div>
  )
}
