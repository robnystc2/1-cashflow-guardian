import Link from 'next/link'

export default function MigrarDeBonsai() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">Guía de migración de Bonsai a CFG</h1>
        <p className="text-lg text-zinc-300 mb-8 text-center">Bonsai fue comprada por Zoom. Si eres uno de los 100.000 freelancers que buscan una alternativa, esta guía te explica cómo migrar en 10 minutos.</p>

        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 1: Exporta tus datos de Bonsai</h2>
            <p className="text-zinc-300 text-sm">Accede a tu cuenta de Bonsai, ve a Configuración y descarga tus clientes y proyectos activos en formato CSV. También puedes descargar tus contratos y facturas pendientes.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 2: Crea tu cuenta en CFG (gratis)</h2>
            <p className="text-zinc-300 text-sm">Regístrate en CFG en menos de 3 minutos. No necesitas tarjeta de crédito. Activa tu prueba gratuita de 14 días del plan Blindaje Pro.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 3: Importa tus proyectos</h2>
            <p className="text-zinc-300 text-sm">Desde el panel de CFG, puedes importar tus clientes y proyectos. Define los hitos de pago para cada uno y activa la protección automática.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Paso 4: Activa el Escudo Legal y olvídate</h2>
            <p className="text-zinc-300 text-sm">CFG se encargará de los recordatorios y, si un cliente no paga, activará el Escudo Legal automáticamente. Si en 14 días no cobras, te devolvemos 3 meses de suscripción.</p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">¿Listo para migrar?</h3>
            <p className="text-zinc-300 mb-6">Únete a los cientos de freelancers que ya están protegidos con CFG.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
              Migrar a CFG ahora →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}