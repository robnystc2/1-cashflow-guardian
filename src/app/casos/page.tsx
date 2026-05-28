import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Casos de éxito — Freelancers que recuperaron su dinero con CFG',
  description: 'Historias reales de freelancers que blindaron sus proyectos con CFG y recuperaron miles de euros en impagos.',
}

const casos = [
  { nombre: 'Carlos Ruiz', profesion: 'Diseñador, Barcelona', recuperado: '3.200€', tiempo: '4 días', quote: 'Usé el PayScore y me pagaron el 50% por adelantado sin discutir.' },
  { nombre: 'Ana López', profesion: 'Consultora marketing, México DF', recuperado: '2.100€', tiempo: '6 días', quote: 'Subí mis precios un 40% porque sé que voy a cobrar.' },
  { nombre: 'Javier Herrera', profesion: 'Editor de vídeo, Lima', recuperado: '780€', tiempo: '48 horas', quote: 'Activé el Escudo Legal y en 48h el cliente pagó.' },
  { nombre: 'María González', profesion: 'Diseñadora, Madrid', recuperado: '2.400€', tiempo: '4 días', quote: 'Tenía 2.400€ pendientes. A los 4 días de usar CFG, el cliente pagó.' },
  { nombre: 'Lucía Fernández', profesion: 'Traductora, Santiago', recuperado: '0€ (prevención)', tiempo: '6 meses', quote: 'Llevo 6 meses sin un solo impago desde que activo CFG en cada proyecto.' },
  { nombre: 'Diego Martínez', profesion: 'Fotógrafo, Buenos Aires', recuperado: '0€ (prevención)', tiempo: '6 meses', quote: 'Ningún cliente me ha pagado tarde desde que uso CFG.' },
];

export default function CasosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Casos de éxito</h1>
        <p className="text-zinc-300 text-lg mb-10">Freelancers reales que blindaron sus proyectos con CFG.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casos.map((c, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{['🎨','📊','🎬','🎨','📝','📸'][i]}</span>
                <span className="font-bold text-emerald-400">{c.recuperado} recuperados</span>
                <span className="text-xs text-zinc-500 ml-auto">{c.tiempo}</span>
              </div>
              <p className="italic text-zinc-300 mb-3">"{c.quote}"</p>
              <p className="text-sm text-zinc-400">— {c.nombre}, {c.profesion}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Quiero ser el próximo caso de éxito →
          </Link>
        </div>
      </div>
    </main>
  )
}
