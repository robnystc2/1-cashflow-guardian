import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
const casos = [
  { nombre: 'Carlos Ruiz', rol: 'Diseñador gráfico, Barcelona', monto: '3.200€', dias: 4, cita: 'El cliente desapareció después de entregar el branding completo. Con CFG activé el bloqueo de hitos y en 4 días pagó todo. Ahora solo trabajo con clientes con PayScore ORO.', avatar: 'CR', color: 'bg-emerald-500/20 text-emerald-400' },
  { nombre: 'Ana López', rol: 'Consultora de marketing, México DF', monto: '2.100€', dias: 6, cita: 'Subí mis precios un 40% porque ahora sé que cobraré siempre. El PayScore me dice con quién trabajo y con quién no.', avatar: 'AL', color: 'bg-violet-500/20 text-violet-400' },
  { nombre: 'Diego Martínez', rol: 'Fotógrafo, Buenos Aires', monto: '1.800€', dias: 2, cita: 'El cliente pagó en 48h. Antes esperaba semanas. Nunca más perseguí una factura.', avatar: 'DM', color: 'bg-amber-500/20 text-amber-400' },
  { nombre: 'Javier Herrera', rol: 'Editor de vídeo, Lima', monto: '780€', dias: 6, cita: 'Pensé que era una estafa. A los 6 días tenía mi dinero. CFG es real y funciona.', avatar: 'JH', color: 'bg-rose-500/20 text-rose-400' },
  { nombre: 'María González', rol: 'Diseñadora, Madrid', monto: '2.400€', dias: 4, cita: 'Tenía 2.400€ atascados. Con el Escudo Legal, el cliente pagó sin rechistar. CFG me devolvió la tranquilidad.', avatar: 'MG', color: 'bg-emerald-500/20 text-emerald-400' },
  { nombre: 'Roberto Vega', rol: 'Editor de vídeo, Santiago', monto: '1.500€', dias: 3, cita: 'Entregaba en baja resolución hasta cobrar. Ahora el sistema lo hace solo. He recuperado 4.500€ este año.', avatar: 'RV', color: 'bg-cyan-500/20 text-cyan-400' },
]
export default function Casos() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Casos de <span className="text-emerald-400">éxito</span></h1>
        <p className="text-zinc-300 text-center mb-12">Freelancers reales que recuperaron su dinero con CashFlow Guardian.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casos.map((c, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${c.color}`}>{c.avatar}</div>
                <div><p className="font-semibold text-sm">{c.nombre}</p><p className="text-xs text-zinc-400">{c.rol}</p></div>
                <div className="ml-auto text-right"><p className="text-emerald-400 font-bold">{c.monto}</p><p className="text-xs text-zinc-500">en {c.dias} días</p></div>
              </div>
              <div className="flex gap-1 mb-2">{[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
              <p className="text-sm text-zinc-300 italic">"{c.cita}"</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Quiero ser el próximo caso de éxito <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  )
}
