import Link from 'next/link'
const changes = [
  { date: '21 mayo 2026', title: 'Nueva página de Comunidad Blindada', desc: 'Lanzamos el espacio donde los freelancers comparten clientes problemáticos.', type: 'feature' },
  { date: '20 mayo 2026', title: 'Calculadora de riesgo mejorada', desc: 'Ahora incluye % de clientes que pagan tarde y fórmula transparente.', type: 'improvement' },
  { date: '19 mayo 2026', title: 'Soporte para facturación mexicana', desc: 'Ahora CFG genera facturas compatibles con el SAT de México.', type: 'feature' },
  { date: '15 mayo 2026', title: 'Escudo Legal en Argentina y Colombia', desc: 'Cartas legales adaptadas a la legislación local.', type: 'feature' },
  { date: '10 mayo 2026', title: 'Mejora del PayScore', desc: 'El algoritmo ahora incluye historial de pagos de los últimos 12 meses.', type: 'improvement' },
  { date: '1 mayo 2026', title: 'Lanzamiento de Garantía Blindaje Total', desc: '3 meses gratis si no cobras siguiendo el proceso.', type: 'major' },
]
export default function Changelog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Changelog</h1>
        <p className="text-zinc-300 text-center mb-10">Cada mejora, cada feature, cada corrección. Transparencia total.</p>
        <div className="relative border-l-2 border-zinc-800 pl-6 space-y-10">
          {changes.map((c, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-zinc-800 ${c.type === 'major' ? 'bg-emerald-500' : c.type === 'feature' ? 'bg-emerald-700' : 'bg-zinc-700'}`} />
              <span className="text-xs text-zinc-500">{c.date}</span>
              <h3 className="font-semibold mt-1">{c.title}</h3>
              <p className="text-sm text-zinc-400 mt-1">{c.desc}</p>
              {c.type === 'major' && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full mt-2 inline-block">Importante</span>}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-zinc-500 mt-12">Última actualización: 23 de mayo de 2026</p>
      </section>
    </div>
  )
}
