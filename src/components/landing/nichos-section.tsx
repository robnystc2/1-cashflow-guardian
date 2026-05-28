'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Palette, Code2, BarChart3, Camera, PenTool, Globe, Megaphone, Briefcase, Building2, Film, Shield, Lock, Scale, Stethoscope, Music, Search, FileText } from 'lucide-react'

const categorias = ['Todos', 'Creativo', 'Técnico', 'Consultor', 'Educador']

const profesiones = [
  { role: 'Diseñador', icon: 'Palette', pain: 'Entregaste el logo. El cliente desapareció con él.', count: '47.200€ recuperados', cat: 'Creativo', caseName: 'Carlos Ruiz', caseDetail: 'Diseñador de Barcelona. Recuperó 3.200€ en 4 días.' },
  { role: 'Desarrollador', icon: 'Code2', pain: 'El MVP funciona perfecto. El pago: no tan perfecto.', count: '58.300€ recuperados', cat: 'Técnico', caseName: 'Miguel Fernández', caseDetail: 'Desarrollador web. Escudo Legal lo resolvió en 6 días.' },
  { role: 'Consultor', icon: 'BarChart3', pain: 'Auditoría impecable. Factura ignorada.', count: '32.100€ recuperados', cat: 'Consultor', caseName: 'Ana López', caseDetail: 'Consultora en México DF. Subió precios 40% tras blindar sus proyectos.' },
  { role: 'Fotógrafo', icon: 'Camera', pain: 'Las fotos están en su web y en sus redes. Tu factura sigue en el limbo.', count: '18.500€ recuperados', cat: 'Creativo', caseName: 'Diego Martínez', caseDetail: 'Fotógrafo de Buenos Aires. Nunca tuvo un impago gracias al PayScore.' },
  { role: 'Copywriter', icon: 'PenTool', pain: 'Tus textos ya están indexados en Google generando tráfico. Tu factura, ni en spam.', count: '25.400€ recuperados', cat: 'Creativo', caseName: 'Lucía Fernández', caseDetail: 'Copywriter. Sus textos ya estaban indexados.' },
  { role: 'Traductor', icon: 'Globe', pain: 'Traducción entregada. Esperando pago.', count: '11.200€ recuperados', cat: 'Consultor', caseName: 'Javier Herrera', caseDetail: 'Traductor. Cobró en 48h lo que antes tardaba 3 semanas.' },
  { role: 'Gestor de Ads', icon: 'Megaphone', pain: 'Inviertes en campañas. Tu pago no llega.', count: '19.800€ recuperados', cat: 'Consultor', caseName: 'Pedro Sánchez', caseDetail: 'Gestor de ads. El sistema pausó las campañas.' },
  { role: 'Asistente Virtual', icon: 'Briefcase', pain: 'Gestionaste su agenda 3 meses. Le conseguiste 5 clientes. El \'te pago pronto\' lleva 60 días.', count: '15.300€ recuperados', cat: 'Consultor', caseName: 'Carmen Ruiz', caseDetail: 'Asistente virtual. Organizó sus horas en hitos.' },
  { role: 'Editor de vídeo', icon: 'Film', pain: '30 horas de edición. El canal tiene 50.000 reproducciones. Tu factura lleva 45 días esperando.', count: '10.900€ recuperados', cat: 'Creativo', caseName: 'Roberto Vega', caseDetail: 'Editor de vídeo. El 4K se desbloqueaba al pagar.' },
  { role: 'Agencia pequeña', icon: 'Building2', pain: 'Múltiples clientes. Caos de cobros.', count: '8.700€ recuperados', cat: 'Consultor', caseName: 'Laura Gómez', caseDetail: 'Agencia con 10 clientes. CFG gestiona cobros.' },
  { role: 'Coach / Terapeuta', icon: 'Stethoscope', pain: 'Sesiones dadas. Factura olvidada.', count: '5.600€ recuperados', cat: 'Educador', caseName: 'María José', caseDetail: 'Coach. Recordatorio automático después de cada sesión.' },
  { role: 'Productor musical', icon: 'Music', pain: 'Tu beat tiene 200.000 streams. El artista firmó con una discográfica. Tú sin un euro.', count: '3.200€ recuperados', cat: 'Creativo', caseName: 'Andrés Calle', caseDetail: 'Productor musical. Pagos puntuales.' },
  { role: 'Motion Designer', icon: 'Film', pain: 'Animación entregada. Factura fantasma.', count: '7.800€ recuperados', cat: 'Creativo', caseName: 'Sofía Ramos', caseDetail: 'Motion designer. Sus animaciones se bloqueaban hasta el pago.' },
  { role: 'Data Analyst', icon: 'BarChart3', pain: 'Dashboard impecable. Pago ausente.', count: '6.200€ recuperados', cat: 'Técnico', caseName: 'David León', caseDetail: 'Data analyst. Reportes solo visibles tras cobrar.' },
  { role: 'Social Media Manager', icon: 'Megaphone', pain: 'Contenido viral. Factura invisible.', count: '8.100€ recuperados', cat: 'Creativo', caseName: 'Héctor Díaz', caseDetail: 'Social media manager. Informes solo tras cobrar.' },
  { role: 'Desarrollador Shopify', icon: 'Code2', pain: 'Tienda lista. Pago pendiente.', count: '12.400€ recuperados', cat: 'Técnico', caseName: 'Álex Campos', caseDetail: 'Dev Shopify. La tienda no se lanzaba hasta el pago final.' },
  { role: 'Especialista Make/Zapier', icon: 'Search', pain: 'Automatización funcionando. Factura ignorada.', count: '5.900€ recuperados', cat: 'Técnico', caseName: 'Nuria Gálvez', caseDetail: 'Especialista en automatizaciones. Workflows bloqueados.' },
  { role: 'Profesor de idiomas', icon: 'Globe', pain: 'Clases impartidas. Transferencia fantasma.', count: '2.100€ recuperados', cat: 'Educador', caseName: 'Clara Soto', caseDetail: 'Profesora online. Grabaciones bloqueadas hasta recibir el pago.' },
]

