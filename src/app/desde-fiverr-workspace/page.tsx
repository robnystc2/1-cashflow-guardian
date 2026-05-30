import Link from 'next/link'
export default function DesdeFiverrWorkspace() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">¿Vienes de Fiverr Workspace?</h1>
        <p className="text-zinc-300 mb-8">Fiverr Workspace (antes AND.CO) cerró en marzo 2026. CFG es la alternativa para freelancers que buscan protección de pagos, contratos y gestión de clientes en español.</p>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Migra gratis en 10 minutos</h3>
          <p className="text-zinc-300 text-sm mb-4">Importa tus clientes y proyectos desde Fiverr Workspace y activa la protección CFG automáticamente.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Migrar ahora →</Link>
        </div>
      </div>
    </div>
  )
}