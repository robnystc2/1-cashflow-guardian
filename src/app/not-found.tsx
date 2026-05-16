import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-zinc-400 mb-6">Esto no existe... pero tu impago sí.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full transition-all">
          Vuelve al inicio →
        </Link>
      </div>
    </div>
  )
}
