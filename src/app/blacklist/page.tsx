import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blacklist de clientes morosos — Comunidad CFG',
  description: 'Base de datos anonimizada de clientes con historial de impago, reportada por la comunidad de freelancers de CFG.',
}

export default function BlacklistPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Comunidad Blindada</h1>
        <p className="text-zinc-300 text-lg mb-8">Directorio anonimizado de clientes con historial de impago. Protege tu negocio antes de aceptar un proyecto.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mb-8">
          <p className="text-zinc-400">🔒 Disponible solo para miembros registrados de CFG.</p>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Acceder a la comunidad →
        </Link>
      </div>
    </main>
  )
}
