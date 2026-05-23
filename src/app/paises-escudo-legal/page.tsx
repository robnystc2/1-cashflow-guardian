import Link from 'next/link'
export default function PaisesEscudoLegal() {
  const paises = [
    '🇪🇸 España', '🇲🇽 México', '🇦🇷 Argentina', '🇨🇴 Colombia', '🇨🇱 Chile',
    '🇵🇪 Perú', '🇺🇾 Uruguay', '🇪🇨 Ecuador', '🇨🇷 Costa Rica', '🇵🇦 Panamá',
    '🇩🇴 República Dominicana', '🇺🇸 Estados Unidos', '🇨🇦 Canadá', '🇬🇧 Reino Unido',
    '🇫🇷 Francia', '🇩🇪 Alemania', '🇮🇹 Italia', '🇵🇹 Portugal', '🇧🇷 Brasil'
  ]
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Escudo Legal: <span className="text-emerald-400">países disponibles</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {paises.map((p, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300">{p}</div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-8">¿Tu país no está? <a href="mailto:hola@cashflowguardian.com" className="text-emerald-400 underline">Solicítalo aquí</a></p>
      </section>
    </div>
  )
}
