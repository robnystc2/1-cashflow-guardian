import Link from 'next/link'
export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Terms</h1>
        <p className="text-zinc-400 mb-4">Página en construcción.</p>
        <Link href="/" className="text-emerald-400 hover:underline">Volver al inicio</Link>
      </div>
    </div>
  )
}
