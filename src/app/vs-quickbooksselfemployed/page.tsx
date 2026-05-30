import Link from 'next/link'
export default function ComparativaQuickBooksSelfEmployed() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">CFG vs QuickBooks Self-Employed</h1>
        <p className="text-zinc-300 mb-8">Comparativa completa de funcionalidades, precios y protección de pagos.</p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-zinc-700 text-zinc-300 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">QuickBooks Self-Employed</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th></tr></thead>
            <tbody className="text-sm">
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Protección impago</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Bloqueo de entregas</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Calificación de clientes</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ PayScore</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Garantía de cobro</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ 3 meses gratis</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Soporte en español</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Nativo</td></tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold mb-4">¿Por qué CFG es la mejor alternativa a QuickBooks Self-Employed?</h2>
        <ul className="space-y-2 text-zinc-300 mb-8">
          <li>✅ CFG está diseñado para el mercado hispanohablante.</li>
          <li>✅ Incluye garantía de cobro sin letra pequeña.</li>
          <li>✅ El onboarding toma 3 minutos.</li>
        </ul>
        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full">Empezar con CFG →</Link>
        </div>
      </div>
    </div>
  )
}