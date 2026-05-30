export default function EstadoSector() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Estado del sector freelance</h1>
        <p className="text-zinc-300 mb-8">Datos anonimizados de la red CFG. Actualizado trimestralmente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Tasa media de impago por país</h3>
            <p className="text-sm text-zinc-400">España: 12% · México: 18% · Argentina: 22% · Colombia: 15%</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Tiempo medio de cobro</h3>
            <p className="text-sm text-zinc-400">Con CFG: 6 días. Sin CFG: 52 días (media del sector).</p>
          </div>
        </div>
      </div>
    </div>
  )
}