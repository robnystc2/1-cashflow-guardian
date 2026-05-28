import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Migra de Bonsai a CFG en 10 minutos — Sin perder datos | CFG',
  description: 'Bonsai fue comprada por Zoom en 2025. Migra tus proyectos, clientes y facturas a CFG fácilmente y protege tus cobros con garantía.',
}

export default function MigrarPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Migra de Bonsai a CFG en 10 minutos</h1>
        <p className="text-xl text-zinc-300 mb-8">Bonsai fue comprada por Zoom. Tu futuro allí es incierto. Nosotros somos independientes y no tenemos planes de vendernos.</p>
        <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">📦 Migración sencilla</h2>
          <ol className="text-left text-zinc-300 space-y-2 list-decimal list-inside">
            <li>Exporta tus proyectos y clientes desde Bonsai (CSV).</li>
            <li>Regístrate en CFG (gratis, sin tarjeta).</li>
            <li>Importa tus datos en un clic desde el panel de control.</li>
            <li>Tus proyectos se configuran automáticamente con hitos y blindaje.</li>
          </ol>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Empezar migración gratis →
        </Link>
      </div>
    </main>
  )
}
