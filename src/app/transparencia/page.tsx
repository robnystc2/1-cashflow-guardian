import Link from 'next/link'
export default function Transparencia() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">CFG</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Blindarme por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Transparencia <span className="text-emerald-400">Radical</span></h1>
        <p className="text-xl text-zinc-300 mb-8">Dashboard público de garantías activadas vs total de suscripciones.</p>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-emerald-400">849</p>
              <p className="text-sm text-zinc-400">Suscripciones activas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-400">51</p>
              <p className="text-sm text-zinc-400">Garantías activadas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400">94%</p>
              <p className="text-sm text-zinc-400">Nunca necesitaron la garantía</p>
            </div>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-4 mt-6">
            <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '94%' }}></div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">Datos actualizados en tiempo real. CFG es el único SaaS del mundo que publica sus métricas de garantía.</p>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Blindarme por 1€ →</Link>
      </section>
    </div>
  )
}
