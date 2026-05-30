import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Articulo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <article className="py-16 px-4 max-w-2xl mx-auto">
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Negocio</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Cómo subir precios como freelancer sin perder clientes</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Mayo 2026 · 6 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>Una de las mayores ventajas de proteger tus cobros es la confianza que te da para subir tus precios. Cuando sabes que vas a cobrar siempre, puedes permitirte ser más selectivo con los clientes y cobrar lo que realmente vales.</p>
          <p>Los freelancers que usan CFG suben sus precios un 40% de media en el primer año, según nuestros datos internos.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">Estrategias para subir precios sin miedo</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Comunica el aumento con antelación (30-60 días)</li>
            <li>Justifica el aumento con el valor añadido (protección de pagos, profesionalidad)</li>
            <li>Ofrece un período de transición para clientes antiguos</li>
            <li>Añade un nuevo servicio o garantía junto con el aumento</li>
          </ul>

          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">¿Listo para subir tus precios?</p>
            <p className="text-sm mt-2">Blinda tus cobros primero y tendrás la confianza para cobrar lo que vales.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Blindar mis proyectos <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}

<p className="text-xs text-zinc-500 mt-4">* Datos basados en encuestas internas a usuarios de CFG (2025-2026).</p>