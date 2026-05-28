import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Recursos gratuitos para freelancers — Calculadoras, plantillas y guías | CFG',
  description: 'Calculadora de impago, modelo de carta de reclamación, simulador de tarifa freelance y más herramientas gratuitas para autónomos.',
}

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Recursos gratuitos</h1>
        <p className="text-zinc-300 text-lg mb-10">Herramientas y plantillas para blindar tu negocio freelance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/calculadora-irpf" className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
            <span className="text-2xl">🧮</span>
            <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">Calculadora de riesgo de impago</h2>
            <p className="text-sm text-zinc-400">Descubre cuánto pierdes al año por clientes morosos.</p>
          </Link>
          <Link href="/generador-contratos" className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
            <span className="text-2xl">📄</span>
            <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">Generador de contratos</h2>
            <p className="text-sm text-zinc-400">Crea un contrato anti-impago en 2 minutos.</p>
          </Link>
          <Link href="/blog/modelo-carta-reclamacion-espana" className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
            <span className="text-2xl">📨</span>
            <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">Modelo de carta de reclamación</h2>
            <p className="text-sm text-zinc-400">Plantilla descargable para reclamar deudas.</p>
          </Link>
          <Link href="/calculadora-irpf" className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
            <span className="text-2xl">💶</span>
            <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">Calculadora de tarifa freelance</h2>
            <p className="text-sm text-zinc-400">Calcula cuánto deberías cobrar por hora.</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
