import Link from 'next/link'
export default function FreelancersRecomendados() {
  const freelancers = [
    { nombre: 'Carlos Ruiz', profesion: 'Diseñador', pais: 'España', score: 98 },
    { nombre: 'Ana López', profesion: 'Consultora', pais: 'México', score: 95 },
    { nombre: 'Lucía Fernández', profesion: 'Traductora', pais: 'Chile', score: 90 },
  ];
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Freelancers Recomendados por CFG</h1>
        <p className="text-zinc-300 mb-8">Clientes verificados con alta tasa de cobro y profesionalidad demostrada.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {freelancers.map((f, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
              <h3 className="font-bold">{f.nombre}</h3>
              <p className="text-sm text-zinc-400">{f.profesion} · {f.pais}</p>
              <p className="text-xs text-emerald-400 mt-2">Score CFG: {f.score}%</p>
            </div>
          ))}
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full mt-8">Unirme como freelancer verificado →</Link>
      </div>
    </div>
  )
}