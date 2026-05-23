import Link from 'next/link'
export default function Manifiesto() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">CFG</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Blindarme por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Carta del <span className="text-emerald-400">Fundador</span></h1>
        <p className="text-sm text-zinc-400 mb-8">Por Rodrigo, 16 años, Tenerife</p>
        <div className="text-left text-zinc-300 space-y-4 bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8">
          <p>Era octubre de 2024. Tenía 16 años y acababa de entregar mi primer proyecto grande. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció.</p>
          <p>Intenté todo: emails, llamadas, mensajes por Instagram. Nada. En total, perdí 4.800€ que nunca volví a ver. Fue entonces cuando decidí que ningún freelancer debería pasar por lo mismo.</p>
          <p>Busqué herramientas que me protegieran. No existían. Así que construí CFG.</p>
          <p>Mi compromiso contigo es simple: nunca más tendrás que perseguir una factura. Si CFG no te protege, te devolvemos tu dinero.</p>
          <p>— Rodrigo</p>
        </div>
      </section>
    </div>
  )
}
