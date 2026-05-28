import type { Metadata } from 'next'
import Link from 'next/link'

const tools = [
  { name: 'Holded', icon: '📊', desc: 'Sincroniza tus facturas y protégelas automáticamente.' },
  { name: 'Quipu', icon: '📋', desc: 'Conecta tu facturación y añade protección anti-impago.' },
  { name: 'Stripe', icon: '💳', desc: 'Cobra por Stripe y CFG gestiona los recordatorios.' },
  { name: 'PayPal', icon: '🅿️', desc: 'Tus clientes pagan por PayPal. CFG se encarga del resto.' },
  { name: 'Wise', icon: '💱', desc: 'Cobra en múltiples divisas con Wise y CFG.' },
  { name: 'Google Calendar', icon: '📅', desc: 'CFG marca vencimientos en tu calendario automáticamente.' },
  { name: 'Zapier', icon: '⚡', desc: 'Conecta CFG con 5000+ apps.' },
  { name: 'Notion', icon: '📝', desc: 'Sincroniza tus proyectos de Notion con CFG.' },
  { name: 'Slack', icon: '💬', desc: 'Recibe notificaciones de cobro en Slack.' },
  { name: 'WhatsApp', icon: '📱', desc: 'Recordatorios de pago por WhatsApp con tu número.' },
];

export const metadata: Metadata = {
  title: 'Integraciones — Conecta CFG con tus herramientas | CFG',
  description: 'CFG se integra con Holded, Quipu, Stripe, PayPal, Wise, Zapier, Notion y más.',
}

export default function IntegracionesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Integraciones</h1>
        <p className="text-zinc-300 text-lg mb-10">CFG se conecta con las herramientas que ya usas.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <span className="text-3xl">{t.icon}</span>
              <h2 className="text-xl font-bold mt-2 mb-2">{t.name}</h2>
              <p className="text-sm text-zinc-400">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Empezar gratis →
          </Link>
        </div>
      </div>
    </main>
  )
}
