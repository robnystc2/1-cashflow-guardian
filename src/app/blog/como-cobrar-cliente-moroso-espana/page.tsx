import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Articulo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <article className="py-16 px-4 max-w-2xl mx-auto">
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Cobro</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Cómo cobrar a un cliente que no paga en España (guía 2026)</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Mayo 2026 · 8 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>Si eres freelancer o autónomo en España, es casi seguro que alguna vez has tenido un cliente que no te ha pagado a tiempo. O peor: que no te ha pagado nunca. Según datos del sector, el 71% de los freelancers españoles ha sufrido impagos en el último año. La factura media impagada es de 1.200€.</p>
          <p>En esta guía te explicamos paso a paso qué hacer cuando un cliente no paga, desde el recordatorio amable hasta la reclamación judicial, y cómo protegerte para que no vuelva a pasar.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. La prevención: el mejor antídoto contra el impago</h2>
          <p>La mejor forma de cobrar es prevenir el impago antes de que ocurra. Esto implica tener un contrato sólido con hitos claros, condiciones de pago definidas y un sistema de bloqueo de entrega que impida que el cliente reciba el trabajo final sin haber pagado.</p>
          <p>En CFG, cada proyecto se divide en hitos. El cliente solo recibe el siguiente entregable cuando ha pagado el anterior. Si no paga, el sistema activa automáticamente recordatorios escalados (Amable → Firme → Legal) sin que tú tengas que intervenir.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. El recordatorio amable (Día 0)</h2>
          <p>Muchos impagos son simples olvidos. Un email amable en la fecha de vencimiento o uno o dos días después resuelve el 60% de los casos. El mensaje debe ser profesional, directo y con un enlace de pago fácil.</p>
          <div className="bg-zinc-800 p-4 rounded-xl text-sm italic text-zinc-400">"Hola [Nombre], adjunto la factura [Nº] del proyecto [X]. Puedes pagar fácilmente aquí: [enlace]. Gracias."</div>

          <h2 className="text-xl font-bold mt-8 mb-4">3. El recordatorio firme (Día 3-5)</h2>
          <p>Si el cliente no responde, el tono debe cambiar. Un segundo aviso más directo, indicando que el siguiente hito está bloqueado hasta recibir el pago, suele ser efectivo en otro 20% de los casos.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. La carta de reclamación extrajudicial (Día 7)</h2>
          <p>Una carta de reclamación con membrete de abogado o con referencias legales (Artículo 517 LEC) tiene un 80% de efectividad. El cliente sabe que el siguiente paso es el juzgado y la mayoría paga antes de llegar a ese punto. En CFG, esta carta se genera automáticamente con los datos del proyecto y del cliente, adaptada a la legislación de tu país.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. La vía judicial (Día 14-21)</h2>
          <p>Si todo lo anterior falla, la última opción es acudir a los tribunales. Para facturas de hasta 2.000€, el proceso monitorio es rápido y no requiere abogado. Pero tiene un coste en tiempo y dinero que muchos freelancers no pueden asumir. Por eso, CFG incluye una Garantía Blindaje Total: si sigues el proceso y no cobras en 14 días, te devolvemos 3 meses de suscripción.</p>

          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">Protege tus facturas con CFG</p>
            <p className="text-sm mt-2">Activa el blindaje en 3 minutos y deja que el sistema cobre por ti.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Empezar blindaje gratis <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}

<p className="text-xs text-zinc-500 mt-4">* Datos basados en encuestas internas a usuarios de CFG (2025-2026).</p>