export default function Changelog() {
  const cambios = [
    { fecha: '2026-05-28', tipo: 'Feature', texto: 'Lanzamiento de la nueva landing con 119 mejoras.' },
    { fecha: '2026-05-25', tipo: 'Mejora', texto: 'Calculadora de riesgo añadida.' },
    { fecha: '2026-05-15', tipo: 'Expansión', texto: 'Soporte para México y Colombia.' },
  ];
  const colores = { Feature: 'bg-emerald-500', Mejora: 'bg-blue-500', Fix: 'bg-red-500', 'Expansión': 'bg-purple-500' };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Changelog</h1>
        <div className="space-y-3">
          {cambios.map((c, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 flex items-start gap-3">
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${colores[c.tipo]} text-black`}>{c.tipo}</span>
              <div>
                <p className="text-sm text-zinc-300">{c.texto}</p>
                <p className="text-xs text-zinc-500 mt-1">{c.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}