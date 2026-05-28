import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Garantía Blindaje Total — Si no cobras, te devolvemos 3 meses | CFG',
  description: 'Usa CFG para blindar tus proyectos. Si sigues el proceso y no cobras en 14 días, te devolvemos 3 meses de suscripción por transferencia bancaria en 48h.',
}

export default function GarantiaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Garantía Blindaje Total</h1>
        <p className="text-xl text-zinc-300 mb-8">La única herramienta que te garantiza cobrar o te devuelve el dinero.</p>
        <div className="bg-zinc-900 border border-emerald-500 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">¿Cómo funciona?</h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-300">
            <li>Creas tu proyecto en CFG con hitos claros (3 minutos).</li>
            <li>El cliente recibe los términos y el contrato digital.</li>
            <li>Si el cliente no paga un hito, CFG envía recordatorios automáticos.</li>
            <li>Si tras 14 días desde el aviso legal no has cobrado, activamos la garantía.</li>
            <li>Te devolvemos 3 meses de suscripción por transferencia bancaria en 48h.</li>
          </ol>
        </div>
        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Activar mi blindaje con garantía →
          </Link>
        </div>
      </div>
    </main>
  )
}
