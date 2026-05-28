import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs And.Co — ¿Por qué los freelancers están migrando?',
  description: 'AND.CO cerró. Miles de freelancers se quedaron sin herramienta. CFG es la alternativa independiente.',
}

export default function VsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs And.Co</h1>
        <p className="text-xl text-zinc-300 mb-8 text-center">AND.CO cerró. Miles de freelancers se quedaron sin herramienta. CFG es la alternativa independiente.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">❌ Lo que no te gusta de And.Co</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• CERRADO permanentemente</li>
              <li>• Sin soporte</li>
              <li>• Sin futuro</li>
            </ul>
            <p className="text-xs text-zinc-500 mt-4">✅ Pros: Era gratuito</p>
          </div>
          <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">✅ Lo que ganas con CFG</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Activo y en desarrollo</li>
              <li>• Soporte en español</li>
              <li>• Garantía de cobro</li>
              <li>• Independiente</li>
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
