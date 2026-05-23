import Link from 'next/link'
export default function Onboarding() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-3xl font-bold mb-4">¡Tu primer proyecto está blindado!</h1>
        <p className="text-zinc-300 mb-8">En unos días, cuando el sistema envíe su primer recordatorio y el cliente pague sin que tú tengas que hacer nada, ese será tu "aha moment".</p>
        <Link href="/overview" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Ir a mi panel →</Link>
      </div>
    </div>
  )
}
