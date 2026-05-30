import Link from 'next/link'

export default function Articulo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <article className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <div className="mb-8">
          <p className="text-xs text-zinc-500 mb-2">Blog · 30/5/2026 · Tiempo de lectura: 7 min</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contrato freelance Argentina: qué cláusulas son obligatorias</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">Cláusulas esenciales en contratos de servicios freelance en Argentina.</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          <p>En el mundo freelance, cada detalle cuenta. Esta guía te ayudará a resolver una de las dudas más comunes entre autónomos y profesionales independientes.</p>
          <h2>1. Introducción</h2>
          <p>El mercado freelance en España y Latinoamérica ha crecido exponencialmente en los últimos años. Con ese crecimiento, también han aumentado las dudas sobre facturación, contratos y protección de pagos.</p>
          <h2>2. Lo que necesitas saber</h2>
          <p>Aquí te explicamos paso a paso todo lo necesario para que puedas gestionar tu negocio freelance de forma profesional y segura.</p>
          <h2>3. Cómo CFG te ayuda</h2>
          <p>Con CFG, no solo gestionas tus cobros: los blindas. Nuestra herramienta automatiza recordatorios, bloquea entregas hasta recibir el pago y te garantiza que cobras o te devolvemos el dinero.</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Protege tu próximo proyecto</h3>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
            Blindar mi primer proyecto gratis →
          </Link>
        </div>
      </article>
    </div>
  )
}