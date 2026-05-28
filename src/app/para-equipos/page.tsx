import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG para Equipos — Protege a todo tu equipo freelance',
  description: 'Gestiona los pagos entre cliente final, freelancer principal y subcontratistas. Con bloqueos y garantías en cada capa.',
}

export default function EquiposPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">CFG para Equipos</h1>
        <p className="text-xl text-zinc-300 mb-8">Cuando lideras un equipo de freelancers, CFG protege cada capa de pagos.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <span className="text-3xl">👥</span>
            <h2 className="text-xl font-bold mt-2">Multi-freelancer</h2>
            <p className="text-sm text-zinc-400">Gestiona pagos entre cliente, líder y subcontratistas.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <span className="text-3xl">🎨</span>
            <h2 className="text-xl font-bold mt-2">White-label</h2>
            <p className="text-sm text-zinc-400">Todo con la marca de tu agencia, no la de CFG.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <span className="text-3xl">⚡</span>
            <h2 className="text-xl font-bold mt-2">Soporte 30 min</h2>
            <p className="text-sm text-zinc-400">Respuesta prioritaria para equipos.</p>
          </div>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Empezar con Teams →
        </Link>
      </div>
    </main>
  )
}
