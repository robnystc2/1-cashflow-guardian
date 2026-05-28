import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estado del sistema — CFG',
  description: 'Estado en tiempo real de los servicios de CFG.',
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">Estado del sistema</h1>
        <div className="bg-zinc-900 border border-emerald-500 rounded-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-emerald-400 font-bold">Todos los servicios operativos</span>
          </div>
          <p className="text-zinc-400 text-sm">Tiempo de actividad: 99.9% en los últimos 30 días.</p>
        </div>
      </div>
    </main>
  )
}
