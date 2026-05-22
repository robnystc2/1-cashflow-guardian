      <FeaturesAvanzadas />
'use client'
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
import Link from 'next/link'
      <FeaturesAvanzadas />
import { useState, useEffect, useRef } from 'react'
      <FeaturesAvanzadas />
import { Palette, Code2, BarChart3, Camera, PenTool, Globe, Megaphone, Briefcase, Building2, Film, Shield, Lock, Scale, Stethoscope, Music, Search, Play, Star, ArrowRight, Check, FileText } from 'lucide-react'
import CassandraChat from '@/components/landing/cassandra-chat'
      <FeaturesAvanzadas />
import FeaturesAvanzadas from '@/components/landing/features-avanzadas'
      <FeaturesAvanzadas />
import Logo from '@/components/landing/logo'
      <FeaturesAvanzadas />
import LiveStatsBar from '@/components/landing/live-stats-bar'
      <FeaturesAvanzadas />
import NavDropdown from '@/components/landing/nav-dropdown'
      <FeaturesAvanzadas />
import NichosSection from '@/components/landing/nichos-section'
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
export default function LandingPage() {
      <FeaturesAvanzadas />
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
      <FeaturesAvanzadas />
  const [faqSearch, setFaqSearch] = useState('')
      <FeaturesAvanzadas />
  const [faqSuggestions, setFaqSuggestions] = useState<string[]>([])
      <FeaturesAvanzadas />
  const [roiFacturacion, setRoiFacturacion] = useState(2000)
      <FeaturesAvanzadas />
  const [roiClientes, setRoiClientes] = useState(3)
      <FeaturesAvanzadas />
  const [roiImpago, setRoiImpago] = useState(1)
      <FeaturesAvanzadas />
  const [roiTardanza, setRoiTardanza] = useState(30)
      <FeaturesAvanzadas />
  const [roiSector, setRoiSector] = useState('Diseño')
      <FeaturesAvanzadas />
  const [scrolled, setScrolled] = useState(false)
      <FeaturesAvanzadas />
  const [timelineModal, setTimelineModal] = useState<string | null>(null)
      <FeaturesAvanzadas />
  const [scrollProgress, setScrollProgress] = useState(0)
      <FeaturesAvanzadas />
  const [tickerIndex, setTickerIndex] = useState(0)
      <FeaturesAvanzadas />
  const [heroQuestionAnswered, setHeroQuestionAnswered] = useState<boolean | null>(null)
      <FeaturesAvanzadas />
  const [heroCTA, setHeroCTA] = useState('Activar mi blindaje gratis →')
      <FeaturesAvanzadas />
  const [showExitPopup, setShowExitPopup] = useState(false)
      <FeaturesAvanzadas />
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null)
      <FeaturesAvanzadas />
  const [nicheModal, setNicheModal] = useState<number | null>(null)
      <FeaturesAvanzadas />
  const [heroUnlockAnim, setHeroUnlockAnim] = useState(false)
      <FeaturesAvanzadas />
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
      <FeaturesAvanzadas />
  const [expandedTestimonials, setExpandedTestimonials] = useState(false)
      <FeaturesAvanzadas />
  const [expandedFAQ, setExpandedFAQ] = useState(false)
      <FeaturesAvanzadas />
  const [animatedStats, setAnimatedStats] = useState(false)
      <FeaturesAvanzadas />
  const [otherProfession, setOtherProfession] = useState('')
      <FeaturesAvanzadas />
  const [otherSubmitted, setOtherSubmitted] = useState(false)
      <FeaturesAvanzadas />
  const [stickyCTA, setStickyCTA] = useState(false)
  const [stickyMsg, setStickyMsg] = useState('')
      <FeaturesAvanzadas />
  const [mobileMenu, setMobileMenu] = useState(false)
      <FeaturesAvanzadas />
  const [liveFreelancers, setLiveFreelancers] = useState(847)
      <FeaturesAvanzadas />
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null)
      <FeaturesAvanzadas />
  const statsRef = useRef<HTMLDivElement | null>(null)
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  const prices = {
      <FeaturesAvanzadas />
    basic: 0,
      <FeaturesAvanzadas />
    pro: billingCycle === 'monthly' ? 29 : 249,
      <FeaturesAvanzadas />
    total: billingCycle === 'monthly' ? 79 : 699,
      <FeaturesAvanzadas />
  }
      <FeaturesAvanzadas />
  const roiPerdida = Math.round(roiFacturacion * 12 * (roiTardanza / 100) * (roiImpago === 1 ? 1 : 0.71))
      <FeaturesAvanzadas />
  const roiCoste = (billingCycle === 'annual' ? 20.75 : 29) * 12
      <FeaturesAvanzadas />
  const roiMultiplicador = roiPerdida > 0 ? (roiPerdida / roiCoste).toFixed(1) : '0'
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  const tickerMessages = [
      <FeaturesAvanzadas />
    { text: 'Hace 4 min: Carlos de Valencia recuperó 1.200€', color: 'bg-emerald-400' },
      <FeaturesAvanzadas />
    { text: 'Hace 12 min: Ana de México DF activó Escudo Legal para 3.200€', color: 'bg-amber-400' },
      <FeaturesAvanzadas />
    { text: 'Hace 7 min: Pablo de Sevilla recuperó 950€ con la Garantía', color: 'bg-emerald-400' },
      <FeaturesAvanzadas />
    { text: 'Hace 2 min: María de Madrid acaba de cobrar 1.800€', color: 'bg-emerald-400' },
      <FeaturesAvanzadas />
    { text: 'Hace 19 min: Diego de Buenos Aires recuperó 3 proyectos', color: 'bg-amber-400' },
      <FeaturesAvanzadas />
  ]
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  useEffect(() => {
      <FeaturesAvanzadas />
    const update = () => {
      <FeaturesAvanzadas />
      const now = new Date(); const diff = new Date('2026-06-01T00:00:00').getTime() - now.getTime()
      <FeaturesAvanzadas />
      if (diff <= 0) return
      <FeaturesAvanzadas />
      setCountdown({ days: Math.floor(diff/(1000*60*60*24)), hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((diff%(1000*60*60))/(1000*60)), secs: Math.floor((diff%(1000*60))/1000) })
      <FeaturesAvanzadas />
    }
      <FeaturesAvanzadas />
    update(); const interval = setInterval(update, 1000); return () => clearInterval(interval)
      <FeaturesAvanzadas />
  }, [])
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  useEffect(() => { const i = setInterval(() => { setHeroUnlockAnim(true); setTimeout(() => setHeroUnlockAnim(false), 1200) }, 4000); return () => clearInterval(i) }, [])
      <FeaturesAvanzadas />
  useEffect(() => { const i = setInterval(() => setTickerIndex(p => (p+1)%tickerMessages.length), 5000); return () => clearInterval(i) }, [])
      <FeaturesAvanzadas />
  useEffect(() => { const i = setInterval(() => { setLiveFreelancers(p => p + 1); }, 43000); return () => clearInterval(i); }, [])
      <FeaturesAvanzadas />
  useEffect(() => { if (heroQuestionAnswered === true) setHeroCTA('Recupera tu dinero ahora — Blindar mis cobros'); else if (heroQuestionAnswered === false) setHeroCTA('Blíndate antes de que pase — Empieza por 1€'); else setHeroCTA('Activar mi blindaje gratis →') }, [heroQuestionAnswered])
      <FeaturesAvanzadas />
  useEffect(() => { if (typeof window === 'undefined') return; let ticking = false; const h = () => { if (!ticking) { window.requestAnimationFrame(() => { const th = document.documentElement.scrollHeight - window.innerHeight; const p = th>0 ? (window.scrollY/th)*100 : 0; setScrollProgress(Math.min(p,100)); setScrolled(window.scrollY>20); setStickyMsg(window.scrollY > window.innerHeight * 0.3 ? (window.scrollY > window.innerHeight * 1.5 ? '848 freelancers ya duermen tranquilos. Tú también puedes →' : 'Primer mes a 1€ · Garantía Blindaje Total · Sin tarjeta') : ''); ticking = false }); ticking = true } }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
      <FeaturesAvanzadas />
  useEffect(() => { const l = (e: MouseEvent) => { if (e.clientY<=0 && !showExitPopup) { exitTimerRef.current = setTimeout(() => setShowExitPopup(true), 300) } }; const e = () => { if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null } }; document.addEventListener('mouseleave', l); document.addEventListener('mouseenter', e); return () => { document.removeEventListener('mouseleave', l); document.removeEventListener('mouseenter', e); if (exitTimerRef.current) clearTimeout(exitTimerRef.current) } }, [showExitPopup])
      <FeaturesAvanzadas />
  useEffect(() => { const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-reveal') }) }, { threshold: 0.15 }); document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el)); return () => observer.disconnect() }, [])
      <FeaturesAvanzadas />
  useEffect(() => { if (!animatedStats) return; const counters = document.querySelectorAll('.stat-counter'); counters.forEach(c => { const target = parseInt(c.getAttribute('data-target') || '0'); const duration = 1500; const steps = 60; let step = 0; const timer = setInterval(() => { step++; const current = Math.round(target * (step/steps)); (c as HTMLElement).innerText = current.toLocaleString('es-ES'); if (step >= steps) clearInterval(timer) }, duration/steps) }) }, [animatedStats])
      <FeaturesAvanzadas />
  useEffect(() => { const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setAnimatedStats(true) }, { threshold: 0.3 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect() }, [])
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  const faqItems = [
      <FeaturesAvanzadas />
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción para el cliente." },
      <FeaturesAvanzadas />
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails y notificaciones se envían desde tu marca." },
      <FeaturesAvanzadas />
    { q: "¿Qué pasa si el cliente se niega a pagar igualmente?", a: "Escudo Legal genera una carta legal con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
      <FeaturesAvanzadas />
    { q: "¿Qué pasa si mi cliente dice que el trabajo está mal hecho para no pagar?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
      <FeaturesAvanzadas />
    { q: "¿Funciona con contratos verbales o solo escritos?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos). PayScore te dice si el cliente es de fiar." },
      <FeaturesAvanzadas />
    { q: "¿Cuánto tarda en funcionar desde que me registro?", a: "3 minutos. Creas tu cuenta, creas un proyecto con hitos, y ya está blindado." },
      <FeaturesAvanzadas />
    { q: "¿Funciona en mi país?", a: "Sí. Soportamos 47 países, multi-moneda y adaptación legal." },
      <FeaturesAvanzadas />
    { q: "¿Es legal bloquear el trabajo?", a: "Sí, está pactado en el contrato. Si el cliente firmó, está legalmente obligado." },
      <FeaturesAvanzadas />
    { q: "¿Funciona si soy autónomo en España con cliente extranjero?", a: "Sí. Facturación transfronteriza con multi-moneda. Escudo Legal se adapta al país del cliente." },
      <FeaturesAvanzadas />
    { q: "¿Puedo usarlo si soy autónomo con modelo 303 en España?", a: "Sí, CashFlow Guardian se integra con tu facturación y puedes exportar los datos para tu gestoría." },
      <FeaturesAvanzadas />
    { q: "¿El PayScore es legal? ¿No viola el RGPD?", a: "Completamente legal. Los datos de PayScore provienen del historial de pagos dentro de nuestra red de freelancers, con consentimiento explícito y cumpliendo RGPD." },
      <FeaturesAvanzadas />
    { q: "¿Cuánto tiempo tarda en activarse desde que me registro?", a: "3 minutos. Creas tu proyecto, defines los hitos, y el sistema empieza a protegerte al instante." },
      <FeaturesAvanzadas />
    { q: "¿Qué pasa exactamente si el cliente dice que el trabajo está mal para no pagar?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
      <FeaturesAvanzadas />
    { q: "¿Puedo usar CFG con clientes que ya me deben dinero?", a: "Sí, puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal directamente." },
      <FeaturesAvanzadas />
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización. Tu plan sigue activo hasta el final del período pagado." },
      <FeaturesAvanzadas />
    { q: "¿Qué es exactamente el PayScore y de dónde vienen los datos?", a: "El PayScore se calcula con el historial de pagos de clientes dentro de nuestra red de freelancers, siempre con consentimiento explícito y cumpliendo RGPD." },
      <FeaturesAvanzadas />
    { q: "¿Funciona con pagos en crypto?", a: "Por el momento trabajamos con Stripe y PayPal. Si hay demanda, integraremos crypto." },
      <FeaturesAvanzadas />
    { q: "¿Qué integraciones tienen actualmente?", a: "Stripe, PayPal, Holded, Quipu, Google Calendar. Más en camino." },
      <FeaturesAvanzadas />
    { q: "¿Es compatible con mi software de facturación en España (Holded, Quipu, Suma, Contasimple)?", a: "Sí, especialmente con Holded y Quipu. Suma y Contasimple están en desarrollo." },
      <FeaturesAvanzadas />
    { q: "¿Y si el cliente me deja una reseña negativa por venganza cuando activo el Escudo Legal?", a: "El sistema está diseñado para que el cliente no sepa que eres tú quien activa el protocolo, ya que los recordatorios se envían desde nuestra plataforma." },
      <FeaturesAvanzadas />
    { q: "¿Cómo sé que la carta legal realmente asusta al cliente?", a: "La carta incluye el articulado legal real de su jurisdicción. El 80% de los impagos se resuelven con este aviso." },
      <FeaturesAvanzadas />
    { q: "¿Qué pasa si el cliente se molesta por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% de los clientes paga sin conflicto. Nunca tienes que dar la cara." },
      <FeaturesAvanzadas />
    { q: "¿Puedo probar todas las funciones antes de pagar?", a: "Sí. El plan gratuito incluye PayScore básico y recordatorios. Puedes probar el sistema sin tarjeta de crédito." },
    { q: "¿Qué pasa con mis datos si cancelo?", a: "Puedes exportar todos tus datos en cualquier momento. Al cancelar, tu cuenta queda inactiva pero no pierdes nada." },
    { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Subir o bajar de plan es instantáneo. Solo pagarás la diferencia si subes." },
    { q: "¿El precio incluye IVA?", a: "Los precios mostrados no incluyen IVA. El IVA se añadirá según tu país de residencia durante el checkout." },
    { q: "¿CFG funciona con Hacienda / SAT?", a: "Sí. Puedes exportar todas tus facturas y pagos para tu declaración. Compatible con el modelo 303 español y el SAT mexicano." },
    { q: "¿Tienen app móvil?", a: "CFG es una aplicación web progresiva (PWA). Puedes instalarla en tu móvil y funciona como una app nativa." },
      <FeaturesAvanzadas />
  ]
      <FeaturesAvanzadas />
  const filteredFaq = faqItems.filter(i => i.q.toLowerCase().includes(faqSearch.toLowerCase()) || i.a.toLowerCase().includes(faqSearch.toLowerCase()))
      <FeaturesAvanzadas />
  const visibleFAQ = expandedFAQ ? filteredFaq : filteredFaq.slice(0, 10)
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  const timelineSteps = [
      <FeaturesAvanzadas />
    { day: 'Antes de empezar', title: 'Configuras el blindaje', desc: 'En 3 minutos creas el proyecto y defines los hitos.', icon: '⚙️', color: 'bg-zinc-500/20 border-zinc-500 text-zinc-400' },
      <FeaturesAvanzadas />
    { day: 'Día 1', title: 'Entregas el hito', desc: 'Entregas. El cliente recibe. El Hito 2 se bloquea AUTOMÁTICAMENTE.', icon: '✓', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
      <FeaturesAvanzadas />
    { day: 'Día 3', title: 'Recordatorio automático', desc: '"Hola María, tu factura del proyecto Branding lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago."', icon: '⚠', color: 'bg-amber-500/20 border-amber-500 text-amber-400' },
      <FeaturesAvanzadas />
    { day: 'Día 7', title: 'Escudo Legal', desc: 'Carta legal personalizada (disponible en España, México, Argentina, Colombia, Chile y +20 países).', icon: '⚖', color: 'bg-orange-500/20 border-orange-500 text-orange-400', isLexGuard: true },
      <FeaturesAvanzadas />
    { day: 'Día 14', title: 'Garantía Blindaje Total', desc: 'Si no ha pagado, 3 meses gratis para ti.', icon: '🛡', color: 'bg-red-500/20 border-red-500 text-red-400' },
      <FeaturesAvanzadas />
    { day: 'Día 21', title: 'Notificación legal final', desc: 'Notificación certificada con acuse de recibo.', icon: '⚖️', color: 'bg-red-500/20 border-red-500 text-red-400' },
      <FeaturesAvanzadas />
    { day: 'Día 30', title: 'Resolución definitiva', desc: 'El 94% de los casos se resuelven antes de llegar aquí.', icon: '🏁', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
    { day: 'Resultado', title: '94% cobrado. Tú ganas.', desc: 'El cliente no recibe más trabajo hasta que pague. Enlaces de pago directos (Stripe, Bizum, PayPal, transferencia).', icon: '✅', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400', isResult: true },
      <FeaturesAvanzadas />
  ]
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  const comparisonRows = [
    { feat: 'Protección anti-impago', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Bloqueo de entrega', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Calificación de clientes', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ PayScore' },
    { feat: 'Defensa legal', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Escudo Legal' },
    { feat: 'Precio mensual', bonsai: '17$', honeybook: '19$', moxie: '20$', dubsado: '20$', nosotros: '29€' },
    { feat: 'Recordatorios', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Automático' },
    { feat: 'Velocidad de onboarding', bonsai: '15 min', honeybook: '20 min', moxie: '10 min', dubsado: 'semanas', nosotros: '✓ 3 min' },
    { feat: 'Soporte en español (real, no un ticket entre millones)', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Nativo 24/7' },
  ]
  const allTestimonials = [
    { quote: "Nunca llegué a necesitar el Escudo Legal. El bloqueo de hitos es tan efectivo que mis clientes pagan siempre a tiempo. (Prevención)", name: "Lucía Fernández", role: "Traductora, Santiago", avatar: "LF", color: "bg-cyan-500/20 text-cyan-400" },
    { quote: "Subí mis precios un 40% porque sé que voy a cobrar. La confianza que da CFG no tiene precio. (Recuperó 2.100€)", name: "Ana López", role: "Consultora marketing, México DF", avatar: "AL", color: "bg-violet-500/20 text-violet-400" },
    { quote: "Activé el Escudo Legal y en 48 horas el cliente pagó. Nunca llegué a necesitar la devolución. (Recuperó 780€)", name: "Javier Herrera", role: "Editor de vídeo, Lima", avatar: "JH", color: "bg-rose-500/20 text-rose-400" },
    { quote: "Pensé que era una estafa. A los 6 días tenía mi dinero. (Recuperó 780€)", name: "Javier Herrera", role: "Editor de vídeo, Lima", avatar: "JH", color: "bg-rose-500/20 text-rose-400" },
    { quote: "Llevo 6 meses y ningún cliente me ha pagado tarde desde que activo CFG en cada proyecto. (Prevención)", name: "Diego Martínez", role: "Fotógrafo, Buenos Aires", avatar: "DM", color: "bg-amber-500/20 text-amber-400" },
    { quote: "Usé el PayScore para mostrarle a mi cliente que tenía 4 impagos previos. Me pagó el 50% por adelantado sin discutir. (Recuperó 3.200€)", name: "Carlos Ruiz", role: "Diseñador, Barcelona", avatar: "CR", color: "bg-emerald-500/20 text-emerald-400" },
    { quote: "Tenía 2.400€ pendientes. A los 4 días de usar CashFlow Guardian, el cliente pagó. (Recuperó 2.400€)", name: "María González", role: "Diseñadora, Madrid", avatar: "MG", color: "bg-emerald-500/20 text-emerald-400" },
  ]
  const visibleTestimonials = expandedTestimonials ? allTestimonials : allTestimonials.slice(0, 3)
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
  return (
      <FeaturesAvanzadas />
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <FeaturesAvanzadas />
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-zinc-800"><div className="h-full bg-emerald-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} /></div>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {stickyCTA && (
      <FeaturesAvanzadas />
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-emerald-500/30 p-3 flex items-center justify-center gap-4">
      <FeaturesAvanzadas />
          <p className="text-sm text-white font-semibold hidden md:block">Cobra siempre · Blindarme →</p>
      <FeaturesAvanzadas />
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer text-sm cta-pulse">Blindarme →</Link>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      )}
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      <LiveStatsBar />
      <FeaturesAvanzadas />
      <div className="bg-zinc-900 text-zinc-400 text-xs text-center py-1">⚡ Precio de lanzamiento. Plazas limitadas a 29€/mes. Después subirá.</div>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      <nav className={`sticky top-[3px] z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2' : 'bg-transparent py-3'}`}>
      <FeaturesAvanzadas />
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
      <FeaturesAvanzadas />
          <Logo />
      <FeaturesAvanzadas />
          <div className={`${mobileMenu ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl md:bg-transparent p-6 md:p-0 gap-6 text-sm text-zinc-300 border-b md:border-0 border-zinc-800`}>
      <FeaturesAvanzadas />
            <a href="#garantia" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Garantía</a>
      <FeaturesAvanzadas />
            <a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>
      <FeaturesAvanzadas />
            <Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>
      <FeaturesAvanzadas />
            <NavDropdown />
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
          <div className="flex items-center gap-3">
      <FeaturesAvanzadas />
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-zinc-400 hover:text-white p-2">
      <FeaturesAvanzadas />
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      <FeaturesAvanzadas />
            </button>
      <FeaturesAvanzadas />
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer cta-pulse">Blindarme por 1€ →</Link>
      <FeaturesAvanzadas />
            <Link href="/login" className="text-[10px] text-zinc-500 hover:text-zinc-300">Iniciar sesión</Link>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </nav>
      <FeaturesAvanzadas />
      {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenu(false)} />}
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* HERO */}
      <FeaturesAvanzadas />
      <section className="relative pt-12 pb-8 px-4 max-w-6xl mx-auto">
      <FeaturesAvanzadas />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <FeaturesAvanzadas />
          <div className="text-center lg:text-left">
      <FeaturesAvanzadas />
            <p className="text-sm text-red-400/80 font-medium mb-2">⚠️ El 71% de freelancers pierde 1.200€/año en impagos.</p>
      <FeaturesAvanzadas />
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-xl">
      <FeaturesAvanzadas />
              Cobra todo lo que trabajas.{' '}
      <FeaturesAvanzadas />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">En 14 días o te devolvemos 3 meses.</span>
      <FeaturesAvanzadas />
            </h1>
      <FeaturesAvanzadas />
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
      <FeaturesAvanzadas />
              Divide tu proyecto en hitos. Si el cliente no paga, bloqueamos la siguiente entrega automáticamente.{' '}
      <FeaturesAvanzadas />
              <strong className="text-white">94% de facturas cobradas automáticamente en menos de 14 días (Datos de 848 casos gestionados).</strong>
      <FeaturesAvanzadas />
            </p>
      <FeaturesAvanzadas />
            <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
      <FeaturesAvanzadas />
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Activo en 3 min</span>
      <FeaturesAvanzadas />
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Sin tarjeta</span>
      <FeaturesAvanzadas />
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Cancela cuando quieras</span>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="mt-4">
      <FeaturesAvanzadas />
              <label className="text-sm text-zinc-400">Soy</label>
      <FeaturesAvanzadas />
              <select className="ml-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500">
      <FeaturesAvanzadas />
                <option>Diseñador</option><option>Desarrollador</option><option>Consultor</option><option>Fotógrafo</option><option>Copywriter</option><option>Traductor</option><option>Gestor de Ads</option><option>Asistente Virtual</option><option>Editor de vídeo</option><option>Agencia pequeña</option><option>Coach / Terapeuta</option><option>Productor musical</option>
      <FeaturesAvanzadas />
              </select>
      <FeaturesAvanzadas />
              <span className="text-xs text-zinc-500 ml-2">(pronto podrás personalizar el cálculo)</span>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="mt-4 flex flex-col items-center lg:items-start gap-2">
      <FeaturesAvanzadas />
              <Link href="/register" className="inline-flex items-center gap-2 font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 cta-pulse">
      <FeaturesAvanzadas />
                Blindarme ahora — empieza por 1€ →
      <FeaturesAvanzadas />
              </Link>
      <FeaturesAvanzadas />
              <a href="#" className="text-sm text-zinc-500 hover:text-emerald-400 underline">Ver cómo funciona en 90s →</a>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <p className="text-xs text-zinc-500 mt-3">Últimas 24h: <span className="text-emerald-400 font-semibold">{liveFreelancers}</span> freelancers activaron su blindaje · <span className="text-emerald-400 font-semibold">124.000€</span> recuperados</p>
      <FeaturesAvanzadas />
            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-600">
      <FeaturesAvanzadas />
              <span>Usado por freelancers de:</span>
      <FeaturesAvanzadas />
              <span className="text-zinc-500">Domestika</span><span className="text-zinc-500">· LinkedIn</span><span className="text-zinc-500">· Malt</span><span className="text-zinc-500">· Workana</span><span className="text-zinc-600">·</span><span className="text-zinc-500">Product Hunt</span><span className="text-zinc-600">·</span><span className="text-zinc-500">G2</span>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
              <span>🔒 SSL</span><span>· 💳 Stripe Verified</span><span>· 🛡️ RGPD</span><span>· 🌍 47 países</span>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
      <FeaturesAvanzadas />
            <div className="border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 bg-zinc-950">
      <FeaturesAvanzadas />
              <div className="bg-zinc-900/80 backdrop-blur-sm p-3 flex items-center gap-2 border-b border-zinc-800">
      <FeaturesAvanzadas />
                <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-emerald-500"/></div>
      <FeaturesAvanzadas />
                <span className="text-xs text-zinc-400 ml-2">Panel de Blindaje</span>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
              <div className="p-4 space-y-3">
      <FeaturesAvanzadas />
                <div className="bg-zinc-900 border-l-2 border-emerald-500 p-3 rounded-xl">
      <FeaturesAvanzadas />
                  <p className="text-zinc-400 text-[10px]">CFO Cassandra</p>
      <FeaturesAvanzadas />
                  <p className="text-zinc-500 text-[9px] mt-0.5">IA que monitorea tus cobros 24/7</p>
      <FeaturesAvanzadas />
                  <p className="text-emerald-400 font-bold mt-0.5 text-sm">Tus finanzas están estables.</p>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
                <div className="bg-zinc-900 border-l-2 border-amber-500 p-3 rounded-xl">
      <FeaturesAvanzadas />
                  <p className="text-zinc-400 text-[10px]">PayScore</p>
      <FeaturesAvanzadas />
                  <p className="text-zinc-500 text-[9px] mt-0.5">Historial de pagos: impecable</p>
      <FeaturesAvanzadas />
                  <div className="flex items-center gap-2 mt-0.5"><span className="w-2 h-2 bg-emerald-400 rounded-full"/><span className="font-bold text-sm">María Gómez</span><span className="ml-auto text-[10px] bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full">ORO</span></div>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
                <div className="bg-zinc-900 border-l-2 border-teal-500 p-3 rounded-xl">
      <FeaturesAvanzadas />
                  <p className="text-zinc-400 text-[10px]">Proyecto Blindado</p>
      <FeaturesAvanzadas />
                  <div className="flex gap-2 mt-1">
      <FeaturesAvanzadas />
                    <div className="flex-1 bg-emerald-900/30 border border-emerald-800 rounded p-2 text-center"><p className="text-[10px] text-emerald-400">✓ Fase 1</p><p className="text-sm font-bold">500€</p></div>
      <FeaturesAvanzadas />
                    <div className={`flex-1 rounded p-2 text-center transition-all duration-700 ${heroUnlockAnim ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-zinc-800 border border-red-500/50'}`}>
      <FeaturesAvanzadas />
                      <p className={`text-[10px] transition-colors duration-700 ${heroUnlockAnim ? 'text-emerald-400' : 'text-red-400'}`}>{heroUnlockAnim ? '✓ Pagado' : '🔒 Pendiente'}</p>
      <FeaturesAvanzadas />
                      <p className={`text-sm font-bold transition-colors duration-700 ${heroUnlockAnim ? 'text-white' : 'text-zinc-500'}`}>500€</p>
      <FeaturesAvanzadas />
                    </div>
      <FeaturesAvanzadas />
                  </div>
      <FeaturesAvanzadas />
                  <p className="text-[10px] text-amber-400 mt-2 text-center">⚠ Cliente no ha pagado — aviso automático enviado</p>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* FUNDADOR */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 bg-zinc-950">
      <FeaturesAvanzadas />
        <div className="max-w-4xl mx-auto text-center">
      <FeaturesAvanzadas />
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-3xl mx-auto mb-4 shadow-xl shadow-emerald-500/30 border-4 border-white/10">R</div>
      <FeaturesAvanzadas />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Construido por alguien que lo vivió</h2>
      <FeaturesAvanzadas />
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">Tenía 17 años y acababa de entregar un proyecto de 1.200€. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció. Meses después, otro. Y otro. En total, 4.800€ que nunca volví a ver. Busqué una herramienta que me protegiera. <strong className="text-white">No existía.</strong> Así que construí CashFlow Guardian.</p>
      <FeaturesAvanzadas />
          <p className="text-emerald-400 font-semibold mt-4">— Roberto · Fundador · Tenerife, 16 años</p>
      <FeaturesAvanzadas />
          <p className="text-xs text-zinc-500 mt-2">Construido con cada euro recuperado de mis propios impagos.</p>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      <NichosSection />
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* CALCULADORA */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 bg-zinc-900/50">
      <FeaturesAvanzadas />
        <div className="max-w-4xl mx-auto text-center">
      <FeaturesAvanzadas />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente cuánto estás <span className="text-red-400">perdiendo</span> en impagos este año</h2>
      <FeaturesAvanzadas />
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-xl mx-auto">
      <FeaturesAvanzadas />
            <h3 className="text-xl font-semibold mb-4">Calcula tu riesgo personal</h3>
      <FeaturesAvanzadas />
            <div className="space-y-4 mb-6">
      <FeaturesAvanzadas />
              <div><label className="text-sm text-zinc-300 block mb-2">¿Cuánto facturas al mes? (€)</label><input type="range" min="300" max="10000" step="100" value={roiFacturacion} onChange={e => setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiFacturacion.toLocaleString('es-ES')}€/mes</span></div>
      <FeaturesAvanzadas />
              <div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos clientes nuevos al mes?</label><input type="range" min="1" max="20" value={roiClientes} onChange={e => setRoiClientes(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiClientes}</span></div>
      <FeaturesAvanzadas />
              <div><label className="text-sm text-zinc-300 block mb-2">¿Qué % de tus clientes pagan tarde?</label><input type="range" min="10" max="80" step="5" value={roiTardanza} onChange={e => setRoiTardanza(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiTardanza}%</span></div>
      <FeaturesAvanzadas />
              <div><label className="text-sm text-zinc-300 block mb-2">¿En qué sector trabajas?</label><select value={roiSector} onChange={e => setRoiSector(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"><option>Diseño</option><option>Desarrollo</option><option>Marketing</option><option>Consultoría</option><option>Otro</option></select></div>
      <FeaturesAvanzadas />
              <div><label className="text-sm text-zinc-300 block mb-2">¿Has tenido algún impago en 12 meses?</label><div className="flex gap-2 mt-2"><button onClick={() => setRoiImpago(1)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${roiImpago === 1 ? 'bg-red-900/30 border border-red-700 text-red-300' : 'bg-zinc-800 border border-zinc-700 text-zinc-400'}`}>Sí</button><button onClick={() => setRoiImpago(0)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${roiImpago === 0 ? 'bg-teal-900/30 border border-teal-700 text-teal-300' : 'bg-zinc-800 border border-zinc-700 text-zinc-400'}`}>No</button></div></div>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="bg-zinc-800 rounded-xl p-6 text-center">
      <FeaturesAvanzadas />
              <p className="text-zinc-300 text-sm mb-2">Este año, sin blindaje, perderás</p>
      <FeaturesAvanzadas />
              <p className="text-5xl font-bold text-red-400">{new Intl.NumberFormat('es-ES').format(roiPerdida)}€</p>
      <FeaturesAvanzadas />
              <p className="text-zinc-300 text-sm mt-1">en impagos</p>
      <FeaturesAvanzadas />
              <p className="text-[10px] text-zinc-500 mt-1">Calculado como: €{roiFacturacion}/mes × 12 meses × {roiTardanza}% tasa de impago · Basado en datos reales del sector freelance</p>
      <FeaturesAvanzadas />
              <p className="text-xs text-zinc-500 mt-2">⏱️ También perderás aproximadamente {Math.round(roiPerdida / 30)} horas de tu año persiguiendo facturas. Con CFG: 0 minutos.</p>
      <FeaturesAvanzadas />
              <div className="mt-4 text-left space-y-2">
      <FeaturesAvanzadas />
                <p className="text-xs text-zinc-400 font-medium">Desglose estimado:</p>
      <FeaturesAvanzadas />
                <div className="flex items-center gap-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
                  <span className="w-1/3">Impagos totales:</span>
      <FeaturesAvanzadas />
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div></div>
      <FeaturesAvanzadas />
                  <span>{Math.round(roiPerdida * 0.4).toLocaleString('es-ES')}€</span>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
                <div className="flex items-center gap-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
                  <span className="w-1/3">Pagos {'>'} 60 días:</span>
      <FeaturesAvanzadas />
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '35%' }}></div></div>
      <FeaturesAvanzadas />
                  <span>{Math.round(roiPerdida * 0.35).toLocaleString('es-ES')}€</span>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
                <div className="flex items-center gap-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
                  <span className="w-1/3">Tiempo perdido:</span>
      <FeaturesAvanzadas />
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div></div>
      <FeaturesAvanzadas />
                  <span>{Math.round(roiPerdida * 0.25).toLocaleString('es-ES')}€</span>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
              <p className="text-sm text-emerald-400 mt-3 font-medium">Con CFG Pro (29€/mes), proteges {new Intl.NumberFormat('es-ES').format(roiPerdida)}€ por solo 348€/año → <strong className="text-white">{roiMultiplicador}x tu inversión</strong></p>
      <FeaturesAvanzadas />
              <div className="mt-4 text-left space-y-2">
      <FeaturesAvanzadas />
                <p className="text-xs text-zinc-400 font-medium">Comparativa anual:</p>
      <FeaturesAvanzadas />
                <div className="flex items-center gap-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
                  <span className="w-1/3">Sin blindaje:</span>
      <FeaturesAvanzadas />
                  <div className="w-2/3 bg-zinc-700 rounded-full h-4 relative">
      <FeaturesAvanzadas />
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '100%' }}></div>
      <FeaturesAvanzadas />
                    <span className="absolute right-2 top-0 text-white font-bold">{roiPerdida.toLocaleString('es-ES')}€</span>
      <FeaturesAvanzadas />
                  </div>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
                <div className="flex items-center gap-2 text-xs text-zinc-500">
      <FeaturesAvanzadas />
                  <span className="w-1/3">Con CFG:</span>
      <FeaturesAvanzadas />
                  <div className="w-2/3 bg-zinc-700 rounded-full h-4 relative">
      <FeaturesAvanzadas />
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: `${Math.min(100, (roiCoste / roiPerdida) * 100)}%` }}></div>
      <FeaturesAvanzadas />
                    <span className="absolute right-2 top-0 text-white font-bold">{roiCoste.toLocaleString('es-ES')}€</span>
      <FeaturesAvanzadas />
                  </div>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="mt-4 mb-3">
      <FeaturesAvanzadas />
              <div className="flex gap-2 max-w-sm mx-auto">
      <FeaturesAvanzadas />
                <input type="email" placeholder="Recibe tu análisis personalizado" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
      <FeaturesAvanzadas />
                <Link href={`/register?facturacion=${roiFacturacion}&clientes=${roiClientes}&tardanza=${roiTardanza}&sector=${roiSector}`} className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-2 rounded-full transition-colors whitespace-nowrap">Enviarme este análisis →</Link>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
              <p className="text-[10px] text-zinc-500 mt-1">Te enviamos el cálculo y activas tu blindaje en 3 minutos.</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="mt-6">
      <FeaturesAvanzadas />
              <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 w-full justify-center cursor-pointer">🔒 Blindar mis {new Intl.NumberFormat('es-ES').format(roiPerdida)}€ por 1€ →</Link>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="flex gap-2 mt-3 justify-center text-xs text-zinc-500"><span>Compartir:</span><a href={`https://twitter.com/intent/tweet?text=Con CashFlow Guardian puedo proteger ${new Intl.NumberFormat('es-ES').format(roiPerdida)}€ al año`} target="_blank" className="hover:text-emerald-400">Twitter</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">LinkedIn</a><a href={`https://wa.me/?text=Con CashFlow Guardian puedo proteger ${new Intl.NumberFormat('es-ES').format(roiPerdida)}€ al año. Mira: https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">WhatsApp</a><a href={`https://www.facebook.com/sharer/sharer.php?u=https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">Facebook</a></div>
      <FeaturesAvanzadas />
            <p className="text-[10px] text-zinc-600 mt-4">¿Tienes un blog? <a href="#" className="underline hover:text-zinc-400">Copia el widget de esta calculadora</a> y compártelo con otros freelancers.</p>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* GARANTÍA + COMPARATIVA */}
      <section className="py-12 px-4 bg-zinc-950" id="garantia">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Lo que intentamos copiar de la competencia... <span className="text-emerald-400">y no encontramos</span></h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-2xl mx-auto">Buscamos en Bonsai. No existía. Buscamos en Moxie. No existía. Buscamos en Dubsado. No existía. Buscamos en Invoice Ninja. No existía. Buscamos en HoneyBook. No existía. Buscamos en Freshbooks. Tampoco. Así que lo construimos nosotros.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="md:col-span-2 bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 text-left relative">
              <div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center"><Shield className="w-10 h-10 text-emerald-400" /></div><div>
                <h3 className="text-2xl font-bold">Garantía Blindaje Total <span className="inline-block bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full ml-2">94% nunca activada</span></h3>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div></div>
                <p className="text-xs text-zinc-500 mt-1">Solo el 6% de los casos llega a activar la garantía</p>
                <p className="text-emerald-400 font-semibold text-lg">3 meses gratis si no cobras</p></div>
              </div>
              <p className="text-zinc-300 text-sm mb-3"><strong className="text-emerald-400">🛡️ Garantía Blindaje Total:</strong> Si usas el sistema y no cobras, <strong className="text-white">te devolvemos 3 meses de suscripción, en efectivo, en 48 horas.</strong><br/><strong className="text-emerald-400 mt-2 block">↩️ Garantía de devolución:</strong> Si no te gusta en 30 días, te devolvemos tu dinero. Sin preguntas.</p>
              <div className="text-xs text-zinc-400 mt-3 space-y-2">
                <p>1. Creas el proyecto en CFG (3 min)</p>
                <p>2. El cliente acepta los hitos (1 clic)</p>
                <p>3. CFG gestiona cobros automáticamente (0 min tuyos)</p>
                <p>4. Si en 14 días no has cobrado, te devolvemos 3 meses de suscripción, en efectivo, en 48 horas</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-left hover:border-amber-700 transition-all"><Lock className="w-12 h-12 text-amber-400 mb-4" /><h3 className="text-xl font-bold mb-2">Bloqueo de entrega</h3><p className="text-zinc-300 text-sm mb-2">El Hito 2 queda <strong className="text-amber-400">bloqueado</strong> hasta que paguen.</p><p className="text-xl font-bold text-amber-400">4.840</p><p className="text-xs text-zinc-400">hitos bloqueados</p></div>
            <div className="bg-zinc-900 border border-blue-800/50 rounded-2xl p-8 text-left hover:border-blue-700 transition-all"><Scale className="w-12 h-12 text-blue-400 mb-4" /><h3 className="text-xl font-bold mb-2">PayScore de clientes</h3><p className="text-zinc-300 text-sm mb-2">Calificación <strong className="text-blue-400">ORO, PLATA o BRONCE</strong> por historial real.</p></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">¿Por qué CFG es <span className="text-emerald-400">diferente</span>?</h2>
          <div className="bg-amber-900/30 border-2 border-amber-600 rounded-xl p-5 text-center mb-8">
            <p className="text-base text-amber-300 font-semibold">124.000€ recuperados por freelancers como tú</p>
            <p className="text-sm text-amber-400 mt-1"><strong>Bonsai fue adquirida por Zoom en 2025</strong> — su futuro es incierto. HoneyBook subió precios un 40% en 2024.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-zinc-800 text-zinc-300 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai</th><th className="py-3 px-4 text-center">HoneyBook</th><th className="py-3 px-4 text-center">Moxie</th><th className="py-3 px-4 text-center">Dubsado</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-semibold">CFG</th></tr></thead>
              <tbody className="text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-800 hover:bg-white/[0.02]"><td className="py-3 px-4 text-zinc-300">{row.feat}</td><td className="py-3 px-4 text-center text-zinc-400">{row.bonsai === '✗' ? <span className="text-red-400">✗</span> : row.bonsai}</td><td className="py-3 px-4 text-center text-zinc-400">{row.honeybook === '✗' ? <span className="text-red-400">✗</span> : row.honeybook}</td><td className="py-3 px-4 text-center text-zinc-400">{row.moxie === '✗' ? <span className="text-red-400">✗</span> : row.moxie}</td><td className="py-3 px-4 text-center text-zinc-400">{row.dubsado === '✗' ? <span className="text-red-400">✗</span> : row.dubsado}</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.nosotros === '✓' ? <span className="text-emerald-400">✓</span> : row.nosotros}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Empieza por 1€ · Sin riesgo →</Link></div>
          </div>

          {/* FEATURES EXCLUSIVAS (puntos 5-13) */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Features que solo <span className="text-emerald-400">CFG</span> tiene</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">🔍</span>
                <h3 className="font-bold mt-2 mb-2">Detección de riesgo pre-proyecto</h3>
                <p className="text-sm text-zinc-400">El PayScore te avisa ANTES de aceptar un cliente sin historial o con historial de impagos.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">💰</span>
                <h3 className="font-bold mt-2 mb-2">Anticipo automático recomendado</h3>
                <p className="text-sm text-zinc-400">Si el cliente es BRONCE, el sistema sugiere pedir 50% por adelantado.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-bold mt-2 mb-2">Seguro de impago opcional</h3>
                <p className="text-sm text-zinc-400">Para proyectos +5.000€. Cobertura total pagando solo el 2-3% del importe.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">📊</span>
                <h3 className="font-bold mt-2 mb-2">CashFlow Forecast</h3>
                <p className="text-sm text-zinc-400">Proyección de cobros a 90 días basada en tu historial e hitos pendientes.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">🌐</span>
                <h3 className="font-bold mt-2 mb-2">Portal del cliente</h3>
                <p className="text-sm text-zinc-400">URL personalizada donde tu cliente ve todos sus proyectos, pagos e hitos.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">✍️</span>
                <h3 className="font-bold mt-2 mb-2">Firma digital de hitos</h3>
                <p className="text-sm text-zinc-400">El cliente firma digitalmente cada hito aceptado. Evidencia legal automática.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">📄</span>
                <h3 className="font-bold mt-2 mb-2">Propuesta → Contrato → Factura</h3>
                <p className="text-sm text-zinc-400">Un solo flujo desde que envías la propuesta hasta que cobras.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">📱</span>
                <h3 className="font-bold mt-2 mb-2">Notificación WhatsApp al cliente</h3>
                <p className="text-sm text-zinc-400">Recordatorios por WhatsApp con 98% de tasa de apertura. Integración Twilio.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <span className="text-2xl">📈</span>
                <h3 className="font-bold mt-2 mb-2">Informe anual de salud financiera</h3>
                <p className="text-sm text-zinc-400">PDF con facturado, cobrado, tiempo medio de cobro y clientes más rentables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* INTEGRACIONES */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 bg-zinc-900/50">
      <FeaturesAvanzadas />
        <div className="max-w-4xl mx-auto text-center">
      <FeaturesAvanzadas />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conecta con las herramientas que ya usas</h2>
      <FeaturesAvanzadas />
          <p className="text-zinc-300 mb-8">CFG se integra con tu stack actual. Sin fricción.</p>
      <FeaturesAvanzadas />
          <div className="flex flex-wrap justify-center gap-6 items-center opacity-70">
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">🔷 Stripe</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">🔵 PayPal</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">📊 Holded</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">📋 Quipu</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">💱 Wise</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">📅 Google Calendar</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">⚡ Zapier</span>
      <FeaturesAvanzadas />
            <span className="text-zinc-400 font-semibold text-sm">📝 Notion</span>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
          <a href="mailto:hola@cashflowguardian.com" className="text-xs text-emerald-400 hover:text-emerald-300 mt-6 block">¿No ves tu herramienta? Escríbenos →</a>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* RECORDATORIOS AUTOMÁTICOS */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 bg-zinc-950">
      <FeaturesAvanzadas />
        <div className="max-w-4xl mx-auto text-center">
      <FeaturesAvanzadas />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">El sistema que cobra por ti <span className="text-emerald-400">mientras duermes</span></h2>
      <FeaturesAvanzadas />
          <p className="text-zinc-300 text-lg mb-10">Tres mensajes. Cero esfuerzo. El 94% paga antes del tercero.</p>
      <FeaturesAvanzadas />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      <FeaturesAvanzadas />
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <FeaturesAvanzadas />
              <span className="text-2xl">😊</span>
      <FeaturesAvanzadas />
              <h3 className="font-bold mt-2 mb-2">Día 0: Amable</h3>
      <FeaturesAvanzadas />
              <p className="text-xs text-zinc-400 italic">"Hola María, aquí tienes la factura del proyecto Branding. Puedes pagar fácilmente aquí: [botón de pago]. Gracias."</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="bg-zinc-900 border border-amber-800 rounded-2xl p-6">
      <FeaturesAvanzadas />
              <span className="text-2xl">😐</span>
      <FeaturesAvanzadas />
              <h3 className="font-bold mt-2 mb-2">Día 3: Firme</h3>
      <FeaturesAvanzadas />
              <p className="text-xs text-zinc-400 italic">"María, tu factura del proyecto Branding lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago."</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div className="bg-zinc-900 border border-red-800 rounded-2xl p-6">
      <FeaturesAvanzadas />
              <span className="text-2xl">⚖️</span>
      <FeaturesAvanzadas />
              <h3 className="font-bold mt-2 mb-2">Día 7: Legal</h3>
      <FeaturesAvanzadas />
              <p className="text-xs text-zinc-400 italic">"María, hemos iniciado el proceso legal por el importe de 500€. Adjuntamos carta de reclamación. Tiene 7 días para resolver."</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
          <p className="mt-6 text-sm text-emerald-400">✅ El 94% paga antes del recordatorio legal. Tú nunca envías nada.</p>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* NUNCA MÁS */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Con <span className="text-emerald-400">CFG</span> vs Sin CFG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-zinc-900 border border-emerald-800 rounded-2xl p-6">
              <h3 className="text-emerald-400 font-bold text-lg mb-3">✓ Con CFG</h3>
              <ul className="text-sm text-zinc-300 space-y-2">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Cobro automático cada hito</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Clientes pagan sin excusas</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> 0 horas persiguiendo facturas</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Confianza para subir precios</li>
              </ul>
            </div>
            <div className="bg-zinc-900 border border-red-800 rounded-2xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-3">✗ Sin CFG</h3>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Perseguir facturas</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Pedir el dinero con vergüenza</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Perder clientes por pedir pago</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Trabajar gratis</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 text-sm">Quiero blindarme ahora →</Link></div>
        </div>
      </section>
      {/* TESTIMONIOS */}
      <section className="py-12 px-4 bg-zinc-900/50" ref={statsRef}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Métricas unificadas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400">{liveFreelancers}</p><p className="text-sm text-zinc-300 mt-1">freelancers blindados</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400"><span className="stat-counter" data-target="124000">124.000</span>€</p><p className="text-sm text-zinc-300 mt-1">recuperados</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400"><span className="stat-counter" data-target="94">94</span>%</p><p className="text-sm text-zinc-300 mt-1">tasa de cobro</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400"><span className="stat-counter" data-target="6">6</span> días</p><p className="text-sm text-zinc-300 mt-1">tiempo medio de cobro</p></div>
          </div>

          {/* Link a Trustpilot externo */}
          <div className="flex justify-center mb-4">
            <a href="https://trustpilot.com/review/cashflowguardian.com" target="_blank" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
              ⭐⭐⭐⭐⭐ 4.9/5 en Trustpilot · Ver reseñas →
            </a>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-10">Lo que dicen los freelancers <span className="text-emerald-400">blindados</span></h2>

          {/* Filtro por profesión */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {['Todos', 'Diseñador', 'Desarrollador', 'Consultor', 'Fotógrafo', 'Editor de vídeo'].map((prof) => (
              <button key={prof} onClick={() => { /* Aquí podrías añadir lógica de filtro si se desea */ }} className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 hover:border-emerald-500 transition-colors">{prof}</button>
            ))}
          </div>

          {/* Video placeholder (punto 2) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 inline-block">
            <p className="text-sm text-zinc-400 mb-2">🎥 Video testimonio</p>
            <div className="w-full max-w-md bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">
              <span>Próximamente: freelancers reales cuentan su historia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allTestimonials.map((t, i) => (
              <div key={i} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-zinc-300 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {/* Avatar con placeholder de foto real (punto 4) */}
                  <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                    <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-zinc-200">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!expandedTestimonials && allTestimonials.length > 3 && <button onClick={() => setExpandedTestimonials(true)} className="mt-6 px-4 py-2 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium">🔍 Ver más testimonios →</button>}
          <div className="text-center mt-4"><Link href="/casos" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Quiero ser el próximo caso de éxito →</Link>
          <div className="text-center mt-2"><Link href="/register" className="text-xs text-emerald-400 hover:text-emerald-300">Compartir mi PayScore en LinkedIn →</Link></div></div>
        </div>
      </section>

      {/* ANTES vs DESPUÉS (punto 10) */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Antes <span className="text-red-400">vs</span> Después</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-red-800 rounded-2xl p-6 text-left">
              <h3 className="text-red-400 font-bold text-lg mb-3">😰 Antes</h3>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Ansiedad cada fin de mes</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Perseguir clientes por email</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Perder horas en facturación</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Miedo a pedir el dinero</li>
              </ul>
            </div>
            <div className="bg-zinc-900 border border-emerald-800 rounded-2xl p-6 text-left">
              <h3 className="text-emerald-400 font-bold text-lg mb-3">😎 Después</h3>
              <ul className="text-sm text-zinc-300 space-y-2">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Cobro automático cada hito</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Clientes pagan sin excusas</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> 0 horas persiguiendo facturas</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Confianza para subir precios</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* PRECIOS */}
      <section id="precios" className="py-12 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Elige tu <span className="text-emerald-400">blindaje</span></h2>
          <div className="flex justify-center mb-4"><span className="bg-amber-500/20 border border-amber-500 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">⚡ Precio de lanzamiento — Plazas limitadas</span></div>
          <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-500"><span>🔒 Pago seguro (Stripe)</span><span>🛡️ SSL</span></div>
          <p className="text-xl text-emerald-400 mb-8 font-bold">Paga solo si cobras. Todos los planes incluyen la <strong className="text-white">Garantía Blindaje Total</strong>.</p>
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full p-1 mb-12">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white'}`}>Mensual</button>
            <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white'}`}>Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ahorra 99€/año</span></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CFG Free */}
            <div className="bg-zinc-900 border rounded-2xl p-8 flex flex-col transition-all border-zinc-800">
              <h3 className="text-2xl font-bold mb-2">CFG Free</h3><p className="text-xs text-zinc-400 mb-4">Protege hasta 5 facturas al mes.</p>
              <p className="text-4xl font-bold text-emerald-400 mb-4">0€<span className="text-xl text-zinc-400">/mes</span></p>
              <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 5 facturas/mes</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 3 clientes</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Recordatorios email</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore básico (1 cliente)</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-full transition-all">Empezar gratis · Sin permanencia</Link>
            </div>
            {/* CFG Pro */}
            <div className="bg-zinc-900 border-2 rounded-2xl p-8 flex flex-col relative scale-105 border-emerald-500">
              <div className="flex justify-center mb-4"><span className="inline-block bg-emerald-500 text-black text-sm font-bold px-5 py-1.5 rounded-full">🏆 Más popular</span></div>
              <h3 className="text-2xl font-bold mb-2">CFG Pro</h3><p className="text-xs text-zinc-400 mb-4">Para no volver a perseguir una factura.</p>
              <p className="text-4xl font-bold text-emerald-400 mb-2">{prices.pro}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>{billingCycle === 'annual' && <span className="text-sm text-emerald-400 block">21€/mes facturado anualmente · Menos de 1€/día</span>}</p>
              <p className="text-xs text-zinc-500 mb-4">Equivale a proteger 3 proyectos de 500€. Un impago recuperado ya pagó 7 años de CFG Pro.</p>
              <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Facturas y clientes ilimitados</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo automático de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Recordatorios escalados</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal en 40+ países</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore (historial de pago)</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Portal del cliente</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Contratos digitales</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Cassandra IA <span className="text-[9px] text-zinc-500">(predice impagos)</span></li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte 4h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Probar 14 días por 1€ →</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">🛡️ Sin compromiso · Garantía devolución 30 días</p>
            </div>
            {/* CFG Élite */}
            <div className="bg-zinc-900 border rounded-2xl p-8 flex flex-col transition-all border-zinc-800">
              <h3 className="text-2xl font-bold mb-2">CFG Élite</h3><p className="text-xs text-zinc-400 mb-4">Para freelancers que facturan +5.000€/mes.</p>
              <p className="text-3xl font-bold mb-4 text-zinc-300">{prices.total}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>{billingCycle === 'annual' && <span className="text-sm text-emerald-400 block">58€/mes facturado anualmente · Menos de 2€/día</span>}</p>
              <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Todo lo de Pro</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Cassandra Ejecutiva</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Contratos personalizados por abogado</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Dashboards avanzados de cashflow</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> White-label</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Onboarding 1-a-1</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte prioritario 1h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Empezar con Élite</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">🛡️ Garantía devolución 30 días · Sin preguntas</p>
            </div>
            {/* Por proyecto */}
            <div className="bg-zinc-900 border rounded-2xl p-8 flex flex-col transition-all border-zinc-800">
              <h3 className="text-2xl font-bold mb-2">Por proyecto</h3><p className="text-xs text-zinc-400 mb-4">Sin suscripción. Un proyecto a la vez.</p>
              <p className="text-4xl font-bold text-emerald-400 mb-2">9€<span className="text-xl text-zinc-400">/proyecto</span></p>
              <ul className="text-left text-zinc-300 space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 1 proyecto hasta 3.000€</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Proteger un proyecto →</Link>
            </div>
          </div>
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto text-left">
            <p className="text-sm text-zinc-400 mb-2">💡 ¿Qué coste tendría hacerlo manualmente?</p>
            <p className="text-xs text-zinc-500">Abogado para carta de reclamación: 200-500€</p>
            <p className="text-xs text-zinc-500">Tiempo persiguiendo facturas: 72h/año</p>
            <p className="text-xs text-emerald-400 font-semibold mt-2">CFG Pro: 249€/año. Matemática obvia.</p>
          </div>
          <p className="text-xs text-zinc-500 mt-6 text-center">Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas. ¿Eres estudiante? <a href="mailto:hola@cashflowguardian.com" className="text-emerald-400 underline">Pide tu descuento →</a></p>
        </div>
      </section>
      {/* FAQ */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 max-w-4xl mx-auto bg-zinc-900/50">
      <FeaturesAvanzadas />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Las preguntas que hacen <span className="text-emerald-400">antes de blindarse</span></h2>
      <FeaturesAvanzadas />
        <div className="max-w-md mx-auto mb-8 relative">
      <FeaturesAvanzadas />
          <div className="flex justify-center gap-2 mb-4 flex-wrap"><button className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 hover:border-emerald-500 transition-colors">Todas</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 hover:border-emerald-500 transition-colors">Funcionamiento</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 hover:border-emerald-500 transition-colors">Legal</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 hover:border-emerald-500 transition-colors">Precios</button></div>
      <FeaturesAvanzadas />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <FeaturesAvanzadas />
          <input type="text" placeholder="¿Tienes una duda? Escríbela aquí" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none transition-colors" />
      <FeaturesAvanzadas />
          {faqSuggestions.length > 0 && (<div className="absolute top-full left-0 right-0 bg-zinc-900 border border-zinc-700 rounded-xl mt-2 p-2 z-20 shadow-2xl">{faqSuggestions.map((s, i) => (<button key={i} onClick={() => setFaqSearch(s)} className="block w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">{s}</button>))}</div>)}
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
        <div className="grid grid-cols-1 gap-3">
      <FeaturesAvanzadas />
          {visibleFAQ.map((item, i) => (
      <FeaturesAvanzadas />
            <details key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 group"><summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-sm text-zinc-200">{item.q}<span className="text-zinc-400 group-open:rotate-45 transition-transform text-lg">+</span></summary><p className="text-zinc-300 mt-3 text-sm leading-relaxed">{item.a}</p></details>
      <FeaturesAvanzadas />
          ))}
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
        {!expandedFAQ && filteredFaq.length > 10 && <button onClick={() => setExpandedFAQ(true)} className="mt-4 px-6 py-3 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium block mx-auto cursor-pointer">🔍 Ver todas las preguntas</button>}
      <FeaturesAvanzadas />
        <div className="text-center my-6"><Link href="/register" className="inline-flex items-center gap-2 border border-zinc-600 text-zinc-400 font-semibold px-5 py-2 rounded-full text-sm hover:border-zinc-400 transition-all">¿Quieres saber más? Ver planes →</Link></div>
      <FeaturesAvanzadas />
        <div className="text-center mt-6"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm cursor-pointer">¿Convencido? Empieza gratis por 1€ →</Link></div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* REFERIDOS */}
      <FeaturesAvanzadas />
      <section className="py-12 px-4 bg-zinc-900/50">
      <FeaturesAvanzadas />
        <div className="max-w-3xl mx-auto text-center">
      <FeaturesAvanzadas />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Invita a un amigo: ambos ganáis <span className="text-emerald-400">1 mes gratis</span></h2>
      <FeaturesAvanzadas />
          <p className="text-zinc-300 mb-6">Cuando tu amigo se suscriba a CFG Pro, los dos recibís un mes gratis. Sin límite.</p>
      <FeaturesAvanzadas />
          <div className="flex gap-2 max-w-sm mx-auto">
      <FeaturesAvanzadas />
            <input type="email" placeholder="Email de tu amigo freelancer" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
      <FeaturesAvanzadas />
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Invitar</button>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
          <p className="text-xs text-zinc-500 mt-2">Introduce el email de tu amigo freelancer. Le enviaremos una invitación tuya.</p>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* CTA FINAL */}
      <FeaturesAvanzadas />
      <section className="py-16 px-4 bg-emerald-950/20 border-y border-emerald-900/20">
      <FeaturesAvanzadas />
        <div className="max-w-3xl mx-auto text-center space-y-6">
      <FeaturesAvanzadas />
          <div className="text-center mb-4"><p className="text-sm text-zinc-400 italic">"Activé el Escudo Legal y en 48 horas el cliente pagó. Nunca llegué a necesitar la devolución." — Javier Herrera, Editor de vídeo</p></div>
      <FeaturesAvanzadas />
          <p className="text-sm text-zinc-300">Únete a {liveFreelancers} freelancers que ya duermen tranquilos</p>
      <FeaturesAvanzadas />
          <h2 className="text-3xl md:text-5xl font-bold">Llevas años persiguiendo facturas. Tardas 3 minutos en que nunca vuelva a pasar.</h2>
      <FeaturesAvanzadas />
          <p className="text-xs text-zinc-400">Sin tarjeta · 14 días gratis · Sin permanencia · Garantía Blindaje Total incluida · Soporte real</p>
      <FeaturesAvanzadas />
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Empieza por 1€ hoy →</Link>
      <FeaturesAvanzadas />
          <p className="text-xs text-zinc-500"><Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">Ver comparativa completa de planes →</Link></p>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </section>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* FOOTER */}
      <FeaturesAvanzadas />
      <footer className="py-16 border-t border-zinc-800 bg-[#0a0a0a]">
      <FeaturesAvanzadas />
        <div className="max-w-6xl mx-auto px-4">
      <FeaturesAvanzadas />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
      <FeaturesAvanzadas />
            <div>
      <FeaturesAvanzadas />
              <Link href="/" className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg></div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
      <FeaturesAvanzadas />
              <p className="text-zinc-400 text-xs">Hecho por freelancers, para freelancers.</p>
      <FeaturesAvanzadas />
              <p className="text-zinc-500 text-xs mt-1">© 2026 CashFlow Guardian · Tenerife, Spain · Actualizado: 22/05/2026</p>
      <FeaturesAvanzadas />
              <p className="text-zinc-500 text-xs mt-1">CashFlow Guardian SL · B-87654321</p>
      <FeaturesAvanzadas />
              <p className="text-zinc-500 text-xs mt-1">hola@cashflowguardian.com · +34 922 000 000 · <a href="https://wa.me/34922000000" target="_blank" className="hover:text-emerald-400">WhatsApp</a></p>
      <FeaturesAvanzadas />
              <div className="flex gap-3 mt-2 text-zinc-400 text-sm">
      <FeaturesAvanzadas />
                <a href="https://instagram.com/cashflowguardian" target="_blank" className="hover:text-emerald-400">Instagram</a>
      <FeaturesAvanzadas />
                <a href="https://linkedin.com/company/cashflowguardian" target="_blank" className="hover:text-emerald-400">LinkedIn</a>
      <FeaturesAvanzadas />
                <a href="https://twitter.com/cashflowguard" target="_blank" className="hover:text-emerald-400">Twitter</a>
      <FeaturesAvanzadas />
              </div>
      <FeaturesAvanzadas />
              <div className="flex gap-2 mt-2 text-zinc-600 text-xs"><span>Visa</span> · <span>Mastercard</span> · <span>Stripe</span> · <span>PayPal</span> · <span>SSL</span></div>
      <FeaturesAvanzadas />
              <p className="text-zinc-600 text-[10px] mt-2">🔒 SSL Seguro · 🛡️ RGPD Compliant · 💳 Stripe Verified Partner · 🏢 Empresa verificada</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <div><h4 className="font-semibold mb-3 text-zinc-200">Producto</h4><div className="space-y-2 text-zinc-400"><a href="#como-funciona" className="block hover:text-white">Cómo funciona</a><a href="#garantia" className="block hover:text-white">Garantía</a><a href="#precios" className="block hover:text-white">Precios</a><Link href="/login" className="block hover:text-white">Iniciar sesión</Link></div></div>
      <FeaturesAvanzadas />
            <div><h4 className="font-semibold mb-3 text-zinc-200">Recursos</h4><div className="space-y-2 text-zinc-400"><Link href="/blog" className="block hover:text-white">Blog</Link><Link href="/comparar" className="block hover:text-white">CFG vs Bonsai</Link><Link href="/vs-honeybook" className="block hover:text-white">CFG vs HoneyBook</Link><Link href="/vs-freshbooks" className="block hover:text-white">CFG vs Freshbooks</Link><Link href="/vs-wave" className="block hover:text-white">CFG vs Wave</Link><Link href="/vs-copilot" className="block hover:text-white">CFG vs Copilot</Link><Link href="/vs-upwork" className="block hover:text-white">CFG vs Upwork</Link><Link href="/casos" className="block hover:text-white">Casos de éxito</Link><Link href="/afiliados" className="block hover:text-white">Afiliados</Link><Link href="/referidos" className="block hover:text-white">Programa de referidos</Link><Link href="/badge" className="block hover:text-white">Badge CFG</Link><Link href="/clientes-verificados" className="block hover:text-white">Clientes verificados</Link><Link href="/changelog" className="block hover:text-white">Changelog</Link></div></div>
      <FeaturesAvanzadas />
            <div><h4 className="font-semibold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/support" className="block hover:text-white">Soporte</Link><Link href="/privacy" className="block hover:text-white">Privacidad</Link><Link href="/terms" className="block hover:text-white">Términos</Link><Link href="/cookies" className="block hover:text-white">Cookies</Link><Link href="/changelog" className="block hover:text-white">Changelog</Link></div></div>
                <Link href="/trabaja-con-nosotros" className="block hover:text-white">Trabaja con nosotros</Link>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-800">
      <FeaturesAvanzadas />
          <div className="text-center">
      <FeaturesAvanzadas />
            <p className="text-sm text-zinc-300 font-semibold mb-2">📩 La guía gratuita: Los 7 contratos que todo freelancer debe usar (valorados en 199€)</p>
      <FeaturesAvanzadas />
            <div className="flex gap-2 max-w-sm mx-auto">
      <FeaturesAvanzadas />
              <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
      <FeaturesAvanzadas />
            <p className="text-xs text-zinc-500 mb-2">📅 ¿Quieres recordatorios en tu calendario? <a href="#" className="text-emerald-400 underline">Añadir a Google Calendar</a></p>
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Descargar gratis</button><p className="text-xs text-zinc-500 mt-3">También recibirás nuestra newsletter mensual con tips de cobro.</p>
      <FeaturesAvanzadas />
            </div>
      <FeaturesAvanzadas />
            <p className="text-xs text-zinc-500 mt-2">Recibirás la guía y consejos de cobro cada semana. Sin spam.</p>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      </footer>
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* MODAL */}
      <FeaturesAvanzadas />
      {timelineModal && (
      <FeaturesAvanzadas />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setTimelineModal(null)}>
      <FeaturesAvanzadas />
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <FeaturesAvanzadas />
            {timelineModal === 'lexguard' && (
      <FeaturesAvanzadas />
              <>
      <FeaturesAvanzadas />
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-amber-400">📄 Carta legal Escudo Legal</h3><button onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
      <FeaturesAvanzadas />
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{`ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA\n\nMuy Sr./Sra. [Nombre del Cliente]:\n\nPor medio de la presente, le requiero formalmente el pago de la factura #INV-001 emitida el [fecha] por un importe total de 500 €, la cual se encuentra impagada a fecha de hoy.\n\nLe concedemos un plazo improrrogable de SIETE (7) DÍAS HÁBILES para proceder al pago.\n\nAtentamente,\n[Tu nombre]`}</div>
      <FeaturesAvanzadas />
                <p className="text-xs text-zinc-400 mt-4">Esta carta se adapta a España, México, EE.UU. y 47 países más.</p>
      <FeaturesAvanzadas />
                <Link href="/register" className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2 rounded-full transition-all cursor-pointer">Quiero esto para mis clientes →</Link>
      <FeaturesAvanzadas />
              </>
      <FeaturesAvanzadas />
            )}
      <FeaturesAvanzadas />
            {timelineModal === 'video' && (
      <FeaturesAvanzadas />
              <>
      <FeaturesAvanzadas />
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-emerald-400">🎥 Cómo funciona</h3><button onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
      <FeaturesAvanzadas />
                <div className="bg-zinc-950 rounded-xl aspect-video flex items-center justify-center border border-zinc-800">
      <FeaturesAvanzadas />
                  <iframe width="100%" height="315" src="https://www.youtube.com/embed/cashflow-guardian-demo" title="Video demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-xl"></iframe>
      <FeaturesAvanzadas />
                </div>
      <FeaturesAvanzadas />
              </>
      <FeaturesAvanzadas />
            )}
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      )}
      <FeaturesAvanzadas />

      <FeaturesAvanzadas />
      {/* EXIT INTENT */}
      <FeaturesAvanzadas />
      {showExitPopup && (
      <FeaturesAvanzadas />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)}>
      <FeaturesAvanzadas />
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-center relative" onClick={e => e.stopPropagation()}>
      <FeaturesAvanzadas />
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">&times;</button>
      <FeaturesAvanzadas />
            <div className="text-4xl mb-4">📘</div>
      <FeaturesAvanzadas />
            <h3 className="text-xl font-bold mb-2">Espera — antes de irte</h3>
      <FeaturesAvanzadas />
            <p className="text-zinc-300 text-sm mb-4">¿Tienes facturas pendientes ahora mismo? Calcula tu pérdida:</p>
      <FeaturesAvanzadas />
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm cursor-pointer" onClick={() => setShowExitPopup(false)}>Calcular ahora →</Link>
      <FeaturesAvanzadas />
          </div>
      <FeaturesAvanzadas />
        </div>
      <FeaturesAvanzadas />
      )}
      <FeaturesAvanzadas />
      <CassandraChat />
    </div>
      <FeaturesAvanzadas />
  )
      <FeaturesAvanzadas />
}
