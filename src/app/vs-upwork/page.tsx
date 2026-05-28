import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs Upwork se queda con el 20% de cada proyecto para siempre — ¿Por qué los freelancers están migrando?',
  description: 'Upwork se queda con el 20% de cada proyecto para siempre. Un proyecto de 1.000€ te cuesta 200€. CFG Pro cuesta 29€/mes y proteges todos tus proyectos ilimitados.',
}

export default function VsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs Upwork se queda con el 20% de cada proyecto para siempre</h1>
        <p className="text-xl text-zinc-300 mb-8 text-center">Upwork se queda con el 20% de cada proyecto para siempre. Un proyecto de 1.000€ te cuesta 200€. CFG Pro cuesta 29€/mes y proteges todos tus proyectos ilimitados.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">❌ Lo que no te gusta de Upwork se queda con el 20% de cada proyecto para siempre</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Comisión del 20%</li>
              <li>• No tienes relación directa con el cliente</li>
              <li>• Términos de servicio restrictivos</li>
            </ul>
          </div>
          <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">✅ Lo que ganas con CFG</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• 0% comisión</li>
              <li>• Relación directa con tus clientes</li>
              <li>• Tú controlas tu negocio</li>
              <li>• 29€/mes por proyectos ilimitados</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Probar CFG 14 días gratis →
          </Link>
        </div>
      </div>
    </main>
  )
}
