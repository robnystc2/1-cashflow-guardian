import Link from 'next/link'
export default function CheckCliente() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Check de <span className="text-emerald-400">cliente gratuito</span></h1>
        <p className="text-xl text-zinc-300 mb-8">Pega el email o LinkedIn de un cliente nuevo y Cassandra te dice en segundos si tiene historial de impago en nuestra red.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="text" placeholder="Email o LinkedIn del cliente" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Verificar</button>
          </div>
        </div>
        <p className="text-xs text-zinc-500">Cada búsqueda ayuda a construir el directorio de confianza freelance más grande del mundo hispanohablante. <Link href="/register" className="text-emerald-400 underline">Protege tu proyecto con CFG</Link></p>
      </section>
    </div>
  )
}
