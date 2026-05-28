import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs Bonsai — ¿Por qué los freelancers están migrando?',
  description: 'Bonsai fue comprada por Zoom. Tus contratos y clientes ahora están en manos de una empresa de videoconferencias. CFG es independiente y construido en España.',
}

export default function VsBonsaiPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">CFG vs Bonsai</h1>
        <p className="text-xl text-zinc-300 mb-8">Bonsai fue comprada por Zoom en 2025. Tus contratos, tus clientes y tu historial ahora están en manos de una empresa de videoconferencias. CFG es independiente, construido en España, y no tenemos planes de vendernos.</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Probar CFG 14 días gratis →
        </Link>
      </div>
    </main>
  )
}
