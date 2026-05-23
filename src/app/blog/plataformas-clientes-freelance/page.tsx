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
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Mejores plataformas para encontrar clientes freelance en España</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Julio 2026 · 5 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>Encontrar clientes de calidad es uno de los mayores desafíos del freelancer. En España y LatAm, estas son las plataformas más efectivas para conseguir proyectos bien pagados:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Malt:</strong> La plataforma líder en España con +300.000 freelancers. Ideal para perfiles tech, diseño y consultoría.</li>
            <li><strong>Domestika:</strong> Comunidad de creativos con bolsa de trabajo integrada.</li>
            <li><strong>LinkedIn:</strong> La red profesional por excelencia. Optimiza tu perfil y publica contenido regularmente.</li>
            <li><strong>Workana:</strong> Muy popular en LatAm para todo tipo de proyectos freelance.</li>
          </ul>
          <p>Independientemente de dónde consigas tus clientes, necesitas proteger tus cobros. CFG se integra con tu flujo de trabajo habitual y blinda cada proyecto desde el primer hito.</p>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">Protege tus proyectos, vengan de donde vengan</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Blindar mis proyectos <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}
