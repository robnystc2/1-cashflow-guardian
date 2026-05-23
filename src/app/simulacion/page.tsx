import Link from 'next/link'
export default function Simulacion() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Simula tu primer proyecto</h1>
        <p className="text-zinc-300 mb-8">En 60 segundos verás cómo CFG protege un proyecto de 1.500€.</p>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 space-y-4 text-left">
          <div><label className="text-sm text-zinc-400">Nombre del cliente</label><input type="text" placeholder="Ej: Agencia XYZ" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Hitos (separados por comas)</label><input type="text" placeholder="Ej: Boceto, Diseño final" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Simular blindaje →</button>
        </div>
      </div>
    </div>
  )
}
