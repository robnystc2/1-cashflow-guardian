import Link from 'next/link'

export default function LandingMéxico() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Protege tus cobros en México con CFG</h1>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
          Escudo Legal adaptado a la legislación de México. Recordatorios automáticos, bloqueo de entregas y garantía de cobro en pesos mexicanos.
        </p>
        
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-2xl mx-auto mb-8">
          <h3 className="text-xl font-bold mb-4">CFG funciona en México</h3>
          <ul className="text-left text-sm text-zinc-300 space-y-2">
            <li>✅ Cartas legales con jurisdicción local (Código de Comercio y Ley de Títulos y Operaciones de Crédito)</li>
            <li>✅ Soporte multi-moneda (incluye pesos mexicanos)</li>
            <li>✅ Comunidad de freelancers en México</li>
            <li>✅ Garantía Blindaje Total: si no cobras en 14 días, te devolvemos 3 meses</li>
          </ul>
        </div>

        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
          Comenzar ahora →
        </Link>
      </div>
    </div>
  )
}