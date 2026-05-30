import Link from 'next/link'
export default function EarlyAdopter() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Programa Early Adopter</h1>
        <p className="text-zinc-300 mb-8">Los primeros 500 usuarios de CFG tendrán su precio congelado para siempre. Únete ahora y asegura tu tarifa.</p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-amber-400">499 plazas disponibles</h3>
          <p className="text-zinc-300 text-sm mb-4">Bloquea tu precio hoy y paga lo mismo siempre, aunque subamos los precios en el futuro.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Reservar mi plaza →</Link>
        </div>
      </div>
    </div>
  )
}