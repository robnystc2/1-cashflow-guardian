'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const [facturacion, setFacturacion] = useState(2000)
  const roi = Math.round((facturacion * 12 * 0.15) / 348)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empezar gratis →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Precios <span className="text-emerald-400">transparentes</span></h1>
        <p className="text-zinc-300 mb-12">Elige el plan que mejor se adapte a tu blindaje.</p>

        {/* Calculadora de ROI */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto mb-12">
          <p className="text-sm text-zinc-400 mb-2">🧮 ¿Cuánto ahorras con CFG?</p>
          <input type="range" min="500" max="10000" step="100" value={facturacion} onChange={e => setFacturacion(Number(e.target.value))} className="w-full accent-emerald-500 mb-2" />
          <p className="text-xs text-zinc-500">Facturando {facturacion.toLocaleString('es-ES')}€/mes, CFG Pro te cuesta el 1.45% de tus ingresos.</p>
          <p className="text-xs text-emerald-400 font-semibold mt-1">ROI estimado: {roi}x tu inversión</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'CFG Starter', price: '9€', periodo: '/mes', features: ['5 facturas/mes', '3 clientes', 'Recordatorios email', 'PayScore básico'], cta: 'Empezar gratis', popular: false },
            { name: 'CFG Pro', price: '29€', periodo: '/mes', features: ['Facturas ilimitadas', 'Clientes ilimitados', 'Bloqueo de hitos', 'Escudo Legal 40+ países', 'PayScore completo', 'Portal del cliente', 'Contratos digitales', 'Cassandra IA', 'Soporte 4h'], cta: 'Empezar gratis 14 días', popular: true },
            { name: 'CFG Élite', price: '79€', periodo: '/mes', features: ['Todo lo de Pro', 'Cassandra Ejecutiva', 'White-label', 'Onboarding 1-a-1', 'Soporte prioritario 1h'], cta: 'Empezar con Élite', popular: false },
            { name: 'Por proyecto', price: '1.5%', periodo: ' (mín. 19€)', features: ['1 proyecto hasta 3.000€', 'Bloqueo de hitos', 'Escudo Legal'], cta: 'Proteger un proyecto', popular: false },
          ].map((plan, i) => (
            <div key={i} className={`bg-zinc-900 border rounded-2xl p-8 flex flex-col transition-all ${plan.popular ? 'border-emerald-500 scale-105' : 'border-zinc-800'}`}>
              {plan.popular && <div className="flex justify-center mb-4"><span className="bg-emerald-500 text-black text-sm font-bold px-5 py-1.5 rounded-full">🏆 Más popular</span></div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-emerald-400 mb-2">{plan.price}<span className="text-xl text-zinc-400">{plan.periodo}</span></p>
              <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> {f}</li>
                ))}
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all">{plan.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-8">Todos los precios en euros. Sin permanencia. Sin sorpresas.</p>
      </section>
    </div>
  )
}
