import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo subir tus precios como freelancer sin perder clientes | Blog CFG',
  description: 'Los freelancers de CFG suben sus precios un 40% en promedio. Descubre cómo hacerlo tú también.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <h1>Cómo subir tus precios como freelancer sin perder clientes</h1>
        <p className="lead text-lg text-zinc-300">Los freelancers que usan CFG suben sus precios un 40% en promedio. ¿Por qué? Porque cuando sabes que vas a cobrar, tienes la confianza para pedir lo que vales.</p>
        <div className="bg-emerald-900/20 border border-emerald-500 rounded-xl p-6 my-8">
          <p className="text-lg font-bold text-emerald-400">¿Listo para blindar tus proyectos?</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
            Empezar gratis →
          </Link>
        </div>
      </article>
    </main>
  )
}
