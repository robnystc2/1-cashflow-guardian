import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs HoneyBook — ¿Por qué los freelancers están migrando?',
  description: 'HoneyBook fue diseñado para el mercado americano. Sus plantillas legales no sirven en España o Latinoamérica. CFG tiene Escudo Legal en 47 países.',
}

export default function VsHoneyBookPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">CFG vs HoneyBook</h1>
        <p className="text-xl text-zinc-300 mb-8">HoneyBook fue diseñado para el mercado americano. Sus plantillas legales son para legislación estadounidense. Si tu cliente es español o latinoamericano, necesitas protección adaptada a tu jurisdicción.</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Probar CFG 14 días gratis →
        </Link>
      </div>
    </main>
  )
}
