import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG + WhatsApp Business — Recordatorios que tus clientes sí leen',
  description: 'Integra CFG con WhatsApp Business. Tus recordatorios de pago llegan por WhatsApp con tu nombre y foto de perfil. 98% de tasa de apertura.',
}

export default function WhatsAppPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">CFG + WhatsApp Business</h1>
        <p className="text-xl text-zinc-300 mb-8">Tus recordatorios de pago llegan por WhatsApp. Con tu nombre y foto de perfil. 98% de tasa de apertura.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">¿Cómo funciona?</h2>
          <ol className="text-left text-zinc-300 space-y-2 list-decimal list-inside">
            <li>Conecta tu número de WhatsApp Business en la configuración de CFG.</li>
            <li>CFG envía los recordatorios desde tu número, con tu nombre.</li>
            <li>Tus clientes ven un mensaje tuyo, no de una plataforma.</li>
            <li>El 98% de los mensajes de WhatsApp se abren (vs 20% del email).</li>
          </ol>
        </div>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Activar WhatsApp →
        </Link>
      </div>
    </main>
  )
}
