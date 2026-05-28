import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs Copilot — ¿Por qué los freelancers están migrando?',
  description: 'Copilot tiene buen portal de cliente, pero cero protección anti-impago. CFG lo tiene todo.',
}

export default function VsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs Copilot</h1>
        <p className="text-xl text-zinc-300 mb-8 text-center">Copilot tiene buen portal de cliente, pero cero protección anti-impago. CFG lo tiene todo.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">❌ Lo que no te gusta de Copilot</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Sin protección anti-impago</li>
              <li>• Sin bloqueo de entregas</li>
              <li>• Sin Escudo Legal</li>
            </ul>
            <p className="text-xs text-zinc-500 mt-4">✅ Pros: Portal de cliente moderno</p>
          </div>
          <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">✅ Lo que ganas con CFG</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Bloqueo de hitos</li>
              <li>• Escudo Legal</li>
              <li>• PayScore</li>
              <li>• Garantía Blindaje Total</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Empezar gratis →
          </Link>
        </div>
      </div>
    </main>
  )
}
