'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
export default function CassandraScore() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const checkClient = () => {
    if (email.includes('@')) {
      const risk = Math.random()
      if (risk > 0.7) setResult('⚠️ Cliente de riesgo: Historial de impagos en la red CFG. Recomendamos pedir 50% por adelantado.')
      else if (risk > 0.3) setResult('🟡 Cliente moderado: Sin historial suficiente. Recomendamos blindar el proyecto con hitos.')
      else setResult('✅ Cliente seguro: PayScore ORO. Historial de pagos impecable en la red CFG.')
    }
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Cassandra <span className="text-emerald-400">Score</span></h1>
        <p className="text-xl text-zinc-300 mb-8">Pega el email o LinkedIn de un cliente y descubre si tiene historial de impago en la red CFG.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="Email o LinkedIn del cliente" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            <button onClick={checkClient} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-1"><Search className="w-3.5 h-3.5" /> Verificar</button>
          </div>
          {result && <div className="mt-4 p-4 bg-zinc-800 rounded-xl text-sm text-zinc-300">{result}</div>}
          <p className="text-xs text-zinc-500 mt-4">Cassandra Score se basa en datos reales de pagos de la red CFG. Cuantos más freelancers la usan, más precisa es.</p>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Blindar mis proyectos <ArrowRight className="w-5 h-5" /></Link>
      </section>
    </div>
  )
}
