import Link from 'next/link'
import { Check } from 'lucide-react'
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🛡️</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Precios <span className="text-emerald-400">transparentes</span></h1>
        <p className="text-zinc-300 mb-12">29€/mes. Sin permanencia. Sin sorpresas.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">CFG Free</h3><p className="text-xs text-zinc-400 mb-4">Protege hasta 5 facturas al mes.</p>
            <p className="text-4xl font-bold text-emerald-400 mb-4">0€<span className="text-xl text-zinc-400">/mes</span></p>
            <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 5 facturas/mes</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 3 clientes</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore básico</li>
            </ul>
            <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-full transition-all">Empezar gratis</Link>
          </div>
          <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 flex flex-col relative scale-105">
            <div className="flex justify-center mb-4"><span className="bg-emerald-500 text-black text-sm font-bold px-5 py-1.5 rounded-full">🏆 Más popular</span></div>
            <h3 className="text-2xl font-bold mb-2">CFG Pro</h3><p className="text-xs text-zinc-400 mb-4">Para no volver a perseguir una factura.</p>
            <p className="text-4xl font-bold text-emerald-400 mb-2">29€<span className="text-xl text-zinc-400">/mes</span></p>
            <p className="text-xs text-zinc-500 mb-4">Equivale a proteger 3 proyectos de 500€. Un impago recuperado ya pagó 7 años de CFG Pro.</p>
            <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Facturas ilimitadas</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo automático de hitos</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal en 40+ países</li>
            </ul>
            <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Probar 14 días por 1€ →</Link>
            <p className="text-xs text-zinc-400 mt-3 text-center">🛡️ Sin compromiso · Garantía devolución 30 días</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">CFG Élite</h3><p className="text-xs text-zinc-400 mb-4">Para freelancers que facturan +5.000€/mes.</p>
            <p className="text-4xl font-bold text-emerald-400 mb-2">79€<span className="text-xl text-zinc-400">/mes</span></p>
            <p className="text-xs text-zinc-500 mb-4">Menos de 2€/día. Equivale a 10 minutos de tu tarifa por hora.</p>
            <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Todo lo de Pro</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> White-label</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte prioritario 1h</li>
            </ul>
            <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all">Empezar con Élite</Link>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Por proyecto</h3><p className="text-xs text-zinc-400 mb-4">Sin suscripción. Protege un proyecto a la vez.</p>
            <p className="text-4xl font-bold text-emerald-400 mb-2">9€<span className="text-xl text-zinc-400">/proyecto</span></p>
            <p className="text-xs text-zinc-500 mb-4">Ideal si facturas pocas veces al año.</p>
            <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 1 proyecto hasta 3.000€</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo de hitos</li>
              <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal</li>
            </ul>
            <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all">Proteger un proyecto →</Link>
          </div>
        </div>
        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-sm text-zinc-400 mb-2">🧮 Calcula tu precio personalizado</p>
          <p className="text-xs text-zinc-500">Facturando 2.000€/mes, CFG Pro te cuesta el 1.45% de tus ingresos mensuales.</p>
        </div>
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto text-left">
          <p className="text-sm text-zinc-400 mb-2">💡 ¿Qué coste tendría hacerlo manualmente?</p>
          <p className="text-xs text-zinc-500">Abogado para carta de reclamación: 200-500€</p>
          <p className="text-xs text-zinc-500">Tiempo persiguiendo facturas: 72h/año</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">CFG Pro: 249€/año. Matemática obvia.</p>
        </div>
        <p className="text-xs text-zinc-500 mt-8">Todos los precios en euros. Sin permanencia. Sin sorpresas.</p>
      </section>
    </div>
  )
}
