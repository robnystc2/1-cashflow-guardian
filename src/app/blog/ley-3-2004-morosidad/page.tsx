import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ley 3/2004 de morosidad: qué derechos tienes como autónomo | Blog CFG',
  description: 'Conoce tus derechos frente a los impagos según la Ley 3/2004 de lucha contra la morosidad en operaciones comerciales.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <h1>Ley 3/2004 de morosidad</h1>
        <p className="lead text-lg text-zinc-300">Esta ley te protege frente a clientes que pagan tarde. Establece plazos máximos de pago e intereses de demora automáticos. Descubre cómo aplicarla a tu negocio freelance.</p>
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
