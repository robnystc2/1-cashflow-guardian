import Link from 'next/link'

export default function LandingAsistentesvirtuales() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 text-center">
        <p className="text-sm text-red-400/80 font-medium mb-2">15.300€ recuperados para Asistentes Virtuales</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Protege tus proyectos de Asistentes Virtuales con CFG</h1>
        <p className="text-lg text-zinc-300 mb-4 italic">"Gestionaste su agenda. El pago lleva 60 días."</p>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">El 94% de nuestros usuarios Asistentes Virtuales cobran en menos de 14 días. Si no, te devolvemos 3 meses.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-12">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Bloqueo de entregas</h3>
            <p className="text-sm text-zinc-400">El cliente no recibe el siguiente hito hasta que pague. Así de simple.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Escudo Legal automatizado</h3>
            <p className="text-sm text-zinc-400">Cartas legales personalizadas sin mover un dedo.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">PayScore de clientes</h3>
            <p className="text-sm text-zinc-400">Descubre si un cliente paga bien antes de aceptar el proyecto.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Garantía Blindaje Total</h3>
            <p className="text-sm text-zinc-400">Si no cobras en 14 días, te devolvemos 3 meses de suscripción.</p>
          </div>
        </div>

        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
          Blindar mi primer proyecto →
        </Link>
      </div>
    </div>
  )
}