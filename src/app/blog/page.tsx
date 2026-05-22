import Link from 'next/link'
const posts = [
  { title: 'Cómo cobrar a un cliente que no paga en España (guía 2026)', slug: '/blog/como-cobrar-cliente-moroso', date: 'Mayo 2026', tag: 'Cobro', excerpt: 'Guía paso a paso con legislación española actualizada: desde el recordatorio amable hasta la reclamación judicial.' },
  { title: 'Cómo subir precios como freelancer sin perder clientes', slug: '/blog/subir-precios-freelance', date: 'Mayo 2026', tag: 'Negocio', excerpt: 'Estrategias para aumentar tus tarifas un 20-40% manteniendo a tus mejores clientes.' },
  { title: 'Contrato freelance: cláusulas obligatorias para 2026', slug: '/blog/contrato-freelance-clausulas', date: 'Junio 2026', tag: 'Legal', excerpt: 'Las 7 cláusulas que todo contrato freelance debe tener para protegerte de impagos.' },
  { title: 'Cómo protegerte del impago como autónomo', slug: '/guia-impago', date: 'Junio 2026', tag: 'Autónomos', excerpt: 'Todo lo que necesitas saber antes de facturar: prevención, detección y acción.' },
  { title: 'CFG vs Bonsai: ¿merece la pena cambiarse?', slug: '/vs-bonsai', date: 'Julio 2026', tag: 'Comparativas', excerpt: 'Análisis detallado después de la compra por Zoom: precios, funcionalidades y protección.' },
  { title: 'Mejores plataformas para encontrar clientes freelance en España', slug: '/blog/plataformas-clientes-freelance', date: 'Julio 2026', tag: 'Negocio', excerpt: 'Domestika, Malt, LinkedIn, Workana... ¿cuál es la mejor para tu perfil?' },
]
export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blog de <span className="text-emerald-400">CashFlow Guardian</span></h1>
        <p className="text-zinc-300 text-center mb-10">Guías, plantillas y estrategias para freelancers que quieren cobrar siempre.</p>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, i) => (
            <Link key={i} href={post.slug} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-700 transition-all block">
              <div className="flex items-start justify-between">
                <div><span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{post.tag}</span><h2 className="font-semibold mt-2 text-lg">{post.title}</h2><p className="text-sm text-zinc-400 mt-1">{post.excerpt}</p></div>
                <span className="text-xs text-zinc-500 whitespace-nowrap ml-4">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
