import Link from 'next/link'
export default function ContratoDesarrollador() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contrato freelance para desarrollador</h1>
        <p className="text-zinc-300 mb-6">Descarga nuestra plantilla gratuita de contrato para desarrollador y protégete legalmente.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 mb-8">
          <p className="text-sm text-zinc-400">Para descargar el contrato, déjanos tu email y te lo enviaremos al instante.</p>
          <input type="email" placeholder="tu@email.com" className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white mt-3" />
          <button className="mt-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Obtener contrato gratis</button>
        </div>
        <Link href="/register" className="text-emerald-400 hover:text-emerald-300">¿Prefieres que CFG lo gestione todo? →</Link>
      </div>
    </div>
  )
}