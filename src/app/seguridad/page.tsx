import Link from 'next/link'
export default function Seguridad() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">CFG</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Blindarme por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Centro de <span className="text-emerald-400">Seguridad</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Cifrado AES-256', desc: 'Toda la información está cifrada en tránsito y en reposo.' },
            { title: 'Servidores en Europa', desc: 'Tus datos se almacenan en centros de datos europeos.' },
            { title: 'Cumplimiento RGPD', desc: 'Cumplimos estrictamente con el Reglamento General de Protección de Datos.' },
            { title: 'Política de retención', desc: 'Puedes exportar o eliminar tus datos en cualquier momento.' },
            { title: 'SLA de uptime', desc: 'Garantizamos un 99.9% de disponibilidad.' },
            { title: 'Historial de incidentes', desc: 'No hemos tenido ninguna brecha de seguridad desde nuestra fundación.' },
            { title: 'Autenticación de dos factores', desc: 'Disponible para todos los planes.' },
            { title: 'Monitorización 24/7', desc: 'Nuestro equipo de seguridad monitoriza la plataforma continuamente.' },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