const iconMap: Record<string, any> = {
  Palette, Code2, BarChart3, Camera, PenTool, Globe, Megaphone, Briefcase, Building2, Film, Shield, Lock, Scale, Stethoscope, Music, Search, FileText
}

export default function NichosSection() {
  const [filterCat, setFilterCat] = useState('Todos')
  const [nicheModal, setNicheModal] = useState<number | null>(null)
  const [otherProfession, setOtherProfession] = useState('')
  const [otherSubmitted, setOtherSubmitted] = useState(false)

  const filtered = filterCat === 'Todos' ? profesiones : profesiones.filter(p => p.cat === filterCat)

  return (
    <section id="suena-esto" className="py-10 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Eres uno de estos?</h2>
        <p className="text-zinc-400 text-sm mb-6">Cada profesión tiene un dolor distinto. El resultado de CFG es siempre el mismo: cobras.</p>
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${filterCat === cat ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filtered.map((item, i) => {
            const Icon = iconMap[item.icon] || Palette
            return (
              <button key={i} onClick={() => setNicheModal(nicheModal === i ? null : i)} className={`bg-zinc-900 border rounded-xl p-2.5 transition-all text-center group cursor-pointer duration-200 ${nicheModal === i ? 'border-emerald-500 -translate-y-1' : 'border-zinc-800 hover:border-emerald-700 hover:-translate-y-1'}`}>
                <Icon className="w-5 h-5 mx-auto mb-1 text-teal-400" />
                <h4 className="font-semibold text-[11px]">{item.role}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{item.pain}</p>
                <p className="text-[9px] text-emerald-500/70 mt-1 font-medium">{item.count}</p>
              </button>
            )
          })}
          <div className="bg-zinc-900 border-2 border-emerald-600 rounded-xl p-3 transition-all text-center group hover:border-emerald-500 hover:-translate-y-1 duration-200 flex flex-col items-center justify-center cursor-pointer relative col-span-2 md:col-span-1">
            {!otherSubmitted ? (
              <>
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">¿No está tu profesión?</span>
                <span className="text-2xl mb-1">❓</span>
                <input type="text" placeholder="Tu profesión" value={otherProfession} onChange={e => setOtherProfession(e.target.value)} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Enter' && otherProfession.trim()) { setOtherSubmitted(true) } }} className="text-xs bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-white w-full text-center placeholder-zinc-500 outline-none focus:border-emerald-500" />
                <button onClick={() => { if (otherProfession.trim()) setOtherSubmitted(true) }} className="text-[10px] text-emerald-400 mt-1 hover:text-emerald-300 transition-colors">Yo también existo →</button>
              </>
            ) : (
              <div className="text-center">
                <svg className="w-5 h-5 text-emerald-400 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                <p className="text-xs text-emerald-400 font-semibold">¡{otherProfession} también!</p>
                <Link href="/register" className="mt-2 inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-[10px] px-3 py-1 rounded-full transition-all">Blindarme →</Link>
              </div>
            )}
          </div>
        </div>
        {nicheModal !== null && (
          <div className="mt-6 bg-zinc-900 border border-emerald-700 rounded-2xl p-6 max-w-xl mx-auto text-left">
            <div className="flex items-center gap-3 mb-3">
              {(() => { const Icon = iconMap[filtered[nicheModal].icon] || Palette; return <Icon className="w-6 h-6 text-emerald-400" /> })()}
              <h3 className="font-bold text-emerald-400">{filtered[nicheModal].role}</h3>
              <button onClick={() => setNicheModal(null)} className="ml-auto text-zinc-400 hover:text-white text-lg">&times;</button>
            </div>
            <p className="text-sm text-zinc-300">Caso real: <strong className="text-white">{filtered[nicheModal].caseName}</strong>. {filtered[nicheModal].caseDetail}</p>
            <p className="text-xs text-emerald-400 mt-2 font-semibold">{filtered[nicheModal].count}</p>
            <Link href="/register" className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all hover:scale-105">Blindar mis proyectos de {filtered[nicheModal].role.toLowerCase()} →</Link>
          </div>
        )}
      </div>
    </section>
  )
}
