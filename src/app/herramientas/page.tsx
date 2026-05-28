import type { Metadata } from 'next'
import Link from 'next/link'

const tools = [
  { icon: '🧮', title: 'Calculadora de riesgo de impago', desc: 'Calcula exactamente cuánto pierdes al año por clientes morosos.', href: '/calculadora-riesgo-impago' },
  { icon: '📄', title: 'Generador de contratos', desc: 'Crea un contrato anti-impago con hitos en 2 minutos.', href: '/generador-contratos' },
  { icon: '📨', title: 'Modelo carta reclamación', desc: 'Plantilla descargable lista para enviar a clientes morosos.', href: '/blog/modelo-carta-reclamacion-espana' },
  { icon: '💶', title: 'Calculadora de tarifa freelance', desc: 'Descubre cuánto deberías cobrar por hora según tu riesgo.', href: '/calculadora-irpf' },
  { icon: '🔍', title: 'Verificar cliente', desc: 'Comprueba el historial de pago antes de aceptar un proyecto.', href: '/check-cliente' },
];

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para freelancers — Calculadoras, plantillas y más | CFG',
  description: 'Calculadora de impago, generador de contratos, carta de reclamación descargable y más herramientas gratuitas.',
}

export default function HerramientasPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Herramientas gratuitas</h1>
        <p className="text-zinc-300 text-lg mb-10">Todo lo que necesitas para blindar tu negocio freelance.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <Link key={i} href={t.href} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-emerald-500 transition-all group">
              <span className="text-3xl">{t.icon}</span>
              <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-emerald-400">{t.title}</h2>
              <p className="text-sm text-zinc-400">{t.desc}</p>
              <span className="text-xs text-emerald-400 mt-2 inline-block">Usar gratis →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
