import Link from 'next/link'

export default function ComparativaWave() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs Wave</h1>
        <p className="text-lg text-zinc-300 mb-8 text-center">Comparativa completa: protección de pagos, funcionalidades y precios.</p>

        {/* Tabla comparativa */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-300 text-sm">
                <th className="py-3 px-4">Funcionalidad</th>
                <th className="py-3 px-4 text-center">Wave</th>
                <th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Protección impago</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Garantizado</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Bloqueo de entregas</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Automático</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Calificación de clientes</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ PayScore</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Garantía de cobro</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ 3 meses gratis</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Soporte en español</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Nativo</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Precio</td><td className="py-3 px-4 text-center text-zinc-400">Gratis</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">29€/mes</td></tr>
            </tbody>
          </table>
        </div>

        {/* Pros / Contras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="text-amber-400 font-bold mb-4">✅ Ventajas de Wave</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-amber-400">•</span><span className="text-sm text-zinc-300">Gratuito</span></li>
<li className="flex items-start gap-2"><span className="text-amber-400">•</span><span className="text-sm text-zinc-300">Facturación básica</span></li>
            </ul>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="text-red-400 font-bold mb-4">❌ Limitaciones frente a CFG</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-red-400">•</span><span className="text-sm text-zinc-300">Funcionalidades limitadas</span></li>
<li className="flex items-start gap-2"><span className="text-red-400">•</span><span className="text-sm text-zinc-300">Sin protección legal</span></li>
<li className="flex items-start gap-2"><span className="text-red-400">•</span><span className="text-sm text-zinc-300">Sin soporte multi-moneda real</span></li>
            </ul>
          </div>
        </div>

        {/* Guía de migración */}
        <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-6 mb-8">
          <h3 className="text-amber-300 font-bold mb-2">📋 Guía de migración de Wave a CFG</h3>
          <p className="text-sm text-zinc-300 mb-4">Sigue estos pasos para migrar tus proyectos en menos de 10 minutos.</p>
          <ol className="text-sm text-zinc-300 space-y-1 list-decimal list-inside">
            <li>Exporta tus clientes y proyectos activos de Wave.</li>
            <li>Crea tu cuenta gratuita en CFG (3 minutos).</li>
            <li>Importa tus proyectos y configura los hitos de pago.</li>
            <li>Activa la protección automática en cada proyecto.</li>
          </ol>
          <Link href="/register" className="inline-block mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">
            Migrar a CFG ahora →
          </Link>
        </div>

        {/* CTA final */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm mb-4">No pierdas otro cliente por falta de protección.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full">
            Blindar mi primer proyecto →
          </Link>
        </div>
      </div>
    </div>
  )
}