import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo cobrar a un cliente extranjero sin morir en el intento | Blog CFG',
  description: 'Guía para freelancers que trabajan con clientes internacionales. Facturación transfronteriza, divisas y protección legal.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <h1>Cómo cobrar a un cliente extranjero</h1>
        <p className="lead text-lg text-zinc-300">Trabajar con clientes internacionales es una gran oportunidad, pero también un riesgo si no sabes cómo proteger tus cobros. Con CFG, puedes blindar tus proyectos en 47 países con Escudo Legal adaptado a cada jurisdicción.</p>
        <p>En CashFlow Guardian, automatizamos todo el proceso de reclamación de deudas para que no tengas que preocuparte por los impagos. Desde recordatorios automáticos hasta cartas legales, nuestro sistema se encarga de todo mientras tú te enfocas en tu trabajo.</p>
        <div className="bg-emerald-900/20 border border-emerald-500 rounded-xl p-6 my-8">
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