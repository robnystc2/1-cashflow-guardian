'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Palette, Code2, BarChart3, Camera, PenTool, Globe, Megaphone, Briefcase, Building2, Film, Shield, Lock, Scale, Stethoscope, Music, Search, Play, Star, ArrowRight, Check, FileText } from 'lucide-react'
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
  const [heroCTA, setHeroCTA] = useState('Blindarme por 1€ →')
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedNiche, setSelectedNiche] = useState<number | null>(null)
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
  const [liveFreelancers, setLiveFreelancers] = useState(847)
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)

  const prices = {
    basic: 0,
    pro: billingCycle === 'monthly' ? 29 : 249,
    total: billingCycle === 'monthly' ? 79 : 699,
  }
  const roiPerdida = Math.round(roiFacturacion * 12 * (roiTardanza / 100) * (roiImpago === 1 ? 1 : 0.71))
  const roiCoste = (billingCycle === 'annual' ? 20.75 : 29) * 12
  const roiMultiplicador = roiPerdida > 0 ? (roiPerdida / roiCoste).toFixed(1) : '0'

  const tickerMessages = [
    { text: 'Hace 4 min: Carlos de Valencia blindó 1.200€', color: 'bg-emerald-400' },
    { text: 'Hace 12 min: Ana de México DF activó Escudo Legal para 3.200€', color: 'bg-amber-400' },
    { text: 'Hace 7 min: Pablo de Sevilla blindó 950€ con la Garantía', color: 'bg-emerald-400' },
    { text: 'Hace 2 min: María de Madrid acaba de cobrar 1.800€', color: 'bg-emerald-400' },
    { text: 'Hace 19 min: Diego de Buenos Aires blindó 3 proyectos', color: 'bg-amber-400' },
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
  useEffect(() => { if (heroQuestionAnswered === true) setHeroCTA('Recupera tu dinero ahora — Blindar mis cobros'); else if (heroQuestionAnswered === false) setHeroCTA('Blíndate antes de que pase — Empieza por 1€'); else setHeroCTA('Blindarme por 1€ →') }, [heroQuestionAnswered])
  useEffect(() => { if (typeof window === 'undefined') return; let ticking = false; const h = () => { if (!ticking) { window.requestAnimationFrame(() => { const th = document.documentElement.scrollHeight - window.innerHeight; const p = th>0 ? (window.scrollY/th)*100 : 0; setScrollProgress(Math.min(p,100)); setScrolled(window.scrollY>20); setStickyMsg(window.scrollY > window.innerHeight * 0.3 ? (window.scrollY > window.innerHeight * 1.5 ? '848 freelancers ya duermen tranquilos. Tú también puedes →' : 'Primer mes a 1€ · Garantía Blindaje Total · Sin tarjeta') : ''); ticking = false }); ticking = true } }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  useEffect(() => { const l = (e: MouseEvent) => { if (e.clientY<=0 && !showExitPopup) { exitTimerRef.current = setTimeout(() => setShowExitPopup(true), 30000) } }; const e = () => { if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null } }; document.addEventListener('mouseleave', l); document.addEventListener('mouseenter', e); return () => { document.removeEventListener('mouseleave', l); document.removeEventListener('mouseenter', e); if (exitTimerRef.current) clearTimeout(exitTimerRef.current) } }, [showExitPopup])
  useEffect(() => { const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-reveal') }) }, { threshold: 0.15 }); document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el)); return () => observer.disconnect() }, [])
  useEffect(() => { if (!animatedStats) return; const counters = document.querySelectorAll('.stat-counter'); counters.forEach(c => { const target = parseInt(c.getAttribute('data-target') || '0'); const duration = 1500; const steps = 60; let step = 0; const timer = setInterval(() => { step++; const current = Math.round(target * (step/steps)); (c as HTMLElement).innerText = current.toLocaleString('es-ES'); if (step >= steps) clearInterval(timer) }, duration/steps) }) }, [animatedStats])
  useEffect(() => { const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) setAnimatedStats(true) }, { threshold: 0.3 }); if (statsRef.current) observer.observe(statsRef.current); return () => observer.disconnect() }, [])

  const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción para el cliente." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails y notificaciones se envían desde tu marca." },
    { q: "¿Qué pasa si el cliente se niega a pagar igualmente?", a: "Escudo Legal genera una carta legal con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Qué pasa si mi cliente dice que el trabajo está mal hecho para no pagar?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
    { q: "¿Funciona con contratos verbales o solo escritos?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos). PayScore te dice si el cliente es de fiar." },
    { q: "¿Cuánto tarda en funcionar desde que me registro?", a: "3 minutos. Creas tu cuenta, creas un proyecto con hitos, y ya está blindado." },
    { q: "¿Funciona en mi país?", a: "Sí. Soportamos 47 países, multi-moneda y adaptación legal." },
    { q: "¿Es legal bloquear el trabajo?", a: "Sí, está pactado en el contrato. Si el cliente firmó, está legalmente obligado." },
    { q: "¿Funciona si soy autónomo en España con cliente extranjero?", a: "Sí. Facturación transfronteriza con multi-moneda. Escudo Legal se adapta al país del cliente." },
    { q: "¿Puedo usarlo si soy autónomo con modelo 303 en España?", a: "Sí, CashFlow Guardian se integra con tu facturación y puedes exportar los datos para tu gestoría." },
    { q: "¿El PayScore es legal? ¿No viola el RGPD?", a: "Completamente legal. Los datos de PayScore provienen del historial de pagos dentro de nuestra red de freelancers, con consentimiento explícito y cumpliendo RGPD." },
    { q: "¿Cuánto tiempo tarda en activarse desde que me registro?", a: "3 minutos. Creas tu proyecto, defines los hitos, y el sistema empieza a protegerte al instante." },
    { q: "¿Qué pasa exactamente si el cliente dice que el trabajo está mal para no pagar?", a: "El sistema registra todas las entregas y aprobaciones. Si el cliente aprobó el hito, no puede alegar desconformidad." },
    { q: "¿Puedo usar CFG con clientes que ya me deben dinero?", a: "Sí, puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal directamente." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización. Tu plan sigue activo hasta el final del período pagado." },
    { q: "¿Qué es exactamente el PayScore y de dónde vienen los datos?", a: "El PayScore se calcula con el historial de pagos de clientes dentro de nuestra red de freelancers, siempre con consentimiento explícito y cumpliendo RGPD." },
    { q: "¿Funciona con pagos en crypto?", a: "Por el momento trabajamos con <span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span> y PayPal. Si hay demanda, integraremos crypto." },
    { q: "¿Qué integraciones tienen actualmente?", a: "<span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span>, PayPal, Holded, Quipu, Google Calendar. Más en camino." },
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
    { q: "¿Qué pasa si el cliente hace un contracargo en <span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span>?", a: "El sistema registra todas las comunicaciones y aceptaciones de hitos, lo que te protege ante contracargos. Además, nuestro equipo te asiste en el proceso." },
    { q: "¿Funciona para proyectos recurrentes con el mismo cliente?", a: "Sí. Puedes crear proyectos recurrentes con hitos mensuales. CFG gestiona los cobros automáticamente cada mes." },
    { q: "¿Qué pasa si tengo un contrato verbal y nada firmado?", a: "Para proyectos anteriores sin contrato, CFG te genera uno retroactivo con la fecha de inicio del proyecto." },
    { q: "¿Puedo verificar a un cliente ANTES de aceptar un proyecto?", a: "Sí. Con el PayScore puedes buscar el historial de pago de cualquier cliente en nuestra red antes de enviar una propuesta." },
    { q: "Soy de Latinoamérica, ¿las cartas legales sirven allí?", a: "Sí. El Escudo Legal está adaptado a la legislación de México, Argentina, Colombia, Chile, Perú, Uruguay, Ecuador y +15 países más." },
  ]
  const filteredFaq = faqItems.filter(i => i.q.toLowerCase().includes(faqSearch.toLowerCase()) || i.a.toLowerCase().includes(faqSearch.toLowerCase()))
  const visibleFAQ = expandedFAQ ? filteredFaq : filteredFaq.slice(0, 10)

  const timelineSteps = [
    { day: 'Antes de empezar', title: 'Configuras el blindaje', desc: 'En 3 minutos creas el proyecto y defines los hitos.', icon: '⚙️', color: 'bg-zinc-500/20 border-zinc-500 text-zinc-400' },
    { day: 'Día 1', title: 'Entregas el hito', desc: 'Entregas. El cliente recibe. El Hito 2 se bloquea AUTOMÁTICAMENTE.', icon: '✓', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
    { day: 'Día 3', title: 'Recordatorio automático', desc: '"Hola María, tu factura del proyecto Branding lleva 3 días pendiente. El siguiente hito está bloqueado hasta recibir el pago."', icon: '⚠', color: 'bg-amber-500/20 border-amber-500 text-amber-400' },
    { day: 'Día 7', title: 'Escudo Legal', desc: 'Carta legal personalizada (disponible en España, México, Argentina, Colombia, Chile y +20 países).', icon: '⚖', color: 'bg-orange-500/20 border-orange-500 text-orange-400', isLexGuard: true },
    { day: 'Día 14', title: 'Garantía Blindaje Total', desc: 'Si no ha pagado, 3 meses gratis para ti.', icon: '🛡', color: 'bg-red-500/20 border-red-500 text-red-400' },
    { day: 'Día 21', title: 'Notificación legal final', desc: 'Notificación certificada con acuse de recibo.', icon: '⚖️', color: 'bg-red-500/20 border-red-500 text-red-400' },
    { day: 'Resultado', title: '94% cobrado. Tú ganas.', desc: 'El cliente no recibe más trabajo hasta que pague. Enlaces de pago directos (<span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span>, Bizum, PayPal, transferencia).', icon: '✅', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400', isResult: true },
  ]

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
    { feat: 'Soporte en español nativo', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Adaptado a legislación España/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Integraciones (<span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span>, PayPal, Holded)', bonsai: '✓', honeybook: '✓', moxie: '✗', dubsado: '✗', nosotros: '✓' },
  ]

  const allTestimonials = [
    { quote: "Nunca llegué a necesitar el Escudo Legal. El bloqueo de hitos es tan efectivo que mis clientes pagan siempre a tiempo. (Prevención)", name: "Lucía Fernández", role: "Traductora, Santiago", avatar: "LF", color: "bg-cyan-500/20 text-cyan-400" },
    { quote: "Subí mis precios un 40% porque sé que voy a cobrar. La confianza que da CFG no tiene precio. (Recuperó 2.100€)", name: "Ana López", role: "Consultora marketing, México DF", avatar: "AL", color: "bg-violet-500/20 text-violet-400" },
    { quote: "Activé el Escudo Legal y en 48 horas el cliente pagó. Nunca llegué a necesitar la devolución. (Recuperó 780€)", name: "Javier Herrera", role: "Editor de vídeo, Lima", avatar: "JH", color: "bg-rose-500/20 text-rose-400" },
    { quote: "Usé el PayScore para mostrarle a mi cliente que tenía 4 impagos previos. Me pagó el 50% por adelantado sin discutir. (Recuperó 3.200€)", name: "Carlos Ruiz", role: "Diseñador, Barcelona", avatar: "CR", color: "bg-emerald-500/20 text-emerald-400" },
    { quote: "Tenía 2.400€ pendientes. A los 4 días de usar CashFlow Guardian, el cliente pagó. (Recuperó 2.400€)", name: "María González", role: "Diseñadora, Madrid", avatar: "MG", color: "bg-emerald-500/20 text-emerald-400" },
    { quote: "Llevo 6 meses y ningún cliente me ha pagado tarde desde que activo CFG en cada proyecto. (Prevención)", name: "Diego Martínez", role: "Fotógrafo, Buenos Aires", avatar: "DM", color: "bg-amber-500/20 text-amber-400" },
  ]
  const visibleTestimonials = expandedTestimonials ? allTestimonials : allTestimonials.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-zinc-800"><div className="h-full bg-emerald-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} /></div>

      {stickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-emerald-500/30 p-3 flex items-center justify-center gap-4">
          <p className="text-sm text-white font-semibold hidden md:block">{stickyMsg || 'Cobra siempre · Blindarme →'}</p>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer text-sm cta-pulse">Blindarme →</Link>
        </div>
      )}

      <LiveStatsBar />

      <nav className={`sticky top-[3px] z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Logo />
          <div className={`${mobileMenu ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl md:bg-transparent p-6 md:p-0 gap-6 text-sm text-zinc-300 border-b md:border-0 border-zinc-800`}>
            <a href="#como-funciona" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Cómo funciona</a>
            <a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>
            <Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>
            <NavDropdown />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-zinc-400 hover:text-white p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer cta-pulse">Blindarme por 1€ →</Link>
            <Link href="/login" className="text-[10px] text-zinc-500 hover:text-zinc-300">Iniciar sesión</Link>
          </div>
        </div>
      </nav>
      {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenu(false)} />}

      {/* HERO */}
      <section className="relative pt-12 pb-8 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm text-red-400/80 font-medium mb-2">{heroProfession === 'Diseñador' ? 'Los diseñadores pierden 1.847€/año en impagos.' : heroProfession === 'Desarrollador' ? 'Los desarrolladores pierden 2.100€/año en impagos.' : heroProfession === 'Consultor' ? 'Los consultores pierden 1.600€/año en impagos.' : heroProfession === 'Fotógrafo' ? 'Los fotógrafos pierden 1.200€/año en impagos.' : 'Selecciona tu profesión para ver tu riesgo real.'}</p>
            <h1 className="text-5xl md:text-8xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-xl">
              Tu cliente dice que pagará. CFG se asegura de que lo haga.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              847 freelancers ya no persiguen una sola factura. Tú puedes ser el siguiente.
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Activo en 3 min</span>
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Sin tarjeta</span>
              <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Cancela cuando quieras</span>
            </div>
            <div className="mt-4">
              <label className="text-sm text-zinc-400">Tu profesión:</label>
              <select value={heroProfession} onChange={e => setHeroProfession(e.target.value)} className="ml-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500">
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
                <p className="text-xs text-zinc-400">Únete a 847 freelancers que ya cobran sin perseguir</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400 font-medium">
              <span>🔒 SSL</span><span>· 💳 <span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span> Verified</span><span>· 🛡️ RGPD</span><span>· 🌍 47 países</span>
            </div>
          </div>
          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            <div className="border-2 border-zinc-700/50 rounded-2xl overflow-visible shadow-elevated bg-zinc-950">
              <div className="bg-zinc-900/80 backdrop-blur-sm p-3 flex items-center gap-2 border-b border-zinc-700/50">
                <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-emerald-500"/></div>
                <span className="text-xs text-zinc-400 ml-2">Panel de Blindaje</span>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-zinc-900 border-l-2 border-emerald-500 p-3 rounded-xl">
                  <p className="text-zinc-400 text-[10px]">CFO Cassandra</p>
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
                  <p className="text-[10px] text-amber-400 mt-2 text-center">⚠ Cliente no ha pagado — aviso automático enviado</p>
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
            <input type="text" placeholder="Nombre del cliente" value={demoNombre} onChange={e => setDemoNombre(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            <input type="text" placeholder="Nombre del proyecto" value={demoProyecto} onChange={e => setDemoProyecto(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
          </div>
        </div>
      </section>
<section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-extrabold text-3xl mx-auto mb-4 shadow-xl shadow-emerald-500/30 border-4 border-white/10">R</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Construido por alguien que lo vivió</h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">Era octubre de 2024. Tenía 16 años y acababa de entregar un proyecto de branding a una agencia de publicidad. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció. 3 facturas. 4.800€. Cero respuesta. Busqué una herramienta que me protegiera. <strong className="text-white">No existía.</strong> Así que construí CashFlow Guardian. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura.</p>
          <p className="text-emerald-400 font-bold mt-4">— Rodrigo · Fundador · Tenerife, 16 años</p>
        </div>
      </section>

      <NichosSection />

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-16 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Cómo funciona en <span className="text-emerald-400">6 pasos</span></h2>
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

      {/* VIDEO DEMO */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Mira cómo funciona en <span className="text-emerald-400">90 segundos</span></h2>
          <p className="text-zinc-300 mb-8">Así es como CFG protege tus proyectos desde el primer minuto.</p>
          <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl overflow-hidden shadow-elevated max-w-2xl mx-auto">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cashflow-guardian-demo" title="Video demo de CashFlow Guardian" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
            </div>
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
              <div><label className="text-sm text-zinc-300 block mb-2">¿En qué sector trabajas?</label><select value={roiSector} onChange={e => setRoiSector(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-emerald-500"><option>Diseño</option><option>Desarrollo</option><option>Marketing</option><option>Consultoría</option><option>Otro</option></select></div>
              
              <div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora?</label><input type="range" min="1" max="10" value={roiClientes} onChange={e => setRoiClientes(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiClientes} proyectos activos</span></div><div><label className="text-sm text-zinc-300 block mb-2">¿Has tenido algún impago en 12 meses?</label><div className="flex gap-2 mt-2"><button onClick={() => setRoiImpago(1)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${roiImpago === 1 ? 'bg-red-900/30 border border-red-700 text-red-300' : 'bg-zinc-800 border border-zinc-700/50 text-zinc-400'}`}>Sí</button><button onClick={() => setRoiImpago(0)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${roiImpago === 0 ? 'bg-teal-900/30 border border-teal-700 text-teal-300' : 'bg-zinc-800 border border-zinc-700/50 text-zinc-400'}`}>No</button></div></div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-zinc-300 text-sm mb-2">Este año, sin blindaje, perderás</p>
              <p className="text-7xl font-extrabold text-red-400">{new Intl.NumberFormat('es-ES').format(roiPerdida)}€</p>
              <p className="text-zinc-300 text-sm mt-1">en impagos</p>
              <p className="text-[10px] text-zinc-500 mt-1">Calculado como: €{roiFacturacion}/mes × 12 meses × {roiTardanza}% tasa de impago · Basado en datos reales del sector freelance</p>
              <p className="text-xs text-zinc-400 font-medium mt-2">⏱️ También perderás aproximadamente {Math.round(roiPerdida / 30)} horas de tu año persiguiendo ese dinero. Con CFG: 0 minutos.</p>
              <div className="mt-4 text-left space-y-2">
                <p className="text-xs text-zinc-400 font-medium">Desglose estimado:</p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="w-1/3">Impagos totales:</span>
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div></div>
                  <span>{Math.round(roiPerdida * 0.4).toLocaleString('es-ES')}€</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="w-1/3">Pagos {'>'} 60 días:</span>
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '35%' }}></div></div>
                  <span>{Math.round(roiPerdida * 0.35).toLocaleString('es-ES')}€</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="w-1/3">Tiempo perdido:</span>
                  <div className="w-2/3 bg-zinc-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div></div>
                  <span>{Math.round(roiPerdida * 0.25).toLocaleString('es-ES')}€</span>
                </div>
              </div>
              <p className="text-sm text-emerald-400 mt-3 font-medium">Con CFG Pro (29€/mes), proteges {new Intl.NumberFormat('es-ES').format(roiPerdida)}€ por solo 348€/año. Tu riesgo actual equivale a {Math.round(roiPerdida / 348)} años de CFG Pro. → <strong className="text-2xl text-white">{roiMultiplicador}x tu inversión</strong><br/><span className="text-xs text-zinc-400 font-medium">En 5 años sin CFG = {new Intl.NumberFormat('es-ES').format(roiPerdida * 5)}€ perdidos. Con CFG = 1.245€ invertidos.</span></p>
              <div className="mt-4 text-left space-y-2">
                <p className="text-xs text-zinc-400 font-medium">Comparativa anual:</p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="w-1/3">Sin blindaje:</span>
                  <div className="w-2/3 bg-zinc-700 rounded-full h-4 relative">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                    <span className="absolute right-2 top-0 text-white font-bold">{roiPerdida.toLocaleString('es-ES')}€</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="w-1/3">Con CFG:</span>
                  <div className="w-2/3 bg-zinc-700 rounded-full h-4 relative">
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: `${Math.min(100, (roiCoste / roiPerdida) * 100)}%` }}></div>
                    <span className="absolute right-2 top-0 text-white font-bold">{roiCoste.toLocaleString('es-ES')}€</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-3">
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="Recibe tu análisis personalizado" className="flex-1 bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
                <Link href={`/register?facturacion=${roiFacturacion}&clientes=${roiClientes}&tardanza=${roiTardanza}&sector=${roiSector}`} className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-2 rounded-full transition-colors whitespace-nowrap">Enviarme este análisis →</Link>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">Te enviamos el análisis, un contrato de hitos gratuito y activas tu blindaje en 3 minutos.</p>
            </div>
            <div className="mt-6">
              <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 w-full justify-center cursor-pointer">🔒 Blindar mis {new Intl.NumberFormat('es-ES').format(roiPerdida)}€ por 1€ →</Link>
            </div>
            <div className="flex gap-2 mt-3 justify-center text-xs text-zinc-400 font-medium"><span>Compartir:</span><a href={`https://twitter.com/intent/tweet?text=Con CashFlow Guardian puedo proteger ${new Intl.NumberFormat('es-ES').format(roiPerdida)}€ al año`} target="_blank" className="hover:text-emerald-400">Twitter</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">LinkedIn</a><a href={`https://wa.me/?text=Con CashFlow Guardian puedo proteger ${new Intl.NumberFormat('es-ES').format(roiPerdida)}€ al año. Mira: https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">WhatsApp</a><a href={`https://www.facebook.com/sharer/sharer.php?u=https://cashflowguardian.com`} target="_blank" className="hover:text-emerald-400 ml-2">Facebook</a></div>
            <p className="text-[10px] text-zinc-600 mt-4">¿Tienes un blog? <a href="#" className="underline hover:text-zinc-400">Copia el widget de esta calculadora</a> y compártelo con otros freelancers.</p>
          </div>
        </div>
      </section>

      {/* GARANTÍA + COMPARATIVA */}
      <section className="py-16 px-4 bg-zinc-950" id="garantia">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Lo que intentamos copiar de la competencia... <span className="text-emerald-400">y no encontramos</span></h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-2xl mx-auto">Buscamos protección GARANTIZADA con devolución. No existía en Bonsai, ni en Moxie, ni en Dubsado, ni en ningún otro. Así que lo construimos nosotros.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="md:col-span-2 bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 text-left relative">
              <div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center"><Shield className="w-10 h-10 text-emerald-400" /></div><div>
                <h3 className="text-2xl font-bold">Garantía Blindaje Total <span className="inline-block bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full ml-2">94% nunca activada</span></h3>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div></div>
                <p className="text-xs text-zinc-400 font-medium mt-1">Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.</p>
                <p className="text-emerald-400 font-bold text-lg">3 meses gratis si no cobras</p></div>
              </div>
              <div className="bg-zinc-800 border-l-2 border-emerald-500 p-3 rounded-xl mt-4">
                <p className="text-xs text-zinc-300 italic">"Activé la garantía y en 48h tenía mi dinero. CFG cumplió." — Javier Herrera</p>
              </div>
              <p className="text-zinc-300 text-sm mb-3"><strong className="text-emerald-400">🛡️ Garantía Blindaje Total:</strong> Si usas el sistema y no cobras, <strong className="text-white">te devolvemos 3 meses de suscripción, por transferencia bancaria en 48h.</strong><br/><strong className="text-emerald-400 mt-2 block">↩️ Garantía de devolución:</strong> Si no te gusta en 30 días, te devolvemos tu dinero. Sin preguntas.</p>
              <div className="text-xs text-zinc-400 mt-3 space-y-2">
                <p>1. Creas el proyecto en CFG (3 min)</p>
                <p>2. El cliente recibe notificación del proyecto y los términos de entrega</p>
                <p>3. CFG gestiona cobros automáticamente (0 min tuyos)</p>
                <p>4. Si en 14 días no has cobrado, te devolvemos 3 meses de suscripción, por transferencia bancaria en 48h</p>
              </div>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 text-left hover:border-amber-700 transition-all"><Lock className="w-12 h-12 text-amber-400 mb-4" /><h3 className="text-xl font-bold mb-2">Bloqueo de entrega</h3><p className="text-zinc-300 text-sm mb-2">El Hito 2 queda <strong className="text-amber-400">bloqueado</strong> hasta que paguen.</p><p className="text-xl font-bold text-amber-400">4.840</p><p className="text-xs text-zinc-400">hitos bloqueados</p></div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 text-left hover:border-blue-700 transition-all"><Scale className="w-12 h-12 text-blue-400 mb-4" /><h3 className="text-xl font-bold mb-2">PayScore de clientes</h3><p className="text-zinc-300 text-sm mb-2">Calificación <strong className="text-blue-400">ORO, PLATA o BRONCE</strong> por historial real.</p></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">La única herramienta que te garantiza cobrar o te devuelve el dinero</h2>
          <div className="bg-amber-900/30 border-2 border-amber-600 rounded-xl p-5 text-center mb-8">
            <p className="text-base text-amber-300 font-bold">⚠️ Bonsai fue comprada por Zoom en 2025. Tu futuro allí es incierto. <a href="/migrar-de-bonsai" className="text-amber-300 underline hover:text-amber-200">Migra de Bonsai en 10 minutos →</a></p>
            <p className="text-sm text-amber-400 mt-1">HoneyBook subió precios un 40% en 2024. CFG es independiente y construido en España.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse comparison-table">
              <thead><tr className="border-b border-zinc-700/50 text-zinc-300 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai</th><th className="py-3 px-4 text-center">HoneyBook</th><th className="py-3 px-4 text-center">Moxie</th><th className="py-3 px-4 text-center">Dubsado</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th></tr></thead>
              <tbody className="text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-700/50 hover:bg-white/[0.02]"><td className="py-3 px-4 text-zinc-300">{row.feat}</td><td className="py-3 px-4 text-center text-zinc-400">{row.bonsai === '✗' ? <span className="text-red-400">✗</span> : row.bonsai}</td><td className="py-3 px-4 text-center text-zinc-400">{row.honeybook === '✗' ? <span className="text-red-400">✗</span> : row.honeybook}</td><td className="py-3 px-4 text-center text-zinc-400">{row.moxie === '✗' ? <span className="text-red-400">✗</span> : row.moxie}</td><td className="py-3 px-4 text-center text-zinc-400">{row.dubsado === '✗' ? <span className="text-red-400">✗</span> : row.dubsado}</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.nosotros === '✓' ? <span className="text-emerald-400">✓</span> : row.nosotros}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Blindarme por 1€ →</Link></div>
          </div>

          {/* FEATURES EXCLUSIVAS */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Lo que hace CFG y ningún otro <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">NUEVO</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">🔍</span>
                <h3 className="font-bold mt-2 mb-2">Cassandra Score: verificación de cliente nuevo</h3>
                <p className="text-sm text-zinc-400"><a href="/cassandra-score" className="text-emerald-400 hover:text-emerald-300 underline">Pega el email o LinkedIn de un cliente nuevo. Cassandra analiza en segundos si tiene historial de impago en nuestra red de freelancers.</a></p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">💰</span>
                <h3 className="font-bold mt-2 mb-2">Anticipo automático recomendado</h3>
                <p className="text-sm text-zinc-400">Si el cliente es BRONCE, el sistema sugiere pedir 50% por adelantado.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-bold mt-2 mb-2">Garantía interna CFG para grandes proyectos</h3>
                <p className="text-sm text-zinc-400">Para proyectos +5.000€. Cobertura total por CFG, sin aseguradora externa.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">📊</span>
                <h3 className="font-bold mt-2 mb-2">Cálculo automático de intereses de demora (Ley 3/2004)</h3>
                <p className="text-sm text-zinc-400">CFG calcula automáticamente los intereses legales que tu cliente te debe por cada día de retraso.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">🌐</span>
                <h3 className="font-bold mt-2 mb-2">Portal del cliente</h3>
                <p className="text-sm text-zinc-400">URL personalizada donde tu cliente ve todos sus proyectos, pagos e hitos.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">✍️</span>
                <h3 className="font-bold mt-2 mb-2">Firma digital de hitos</h3>
                <p className="text-sm text-zinc-400">El cliente firma digitalmente cada hito aceptado. Cumple con eIDAS para validez legal en la UE.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">📄</span>
                <h3 className="font-bold mt-2 mb-2">Propuesta → Contrato → Prueba de entrega → Factura</h3>
                <p className="text-sm text-zinc-400">Un solo flujo desde que envías la propuesta hasta que cobras. Con confirmación de entrega con timestamp.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">📱</span>
                <h3 className="font-bold mt-2 mb-2">Notificación WhatsApp al cliente</h3>
                <p className="text-sm text-zinc-400">Recordatorios por WhatsApp (WhatsApp tiene 98% de tasa de apertura vs 20% del email). Integración Twilio.</p>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <span className="text-2xl">📈</span>
                <h3 className="font-bold mt-2 mb-2">Kit de demanda listo para juzgado</h3>
                <p className="text-sm text-zinc-400">PDF con: contrato, entregas, comunicaciones y cartas de reclamación. Listo para presentar.</p>
              </div>
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
            <span className="text-zinc-400 font-bold text-sm"><span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span></span>
            <span className="text-zinc-400 font-bold text-sm">PayPal</span>
            <span className="text-zinc-400 font-bold text-sm">📊 Holded</span>
            <span className="text-zinc-400 font-bold text-sm">📋 Quipu</span>
            <span className="text-zinc-400 font-bold text-sm">💱 Wise</span>
            <span className="text-zinc-400 font-bold text-sm">📅 Google Calendar</span>
            <span className="text-zinc-400 font-bold text-sm">⚡ Zapier</span>
            <span className="text-zinc-400 font-bold text-sm">📝 Notion</span>
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
              <p className="text-xs text-zinc-400 italic">{demoNombre || "María"}, aquí tienes la factura del proyecto {demoProyecto || "Branding"}. Puedes pagar fácilmente aquí: [botón de pago]. Gracias.</p>
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
          <div className="text-center mt-4"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 text-sm">Blindarme por 1€ →</Link></div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 px-4 bg-zinc-900/50" ref={statsRef}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400">{liveFreelancers}</p><p className="text-sm text-zinc-300 mt-1">freelancers blindados</p></div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="124000">124.000</span>€</p><p className="text-sm text-zinc-300 mt-1">recuperados</p></div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="94">94</span>%</p><p className="text-sm text-zinc-300 mt-1">tasa de cobro</p></div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400"><span className="stat-counter" data-target="6">6</span> días</p><p className="text-sm text-zinc-300 mt-1">tiempo medio de cobro</p></div>
          </div>
          <div className="flex justify-center mb-4"><a href="https://trustpilot.com/review/cashflowguardian.com" target="_blank" className="text-xs text-zinc-400 font-medium hover:text-emerald-400 transition-colors flex items-center gap-1">⭐⭐⭐⭐⭐ 4.9/5 en Trustpilot · Ver reseñas →</a></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Lo que dicen los freelancers <span className="text-emerald-400">blindados</span></h2>
          <div className="flex justify-center gap-2 mb-4 flex-wrap"><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Todos</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Menos de 500€</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">500€ - 2.000€</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Más de 2.000€</button></div>
              <button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Recuperación</button>
              <button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500">Prevención</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="relative bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-left">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-zinc-300 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                    <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-zinc-200">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!expandedTestimonials && allTestimonials.length > 3 && <button onClick={() => setExpandedTestimonials(true)} className="mt-6 px-4 py-2 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium">🔍 Ver más testimonios →</button>}
          <div className="text-center mt-4"><Link href="/casos" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Quiero ser el próximo caso de éxito →</Link></div>
          <div className="mt-8 bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 text-center">
            <p className="text-sm text-zinc-400 mb-4">🎥 Video testimonios reales</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">Próximamente</div>
              <div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">Próximamente</div>
              <div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">Próximamente</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURIDAD Y PRIVACIDAD */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tus datos están <span className="text-emerald-400">seguros</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Infraestructura', desc: 'Servidores en Europa con cifrado AES-256. Cumplimos con el RGPD.' },
              { title: 'Datos de clientes', desc: 'Tus clientes solo reciben notificaciones. No accedemos a sus datos.' },
              { title: 'Si CFG desaparece', desc: 'Puedes exportar todos tus datos en cualquier momento. Sin candados.' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PRECIOS */}
      <section id="precios" className="py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Elige tu <span className="text-emerald-400">blindaje</span></h2>
          <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-400 font-medium"><span>🔒 Pago seguro (<span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span>)</span><span>🛡️ SSL</span></div>
          <div className="flex justify-center gap-4 mt-2 text-xs text-zinc-400 font-medium"><span>🛡️ RGPD Compliant</span><span>🌍 47 países</span></div>
          <p className="text-xl text-emerald-400 mb-8 font-bold">Todos los planes incluyen la <strong className="text-white">Garantía Blindaje Total</strong>.</p>
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/50 rounded-full p-1 mb-12">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white'}`}>Mensual</button>
            <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${billingCycle === 'annual' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white'}`}>Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ahorra 99€/año</span></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col transition-all">
              <h3 className="text-2xl font-bold mb-2">CFG Starter</h3><p className="text-xs text-zinc-400 mb-4">Protege hasta 5 facturas al mes.</p>
              <p className="text-4xl font-extrabold text-emerald-400 mb-4">9€<span className="text-xl text-zinc-400">/mes</span></p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 5 facturas/mes</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> 3 clientes</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Recordatorios email</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore básico (3 clientes)</li>
              </ul>
              <Link href="/register" className="block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-full transition-all">Empezar gratis · Sin permanencia</Link>
            </div>
            <div className="bg-zinc-900 border-2 rounded-2xl p-10 flex flex-col relative scale-105 border-emerald-500">
              <div className="flex justify-center mb-4"><span className="inline-block bg-emerald-500 text-black text-sm font-extrabold px-5 py-1.5 rounded-full">🏆 Más popular</span></div>
              <h3 className="text-2xl font-bold mb-2">CFG Pro</h3><p className="text-xs text-zinc-400 mb-4">Para no volver a perseguir una factura.</p>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">{prices.pro}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>{billingCycle === 'annual' && <span className="text-sm text-emerald-400 block">Menos de 1€/día · 21€/mes facturado anualmente</span>}</p>
              <p className="text-xs text-zinc-400 font-medium mb-4">Equivale a proteger 3 proyectos de 500€. Un impago recuperado ya pagó 7 años de CFG Pro.</p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Facturas y clientes ilimitados</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo automático de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Recordatorios escalados</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal en 40+ países</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> PayScore (historial de pago)</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Portal del cliente</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Contratos digitales</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Cassandra IA <span className="text-[9px] text-zinc-500">(analiza el riesgo de impago de cada cliente antes de que aceptes el proyecto)</span></li>
                <a href="/recuperar-deuda" className="block hover:text-white">Recuperar deuda antigua</a>
                <a href="/cfg-holded" className="block hover:text-white">CFG + Holded</a>
                <a href="/whatsapp-business" className="block hover:text-white">CFG + WhatsApp</a>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte 4h</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Blindarme por 1€ →</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">🛡️ 14 días gratis (sin tarjeta) · Luego 29€/mes</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col transition-all">
              <h3 className="text-2xl font-bold mb-2">CFG Élite</h3><p className="text-xs text-zinc-400 mb-4">Para freelancers que facturan +5.000€/mes.</p>
              <p className="text-3xl font-extrabold mb-4 text-zinc-300">{prices.total}€<span className="text-xl text-zinc-400">/{billingCycle === 'annual' ? 'año' : 'mes'}</span>{billingCycle === 'annual' && <span className="text-sm text-emerald-400 block">Menos de 2€/día · 58€/mes facturado anualmente</span>}</p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Todo lo de Pro</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Cassandra Ejecutiva</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Contratos con plantillas revisadas por abogado</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Dashboards avanzados de cashflow (protege facturas de hasta 50.000€)</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> White-label</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Onboarding 1-a-1</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte prioritario 1h (respuesta en menos de 60 minutos)</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Empezar con Élite</Link>
              <p className="text-xs text-zinc-400 mt-3 text-center">🛡️ Garantía devolución 30 días · Sin preguntas</p>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col transition-all">
              <h3 className="text-2xl font-bold mb-2">Por proyecto</h3><p className="text-xs text-zinc-400 mb-4">Sin suscripción. Un proyecto a la vez.</p>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">1.5%<span className="text-xl text-zinc-400"> (mín. 19€)</span></p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Protege un proyecto puntual sin suscripción. Calcula tu precio: 1.5% del importe (mín. 19€).</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Bloqueo de hitos</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Escudo Legal</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Proteger un proyecto →</Link>
            </div>
            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-10 flex flex-col transition-all">
              <h3 className="text-2xl font-bold mb-2">CFG Teams</h3><p className="text-xs text-zinc-400 mb-4">Para agencias y estudios pequeños.</p>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">149€<span className="text-xl text-zinc-400">/mes</span></p>
              <ul className="text-left text-zinc-300 space-y-6 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Hasta 5 miembros del equipo</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Dashboard de equipo</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> White-label incluido</li>
                <li className="flex items-start gap-2"><Check className="text-emerald-400 mt-0.5 w-4 h-4" /> Soporte prioritario 30 min</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Empezar con Teams</Link>
            </div>
          </div>
          <div className="mt-8 bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 max-w-md mx-auto text-left">
          </div>
          <p className="text-xs text-zinc-400 font-medium mt-6 text-center">Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-4xl mx-auto bg-zinc-900/50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">Las preguntas que hacen <span className="text-emerald-400">antes de blindarse</span></h2>
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="flex justify-center gap-2 mb-4 flex-wrap"><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500 transition-colors">Todas</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500 transition-colors">Funcionamiento</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500 transition-colors">Legal</button><button className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-300 hover:border-emerald-500 transition-colors">Precios</button></div>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input type="text" placeholder="¿Tienes una duda? Escríbela aquí" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none transition-colors" />
          {faqSuggestions.length > 0 && (<div className="absolute top-full left-0 right-0 bg-zinc-900 border border-zinc-700/50 rounded-xl mt-2 p-2 z-20 shadow-2xl">{faqSuggestions.map((s, i) => (<button key={i} onClick={() => setFaqSearch(s)} className="block w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">{s}</button>))}</div>)}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {visibleFAQ.map((item, i) => (
            <details key={i} className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-5 group"><summary className="font-bold cursor-pointer list-none flex justify-between items-center text-sm text-zinc-200">{item.q}<span className="text-zinc-400 group-open:rotate-45 transition-transform text-lg">+</span></summary><p className="text-zinc-300 mt-3 text-sm leading-relaxed">{item.a}</p></details>
          ))}
        </div>
        {!expandedFAQ && filteredFaq.length > 10 && <button onClick={() => setExpandedFAQ(true)} className="mt-4 px-6 py-3 border border-emerald-600 text-emerald-400 rounded-full hover:bg-emerald-600/10 transition-all text-sm font-medium block mx-auto cursor-pointer">🔍 Ver todas las preguntas</button>}
        <div className="text-center my-6"><Link href="/register" className="inline-flex items-center gap-2 border border-zinc-600 text-zinc-400 font-bold px-5 py-2 rounded-full text-sm hover:border-zinc-400 transition-all">¿Quieres saber más? Ver planes →</Link></div>
        <div className="text-center mt-6"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm cursor-pointer">Blindarme por 1€ →</Link></div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 bg-emerald-950/20 border-y border-emerald-900/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="text-center mb-4"><p className="text-sm text-zinc-400 italic">"Activé el Escudo Legal y en 48 horas el cliente pagó. Nunca llegué a necesitar la devolución." — Javier Herrera, Editor de vídeo</p></div>
          <p className="text-sm text-zinc-300">Únete a {liveFreelancers} freelancers que ya duermen tranquilos</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">Llevas años persiguiendo facturas. Tardas 3 minutos en que nunca vuelva a pasar.</h2>
          <p className="text-xs text-zinc-400">Sin tarjeta · 14 días gratis · Sin permanencia · Garantía Blindaje Total incluida</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">Blindarme por 1€ →</Link>
          <p className="text-xs text-zinc-400 font-medium"><Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">Ver comparativa completa de planes →</Link></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-zinc-700/50 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-extrabold text-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg></div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
              <p className="text-zinc-400 text-xs">Hecho por Rodrigo, 16 años, Tenerife. Perdió 4.800€ y decidió que ningún freelancer pasaría por lo mismo.</p>
              <p className="text-zinc-500 text-xs mt-1">© 2026 CashFlow Guardian · Tenerife, Spain · Actualizado: 23/05/2026</p>
              <p className="text-zinc-500 text-xs mt-1">CashFlow Guardian SL · CIF registrado en España</p>
              <p className="text-zinc-500 text-xs mt-1">hola@cashflowguardian.com</p>
              <div className="flex gap-3 mt-2 text-zinc-400 text-sm">
                <a href="https://instagram.com/cashflowguardian" target="_blank" className="hover:text-emerald-400">Instagram</a>
                <a href="https://linkedin.com/company/cashflowguardian" target="_blank" className="hover:text-emerald-400">LinkedIn</a>
                <a href="https://twitter.com/cashflowguard" target="_blank" className="hover:text-emerald-400">Twitter</a>
              </div>
              <div className="flex gap-2 mt-2 text-zinc-600 text-xs"><span>Visa</span> · <span>Mastercard</span> · <span><span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span></span> · <span>PayPal</span> · <span>SSL</span></div>
              <p className="text-zinc-600 text-[10px] mt-2">🔒 SSL Seguro · 🛡️ RGPD Compliant · 💳 <span className="text-zinc-400 font-bold text-sm"><svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.853 0 9.856 0 7.351 1.354 7.351 4.347c0 3.392 4.515 4.474 8.856 5.494 2.002.474 3.356 1.163 3.356 2.409 0 .831-.683 1.305-1.901 1.305-2.227 0-4.515-.858-6.09-1.631l-.89 5.494C11.448 18.225 14.003 21 16.847 21c2.997 0 5.502-1.354 5.502-4.347 0-3.392-4.515-4.474-8.856-5.494z"/></svg> Stripe</span> Verified Partner</p>
            </div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Producto</h4><div className="space-y-2 text-zinc-400"><a href="#como-funciona" className="block hover:text-white">Cómo funciona</a><a href="#garantia" className="block hover:text-white">Garantía</a><a href="#precios" className="block hover:text-white">Precios</a><Link href="/login" className="block hover:text-white">Iniciar sesión</Link></div></div>
            <div><h4 className="font-bold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/support" className="block hover:text-white">Soporte</Link><Link href="/privacy" className="block hover:text-white">Privacidad</Link><Link href="/terms" className="block hover:text-white">Términos</Link><Link href="/cookies" className="block hover:text-white">Cookies</Link><Link href="/changelog" className="block hover:text-white">Changelog</Link><Link href="/trabaja-con-nosotros" className="block hover:text-white">Trabaja con nosotros</Link><Link href="/comunidad" className="block hover:text-white">Comunidad</Link></div></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-700/50">
          <div className="text-center">
            <p className="text-sm text-zinc-300 font-bold mb-2">📩 La guía gratuita: Los 7 contratos que todo freelancer debe usar (valorados en 199€)</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input type="email" placeholder="tu@email.com" className="flex-1 bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-full transition-all whitespace-nowrap">Descargar gratis</button>
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
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-amber-400">📄 Carta legal Escudo Legal</h3><button onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
                <div className="bg-zinc-950 border border-zinc-700/50 rounded-xl p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{`ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA\n\nMuy Sr./Sra. [Nombre del Cliente]:\n\nPor medio de la presente, le requiero formalmente el pago de la factura #INV-001 emitida el [fecha] por un importe total de 500 €, la cual se encuentra impagada a fecha de hoy.\n\nLe concedemos un plazo improrrogable de SIETE (7) DÍAS HÁBILES para proceder al pago.\n\nAtentamente,\n[Tu nombre]`}</div>
                <p className="text-xs text-zinc-400 mt-4">Esta carta se adapta a España, México, EE.UU. y 47 países más.</p>
                <Link href="/register" className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2 rounded-full transition-all cursor-pointer">Quiero esto para mis clientes →</Link>
              </>
            )}
            {timelineModal === 'video' && (
              <>
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-emerald-400">🎥 Cómo funciona</h3><button onClick={() => setTimelineModal(null)} className="text-zinc-400 hover:text-white text-xl">&times;</button></div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)}>
          <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-center relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">&times;</button>
            <div className="text-4xl mb-4">📘</div>
            <h3 className="text-xl font-bold mb-2">Espera — antes de irte</h3>
            <p className="text-zinc-300 text-sm mb-4">¿Alguna vez un cliente te dejó sin pagar? Calcula tu pérdida:</p>
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm cursor-pointer" onClick={() => setShowExitPopup(false)}>Calcular ahora →</Link>
          </div>
        </div>
      )}
      <CassandraChat />
    </div>
  )
}
