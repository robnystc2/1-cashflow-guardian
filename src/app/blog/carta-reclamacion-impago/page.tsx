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
        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Legal</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Modelo de carta de reclamación de impago España (plantilla descargable)</h1>
        <p className="text-zinc-400 text-sm mb-8">Publicado en Junio 2026 · 6 min de lectura</p>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4">
          <p>Cuando un cliente no paga, una carta de reclamación extrajudicial es el primer paso formal antes de la vía judicial. En España, esta carta no es obligatoria para iniciar un proceso monitorio, pero es altamente recomendable: el 80% de los impagos se resuelven en esta fase sin necesidad de ir a juicio.</p>

          <h2 className="text-xl font-bold mt-8 mb-4">Modelo de carta de reclamación de deuda</h2>
          <div className="bg-zinc-800 p-6 rounded-xl text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">{`[Tu nombre y apellidos]
[Dirección]
[Teléfono]
[Email]

A la atención de: [Nombre del cliente o empresa]
[Dirección del cliente]

ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA

Muy Sr./Sra. [Apellido del cliente]:

Por medio de la presente, le requiero formalmente el pago de la factura Nº [Número de factura] emitida el [Fecha de emisión], por un importe total de [Importe] €, correspondiente a [Descripción del trabajo realizado].

Dicha factura se encuentra impagada a fecha de hoy, [Fecha actual], habiendo transcurrido [X] días desde su vencimiento.

Le concedo un plazo improrrogable de SIETE (7) DÍAS HÁBILES para proceder al pago mediante [Transferencia bancaria / Domiciliación / Bizum] a la cuenta [Tu número de cuenta].

En caso de no recibir el pago en el plazo indicado, me veré en la obligación de iniciar las acciones legales pertinentes, incluyendo la reclamación judicial de la deuda más los intereses de demora correspondientes según la Ley 3/2004 de Morosidad.

Sin otro particular, quedo a la espera de su respuesta.

Atentamente,

[Firma]

[Tu nombre completo]`}</div>

          <h2 className="text-xl font-bold mt-8 mb-4">¿Cuándo enviar esta carta?</h2>
          <p>Recomendamos enviarla entre 7 y 14 días después del vencimiento de la factura, después de haber enviado al menos dos recordatorios amables previos. En CFG, este proceso está automatizado: el sistema envía los recordatorios y, si no hay respuesta, genera y envía la carta legal automáticamente.</p>

          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 mt-8">
            <p className="font-semibold text-emerald-400">¿Cansado de escribir estas cartas a mano?</p>
            <p className="text-sm mt-2">CFG las genera y envía automáticamente cuando un cliente no paga.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all mt-4">Proteger mis facturas <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </article>
    </div>
  )
}
