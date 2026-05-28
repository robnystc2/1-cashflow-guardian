import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comunidad Blindada — Freelancers que se protegen juntos | CFG',
  description: 'Directorio anonimizado de clientes morosos, foro de ayuda y estrategias anti-impago compartidas por la comunidad.',
}

export default function ComunidadPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Comunidad Blindada</h1>
        <p className="text-zinc-300 text-lg mb-8">El primer directorio colaborativo de clientes morosos del mundo hispanohablante.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <span className="text-3xl">🔍</span>
            <h2 className="text-xl font-bold mt-2 mb-2">Consulta antes de aceptar</h2>
            <p className="text-sm text-zinc-400">Busca si un cliente tiene historial de impago en nuestra red.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <span className="text-3xl">🛡️</span>
            <h2 className="text-xl font-bold mt-2 mb-2">Protege a otros</h2>
            <p className="text-sm text-zinc-400">Reporta clientes morosos (anonimizado) y ayuda a la comunidad.</p>
          </div>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Acceder a la comunidad →
        </Link>
      </div>
    </main>
  )
}
