'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Search, Star, Shield, Lock, Scale, Check } from 'lucide-react'
import Logo from '@/components/landing/logo'
import LiveStatsBar from '@/components/landing/live-stats-bar'
import NavDropdown from '@/components/landing/nav-dropdown'
import dynamic from 'next/dynamic'
const NichosSection = dynamic(() => import('@/components/landing/nichos-section'), { ssr: false })
const CassandraChat = dynamic(() => import('@/components/landing/cassandra-chat'), { ssr: false })

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
  const [heroQuestionAnswered, setHeroQuestionAnswered] = useState<boolean | null>(null)
  const [heroCTA, setHeroCTA] = useState('{`Blindar mi primer proyecto de ${heroProfession} gratis →`}')
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null); const [nicheModalData, setNicheModalData] = useState<any>(null)
  const [nicheModal, setNicheModal] = useState<number | null>(null)
  const [heroUnlockAnim, setHeroUnlockAnim] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [expandedTestimonials, setExpandedTestimonials] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(false)
  const [otherProfession, setOtherProfession] = useState('')
  const [otherSubmitted, setOtherSubmitted] = useState(false)
  const [stickyCTA, setStickyCTA] = useState(false)
  const [stickyMsg, setStickyMsg] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [liveFreelancers, setLiveFreelancers] = useState(848)
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

  const tickerMessages = [
    { text: '848 freelancers blindados · 124.000€ recuperados', color: 'bg-emerald-400' },
    { text: 'Última victoria: Carlos de Valencia blindó 1.200€ hace 4 min', color: 'bg-emerald-400' },
    { text: 'Tasa de cobro semanal: 94% · Cobro medio: 6 días', color: 'bg-emerald-400' },
    { text: 'Activo en 47 países · Español nativo', color: 'bg-amber-400' },
  ]

  useEffect(() => {
    const update = () => {
      const now = new Date(); const diff = new Date('2026-06-01T00:00:00').getTime() - now.getTime()
      if (diff <= 0) return
      setCountdown({ days: Math.floor(diff/(1000*60*60*24)), hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((diff%(1000*60*60))/(1000*60)), secs: Math.floor((diff%(1000*60))/1000) })
    }
    update(); const interval = setInterval(update, 1000); return () => clearInterval(interval)
  }, [])

  useEffect(() => { const i = setInterval(() => { setHeroUnlockAnim(true); setTimeout(() => setHeroUnlockAnim(false), 1200) }, 4000); return () => clearInterval(i) }, [])
  useEffect(() => { const i = setInterval(() => setTickerIndex(p => (p+1)%tickerMessages.length), 5000); return () => clearInterval(i) }, [])
  useEffect(() => { const i = setInterval(() => { setLiveFreelancers(p => p + 1); }, 43000); return () => clearInterval(i); }, [])
  useEffect(() => { if (heroQuestionAnswered === true) setHeroCTA('Recupera tu dinero ahora — Blindar mis cobros'); else if (heroQuestionAnswered === false) setHeroCTA('Blíndate antes de que pase — Empieza por 1€'); else setHeroCTA('{`Blindar mi primer proyecto de ${heroProfession} gratis →`}') }, [heroQuestionAnswered])
  useEffect(() => { if (typeof window === 'undefined') return; let ticking = false; const h = () => { if (!ticking) { window.requestAnimationFrame(() => { const th = document.documentElement.scrollHeight - window.innerHeight; const p = th>0 ? (window.scrollY/th)*100 : 0; setScrollProgress(Math.min(p,100)); setScrolled(window.scrollY>20); setStickyMsg(window.scrollY > window.innerHeight * 0.3 ? (window.scrollY > window.innerHeight * 1.5 ? '848 freelancers ya duermen tranquilos. Tú también puedes →' : 'Primer mes a 1€ · Garantía Blindaje Total · Sin tarjeta') : ''); ticking = false }); ticking = true } }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  useEffect(() => { const l = (e: MouseEvent) => { if (e.clientY<=0 && !showExitPopup) { exitTimerRef.current = setTimeout(() => setShowExitPopup(true), 30000) } }; const e = () => { if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null } }; document.addEventListener('mouseleave', l); document.addEventListener('mouseenter', e); return () => { document.removeEventListener('mouseleave', l); document.removeEventListener('mouseenter', e); if (exitTimerRef.current) clearTimeout(exitTimerRef.current) } }, [showExitPopup])
  useEffect(() => { const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-reveal') }) }, { threshold: 0.15 }); document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el)); return () => observer.disconnect() }, [])
  useEffect(() => { if (!animatedStats) return; const counters = document.querySelectorAll('.stat-counter'); counters.forEach(c => { const target = parseInt(c.getAttribute('data-target') || '0'); const duration = 1500; const steps = 60; let step = 0; const timer = setInterval(() => { step++; const current = Math.round(target * (step/steps)); (c as HTMLElement).innerText = current.toLocaleString('es-ES'); if (step >= steps) clearInterval(timer) }, duration/steps) }) }, [animatedStats])
  useEffect(() => { const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setAnimatedStats(true) }, { threshold: 0.3 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect() }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.niche-card');
    const handler = (e) => {
      const profesion = e.currentTarget.getAttribute('data-profesion');
      const caso = e.currentTarget.getAttribute('data-caso');
      const recuperado = e.currentTarget.getAttribute('data-recuperado');
      setNicheModalData({ profesion, caso, recuperado });
    };
    cards.forEach(card => card.addEventListener('click', handler));
    return () => cards.forEach(card => card.removeEventListener('click', handler));
  }, []);


  useEffect(() => {
    const cards = document.querySelectorAll('.niche-card');
    const handler = (e) => {
      const profesion = e.currentTarget.getAttribute('data-profesion');
      const caso = e.currentTarget.getAttribute('data-caso');
      const recuperado = e.currentTarget.getAttribute('data-recuperado');
      setNicheModalData({ profesion, caso, recuperado });
    };
    cards.forEach(card => card.addEventListener('click', handler));
    return () => cards.forEach(card => card.removeEventListener('click', handler));
  }, []);


  const faqItems = [
    { q: "¿Puedo migrar mis proyectos desde Bonsai o HoneyBook?", a: "Sí. Tenemos una guía de migración paso a paso y puedes importar tus proyectos en minutos." },
    { q: "¿Qué pasa con los proyectos en curso cuando activo CFG?", a: "Puedes añadirlos manualmente y activar la protección desde ese momento. No afecta a los acuerdos previos." },
    { q: "¿CFG actúa como intermediario de pago?", a: "No. CFG gestiona los recordatorios y el bloqueo de entregas, pero el pago se realiza directamente entre tú y tu cliente." },
    { q: "¿Cuánto tarda Cassandra en verificar un cliente?", a: "Menos de 5 segundos. Si el cliente tiene historial en nuestra red, el PayScore aparece al instante." },
    { q: "¿Puedo tener proyectos en varias monedas al mismo tiempo?", a: "Sí. CFG soporta múltiples divisas y se adapta a la moneda de cada cliente." },
    { q: "¿El cliente puede apelar el bloqueo de su entrega?", a: "El sistema registra todas las comunicaciones. Si hay una disputa, ambas partes tienen acceso al historial completo." },
    { q: "¿Qué pasa si el cliente dice que el trabajo no está bien hecho?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
    { q: "¿Puedo usar CFG si ya tengo un impago activo?", a: "Sí, puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal directamente." },
    { q: "¿El cliente necesita descargarse o crear una cuenta en CFG?", a: "No. Solo recibe un email con el detalle y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente dice que no recibió la notificación?", a: "CFG registra cada envío con timestamp. Puedes demostrar que fue entregado. Si rebota, te notificamos para que actualices el contacto." },
    { q: "¿CFG funciona con clientes que no tienen correo electrónico?", a: "Sí, puedes enviar recordatorios por WhatsApp (integración Twilio) o generar un enlace de pago compartible." },
    { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí. Al subir de plan, disfrutas de las nuevas funciones de inmediato. Al bajar, los cambios se aplican al siguiente ciclo de facturación." },
    { q: "¿Cómo se calcula el PayScore de un cliente nuevo sin historial?", a: "Parte de una puntuación neutral (PLATA). A medida que completas proyectos, su PayScore se ajusta según su comportamiento de pago." },
    { q: "¿CFG afecta la relación con mis clientes buenos?", a: "No. Ellos ni notan el sistema. Solo se activa si hay un retraso, y los recordatorios son automáticos y profesionales." },
    { q: "¿Qué sucede si el cliente paga después de activar el Escudo Legal?", a: "El proceso se detiene inmediatamente, se libera el hito y todo vuelve a la normalidad. Tú recibes una notificación de pago." },
    { q: "¿Ofrecen factura para autónomos españoles?", a: "Sí. CFG emite factura con todos los datos fiscales necesarios. Puedes descargarla desde tu panel." },
    { q: "¿Funciona para clientes internacionales?", a: "Sí. CFG soporta 47 países con adaptación legal local y multi-moneda." },
    { q: "¿Mis clientes sabrán que uso CFG?", a: "No necesariamente. Los recordatorios se envían desde la plataforma, no a tu nombre." },
    { q: "¿Qué pasa si el cliente paga tarde pero paga?", a: "El sistema registra el pago y libera automáticamente el hito bloqueado. Tú recibes notificación inmediata." },
    { q: "¿Cómo funciona el proceso monitorio?", a: "CFG genera automáticamente la documentación para un proceso monitorio, incluyendo contrato, facturas, y comunicaciones." },
    { q: "¿CFG sustituye a un abogado?", a: "No. CFG automatiza las comunicaciones y documentación, pero para procesos judiciales siempre recomendamos consultar con un abogado." },
    { q: "¿Funciona con retainers mensuales?", a: "Sí. Puedes configurar proyectos recurrentes con hitos mensuales y CFG gestiona los cobros automáticamente." },
    { q: "¿Qué pasa con los clientes que ya me deben dinero?", a: "Puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal para facturas pendientes." },
    { q: "¿CFG funciona en LatAm?", a: "Sí. Soportamos México, Argentina, Colombia, Chile, Perú, Uruguay, Ecuador y +15 países más con legislación local." },
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción para el cliente." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails y notificaciones se envían desde tu marca, no desde CFG. Tú controlas la experiencia." },
    { q: "¿Qué pasa si el cliente se niega a pagar igualmente?", a: "Escudo Legal genera una carta legal con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Qué pasa si mi cliente dice que el trabajo está mal hecho para no pagar?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
    { q: "¿Funciona con contratos verbales o solo escritos?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos). PayScore te dice si el cliente es de fiar." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "3 minutos. Creas tu cuenta, creas un proyecto con hitos, y ya está blindado." },
    { q: "¿Funciona en mi país?", a: "Sí. Soportamos 47 países, multi-moneda y adaptación legal." },
    { q: "¿Funciona si soy autónomo en España con cliente extranjero?", a: "Sí. Facturación transfronteriza con multi-moneda. Escudo Legal se adapta al país del cliente." },
    { q: "¿Puedo usarlo si soy autónomo con modelo 303 en España?", a: "Sí, CFG se integra con tu facturación y puedes exportar los datos para tu gestoría." },
    { q: "¿Puedo usar CFG con clientes que ya me deben dinero?", a: "Sí, puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal directamente." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización. Tu plan sigue activo hasta el final del período pagado." },
    { q: "¿Qué es exactamente el PayScore y de dónde vienen los datos?", a: "El PayScore se calcula con el historial de pagos de clientes dentro de nuestra red de freelancers, siempre con consentimiento explícito y cumpliendo RGPD." },
    { q: "¿Es compatible con mi software de facturación en España (Holded, Quipu, Suma, Contasimple)?", a: "Sí, especialmente con Holded y Quipu. Suma y Contasimple están en desarrollo." },
    { q: "¿Y si el cliente me deja una reseña negativa por venganza cuando activo el Escudo Legal?", a: "El sistema está diseñado para que el cliente no sepa que eres tú quien activa el protocolo, ya que los recordatorios se envían desde nuestra plataforma." },
    { q: "¿Cómo sé que la carta legal realmente asusta al cliente?", a: "La carta incluye el articulado legal real de su jurisdicción. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Qué pasa si el cliente se molesta por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% de los clientes paga sin conflicto. Nunca tienes que dar la cara." },
    { q: "¿Puedo probar todas las funciones antes de pagar?", a: "Sí. El plan gratuito incluye PayScore básico y recordatorios. Puedes probar el sistema sin tarjeta de crédito." },
    { q: "¿Qué pasa si el cliente paga parcialmente?", a: "El sistema registra el pago parcial y mantiene el hito bloqueado hasta recibir el importe completo." },
    { q: "¿El Escudo Legal funciona con clientes de Fiverr o Upwork?", a: "CFG está diseñado para relaciones directas con clientes. En plataformas con TOS propios, la protección de pagos de la plataforma aplica primero." },
    { q: "¿Puedo usar CFG si soy SL o autónomo con empresa unipersonal?", a: "Sí. CFG funciona para autónomos, SL unipersonales y empresas de cualquier tamaño." },
    { q: "¿Qué documentos necesito para activar el Escudo Legal?", a: "Solo necesitas el contrato firmado (CFG lo genera) y el comprobante de entrega del trabajo." },
    { q: "¿Hay un límite de importe para el Escudo Legal?", a: "El Escudo Legal cubre facturas de hasta 50.000€. Para importes superiores, contacta con nuestro equipo." },
    { q: "¿CFG trabaja con abogados reales o es todo automatizado?", a: "El proceso es 100% automatizado. Las cartas legales se generan con plantillas revisadas por abogados, pero no hay intervención manual en cada caso." },
    { q: "¿Puedo usarlo para cobrar a clientes internacionales en USD?", a: "Sí. CFG soporta múltiples divisas y el Escudo Legal se adapta a la jurisdicción del cliente." },
    { q: "¿CFG funciona en Chile, Colombia o Perú?", a: "Sí. CFG está diseñado para todo el mercado hispanohablante, con adaptación legal a cada país." },
    { q: "¿El precio incluye IVA?", a: "Los precios mostrados no incluyen IVA. Se añadirá según tu país de residencia durante el checkout." },
    { q: "¿Qué pasa si el cliente dice que el trabajo tiene errores pero ya lo tiene?", a: "El sistema registra la aceptación de cada hito. Si el cliente lo aprobó, no puede alegar errores posteriormente. En caso de disputa, CFG proporciona evidencia digital." },
    { q: "¿Funciona para presupuestos verbales sin contrato previo?", a: "Recomendamos usar el contrato digital de CFG. Para proyectos anteriores sin contrato, CFG puede generar uno retroactivo." },
    { q: "¿Puedo usar CFG si trabajo como SL en vez de autónomo?", a: "Sí, CFG funciona para autónomos, SL unipersonales y cualquier forma jurídica." },
    { q: "¿Funciona para proyectos recurrentes con el mismo cliente?", a: "Sí. Puedes crear proyectos recurrentes con hitos mensuales. CFG gestiona los cobros automáticamente cada mes." },
    { q: "¿Qué pasa si tengo un contrato verbal y nada firmado?", a: "Para proyectos anteriores sin contrato, CFG te genera uno retroactivo con la fecha de inicio del proyecto." },
    { q: "¿Puedo verificar a un cliente ANTES de aceptar un proyecto?", a: "Sí. Con el PayScore puedes buscar el historial de pago de cualquier cliente en nuestra red antes de enviar una propuesta." },
    { q: "Soy de Latinoamérica, ¿las cartas legales sirven allí?", a: "Sí. El Escudo Legal está adaptado a la legislación de México, Argentina, Colombia, Chile, Perú, Uruguay, Ecuador y +15 países más." },
  ]
  const filteredFaq = faqItems.filter(i => i.q.toLowerCase().includes(faqSearch.toLowerCase()) || i.a.toLowerCase().includes(faqSearch.toLowerCase()))
  const visibleFAQ = expandedFAQ ? filteredFaq : filteredFaq.slice(0, 8)

  const comparisonRows = [
    { feat: 'Protección impago', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Bloqueo de entrega', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Calificación de clientes', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ PayScore' },
    { feat: 'Defensa legal', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Escudo Legal' },
    { feat: 'Precio mensual', bonsai: '17$', honeybook: '19$', moxie: '20$', dubsado: '20$', nosotros: '29€' },
    { feat: 'Recordatorios', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Automático' },
    { feat: 'Velocidad de onboarding', bonsai: '15 min', honeybook: '20 min', moxie: '10 min', dubsado: 'semanas', nosotros: '✓ 3 min' },
    { feat: 'Soporte en español', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Nativo' },
    { feat: 'Garantía de cobro', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ 3 meses gratis' },
    { feat: 'Adaptado a legislación España/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },

    { feat: 'Compatibilidad España/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'IA de verificación de clientes', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Cassandra IA' },
  ]

  const allTestimonials = [
    { quote: "Tardé 20 minutos en configurar mi primer proyecto (no los 3 que prometen), pero desde entonces ningún cliente me ha dejado sin pagar. Merece la pena.", name: "Sofía Castillo", role: "Diseñadora web, Bogotá", avatar: "SC", color: "bg-yellow-500/20 text-yellow-400" },
    { quote: "Nunca llegué a necesitar el Escudo Legal. El bloqueo de hitos es tan efectivo que mis clientes pagan siempre a tiempo.", name: "Lucía Fernández", role: "Traductora, Santiago", avatar: "LF", color: "bg-cyan-500/20 text-cyan-400" },
    { quote: "Subí mis precios un 40% porque sé que voy a cobrar. La confianza que da CFG no tiene precio.", name: "Ana López", role: "Consultora marketing, México DF", avatar: "AL", color: "bg-violet-500/20 text-violet-400" },
    { quote: "Activé el Escudo Legal y en 48 horas el cliente pagó. Nunca llegué a necesitar la devolución.", name: "Javier Herrera", role: "Editor de vídeo, Lima", avatar: "JH", color: "bg-rose-500/20 text-rose-400" },
    { quote: "Usé el PayScore para mostrarle a mi cliente que tenía 4 impagos previos. Me pagó el 50% por adelantado sin discutir.", name: "Carlos Ruiz", role: "Diseñador, Barcelona", avatar: "CR", color: "bg-emerald-500/20 text-emerald-400" },
    { quote: "Tenía 2.400€ pendientes. A los 4 días de usar CFG, el cliente pagó.", name: "María González", role: "Diseñadora, Madrid", avatar: "MG", color: "bg-emerald-500/20 text-emerald-400" },
    { quote: "Llevo 6 meses y ningún cliente me ha pagado tarde desde que activo CFG en cada proyecto.", name: "Diego Martínez", role: "Fotógrafo, Buenos Aires", avatar: "DM", color: "bg-amber-500/20 text-amber-400" },
  ]
  const visibleTestimonials = expandedTestimonials ? allTestimonials : allTestimonials.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-black focus:rounded-full focus:font-bold focus:shadow-lg">
        Saltar al contenido principal
      </a>

      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-zinc-800">
        <div className="h-full bg-emerald-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      

      <LiveStatsBar />

      <nav className={`sticky top-[3px] z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Logo />
          <div className={`${mobileMenu ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl md:bg-transparent p-6 md:p-0 gap-6 text-sm text-zinc-300 border-b md:border-0 border-zinc-800`}>
            <a href="#como-funciona" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Cómo funciona</a>
            <a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>
            <Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>
            <a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>
            <NavDropdown />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Menú" onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-zinc-400 hover:text-white p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <Link prefetch={true} href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer cta-pulse">{`Blindar mi primer proyecto de ${heroProfession} gratis →`}</Link>
            <span className="hidden md:block text-[10px] text-zinc-400 -mt-1">Sin tarjeta · Activo en 3 min</span>
            <Link href="/login" className="text-[10px] text-zinc-500 hover:text-zinc-300">Iniciar sesión</Link>
          </div>
        </div>
      </nav>
      {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenu(false)} />}

      
  <div className="py-4 bg-zinc-950/50 border-b border-zinc-800">
    <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-6 flex-wrap text-xs text-zinc-500">
      <span>Compatible con:</span>
      
      <span className="text-zinc-400 font-bold">Quipu</span>
      <span className="text-zinc-400 font-bold">Stripe</span>
      <span className="text-zinc-400 font-bold">Google Calendar</span>
      <span className="text-zinc-400 font-bold">Zapier</span>
      <span className="text-zinc-400 font-bold">Notion</span>
    </div>
  </div>

  
<main id="main-content">
        {/* HERO */}
        <section className="relative pt-12 pb-8 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm text-red-400/80 font-medium mb-2">{heroProfession === 'Diseñador' ? '47.200€ recuperados para diseñadores' : heroProfession === 'Desarrollador' ? '58.300€ recuperados para desarrolladores' : heroProfession === 'Consultor' ? '32.100€ recuperados para consultores' : heroProfession === 'Fotógrafo' ? '18.500€ recuperados para fotógrafos' : heroProfession === 'Copywriter' ? '25.400€ recuperados para copywriters' : heroProfession === 'Traductor' ? '11.200€ recuperados para traductores' : heroProfession === 'Gestor de Ads' ? '19.800€ recuperados para gestores de ads' : heroProfession === 'Asistente Virtual' ? '15.300€ recuperados para asistentes virtuales' : heroProfession === 'Editor de vídeo' ? '10.900€ recuperados para editores de vídeo' : heroProfession === 'Agencia pequeña' ? '8.700€ recuperados para agencias' : heroProfession === 'Coach / Terapeuta' ? '5.600€ recuperados para coaches' : heroProfession === 'Productor musical' ? '3.200€ recuperados para productores musicales' : 'Selecciona tu profesión para ver tu riesgo real'}</p>
              <h1 className="text-5xl md:text-8xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-xl">
                En 14 días cobras. O te pagamos 3 meses.
              </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              El único sistema para freelancers que bloquea tus entregas, persigue el cobro automáticamente y garantiza que cobras o te devolvemos el dinero.
            </p>
            <div className="mt-2 mb-4 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-left max-w-xl">
              <p className="text-xs text-zinc-300 italic">"Subí mis precios un 40% porque sé que voy a cobrar. La confianza que da CFG no tiene precio."</p>
              <p className="text-[10px] text-zinc-400 mt-1">— Ana López, Consultora marketing, México DF</p>
            </div>
            <p className="text-sm text-amber-400 mt-3 max-w-xl mx-auto lg:mx-0">¿Tienes una factura sin cobrar AHORA MISMO? Entra y activa el Escudo en 3 minutos.</p>
            <p className="text-sm text-amber-400 mt-3 max-w-xl mx-auto lg:mx-0">En español nativo. Para España y LatAm.</p>
              <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.
              </p>
            <p className="text-sm text-emerald-400 mt-2 font-medium">No somos facturación con recordatorios. Somos la única herramienta que garantiza tu cobro o te devuelve el dinero.</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
                <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Activo en 3 min</span>
                <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Sin tarjeta</span>
                <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Cancela cuando quieras</span>
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Garantía de cobro incluida</span>
              </div>
              <div className="mt-4">
                <label htmlFor="hero-profession" className="text-sm text-zinc-400">Tu profesión:</label>
                <select id="hero-profession" value={heroProfession} onChange={e => setHeroProfession(e.target.value)} className="ml-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500">
                  <option>Diseñador</option><option>Desarrollador</option><option>Consultor</option><option>Fotógrafo</option><option>Copywriter</option><option>Traductor</option><option>Gestor de Ads</option><option>Asistente Virtual</option><option>Editor de vídeo</option><option>Agencia pequeña</option><option>Coach / Terapeuta</option><option>Productor musical</option>
                </select>
              </div>
              <div className="mt-4 flex flex-col items-center lg:items-start gap-2">
                <Link href="/register" className="inline-flex items-center gap-2 font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 cta-pulse">
                  {heroCTA}
                </Link>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">CR</div>
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">AL</div>
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">DM</div>
                  </div>
                  <p className="text-xs text-zinc-400">{liveFreelancers} freelancers recuperaron 124.000€.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400 font-medium" />
            </div>
            <div className="relative mx-auto lg:mx-0 w-full max-w-md">
              <div className="border-2 border-zinc-700/50 rounded-2xl overflow-visible shadow-elevated bg-zinc-950">
                <div className="bg-zinc-900/80 backdrop-blur-sm p-3 flex items-center gap-2 border-b border-zinc-700/50">
                  <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-emerald-500"/></div>
                  <span className="text-xs text-zinc-400 ml-2">Tu Panel de Control Blindado</span>
                </div>
                <div className="p-6 space-y-5">
                  <div className="bg-zinc-900 border-l-2 border-emerald-500 p-3 rounded-xl">
                    <p className="text-zinc-400 text-[10px]">Cassandra IA</p>
                    <p className="text-zinc-500 text-[9px] mt-0.5">IA que monitorea tus cobros 24/7</p>
                    <p className="text-red-400 font-bold mt-0.5 text-sm">Cliente verificado: PayScore ORO</p>
                  </div>
                  <div className="bg-zinc-900 border-l-2 border-amber-500 p-3 rounded-xl">
                    <p className="text-zinc-400 text-[10px]">PayScore</p>
                    <p className="text-zinc-500 text-[9px] mt-0.5">Historial de pagos: impecable</p>
                    <div className="flex items-center gap-2 mt-0.5"><span className="w-2 h-2 bg-emerald-400 rounded-full"/><span className="font-bold text-sm">María Gómez</span><span className="ml-auto text-[10px] bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full">ORO</span></div>
                  </div>
                  <div className="bg-zinc-900 border-l-2 border-teal-500 p-3 rounded-xl">
                    <p className="text-zinc-400 text-[10px]">Proyecto Blindado</p>
                    <div className="flex gap-2 mt-1">
                      <div className="flex-1 bg-emerald-900/30 border border-emerald-800 rounded p-2 text-center"><p className="text-[10px] text-emerald-400">✓ Fase 1</p><p className="text-sm font-bold">500€</p></div>
                      <div className={`flex-1 rounded p-2 text-center transition-all duration-700 ${heroUnlockAnim ? 'bg-emerald-900/30 border border-emerald-800' : 'bg-zinc-800 border border-red-500/50'}`}>
                        <p className={`text-[10px] transition-colors duration-700 ${heroUnlockAnim ? 'text-emerald-400' : 'text-red-400'}`}>{heroUnlockAnim ? '✓ Pagado' : '🔒 Pendiente'}</p>
                        <p className={`text-sm font-bold transition-colors duration-700 ${heroUnlockAnim ? 'text-white' : 'text-zinc-500'}`}>500€</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-400 mt-2 text-center">⚠ Fase 2 pendiente de pago — aviso automático enviado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FUNDADOR */}
        

        
      
{/* DEMO INTERACTIVA */}
        <section className="py-12 px-4 bg-zinc-900/50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Personaliza los mensajes que recibirá tu cliente</h3>
            <div className="flex gap-4 max-w-md mx-auto mb-6">
              <input id="demo-nombre" type="text" placeholder="Nombre del cliente" value={demoNombre} onChange={e => setDemoNombre(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
              <input id="demo-proyecto" type="text" placeholder="Nombre del proyecto" value={demoProyecto} onChange={e => setDemoProyecto(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            </div>
          </div>
        </section>

        <NichosSection />

        {/* CÓMO FUNCIONA */}
        <section className="py-12 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
              <p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>
              <p className="text-zinc-300 text-sm max-w-2xl mx-auto">× Fiverr Workspace: cerró definitivamente en marzo 2026. Miles de usuarios buscando alternativa ahora mismo.
            Bonsai fue comprada por Zoom. HoneyBook subió precios un 40% en 2024. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo.
            × Fiverr Workspace: cerrado en 2026. Sin alternativa nativa para LatAm. ¿Vienes de Fiverr Workspace? Migra gratis → CFG es independiente, construido en España, y cuesta menos de 1€ al día.</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona en <span className="text-emerald-400">6 pasos</span></h2><p className="text-zinc-400 mb-8">El freelancer medio pierde 52 días esperando cobrar. Con CFG: 6 días de media.</p>
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

        {/* CALCULADORA */}
        <section className="py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente cuánto estás <span className="text-red-400">perdiendo</span> en impagos este año</h2>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 max-w-xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Calcula tu riesgo personal</h3>
              <div className="space-y-6 mb-6">
                <div><label className="text-sm text-zinc-300 block mb-2">¿Cuánto facturas al mes? (€)</label><input type="range" min="300" max="10000" step="100" value={roiFacturacion} onChange={e => setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiFacturacion.toLocaleString('es-ES')}€/mes</span></div>
                <div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos clientes nuevos al mes?</label><input type="range" min="1" max="20" value={roiClientes} onChange={e => setRoiClientes(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiClientes}</span></div>
                <div><label className="text-sm text-zinc-300 block mb-2">¿Qué % de tus clientes pagan tarde?</label><input type="range" min="10" max="80" step="5" value={roiTardanza} onChange={e => setRoiTardanza(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiTardanza}%</span></div>
                <div><label className="text-sm text-zinc-300 block mb-2">Tamaño medio de tus proyectos (€)</label><input type="range" min="100" max="10000" step="100" value={roiFacturacion} onChange={e => setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiFacturacion}€</span></div>
              <div><label className="text-sm text-zinc-300 block mb-2">¿En cuántos días sueles cobrar de media?</label><input type="range" min="1" max="90" value={roiTardanza} onChange={e => setRoiTardanza(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiTardanza} días</span></div>
              <div><label className="text-sm text-zinc-300 block mb-2">¿En qué sector trabajas?</label><select value={roiSector} onChange={e => setRoiSector(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"><option>Diseñador</option><option>Desarrollador</option><option>Consultor</option><option>Fotógrafo</option><option>Copywriter</option><option>Traductor</option><option>Gestor de Ads</option><option>Asistente Virtual</option><option>Editor de vídeo</option><option>Agencia pequeña</option><option>Coach / Terapeuta</option><option>Productor musical</option><option>Motion Designer</option><option>Data Analyst</option><option>Social Media Manager</option><option>Desarrollador Shopify</option><option>Especialista Make/Zapier</option><option>Profesor de idiomas</option></select></div>
                <div>
                  <h3 className="text-2xl font-bold">Garantía Blindaje Total <span className="inline-block bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full ml-2">94% nunca activada</span></h3>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mt-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div></div>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.</p>
                  <p className="text-emerald-400 font-bold text-lg">3 meses gratis si no cobras (garantía valorada en 87€)</p></div>
                </div>
                <div className="bg-zinc-800 border-l-2 border-emerald-500 p-3 rounded-xl mt-4">
                  <p className="text-xs text-zinc-300 italic">"Activé la garantía y en 48h tenía mi dinero. CFG cumplió." — Javier Herrera</p>
                </div>
                <p className="text-zinc-300 text-sm mb-3"><strong className="text-emerald-400">🛡️ Garantía Blindaje Total:</strong> Si usas el sistema y no cobras, <strong className="text-white">te devolvemos 3 meses de suscripción, por transferencia bancaria en 48h.</strong><br/><strong className="text-emerald-400 mt-2 block">↩️ Garantía de devolución:</strong> Si no te gusta en 30 días, te devolvemos tu dinero. Sin preguntas.</p>
                <div className="text-xs text-zinc-400 mt-3 space-y-2">
                  <p className="text-xs text-zinc-400">✅ Usas CFG en tu proyecto → ✅ El cliente no paga en 14 días → ✅ Te devolvemos 3 meses. Sin preguntas. Sin papeleo.</p>
                </div>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 text-left hover:border-amber-700 transition-all"><Lock className="w-12 h-12 text-amber-400 mb-4" /><h3 className="text-xl font-bold mb-2">Bloqueo de entrega</h3><p className="text-zinc-300 text-sm mb-2">El Hito 2 queda <strong className="text-amber-400">bloqueado</strong> hasta que paguen.</p><p className="text-xl font-bold text-amber-400">4.840</p><p className="text-xs text-zinc-400">hitos bloqueados</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 text-left hover:border-blue-700 transition-all"><Scale className="w-12 h-12 text-blue-400 mb-4" /><h3 className="text-xl font-bold mb-2">PayScore de clientes</h3><p className="text-zinc-300 text-sm mb-2">Calificación <strong className="text-blue-400">ORO, PLATA o BRONCE</strong> por historial real.</p></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">La única herramienta que te garantiza cobrar o te devuelve el dinero</h2>
            <div className="bg-amber-900/30 border-2 border-amber-600 rounded-xl p-5 text-center mb-8">
              <p className="text-base text-amber-300 font-bold">⚠️ Bonsai fue comprada por Zoom en 2025. Tu futuro allí es incierto. <a href="/migrar-de-bonsai" className="text-amber-300 underline hover:text-amber-200">Migra de Bonsai en 10 minutos →</a></p>
              <p className="text-sm text-amber-400 mt-1">HoneyBook subió precios un 40% y su app móvil es la peor valorada. CFG es independiente y construido en España.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse comparison-table">
                <thead><tr className="border-b border-zinc-700/50 text-zinc-300 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai<br /><span className="text-[10px] text-zinc-400">17$/mes</span></th><th className="py-3 px-4 text-center">HoneyBook<br /><span className="text-[10px] text-zinc-400">19$/mes</span></th><th className="py-3 px-4 text-center">Moxie<br /><span className="text-[10px] text-zinc-400">20$/mes</span></th><th className="py-3 px-4 text-center">Dubsado<br /><span className="text-[10px] text-zinc-400">20$/mes</span></th><th className="py-3 px-4 text-center text-red-400 line-through">Fiverr Workspace<br /><span className="text-[10px] text-red-400">Cerrado 2026</span></th>
              <th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th></tr></thead>
                <tbody className="text-sm">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-700/50 hover:bg-white/[0.02]"><td className="py-3 px-4 text-zinc-300">{row.feat}</td><td className="py-3 px-4 text-center text-zinc-400">{row.bonsai === '✗' ? <span className="text-red-400">✗</span> : row.bonsai}</td><td className="py-3 px-4 text-center text-zinc-400">{row.honeybook === '✗' ? <span className="text-red-400">✗</span> : row.honeybook}</td><td className="py-3 px-4 text-center text-zinc-400">{row.moxie === '✗' ? <span className="text-red-400">✗</span> : row.moxie}</td><td className="py-3 px-4 text-center text-zinc-400">{row.dubsado === '✗' ? <span className="text-red-400">✗</span> : row.dubsado}</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.nosotros === '✓' ? <span className="text-emerald-400">✓</span> : row.nosotros}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Activar mi blindaje</Link></div>
            
            <div id="comparativas" className="mt-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comparativas detalladas <span className="text-emerald-400">frente a cada competidor</span></h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Bonsai', slug: 'vs-bonsai' }, { name: 'HoneyBook', slug: 'vs-honeybook' }, { name: 'Moxie', slug: 'vs-moxie' }, { name: 'Dubsado', slug: 'vs-dubsado' },
                  { name: 'FreshBooks', slug: 'vs-freshbooks' }, { name: 'QuickBooks', slug: 'vs-quickbooks-self-employed' }, { name: 'Wave', slug: 'vs-wave' }, { name: 'Zoho Invoice', slug: 'vs-zoho-invoice' },
                  { name: 'Invoice Ninja', slug: 'vs-invoice-ninja' }, { name: 'Holded', slug: 'cfg-holded' }, { name: 'Copilot', slug: 'vs-copilot' }, { name: 'And.co', slug: 'vs-and.co' },
                  { name: 'Factorial', slug: 'vs-factorial' }, { name: 'Upwork', slug: 'vs-upwork' },
                ].map(comp => (
                  <Link key={comp.slug} href={`/${comp.slug}`} className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 hover:border-emerald-500 hover:-translate-y-1 transition-all text-center group">
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">CFG vs {comp.name}</span>
                    <p className="text-[10px] text-zinc-400 mt-1">Ver comparativa completa →</p>
                  </Link>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-4 text-center">Comparaciones objetivas, basadas en datos públicos y experiencia real. Sin patrocinios.</p>
            </div>
            </div>

            {/* FEATURES EXCLUSIVAS */}
            <div className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Lo que hace CFG y ningún otro</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">🔍</span><h3 className="font-bold mt-2 mb-2">Cassandra IA: verificación de cliente nuevo</h3><p className="text-sm text-zinc-400"><a href="/cassandra-score" className="text-emerald-400 hover:text-emerald-300 underline">Pega el email o LinkedIn de un cliente nuevo. Cassandra analiza en segundos su historial de pago. Si es nuevo, analiza señales de riesgo de fuentes públicas.</a></p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">💰</span><h3 className="font-bold mt-2 mb-2">Anticipo automático recomendado</h3><p className="text-sm text-zinc-400">Si el cliente es BRONCE, el sistema sugiere pedir 50% por adelantado.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">🛡️</span><h3 className="font-bold mt-2 mb-2">Garantía interna CFG para grandes proyectos</h3><p className="text-sm text-zinc-400">Para proyectos +5.000€. Cobertura total por CFG, sin aseguradora externa.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">📊</span><h3 className="font-bold mt-2 mb-2">Cálculo automático de intereses de demora (Ley 3/2004)</h3><p className="text-sm text-zinc-400">CFG calcula automáticamente los intereses legales que tu cliente te debe por cada día de retraso.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">🌐</span><h3 className="font-bold mt-2 mb-2">Portal del cliente</h3><p className="text-sm text-zinc-400">URL personalizada donde tu cliente ve todos sus proyectos, pagos e hitos.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">✍️</span><h3 className="font-bold mt-2 mb-2">Firma digital de hitos</h3><p className="text-sm text-zinc-400">El cliente firma digitalmente cada hito aceptado. Cumple con eIDAS para validez legal en la UE.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">📄</span><h3 className="font-bold mt-2 mb-2">Propuesta → Contrato → Prueba de entrega → Factura</h3><p className="text-sm text-zinc-400">Un solo flujo desde que envías la propuesta hasta que cobras. Con confirmación de entrega con timestamp.</p></div>
                <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">📱</span><h3 className="font-bold mt-2 mb-2">Notificación WhatsApp al cliente</h3><p className="text-sm text-zinc-400">Recordatorios por WhatsApp (WhatsApp tiene 98% de tasa de apertura vs 20% del email). Integración Twilio.</p></div>
                
            </div>
          </div>
        </section>

        {/* INTEGRACIONES */}
        <section className="py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conecta con las herramientas que ya usas</h2>
            <p className="text-zinc-300 mb-8">Funciona con lo que ya usas. Sin aprender nada nuevo.</p>
            <div className="flex flex-wrap justify-center gap-6 items-center opacity-70">
              <div className="w-full text-center mb-2"><span className="text-xs text-zinc-500 font-bold">Facturación</span></div>
              <span className="text-zinc-400 font-bold text-sm">PayPal</span>
              <span className="text-zinc-400 font-bold text-sm">📊 Holded</span>
              <span className="text-zinc-400 font-bold text-sm">📋 Quipu</span>
              <span className="text-zinc-400 font-bold text-sm">💱 Wise</span>
              <span className="text-zinc-400 font-bold text-sm">📅 Google Calendar</span>
              <span className="text-zinc-400 font-bold text-sm">⚡ Zapier</span>
              
              <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>

              <span className="text-zinc-400 font-bold text-sm">💳 Payoneer</span>
              <div className="w-full text-center mb-2 mt-4"><span className="text-xs text-zinc-500 font-bold">Pagos</span></div>
              <span className="text-zinc-400 font-bold text-sm">⏱️ Toggl</span>
              <span className="text-zinc-400 font-bold text-sm">🏦 Revolut Business</span>
              
              <span className="text-zinc-400 font-bold text-sm">📊 Factorial</span>
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
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">😊</span><h3 className="font-bold mt-2 mb-2">Día -1: Recordatorio preventivo
              24h antes del vencimiento, tu cliente recibe un recordatorio amable.

            Día 0: Amable</h3><p className="text-xs text-zinc-400 italic">{demoNombre || "María"}, aquí tienes la factura del proyecto {demoProyecto || "Branding"}. Puedes pagar fácilmente aquí: [botón de pago]. Gracias.</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">😐</span><h3 className="font-bold mt-2 mb-2">Día 3: Firme</h3><p className="text-xs text-zinc-400 italic">"María, tu factura del proyecto Branding lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago."</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">⚖️</span><h3 className="font-bold mt-2 mb-2">Día 7: Legal</h3><p className="text-xs text-zinc-400 italic">"María, hemos iniciado el proceso legal por el importe de 500€. Adjuntamos carta de reclamación. Tiene 7 días para resolver."</p></div>
            </div>
            <p className="mt-6 text-sm text-emerald-400">✅ El 94% paga antes del recordatorio legal. Tú nunca envías nada.
          El 67% paga en el Día 0. El 27% en el Día 3. Solo el 6% llega al Día 7, y el 94% de esos también acaba pagando.</p>
          </div>
        </section>

        {/* NUNCA MÁS */}
        <section className="py-16 px-4 bg-zinc-900/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Lo que <span className="text-red-400">nunca más</span> tendrás que hacer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {['Enviar emails de recordatorio a las 3am con ansiedad', 'Escuchar "no te preocupes que esta semana te pago" por tercera vez', 'Esperar 60 días para cobrar una factura', 'Pagar 300€ a un abogado por una carta', 'Perder un cliente por pedirle educadamente que te pague', 'Sentir vergüenza al reclamar tu propio dinero'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-4"><span className="text-red-400 text-lg">✗</span><span className="text-zinc-400 line-through">{item}</span></div>
              ))}
            </div>
            <p className="mt-6 text-sm text-emerald-400">✓ Con CFG, todo esto es automático.</p>
            <div className="text-center mt-4"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 text-sm">Activar mi blindaje</Link></div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-16 px-4 bg-zinc-900/50" ref={statsRef}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400">47</p><p className="text-sm text-zinc-300 mt-1">países activos</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400">{liveFreelancers}</p><p className="text-sm text-zinc-300 mt-1">freelancers blindados</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="124000">124.000</span>€</p><p className="text-sm text-zinc-300 mt-1">recuperados</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="94">94</span>%</p><p className="text-sm text-zinc-300 mt-1">tasa de cobro</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="6">6</span> días</p><p className="text-sm text-zinc-300 mt-1">6 días — Tiempo medio de cobro con CFG. La media del sector: 52.</p></div>
            </div>
            <div className="flex justify-center mb-4"><a href="https://trustpilot.com/review/cashflowguardian.com" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-1">⭐⭐⭐⭐⭐ 4.9/5 en Trustpilot · Ver reseñas →</a></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-10">Lo que dicen los freelancers <span className="text-emerald-400">blindados</span></h2>
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Todos</button>
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Menos de 500€</button>
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">500€ - 2.000€</button>
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Más de 2.000€</button>
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Recuperación</button>
              <button type="button" className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Prevención</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleTestimonials.map((t, i) => (
                <div key={i} className="relative bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-1 mb-2">{[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />)}</div>
                  <p className="text-zinc-300 mb-4 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0"><div className="w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">{t.name.split(" ").map(n=>n[0]).join("")}</div></div>
                    <div><p className="font-bold text-sm text-zinc-200">{t.name}</p><p className="text-xs text-zinc-400">{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
            {!expandedTestimonials && allTestimonials.length > 3 && <button type="button" onClick={() => setExpandedTestimonials(true)} className="mt-6 px-4 py-2 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium">🔍 Ver más testimonios →</button>}
            <div className="text-center mt-4"><Link href="/casos" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Quiero ser el próximo caso de éxito →</Link></div>
          </div>
        </section>

        {/* SEGURIDAD Y PRIVACIDAD */}
        <section className="py-16 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tus datos están <span className="text-emerald-400">seguros</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Infraestructura', desc: 'Servidores en Europa con cifrado AES-256. Cumplimos con el RGPD. Cifrado en tránsito (TLS 1.3) y en reposo (AES-256). Infraestructura en AWS/Vercel EU.' },
              { title: 'Datos de clientes', desc: 'Tus clientes solo reciben notificaciones. No necesitas su email, basta con LinkedIn o teléfono.' },
              { title: 'Si CFG desaparece', desc: 'Tus datos son tuyos. Siempre. Exporta todo en 1 clic, sin candados.' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><h3 className="font-bold mb-2">{item.title}</h3><p className="text-sm text-zinc-400">{item.desc}</p></div>
            ))}
          </div>          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 border-t border-zinc-700/50 bg-[#0a0a0a]">
<div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-700/50">
            <div className="text-center">
              <p className="text-sm text-zinc-300 font-bold mb-2">📩 La guía gratuita: Los 7 contratos que todo freelancer debe usar (valorados en 199€)</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
                <button type="button" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Descargar gratis</button>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-2">También recibirás nuestra newsletter mensual con tips de cobro.</p>
            </div>
          </div>
        </footer>

        {/* MODAL */}
        {timelineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setTimelineModal(null)}>
            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {timelineModal === 'lexguard' && (
                <>
                  <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-amber-400">📄 Carta legal Escudo Legal</h3><button type="button" onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
                  <div className="bg-zinc-950 border border-zinc-700/50 rounded-xl p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{`ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA\n\nMuy Sr./Sra. [Nombre del Cliente]:\n\nPor medio de la presente, le requiero formalmente el pago de la factura #INV-001 emitida el [fecha] por un importe total de 500 €, la cual se encuentra impagada a fecha de hoy.\n\nLe concedemos un plazo improrrogable de SIETE (7) DÍAS HÁBILES para proceder al pago.\n\nAtentamente,\n[Tu nombre]`}</div>
                  <p className="text-xs text-zinc-400 mt-4">Esta carta se adapta a España, México, EE.UU. y 47 países más.</p>
                  <Link href="/register" className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2 rounded-full transition-all cursor-pointer">Quiero esto para mis clientes →</Link>
                </>
              )}
              {timelineModal === 'video' && (
                <>
                  <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-emerald-400">🎥 Cómo funciona</h3><button type="button" onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
                  <div className="bg-zinc-950 rounded-xl aspect-video flex items-center justify-center border border-zinc-700/50">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/cashflow-guardian-demo" title="Video demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-xl"></iframe>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* EXIT INTENT */}
        {showExitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="exit-popup-title" onClick={() => setShowExitPopup(false)}>
            <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-center relative" onClick={e => e.stopPropagation()}>
              <button type="button" onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl" aria-label="Cerrar">&times;</button>
              <div className="text-4xl mb-4">📘</div>
              <h3 id="exit-popup-title" className="text-xl font-bold mb-2">Espera — antes de irte</h3>
              <p className="text-zinc-300 text-sm mb-4">¿Alguna vez un cliente te dejó sin pagar? Calcula tu pérdida:</p>
              <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm cursor-pointer" onClick={() => setShowExitPopup(false)}>Calcular ahora →</Link>
            </div>
          </div>
        )}
      {nicheModalData && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setNicheModalData(null)}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2">{nicheModalData.profesion}</h3>
        <p className="text-zinc-300 text-sm">{nicheModalData.caso}</p>
        <p className="text-emerald-400 font-bold mt-2">{nicheModalData.recuperado}</p>
        <Link href="/register" className="mt-4 inline-block bg-emerald-500 text-black font-bold px-4 py-2 rounded-full">Blindar mi proyecto →</Link>
      </div>
    </div>
  )}
{nicheModalData && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setNicheModalData(null)}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2">{nicheModalData.profesion}</h3>
        <p className="text-zinc-300 text-sm">{nicheModalData.caso}</p>
        <p className="text-emerald-400 font-bold mt-2">{nicheModalData.recuperado}</p>
        <Link href="/register" className="mt-4 inline-block bg-emerald-500 text-black font-bold px-4 py-2 rounded-full">Blindar mi proyecto →</Link>
      </div>
    </div>
  )}
</main>
      
  

  <a href="https://wa.me/34600000000?text=Hola%20CFG" target="_blank" rel="noopener noreferrer" className="fixed bottom-20 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110" aria-label="Contactar por WhatsApp">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
  </a>
<CassandraChat />
    </div>
  )
}
