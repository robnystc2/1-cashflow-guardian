import Link from 'next/link'
export default function Futuro() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">CFG</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Blindarme por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Roadmap <span className="text-emerald-400">Público</span></h1>
        <p className="text-zinc-300 mb-8">Lo que estamos construyendo para que CFG sea imbatible.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            { title: 'PayScore Interoperable', desc: 'Comparte el historial de pago de clientes con toda la red CFG. El "Carfax para clientes".' },
            { title: 'Factoring / Anticipo de facturas', desc: 'Cobra el 80% de tu factura en 24h. Partnership con fintech en camino.' },
            { title: 'Alertas de riesgo por sector', desc: 'Datos de mercado en tiempo real: "En agencias de marketing, los impagos subieron un 23% este trimestre."' },
            { title: 'Integración con Google My Business', desc: 'Cassandra cruzará el PayScore con las reseñas públicas del cliente.' },
            { title: 'Negociación asistida por IA', desc: 'Cuando un cliente disputa el trabajo, CFG generará la respuesta legal adecuada.' },
            { title: 'Modo Subcontratista', desc: 'Protección para freelancers que trabajan para agencias.' },
            { title: 'Verificación con LinkedIn', desc: 'Cassandra analizará el perfil de LinkedIn del cliente en busca de señales de riesgo.' },
            { title: 'App móvil nativa', desc: 'iOS y Android en desarrollo.' },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2 text-emerald-400">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
