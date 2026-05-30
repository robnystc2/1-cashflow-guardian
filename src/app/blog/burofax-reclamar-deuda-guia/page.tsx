import Link from 'next/link'
export default function Articuloburofaxreclamardeudaguia() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <article className="max-w-4xl mx-auto">
        <p className="text-xs text-zinc-500 mb-2">Blog · Legal</p>
        <h1 className="text-4xl font-bold mb-4">Burofax para reclamar deuda: guía completa</h1>
        <p className="text-zinc-400 mb-8">Contenido completo próximamente. Mientras tanto, descubre cómo CFG protege tus cobros.</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Blindar mi primer proyecto gratis →</Link>
      </article>
    </div>
  )
}