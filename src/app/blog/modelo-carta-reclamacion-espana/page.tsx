import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Modelo de carta de reclamación de impago España [Plantilla descargable] | Blog CFG',
  description: 'Descarga gratis nuestra plantilla de carta de reclamación de deuda para autónomos y freelancers en España.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <h1>Modelo de carta de reclamación de impago</h1>
        <p className="lead text-lg text-zinc-300">Si un cliente no te paga, el primer paso es enviar una carta de reclamación formal. Descarga nuestra plantilla gratuita y aprende cómo redactarla correctamente para recuperar tu dinero.</p>
        <p>En CashFlow Guardian, automatizamos todo el proceso de reclamación de deudas para que no tengas que preocuparte por los impagos. Desde recordatorios automáticos hasta cartas legales, nuestro sistema se encarga de todo.</p>
        <div className="bg-emerald-900/20 border border-emerald-500 rounded-xl p-6 my-8 not-prose">
          <p className="text-lg font-bold text-emerald-400">¿Listo para blindar tus proyectos?</p>
          <p className="text-zinc-300 text-sm mb-4">Activa tu blindaje en 3 minutos. Sin tarjeta, sin permanencia.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
            Empezar gratis →
          </Link>
        </div>
      </article>
    </main>
  )
}

<p className="text-xs text-zinc-500 mt-4">* Datos basados en encuestas internas a usuarios de CFG (2025-2026).</p>