export default function Status() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Estado del servicio</h1>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4 mb-4">
          <p className="text-emerald-400 font-bold">✅ Todos los sistemas operativos</p>
        </div>
        <p className="text-zinc-400 text-sm">Última incidencia: ninguna registrada en los últimos 90 días.</p>
      </div>
    </div>
  )
}