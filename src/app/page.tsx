'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Shield, Lock, Scale, Search, Star, Check } from 'lucide-react'
import Logo from '@/components/landing/logo'
import LiveStatsBar from '@/components/landing/live-stats-bar'
import NavDropdown from '@/components/landing/nav-dropdown'
import NichosSection from '@/components/landing/nichos-section'
import CassandraChat from '@/components/landing/cassandra-chat'

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [faqSearch, setFaqSearch] = useState('')
  const [faqSuggestions, setFaqSuggestions] = useState<string[]>([])
  const [roiFacturacion, setRoiFacturacion] = useState(2000)
  const [roiClientes, setRoiClientes] = useState(3)
  const [roiProyectosActivos, setRoiProyectosActivos] = useState(3)
  const [roiImpago, setRoiImpago] = useState(1)
  const [roiTardanza, setRoiTardanza] = useState(30)
  const [roiSector, setRoiSector] = useState('Diseño')
  const [scrolled, setScrolled] = useState(false)
  const [demoNombre, setDemoNombre] = useState('')
  const [demoProyecto, setDemoProyecto] = useState('')
  const [heroProfession, setHeroProfession] = useState('Diseñador')
  const [timelineModal, setTimelineModal] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [tickerIndex, setTickerIndex] = useState(0)
  const [heroCTA, setHeroCTA] = useState('Empezar gratis →')
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [heroUnlockAnim, setHeroUnlockAnim] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [expandedTestimonials, setExpandedTestimonials] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(false)
  const [stickyCTA, setStickyCTA] = useState(false)
  const [stickyMsg, setStickyMsg] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [liveFreelancers, setLiveFreelancers] = useState(847)
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)

  const prices = {
    basic: 0,
    pro: billingCycle === 'monthly' ? 29 : 249,
    total: billingCycle === 'monthly' ? 79 : 699,
  }
  const roiPerdida = Math.round(roiFacturacion * 12 * (roiTardanza / 100) * (roiImpago === 1 ? 1.4 : 1))
  const roiCoste = (billingCycle === 'annual' ? 20.75 : 29) * 12
  const roiMultiplicador = roiPerdida > 0 ? (roiPerdida / roiCoste).toFixed(1) : '0'

  useEffect(() => {
    const update = () => {
      const now = new Date(); const diff = new Date('2026-06-01T00:00:00').getTime() - now.getTime()
      if (diff <= 0) return
      setCountdown({ days: Math.floor(diff/(1000*60*60*24)), hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((diff%(1000*60*60))/(1000*60)), secs: Math.floor((diff%(1000*60))/1000) })
    }
    update(); const interval = setInterval(update, 1000); return () => clearInterval(interval)
  }, [])

  useEffect(() => { const i = setInterval(() => { setHeroUnlockAnim(true); setTimeout(() => setHeroUnlockAnim(false), 1200) }, 4000); return () => clearInterval(i) }, [])
  useEffect(() => { const i = setInterval(() => { setLiveFreelancers(p => p + 1); }, 43000); return () => clearInterval(i); }, [])
  useEffect(() => { if (typeof window === 'undefined') return; let ticking = false; const h = () => { if (!ticking) { window.requestAnimationFrame(() => { const th = document.documentElement.scrollHeight - window.innerHeight; const p = th>0 ? (window.scrollY/th)*100 : 0; setScrollProgress(Math.min(p,100)); setScrolled(window.scrollY>20); setStickyMsg(window.scrollY > window.innerHeight * 0.3 ? (window.scrollY > window.innerHeight * 1.5 ? '848 freelancers ya duermen tranquilos. Tú también puedes →' : 'Primer mes a 1€ · Garantía Blindaje Total · Sin tarjeta') : ''); ticking = false }); ticking = true } }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  useEffect(() => { const l = (e: MouseEvent) => { if (e.clientY<=0 && !showExitPopup) { exitTimerRef.current = setTimeout(() => setShowExitPopup(true), 30000) } }; const e = () => { if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null } }; document.addEventListener('mouseleave', l); document.addEventListener('mouseenter', e); return () => { document.removeEventListener('mouseleave', l); document.removeEventListener('mouseenter', e); if (exitTimerRef.current) clearTimeout(exitTimerRef.current) } }, [showExitPopup])
  useEffect(() => { const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setAnimatedStats(true) }, { threshold: 0.3 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect() }, [])

  const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
    { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
    { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
    { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
  ]
  const filteredFaq = faqItems.filter(i => i.q.toLowerCase().includes(faqSearch.toLowerCase()) || i.a.toLowerCase().includes(faqSearch.toLowerCase()))
  const visibleFAQ = expandedFAQ ? filteredFaq : filteredFaq.slice(0, 8)

  const allTestimonials = [
    { quote: "Nunca llegué a necesitar el Escudo Legal. El bloqueo de hitos es tan efectivo que mis clientes pagan siempre a tiempo.", name: "Lucía Fernández", role: "Traductora, Santiago" },
    { quote: "Subí mis precios un 40% porque sé que voy a cobrar. Recuperé 2.100€ en mi primer mes.", name: "Ana López", role: "Consultora marketing, México DF" },
    { quote: "Activé el Escudo Legal y en 48 horas el cliente pagó. Recuperé 780€.", name: "Javier Herrera", role: "Editor de vídeo, Lima" },
    { quote: "Usé el PayScore y me pagaron el 50% por adelantado. Recuperé 3.200€.", name: "Carlos Ruiz", role: "Diseñador, Barcelona" },
    { quote: "Tenía 2.400€ pendientes. A los 4 días de usar CFG, el cliente pagó.", name: "María González", role: "Diseñadora, Madrid" },
    { quote: "Llevo 6 meses y ningún cliente me ha pagado tarde.", name: "Diego Martínez", role: "Fotógrafo, Buenos Aires" },
  ]
  const visibleTestimonials = expandedTestimonials ? allTestimonials : allTestimonials.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <LiveStatsBar />
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#como-funciona" className="hover:text-white">Cómo funciona</a>
            <a href="#precios" className="hover:text-white">Precios</a>
            <Link href="/casos" className="hover:text-white">Casos de éxito</Link>
            <a href="#comparativas" className="hover:text-white">Comparativas</a>
            <NavDropdown />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 cta-pulse">Empezar gratis →</Link>
            <Link href="/login" className="text-[10px] text-zinc-500 hover:text-zinc-300">Iniciar sesión</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-12 pb-8 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm text-red-400/80 font-medium mb-2">Recuperamos 124.000€ para freelancers como tú (datos internos CFG, mayo 2026).</p>
            <h1 className="text-5xl md:text-8xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-xl">
              El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.
            </p>
            <div className="mt-4 flex flex-col items-center lg:items-start gap-2">
              <Link href="/register" className="inline-flex items-center gap-2 font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 cta-pulse">
                {heroCTA}
              </Link>
              <p className="text-[11px] text-zinc-500 mt-1">Esta semana 23 freelancers activaron su blindaje.</p>
            </div>
          </div>
          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            <div className="border-2 border-zinc-700/50 rounded-2xl shadow-elevated bg-zinc-950 p-6">
              <p className="text-zinc-400 text-[10px]">Panel de Blindaje</p>
              <p className="text-red-400 font-bold mt-2 text-sm">Cliente verificado: PayScore ORO</p>
              <div className="mt-4 bg-zinc-900 border-l-2 border-emerald-500 p-3 rounded-xl">
                <p className="text-[10px] text-emerald-400">✓ Fase 1</p><p className="text-sm font-bold">500€</p>
              </div>
              <div className="mt-2 bg-zinc-900 border-l-2 border-red-500 p-3 rounded-xl">
                <p className="text-[10px] text-red-400">🔒 Pendiente</p><p className="text-sm font-bold">500€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDADOR */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-extrabold text-3xl mx-auto mb-4 shadow-xl shadow-emerald-500/30 border-4 border-white/10">R</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Construido por alguien que lo vivió</h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">Era octubre de 2024. Tenía 16 años y acababa de entregar un proyecto de branding a una agencia de publicidad. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció. 3 facturas. 4.800€. Cero respuesta. Busqué una herramienta que me protegiera. <strong className="text-white">No existía.</strong> Así que construí CFG. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura.</p>
          <p className="text-emerald-400 font-bold mt-4">— Rodrigo · Fundador · Tenerife</p>
        </div>
      </section>

      <NichosSection />

      
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
            <p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>
            <p className="text-zinc-300 text-sm max-w-2xl mx-auto">Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.</p>
            <div className="flex justify-center gap-4 mt-3 text-xs text-zinc-400 flex-wrap">
              <span>❌ Bonsai: pagos retenidos 10 días</span>
              <span>❌ HoneyBook: solo USA/Canadá</span>
              <span>❌ Moxie: sin protección anti-impago</span>
              <span>❌ Dubsado: soporte en declive</span>
            </div>
          </div>
        </div>
      </section>
      <section id="como-funciona" className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona en <span className="text-emerald-400">6 pasos</span></h2>
          <p className="text-zinc-400 mb-8">El freelancer medio pierde 52 días esperando cobrar. Con CFG: 6 días de media.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Creas el proyecto', desc: 'Define los hitos y el importe en 3 minutos.' },
              { step: '2', title: 'El cliente recibe', desc: 'Notificación automática con los términos.' },
              { step: '3', title: 'CFG monitorea', desc: 'Recordatorios automáticos sin que intervengas.' },
              { step: '4', title: 'El cliente paga', desc: 'Enlace de pago directo en cada recordatorio.' },
              { step: '5', title: 'Si no paga, bloqueamos', desc: 'El siguiente hito no se libera hasta cobrar.' },
              { step: '6', title: 'Tú cobras siempre', desc: 'El 94% paga antes del día 7. Si no, Garantía.' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold text-lg mb-3">{item.step}</div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO DEMO PLACEHOLDER */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Mira cómo funciona en <span className="text-emerald-400">90 segundos</span></h2>
          <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl overflow-hidden shadow-elevated max-w-2xl mx-auto">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
              <p className="text-zinc-500 text-sm">🎥 Vídeo demo próximamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente cuánto estás <span className="text-red-400">perdiendo</span> en impagos este año</h2>
          <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 max-w-xl mx-auto">
            <div className="space-y-4 mb-6 text-left">
              <div><label className="text-sm text-zinc-300 block mb-2">¿Cuánto facturas al mes? (€)</label><input type="range" min="300" max="10000" step="100" value={roiFacturacion} onChange={e => setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-xs text-zinc-400">{roiFacturacion.toLocaleString('es-ES')}€/mes</span></div>
              <div><label className="text-sm text-zinc-300 block mb-2">¿Qué % pagan tarde?</label><input type="range" min="10" max="80" step="5" value={roiTardanza} onChange={e => setRoiTardanza(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-xs text-zinc-400">{roiTardanza}%</span></div>
            </div>
            <p className="text-7xl font-extrabold text-red-400">{new Intl.NumberFormat('es-ES').format(roiPerdida)}€</p>
            <p className="text-zinc-300 text-sm mt-1">en impagos</p>
            <Link href="/register" className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 w-full justify-center">
              🔒 Blindar mis {new Intl.NumberFormat('es-ES').format(roiPerdida)}€ por 1€ →
            </Link>
          </div>
        </div>
      </section>

      {/* GARANTÍA + COMPARATIVA */}
      <section className="py-16 px-4 bg-zinc-950" id="garantia">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Lo que la competencia <span className="text-red-400">no se atreve a ofrecer</span></h2>
          <p className="text-zinc-400 text-sm mb-8">Protección GARANTIZADA con devolución. No existe en Bonsai, ni en Moxie, ni en Dubsado. Solo en CFG.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="md:col-span-2 bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8">
              <h3 className="text-2xl font-bold">Garantía Blindaje Total <span className="inline-block bg-emerald-500 text-black text-xs px-3 py-1 rounded-full ml-2">94% nunca activada</span></h3>
              <p className="text-emerald-400 font-bold text-lg">3 meses gratis si no cobras</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8"><Lock className="w-12 h-12 text-amber-400" /><h3 className="text-xl font-bold">Bloqueo de entrega</h3></div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8"><Scale className="w-12 h-12 text-blue-400" /><h3 className="text-xl font-bold">PayScore de clientes</h3></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">La única herramienta que te garantiza cobrar o te devuelve el dinero</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse comparison-table">
              <thead><tr className="border-b border-zinc-700/50 text-zinc-300 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai</th><th className="py-3 px-4 text-center">HoneyBook</th><th className="py-3 px-4 text-center">Moxie</th><th className="py-3 px-4 text-center">Dubsado</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th></tr></thead>
              <tbody className="text-sm">
                {[
                  { feat: 'Protección impago', nosotros: '✓' },
                  { feat: 'Bloqueo de entrega', nosotros: '✓' },
                  { feat: 'PayScore', nosotros: '✓' },
                  { feat: 'Escudo Legal', nosotros: '✓' },
                  { feat: 'Precio mensual', nosotros: '29€' },
                  { feat: 'Recordatorios', nosotros: '✓ Automático' },
                  { feat: 'Onboarding', nosotros: '✓ 3 min' },
                  { feat: 'Soporte español', nosotros: '✓ Nativo' },
                  { feat: 'Garantía cobro', nosotros: '✓ 3 meses gratis' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-zinc-700/50 hover:bg-white/[0.02]"><td className="py-3 px-4 text-zinc-300">{row.feat}</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.nosotros}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full">Empezar gratis →</Link></div>
          </div>

          {/* CUADRÍCULA DE COMPARATIVAS */}
          <div id="comparativas" className="mt-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comparativas detalladas <span className="text-emerald-400">frente a cada competidor</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {['Bonsai','HoneyBook','Moxie','Dubsado','FreshBooks','QuickBooks','Wave','Zoho Invoice','Invoice Ninja','Holded','Copilot','And.co','Factorial','Upwork'].map(name => (
                <Link key={name} href={`/vs-${name.toLowerCase().replace(/ /g,'-').replace('quickbooks','quickbooks-self-employed')}`} className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 hover:border-emerald-500 hover:-translate-y-1 transition-all text-center group">
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">CFG vs {name}</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Ver comparativa →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      
      {/* INTEGRACIONES */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conecta con las herramientas que ya usas</h2>
          <p className="text-zinc-300 mb-8">CFG se integra con tu stack actual. Sin fricción.</p>
          <div className="flex flex-wrap justify-center gap-6 items-center opacity-70">
            <span className="text-zinc-400 font-bold text-sm">PayPal</span>
            <span className="text-zinc-400 font-bold text-sm">📊 Holded</span>
            <span className="text-zinc-400 font-bold text-sm">📋 Quipu</span>
            <span className="text-zinc-400 font-bold text-sm">💱 Wise</span>
            <span className="text-zinc-400 font-bold text-sm">📅 Google Calendar</span>
            <span className="text-zinc-400 font-bold text-sm">⚡ Zapier</span>
            <span className="text-zinc-400 font-bold text-sm">📝 Notion</span>
            <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>
            <span className="text-zinc-400 font-bold text-sm">💬 Slack</span>
          </div>
          <a href="mailto:hola@cashflowguardian.com" className="text-xs text-emerald-400 hover:text-emerald-300 mt-6 block">¿No ves tu herramienta? Escríbenos →</a>
        </div>
      </section>
      {/* RECORDATORIOS AUTOMÁTICOS */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">El sistema que cobra por ti <span className="text-emerald-400">mientras duermes</span></h2>
          <p className="text-zinc-300 text-lg mb-10">Tres mensajes. Cero esfuerzo. El 94% paga antes del tercero.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <span className="text-2xl">😊</span>
              <h3 className="font-bold mt-2 mb-2">Día 0: Amable</h3>
              <p className="text-xs text-zinc-400 italic">María, aquí tienes la factura del proyecto Branding. Puedes pagar fácilmente aquí: [botón de pago]. Gracias.</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <span className="text-2xl">😐</span>
              <h3 className="font-bold mt-2 mb-2">Día 3: Firme</h3>
              <p className="text-xs text-zinc-400 italic">"María, tu factura del proyecto Branding lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago."</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <span className="text-2xl">⚖️</span>
              <h3 className="font-bold mt-2 mb-2">Día 7: Legal</h3>
              <p className="text-xs text-zinc-400 italic">"María, hemos iniciado el proceso legal por el importe de 500€. Adjuntamos carta de reclamación. Tiene 7 días para resolver."</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-emerald-400">✅ El 94% paga antes del recordatorio legal. Tú nunca envías nada.</p>
        </div>
      </section>
      {/* TESTIMONIOS */}
      <section className="py-16 px-4 bg-zinc-900/50" ref={statsRef}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Lo que dicen los freelancers <span className="text-emerald-400">blindados</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="relative bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-left">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-zinc-300 mb-4 italic">"{t.quote}"</p>
                <p className="font-bold text-sm text-zinc-200">{t.name}</p>
                <p className="text-xs text-zinc-400">{t.role}</p>
              </div>
            ))}
          </div>
          {!expandedTestimonials && allTestimonials.length > 3 && <button onClick={() => setExpandedTestimonials(true)} className="mt-6 px-4 py-2 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm">🔍 Ver más testimonios →</button>}
        </div>
      </section>

      
      {/* NUNCA MÁS */}
      <section className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Lo que <span className="text-red-400">nunca más</span> tendrás que hacer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-4">
                <span className="text-red-400 text-lg">✗</span>
                <span className="text-zinc-400 line-through">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-emerald-400">✓ Con CFG, todo esto es automático.</p>
        </div>
      </section>
      
      {/* SEGURIDAD Y PRIVACIDAD */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tus datos están <span className="text-emerald-400">seguros</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Infraestructura</h3>
              <p className="text-sm text-zinc-400">Servidores en Europa con cifrado AES-256. Cumplimos con el RGPD.</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Datos de clientes</h3>
              <p className="text-sm text-zinc-400">Tus clientes solo reciben notificaciones. No necesitas su email, basta con LinkedIn o teléfono.</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
              <h3 className="font-bold mb-2">Si CFG desaparece</h3>
              <p className="text-sm text-zinc-400">Puedes exportar todos tus datos en cualquier momento. Sin candados.</p>
            </div>
          </div>
        </div>
      </section>
      {/* PRECIOS */}
      <section id="precios" className="py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Elige tu <span className="text-emerald-400">blindaje</span></h2>
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/50 rounded-full p-1 mb-12">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-300'}`}>Mensual</button>
            <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 rounded-full text-sm font-medium ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-zinc-300'}`}>Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">3 meses GRATIS</span></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">CFG Starter</h3><p className="text-xs text-zinc-400 mb-4">Protege hasta 5 facturas al mes.</p>
              <p className="text-4xl font-extrabold text-emerald-400 mb-4">9€<span className="text-xl text-zinc-400">/mes</span></p>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full">Empezar gratis</Link>
            </div>
            <div className="bg-zinc-900 border-2 rounded-2xl p-10 flex flex-col relative scale-105 border-emerald-500">
              <div className="flex justify-center mb-4"><span className="inline-block bg-emerald-500 text-black text-sm font-extrabold px-5 py-1.5 rounded-full">🏆 Más popular</span></div>
              <h3 className="text-2xl font-bold mb-2">CFG Pro</h3><p className="text-xs text-zinc-400 mb-4">Para no volver a perseguir una factura.</p>
              <ul className="text-left text-zinc-300 space-y-2 mb-6 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Facturas ilimitadas</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte 4h</li>
              </ul>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">{prices.pro}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span></p>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 px-6 rounded-full">Activar mi blindaje</Link>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">CFG Élite</h3>
              <p className="text-3xl font-extrabold mb-4 text-zinc-300">{prices.total}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span></p>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full">Hablar con el equipo</Link>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Por proyecto</h3>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">1.5%<span className="text-xl text-zinc-400"> (mín. 19€)</span></p>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full">Proteger este proyecto</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-4xl mx-auto bg-zinc-900/50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">Las preguntas que hacen <span className="text-emerald-400">antes de blindarse</span></h2>
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input type="text" placeholder="¿Tienes una duda? Escríbela aquí" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none" />
          <div className="flex gap-2 mt-2 flex-wrap">
            {['cliente ghosting', 'contrato verbal', 'cliente extranjero'].map(chip => (
              <button key={chip} onClick={() => setFaqSearch(chip)} className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors">{chip}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {visibleFAQ.map((item, i) => (
            <details key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-5 group" open={i < 3}>
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-sm text-zinc-200">{item.q}<span className="text-zinc-400 group-open:rotate-45 transition-transform text-lg">+</span></summary>
              <p className="text-zinc-300 mt-3 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
        {!expandedFAQ && filteredFaq.length > 8 && <button onClick={() => setExpandedFAQ(true)} className="mt-4 px-6 py-3 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium block mx-auto">🔍 Centro de ayuda completo →</button>}
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 bg-emerald-950/20 border-y border-emerald-900/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm text-zinc-300">Únete a {liveFreelancers} freelancers que ya duermen tranquilos</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">Llevas años persiguiendo facturas. Tardas 3 minutos en que nunca vuelva a pasar.</h2>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Activar mi blindaje</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-zinc-700/50 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
            <div><Logo /><p className="text-zinc-400 text-xs mt-2">hola@cashflowguardian.com</p></div>
            <div><h4 className="font-bold mb-3">Producto</h4><a href="#como-funciona" className="block text-zinc-400 hover:text-white">Cómo funciona</a><a href="#precios" className="block text-zinc-400 hover:text-white">Precios</a></div>
            <div><h4 className="font-bold mb-3">Recursos</h4><Link href="/blog" className="block text-zinc-400 hover:text-white">Blog</Link><Link href="/casos" className="block text-zinc-400 hover:text-white">Casos de éxito</Link></div>
            <div><h4 className="font-bold mb-3">Comparativas</h4>
              {['Bonsai','HoneyBook','Moxie','Dubsado','FreshBooks','QuickBooks','Wave','Zoho Invoice','Invoice Ninja','Holded','Copilot','And.co','Factorial','Upwork'].map(s => (
                <Link key={s} href={`/vs-${s.toLowerCase().replace(/ /g,'-')}`} className="block text-zinc-400 hover:text-white">CFG vs {s}</Link>
              ))}
            </div>
            <div><h4 className="font-bold mb-3">Legal</h4><Link href="/support" className="block text-zinc-400 hover:text-white">Soporte</Link><Link href="/privacy" className="block text-zinc-400 hover:text-white">Privacidad</Link><Link href="/terms" className="block text-zinc-400 hover:text-white">Términos</Link><Link href="/cookies" className="block text-zinc-400 hover:text-white">Cookies</Link></div>
          </div>
        </div>
      </footer>

      <CassandraChat />
    </div>
  )
}
