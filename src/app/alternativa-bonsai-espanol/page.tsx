import Link from 'next/link'
export default function AlternativaBonsai() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Alternativa a Bonsai en español</h1>
        <p className="text-lg text-zinc-300 mb-8">Bonsai fue comprada por Zoom. Su futuro es incierto. CFG es la alternativa independiente construida en España.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-8">
          <div className="bg-zinc-900 p-4 rounded-xl">✅ Protección anti-impago real</div>
          <div className="bg-zinc-900 p-4 rounded-xl">✅ Soporte en español nativo</div>
          <div className="bg-zinc-900 p-4 rounded-xl">✅ Garantía de devolución</div>
          <div className="bg-zinc-900 p-4 rounded-xl">✅ Precios en euros, sin sorpresas</div>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full">Probar CFG gratis →</Link>
      </div>
    </div>
  )
}