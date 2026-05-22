import { Shield, Lock, Scale, BarChart3, Megaphone, FileText, Clock, Wallet } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Detección de clientes de alto riesgo', desc: 'Warning automático al crear proyecto con cliente nuevo sin historial.' },
  { icon: Lock, title: 'Anticipo automático según PayScore', desc: 'Si el cliente es BRONCE, el sistema sugiere pedir 50% por adelantado.' },
  { icon: Scale, title: 'Seguros de impago opcionales', desc: 'Cobertura total para proyectos >5.000€. Prima calculada según PayScore.' },
  { icon: BarChart3, title: 'CashFlow Forecast', desc: 'Proyección de cobros a 90 días basada en historial e hitos pendientes.' },
  { icon: Megaphone, title: 'Notificación WhatsApp al cliente', desc: 'Recordatorios vía WhatsApp. 98% de tasa de apertura.' },
  { icon: FileText, title: 'Propuesta → Contrato → Factura', desc: 'Un solo flujo desde la propuesta inicial hasta el cobro.' },
  { icon: Clock, title: 'Firma digital de hitos', desc: 'El cliente firma digitalmente cada hito aceptado. Evidencia legal automática.' },
  { icon: Wallet, title: 'Informe anual de salud financiera', desc: 'PDF con total facturado, cobrado, tiempo medio de cobro y clientes rentables.' },
]

export default function FeaturesAvanzadas() {
  return (
    <section className="py-12 px-4 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que tu competencia no tiene</h2>
        <p className="text-zinc-400 text-sm mb-10">Features que ningún otro software freelance ofrece en español.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((f, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-700 transition-all">
              <f.icon className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
