import Link from 'next/link'
export default function Bienvenido() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">¡Cuenta creada!</h1>
        <p className="text-zinc-300 mb-8">Haz esto en 60 segundos para blindar tu primer proyecto:</p>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">1</div>
            <div>
              <p className="font-bold text-sm">Crea tu primer proyecto</p>
              <p className="text-xs text-zinc-400">Define los hitos y el importe en 3 minutos.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">2</div>
            <div>
              <p className="font-bold text-sm">Invita a tu cliente</p>
              <p className="text-xs text-zinc-400">Recibirá una notificación con los términos de entrega.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">3</div>
            <div>
              <p className="font-bold text-sm">Blindaje activo</p>
              <p className="text-xs text-zinc-400">CFG monitoreará los pagos y te avisará automáticamente.</p>
            </div>
          </div>
        </div>
        <Link href="/overview" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 mt-8">Ir a mi panel →</Link>
      </div>
    </div>
  )
}
