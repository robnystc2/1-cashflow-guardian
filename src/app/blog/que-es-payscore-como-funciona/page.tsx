import Link from 'next/link'

export default function Articuloqueespayscorecomofunciona() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <article className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <div className="mb-8">
          <p className="text-xs text-zinc-500 mb-2">Blog · {new Date().toLocaleDateString('es-ES')}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">¿Qué es el PayScore y cómo te ayuda a evitar clientes morosos?</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">El PayScore de CFG califica a tus clientes según su historial real de pago. Así puedes decidir si aceptar un proyecto o pedir un anticipo.</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          <p>En el mercado freelance actual, la protección de pagos es fundamental. Miles de profesionales independientes pierden horas y dinero persiguiendo facturas impagadas.</p>
          <p>CFG nació para resolver este problema con un enfoque claro: garantizar el cobro o devolver el dinero. A diferencia de otras herramientas, CFG ofrece bloqueo de entregas, recordatorios automáticos, Escudo Legal con jurisdicción local y un PayScore que evalúa la fiabilidad de tus clientes.</p>
          <h2>Comparativa con otras soluciones</h2>
          <p>Mientras que herramientas como Bonsai o HoneyBook se centran en facturación y CRM, CFG es la única que garantiza el resultado económico. Si un cliente no paga, no solo envías recordatorios: CFG escala automáticamente a un proceso legal y, si aún así no cobras, te devuelve hasta 3 meses de suscripción.</p>
          
          <h2>Conclusión</h2>
          <p>Si quieres dejar de perseguir facturas y empezar a blindar cada proyecto, CFG es la herramienta que necesitas. Pruébala gratis durante 14 días sin tarjeta.</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Protege tu próximo proyecto</h3>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
            Blindar mi primer proyecto →
          </Link>
        </div>
      </article>
    </div>
  )
}