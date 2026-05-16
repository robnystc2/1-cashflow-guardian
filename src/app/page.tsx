'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Palette, Code2, BarChart3, Camera, PenTool, Globe, Megaphone, Briefcase, Building2, Film, Shield, Lock, Scale } from 'lucide-react'

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [faqSearch, setFaqSearch] = useState('')
  const [faqSuggestions, setFaqSuggestions] = useState<string[]>([])
  const [roiFacturacion, setRoiFacturacion] = useState(2000)
  const [roiClientes, setRoiClientes] = useState(3)
  const [roiImpago, setRoiImpago] = useState(30)
  const [pricingProfile, setPricingProfile] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showMoreProfiles, setShowMoreProfiles] = useState(false)
  const [timelineModal, setTimelineModal] = useState<string | null>(null)
  const [tableFilter, setTableFilter] = useState<string>('todas')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [fomoNotifications, setFomoNotifications] = useState<{name: string; action: string; time: string; avatar: string}[]>([])
  const [currentFomo, setCurrentFomo] = useState<number>(0)
  const [tickerIndex, setTickerIndex] = useState(0)
  const [heroQuestionAnswered, setHeroQuestionAnswered] = useState<boolean | null>(null)
  const [heroCTA, setHeroCTA] = useState('Empezar 14 días gratis — Sin tarjeta')
  const [heroCTAColor, setHeroCTAColor] = useState('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
  const [pageTime, setPageTime] = useState(0)
  const [proSubscribers, setProSubscribers] = useState(143)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null)

  const prices = {
    basic: billingCycle === 'monthly' ? 39 : 32,
    pro: billingCycle === 'monthly' ? 89 : 74,
    total: billingCycle === 'monthly' ? 197 : 164,
  }

  const roiPerdida = Math.round(roiFacturacion * 12 * (roiImpago / 100))
  const roiCoste = prices.pro * 12
  const roiMultiplicador = roiPerdida > 0 ? (roiPerdida / roiCoste).toFixed(1) : '0'

  const tickerMessages = [
    { type: 'success', text: 'María de Madrid recuperó 2.400€ hace 4 minutos', color: 'bg-emerald-400' },
    { type: 'activity', text: 'Javier de Lima acaba de blindar su proyecto de 1.800€', color: 'bg-emerald-400' },
    { type: 'success', text: 'Carlos de Barcelona cobró una factura de 3.200€ atrasada 60 días', color: 'bg-emerald-400' },
    { type: 'urgency', text: 'Quedan 47 plazas beta esta semana', color: 'bg-red-400' },
    { type: 'stat', text: 'Esta hora: 3 freelancers activaron LexGuard', color: 'bg-amber-400' },
  ]

  const fomoPool = [
    { name: 'María de Madrid', action: 'acaba de cobrar 1.800€', time: 'hace 3 min', avatar: 'MG' },
    { name: 'Carlos de Barcelona', action: 'activó LexGuard para un impago de 3.200€', time: 'hace 5 min', avatar: 'CR' },
    { name: 'Ana de México DF', action: 'se unió al plan Pro', time: 'hace 2 min', avatar: 'AL' },
    { name: 'Pablo de Sevilla', action: 'recuperó 950€ con la Garantía', time: 'hace 8 min', avatar: 'PS' },
  ]

  // Ticker
  useEffect(() => {
    const interval = setInterval(() => setTickerIndex(prev => (prev + 1) % tickerMessages.length), 4000)
    return () => clearInterval(interval)
  }, [])

  // Page time
  useEffect(() => {
    const interval = setInterval(() => setPageTime(prev => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  // Dynamic Hero CTA
  useEffect(() => {
    if (heroQuestionAnswered === true) {
      setHeroCTA('Recupera tu dinero ahora — Empieza gratis')
      setHeroCTAColor('bg-red-500 hover:bg-red-400 text-white shadow-red-500/20')
      return
    }
    if (heroQuestionAnswered === false) {
      setHeroCTA('Blíndate antes de que pase — 14 días gratis')
      setHeroCTAColor('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
      return
    }
    if (pageTime > 120) {
      setHeroCTA('Ver si califico')
      setHeroCTAColor('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
      return
    }
    if (scrollProgress > 80) {
      setHeroCTA('Activar mi blindaje')
      setHeroCTAColor('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
      return
    }
    if (scrollProgress > 50) {
      setHeroCTA('Empezar blindado hoy')
      setHeroCTAColor('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
      return
    }
    setHeroCTA('Empezar 14 días gratis — Sin tarjeta')
    setHeroCTAColor('bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20')
  }, [scrollProgress, pageTime, heroQuestionAnswered])

  // FOMO
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fomoPool.length)
      setFomoNotifications(prev => [{ ...fomoPool[randomIndex] }, ...prev].slice(0, 2))
      setCurrentFomo(prev => prev + 1)
    }, 10000 + Math.random() * 5000)
    return () => clearInterval(interval)
  }, [])

  // Pro subscribers
  useEffect(() => {
    const interval = setInterval(() => setProSubscribers(prev => prev + Math.floor(Math.random() * 3)), 30000)
    return () => clearInterval(interval)
  }, [])

  // FAQ suggestions
  useEffect(() => {
    if (faqSearch.length > 0) {
      const suggestions = faqItems.filter(item => item.q.toLowerCase().includes(faqSearch.toLowerCase())).slice(0, 3).map(item => item.q)
      setFaqSuggestions(suggestions)
    } else { setFaqSuggestions([]) }
  }, [faqSearch])

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(Math.min(progress, 100))
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => { if (e.clientY <= 0 && !showExitPopup) { exitTimerRef.current = setTimeout(() => setShowExitPopup(true), 300) } }
    const handleMouseEnter = () => { if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null } }
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    return () => { document.removeEventListener('mouseleave', handleMouseLeave); document.removeEventListener('mouseenter', handleMouseEnter); if (exitTimerRef.current) clearTimeout(exitTimerRef.current) }
  }, [showExitPopup])

  // Intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) }), { threshold: 0.5 })
    document.querySelectorAll('section[id]').forEach(s => observerRef.current?.observe(s))
    return () => observerRef.current?.disconnect()
  }, [])

  const navCTA = scrolled ? 'Empezar 14 días gratis →' : 'Probar gratis →'

  const faqItems = [
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails y notificaciones se envían desde tu marca. El sistema es transparente para tu cliente." },
    { q: "¿Qué pasa si el cliente se niega a pagar igualmente?", a: "Ahí entra LexGuard. El sistema genera una carta legal con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso. Si no, el seguro anti-impago te cubre 3 meses." },
    { q: "¿Funciona en mi país?", a: "Sí. Soportamos 47 países, multi-moneda y adaptación legal a España, México, EE.UU. y más." },
    { q: "¿Es legal bloquear el trabajo?", a: "El bloqueo es una condición pactada en el contrato. Si el cliente firmó, está legalmente obligado. LexGuard te respalda." },
    { q: "¿Y si trabajo en Upwork/Fiverr?", a: "CashFlow Guardian funciona como tu centro de control financiero independientemente de dónde consigas los clientes." },
    { q: "¿Qué pasa si el cliente me da una mala reseña por reclamar el pago?", a: "LexGuard actúa en nombre del contrato firmado, no en tu nombre personal. El cliente no puede culparte a ti de un proceso legal que él mismo activó al no pagar." },
    { q: "¿Puedo usarlo con clientes que ya son mis amigos o conocidos?", a: "Sí, de hecho es recomendable. Los problemas de pago con conocidos son los más incómodos. CFG actúa como intermediario profesional sin que tú tengas que hacer el papel de 'policía del cobro'." },
    { q: "¿Qué idioma usa el sistema con mi cliente?", a: "Los recordatorios se envían en el idioma que configures. LexGuard adapta el idioma de la carta legal según la jurisdicción del cliente." },
    { q: "¿Por qué cobráis mensual si el problema del impago es puntual?", a: "Porque el PayScore y LexGuard te protegen antes de que ocurra el impago, en cada nuevo cliente, de forma preventiva. No es un parche: es un seguro." },
    { q: "¿Necesito conocimientos técnicos?", a: "Cero. En 5 minutos tendrás tu primer proyecto blindado." },
    { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, sin permanencia. Y si cancelas, tus datos y facturas se pueden exportar." },
    { q: "¿Puedo migrar desde FreshBooks o Bonsai?", a: "Sí. Tenemos un proceso de importación. En menos de 10 minutos tendrás todo tu historial en CashFlow Guardian." },
  ]

  const filteredFaq = faqItems.filter(item => item.q.toLowerCase().includes(faqSearch.toLowerCase()) || item.a.toLowerCase().includes(faqSearch.toLowerCase()))

  const freelancerProfiles = [
    { role: 'Diseñador', icon: Palette, pain: 'Entregas todo. Silencio. 45 días después, aún esperando.', count: '2.340 diseñadores ya blindados', avgResolution: '6 días' },
    { role: 'Desarrollador', icon: Code2, pain: 'Entregas el MVP. El cliente lo usa. El pago no llega.', count: '3.120 desarrolladores ya blindados', avgResolution: '8 días' },
    { role: 'Consultor', icon: BarChart3, pain: 'Auditoría impecable. El cliente felicita. La factura sigue abierta.', count: '1.870 consultores ya blindados', avgResolution: '10 días' },
    { role: 'Fotógrafo', icon: Camera, pain: 'Las fotos publicadas. Tu factura en "pendiente".', count: '980 fotógrafos ya blindados', avgResolution: '6 días' },
    { role: 'Copywriter', icon: PenTool, pain: 'Los textos ya están publicados. Tu correo de cobro, sin respuesta.', count: '1.540 copywriters ya blindados', avgResolution: '5 días' },
    { role: 'Traductor', icon: Globe, pain: 'La traducción está entregada. El cliente la revisa. Y tú… esperando el pago.', count: '720 traductores ya blindados', avgResolution: '7 días' },
    { role: 'Gestor de Ads', icon: Megaphone, pain: 'Inviertes dinero en campañas. El cliente gana ventas. Tu gestión… impagada.', count: '1.100 gestores de ads ya blindados', avgResolution: '9 días' },
    { role: 'Asistente Virtual', icon: Briefcase, pain: 'Resuelves todo. Pero tu honorario… en el limbo.', count: '890 asistentes virtuales ya blindados', avgResolution: '4 días' },
    { role: 'Editor de vídeo', icon: Film, pain: 'El vídeo está en YouTube. El cliente lo promociona. Tu pago… 60 días después.', count: '650 editores de vídeo ya blindados', avgResolution: '11 días' },
    { role: 'Agencia pequeña', icon: Building2, pain: 'Múltiples clientes, mismos problemas de impago. Escalas el caos.', count: '410 agencias ya blindadas', avgResolution: '12 días' },
    { role: 'Arquitecto', icon: Building2, pain: 'Planos entregados. El cliente construye. Tu honorario… en pausa indefinida.', count: '340 arquitectos ya blindados', avgResolution: '15 días' },
  ]

  const timelineSteps = [
    { day: 'Día 0', title: 'Entregas el Hito 1', desc: 'El cliente recibe el entregable y la factura. El Hito 2 se bloquea automáticamente. Tú sigues trabajando. Sin preocuparte.', icon: '✓', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
    { day: 'Día 1', title: 'Recordatorio amable', desc: 'El sistema envía un email profesional al cliente recordando el pago pendiente.', icon: '📧', color: 'bg-blue-500/20 border-blue-500 text-blue-400', preview: { subject: 'Recordatorio amable: Factura #INV-001 pendiente', body: 'Hola Marcos,\n\nTe recordamos que la factura #INV-001 por 500€ vence próximamente.\n\nPor favor, realiza el pago a la mayor brevedad.\n\nGracias.' } },
    { day: 'Día 3', title: 'Recordatorio firme', desc: 'Segundo aviso. Se informa que el trabajo está pausado hasta recibir el pago.', icon: '⚠', color: 'bg-amber-500/20 border-amber-500 text-amber-400', preview: { subject: 'Factura #INV-001 vencida — Segundo aviso', body: 'Hola Marcos,\n\nLa factura #INV-001 por 500€ ha vencido.\n\nEl trabajo permanece pausado hasta que recibamos el pago.\n\nPor favor, regulariza tu situación lo antes posible.' } },
    { day: 'Día 7', title: 'LexGuard activado', desc: 'Mientras tú duermes, LexGuard envía una carta legal personalizada a la legislación de tu país.', icon: '⚖', color: 'bg-orange-500/20 border-orange-500 text-orange-400', isLexGuard: true },
    { day: 'Día 14', title: 'Garantía Anti-Impago', desc: 'Si el pago no se ha recibido, activamos 3 meses gratis en tu cuenta y un equipo legal prioriza tu caso.', icon: '🛡', color: 'bg-red-500/20 border-red-500 text-red-400' },
    { day: 'Resultado', title: 'Tu dinero está protegido', desc: 'El cliente no recibe nada más de tu trabajo hasta que pague. Tú sigues blindado.', icon: '✅', color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400', isResult: true },
  ]

  const comparisonRows = [
    { feat: 'Recordatorios', ellos: 'Manual, sin escalada', nosotros: 'Automático: Amable → Firme → Legal', priority: 'cobrar' },
    { feat: 'Protección impago', ellos: 'Ninguna', nosotros: 'Garantía Anti-Impago + 3 meses gratis', priority: 'cobrar' },
    { feat: 'Bloqueo de entrega', ellos: 'No existe', nosotros: 'Candado físico por hito', priority: 'cobrar' },
    { feat: 'Calificación de clientes', ellos: 'No tienen', nosotros: 'PayScore con historial real', priority: 'gestion' },
    { feat: 'Defensa legal', ellos: 'No ofrecen', nosotros: 'LexGuard con jurisdicción local', priority: 'cobrar' },
    { feat: 'Contratos inteligentes', ellos: 'Solo Bonsai (EE.UU.)¹', nosotros: 'Disponible en 47 países', priority: 'contratos' },
    { feat: 'Integración Upwork/Fiverr', ellos: 'No tienen', nosotros: 'Compatible (importación manual)', priority: 'gestion' },
    { feat: 'CFO Virtual', ellos: 'Reportes históricos', nosotros: 'Predicciones a 30 días', priority: 'gestion' },
    { feat: 'Cobertura geográfica', ellos: 'Limitada', nosotros: '47 países, multi-moneda', priority: 'gestion' },
  ]

  const noToolCols = ['Sin protección', 'Sin escudo', 'Sin historial', 'Sin respaldo', 'Sin cobertura', 'Sin defensa', 'Sin previsión', 'Sin garantía']
  const filteredComparisonRows = tableFilter === 'todas' ? comparisonRows : comparisonRows.filter(row => row.priority === tableFilter)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      {/* Barra de progreso */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-zinc-800">
        <div className="h-full bg-emerald-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Ticker */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-zinc-900 border-b border-emerald-800/30 overflow-hidden">
        <div className="py-1.5 text-xs text-emerald-400/80 text-center transition-all duration-500 ease-in-out">
          <span className={`inline-block w-2 h-2 rounded-full ${tickerMessages[tickerIndex].color} mr-2 animate-pulse align-middle`} />
          {tickerMessages[tickerIndex].text}
        </div>
      </div>

      {/* FOMO */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2 pointer-events-none hidden md:block">
        {fomoNotifications.slice(0, 1).map((notif, i) => (
          <div key={`${currentFomo}-${i}`} className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl p-3 shadow-2xl animate-in slide-in-from-left fade-in duration-500 max-w-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">{notif.avatar}</div>
            <div><p className="text-xs text-zinc-300"><span className="text-emerald-400 font-semibold">{notif.name}</span> {notif.action}</p><p className="text-[10px] text-zinc-500 mt-0.5">{notif.time}</p></div>
          </div>
        ))}
      </div>

      {/* Exit intent */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white text-xl">&times;</button>
            <div className="text-4xl mb-4">📘</div>
            <h3 className="text-xl font-bold mb-2">Espera — antes de irte</h3>
            <p className="text-zinc-400 text-sm mb-6">Llévate la <strong className="text-emerald-400">Guía Anti-Impago gratis</strong>. Descubre cómo dejar de perder dinero HOY.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm" onClick={() => setShowExitPopup(false)}>Empieza blindado gratis →</Link>
              <button onClick={() => { alert('📥 Guía descargada (simulación).'); setShowExitPopup(false); }} className="bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold px-6 py-3 rounded-full transition-all hover:bg-zinc-700 text-sm">Solo quiero la guía</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`sticky top-[2px] z-50 transition-all duration-300 ${scrolled ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">CashFlow Guardian</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#garantia" className="hover:text-white transition-colors">Garantía</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
            <a href="#precios" className="hover:text-white transition-colors">Precios</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Entrar</Link>
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">{navCTA}</Link>
          </div>
        </div>
      </nav>

      {/* CTA sticky móvil */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#080808]/95 backdrop-blur-xl border-t border-zinc-800 p-3">
        <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all shadow-lg shadow-emerald-500/20 w-full">Empieza blindado gratis →</Link>
      </div>

      {/* 1. HERO */}
      <section className="relative pt-20 pb-12 px-4 max-w-6xl mx-auto hero-glow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full text-xs text-red-400 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"/> 1 de cada 3 freelancers pierde dinero hoy
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Blinda tus proyectos.</span>{' '}<span className="text-white">Cobra siempre.</span>
            </h1>
            <p className="text-sm text-emerald-400/80 mt-2 font-medium">Hecho por freelancers que perdieron 4.800€ en impagos. Para que tú no lo hagas.</p>
            <p className="text-lg md:text-xl text-zinc-400 mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              El único sistema que hace <strong className="text-white">imposible</strong> que un cliente se quede con tu trabajo sin pagarte. Tú entregas. El sistema hace el resto.
            </p>
            <p className="text-sm text-emerald-400 mt-4 font-medium">📈 María G., diseñadora, Madrid. Recuperó 2.400€ en 4 días. Sin llamadas, sin drama.</p>
            <div className="mt-8 flex flex-col items-center lg:items-start gap-4">
              {heroQuestionAnswered === null && (
                <div className="mb-2">
                  <p className="text-sm text-zinc-400 mb-2">¿Tienes ahora mismo alguna factura sin cobrar?</p>
                  <div className="flex gap-2">
                    <button onClick={() => setHeroQuestionAnswered(true)} className="bg-red-500/20 border border-red-800 text-red-400 font-medium px-5 py-2 rounded-full hover:bg-red-500/30 transition-colors text-sm">Sí, tengo facturas pendientes</button>
                    <button onClick={() => setHeroQuestionAnswered(false)} className="bg-zinc-800 border border-zinc-700 text-zinc-400 font-medium px-4 py-1.5 rounded-full hover:bg-zinc-700 transition-colors text-sm">No, quiero prevenir</button>
                  </div>
                </div>
              )}
              <Link href="/register" className={`inline-flex items-center gap-2 font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg active:scale-95 max-w-[420px] ${heroCTAColor}`}>
                {heroCTA} →
              </Link>
              <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                <span>Stripe</span><span className="w-1 h-1 bg-zinc-700 rounded-full" /><span>Visa</span><span className="w-1 h-1 bg-zinc-700 rounded-full" /><span>Mastercard</span><span className="w-1 h-1 bg-zinc-700 rounded-full" /><span className="flex items-center gap-1">🔒 SSL</span>
              </div>
              <p className="text-xs text-zinc-500">Únete a 847 freelancers que ya cobran sin perseguir a nadie</p>
              <a href="#como-funciona" className="text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4">Ver cómo funciona →</a>
            </div>
          </div>
          <div className="relative mx-auto lg:mx-0 w-full max-w-xl lg:mt-0">
            <div className="border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 bg-zinc-950">
              <div className="bg-zinc-900/80 backdrop-blur-sm p-3 flex items-center gap-2 border-b border-zinc-800">
                <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-emerald-500"/></div>
                <span className="text-xs text-zinc-500 ml-2">Panel de Blindaje</span>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-sm">
                  <p className="text-zinc-400 text-xs">CFO Cassandra</p>
                  <p className="text-emerald-400 font-bold mt-1 text-lg animate-pulse">Tus finanzas están estables.</p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3"><div className="bg-emerald-500 h-1.5 rounded-full w-3/4"/></div>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-sm">
                  <p className="text-zinc-400 text-xs">PayScore</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-3 h-3 bg-emerald-400 rounded-full"/>
                    <span className="font-bold text-lg">María Gómez</span>
                    <span className="ml-auto text-sm bg-emerald-900/50 text-emerald-400 px-3 py-1 rounded-full animate-in fade-in duration-1000">ORO</span>
                  </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-sm">
                  <p className="text-zinc-400 text-xs">Proyecto Blindado</p>
                  <div className="flex gap-3 mt-2">
                    <div className="flex-1 bg-emerald-900/30 border border-emerald-800 rounded-lg p-3 text-center">
                      <p className="text-sm text-emerald-400">✓ Fase 1</p><p className="text-xl font-bold">500€</p>
                    </div>
                    <div className="flex-1 bg-zinc-800 border rounded-lg p-3 text-center animate-unlock" style={{borderColor:'rgba(239,68,68,0.5)'}}>
                      <p className="text-sm text-red-400">🔒 Fase 2</p><p className="text-xl font-bold text-zinc-500">500€</p>
                    </div>
                  </div>
                  <p className="text-xs text-amber-400 mt-3 text-center animate-mockup-alert">⚠ Cliente no ha pagado — aviso automático enviado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ¿TE SUENA ESTO? */}
      <section id="suena-esto" className="py-12 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Te suena esto?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {freelancerProfiles.map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:border-emerald-700 transition-all text-center group hover:-translate-y-1 duration-200 cursor-pointer relative">
                <item.icon className="w-7 h-7 mx-auto mb-1 text-emerald-400 group-hover:scale-110 transition-transform" /><h4 className="font-semibold text-xs">{item.role}</h4><p className="text-[10px] text-zinc-500 mt-1 leading-tight">{item.pain}</p><p className="text-[9px] text-emerald-500/70 mt-1 font-medium">{item.count}</p>
                <div className="absolute inset-0 bg-zinc-900/95 border border-emerald-800 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center pointer-events-none"><p className="text-[10px] text-emerald-400 font-semibold">Caso más común:</p><p className="text-[9px] text-zinc-300 mt-1">{item.pain}</p><p className="text-[10px] text-emerald-400 font-semibold mt-2">Resolución promedio:</p><p className="text-[9px] text-zinc-300">{item.avgResolution}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            {!showMoreProfiles && (<button onClick={() => setShowMoreProfiles(true)} className="text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2">Y muchos más →</button>)}
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 text-sm">Empieza blindado hoy →</Link>
          </div>
        </div>
      </section>

      {/* 3. ¿CUÁNTO PIERDES? */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Cuánto pierdes <span className="text-red-400">sin blindaje</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[{stat:'71%',desc:'de freelancers ha sufrido un impago',source:'Freelance Union 2024'},{stat:'30%',desc:'de ingresos en riesgo cada año',source:'Federación de Autónomos UPTA 2024'},{stat:'127 días',desc:'promedio para cobrar una deuda vencida',source:'Informe sectorial 2025'}].map((item,i)=>(<div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-red-400">{item.stat}</p><p className="text-sm text-zinc-400 mt-1">{item.desc}</p><p className="text-[10px] text-zinc-600 mt-1">Fuente: {item.source}</p></div>))}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Calcula tu riesgo personal</h3>
            <div className="space-y-4 mb-6">
              <div><label className="text-sm text-zinc-400 block mb-2">¿Cuánto facturas al mes? (€)</label><input type="range" min="300" max="10000" step="100" value={roiFacturacion} onChange={e=>setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500"/><span className="text-xs text-zinc-500">{roiFacturacion}€</span></div>
              <div><label className="text-sm text-zinc-400 block mb-2">¿Cuántos clientes nuevos tienes al mes?</label><input type="range" min="1" max="20" value={roiClientes} onChange={e=>setRoiClientes(Number(e.target.value))} className="w-full accent-emerald-500"/><span className="text-xs text-zinc-500">{roiClientes}</span></div>
              <div><label className="text-sm text-zinc-400 block mb-2">¿Has tenido algún impago en los últimos 12 meses?</label><div className="flex gap-2 mt-2"><button onClick={() => setRoiImpago(roiImpago > 0 ? 0 : 30)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${roiImpago > 0 ? 'bg-red-500/20 border border-red-800 text-red-400' : 'bg-zinc-800 border border-zinc-700 text-zinc-400'}`}>Sí</button><button onClick={() => setRoiImpago(0)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${roiImpago === 0 ? 'bg-emerald-500/20 border border-emerald-800 text-emerald-400' : 'bg-zinc-800 border border-zinc-700 text-zinc-400'}`}>No</button></div></div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">
                {roiImpago === 0 
                  ? "Aún no has sufrido un impago. Pero con tu volumen, la probabilidad este año es del 71%." 
                  : "Con tu volumen de facturación, estadísticamente perderás"}
              </p>
              {roiImpago > 0 && <p className="text-5xl font-bold text-red-400">{new Intl.NumberFormat('es-ES').format(roiPerdida)}€</p>}
              <p className="text-zinc-400 text-sm mt-1">
                {roiImpago === 0 
                  ? `Una sola factura impagada de tu volumen te costaría más que 10 años de CFG.` 
                  : "este año en impagos"}
              </p>
              <div className="border-t border-zinc-700 mt-4 pt-4"><p className="text-zinc-400 text-sm">CashFlow Guardian cuesta <strong className="text-emerald-400">{roiCoste}€</strong> al año</p><p className="text-lg font-bold text-emerald-400 mt-2">ROI esperado: <strong>{roiMultiplicador}€ protegidos por cada euro invertido</strong></p></div>
            </div>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 mt-6">Empieza a proteger tus ingresos — Gratis →</Link>
          </div>
        </div>
      </section>

      {/* 4. 3 PILARES */}
      <section className="py-12 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Lo que intentamos copiar de la competencia... <span className="text-emerald-400">y no encontramos</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 text-left hover:border-emerald-400 transition-all group"><Shield className="w-12 h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform"/><h3 className="text-xl font-bold mb-3">Garantía Anti-Impago</h3><p className="text-zinc-400 text-sm mb-2">Si un cliente no te paga estando en nuestro sistema, <strong className="text-white">te regalamos 3 meses gratis</strong> y activamos LexGuard prioritario.</p><p className="text-xs text-zinc-500">Activada 17 veces este mes · Promedio de resolución: 4.2 días</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-left hover:border-amber-700 transition-all group"><Lock className="w-12 h-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform"/><h3 className="text-xl font-bold mb-3">Bloqueo de entrega por hitos</h3><p className="text-zinc-400 text-sm mb-2">Entregas el Hito 1. El Hito 2 aparece <strong className="text-amber-400">bloqueado con un candado</strong> hasta que el cliente pague.</p><p className="text-xs text-zinc-500">4.840 hitos bloqueados hasta hoy</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-left hover:border-blue-700 transition-all group"><Scale className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform"/><h3 className="text-xl font-bold mb-3">PayScore de clientes</h3><p className="text-zinc-400 text-sm mb-2">Cada cliente recibe una <strong className="text-blue-400">calificación ORO, PLATA o BRONCE</strong> basada en su historial real de pagos.</p><p className="text-xs text-zinc-500">3 de cada 4 freelancers rechazaron un cliente gracias al PayScore</p></div>
          </div>
        </div>
      </section>

      {/* 5. GARANTÍA */}
      <section id="garantia" className="py-12 px-4 bg-gradient-to-b from-emerald-950/20 to-zinc-900/30 border-y border-emerald-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700 px-4 py-1.5 rounded-full text-xs text-emerald-400 mb-8"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping-slow"/> Única en el mercado</div>
          <div className="mt-4 text-xs text-zinc-400"><span className="text-emerald-400 font-bold">17 veces</span> activada este mes · Promedio de resolución: <span className="text-emerald-400 font-bold">4.2 días</span></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-4">Garantía <span className="text-emerald-400">Anti-Impago</span></h2>
          <p className="text-xl text-zinc-400 mb-4 max-w-2xl mx-auto">Si sigues el proceso y no cobras, <strong className="text-white">nosotros pagamos</strong>. Con condiciones claras. 3 meses gratis + LexGuard prioritario.</p>
          <details open className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-xl mx-auto text-left">
            <summary className="text-sm text-zinc-400 cursor-pointer hover:text-white transition-colors">Ver condiciones de la garantía →</summary>
            <div className="text-xs text-zinc-300 mt-4 space-y-2">
              <p>Para que la Garantía Anti-Impago aplique:</p>
              <ol className="list-decimal list-inside space-y-1"><li>El proyecto debe estar creado en CashFlow Guardian antes de iniciar el trabajo.</li><li>El proceso completo Amable → Firme → Legal debe haberse ejecutado.</li><li>El proceso completo tarda solo 14 días en ejecutarse (o el tiempo de tu proyecto).</li></ol>
              <div className="mt-4 bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 flex items-start gap-3"><span className="text-2xl">🛡️</span><div><p className="text-sm text-emerald-400 font-semibold">Pablo, diseñador UX, Sevilla, recuperó 950€ en 48h.</p><p className="text-xs text-zinc-400 mt-1">"Pensé que la garantía era marketing. No lo era."</p></div></div>
              <div className="mt-3 bg-blue-900/20 border border-blue-800 rounded-lg p-3 flex items-start gap-3"><span className="text-2xl">🛡️</span><div><p className="text-sm text-blue-400 font-semibold">Laura, consultora, Buenos Aires, era escéptica.</p><p className="text-xs text-zinc-400 mt-1">"Cuando vi la garantía pensé 'otra promesa vacía'. A los 6 días tenía mi dinero."</p></div></div>
            </div>
          </details>
        </div>
      </section>

      {/* 6. CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">No es magia. Es un sistema que funciona <span className="text-emerald-400">aunque tú estés durmiendo</span>.</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg mb-16">Divide cada proyecto en hitos. Entregas el primero. El sistema bloquea el siguiente hasta que el cliente paga.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 -translate-y-1/2 z-0 opacity-30"/>
            <div className="relative z-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 group"><div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform text-zinc-300 font-bold">1</div><div className="flex items-center gap-2 mb-3"><h3 className="text-xl font-semibold">Divide tu proyecto</h3><span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">· 3 min</span></div><p className="text-zinc-400">Creas hitos con valor y precio claro. El sistema sugiere automáticamente la división según el tipo de proyecto. <strong className="text-emerald-400">Resultado: tu trabajo está organizado y protegido desde el minuto uno.</strong></p></div>
            <div className="relative z-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-amber-700 hover:-translate-y-1 transition-all duration-200 group"><div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform text-zinc-300 font-bold">2</div><div className="flex items-center gap-2 mb-3"><h3 className="text-xl font-semibold">Bloquea el siguiente paso</h3><span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">· automático</span></div><p className="text-zinc-400">Entregas el Hito 1. El Hito 2 aparece <strong className="text-amber-400">bloqueado con un candado</strong>. <strong className="text-amber-400">El cliente recibe un email profesional firmado por ti.</strong></p></div>
            <div className="relative z-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-emerald-700 hover:-translate-y-1 transition-all duration-200 group"><div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform text-zinc-300 font-bold">3</div><div className="flex items-center gap-2 mb-3"><h3 className="text-xl font-semibold">Cobra sin perseguir</h3><span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">· 0 min</span></div><p className="text-zinc-400">El sistema actúa: <strong className="text-cyan-400">email amable → email firme → carta legal</strong>. <strong className="text-cyan-400">Mientras tú duermes, LexGuard envía la carta legal.</strong></p></div>
          </div>
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setTimelineModal('lexguard')} className="text-sm text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-800 rounded-full px-4 py-2 transition-colors">📄 Ver ejemplo de carta legal →</button>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2">🎥 Ver video del proceso (90s) →</a>
          </div>
          <p className="text-zinc-500 text-sm mb-16">Así es el proceso exacto, día a día ↓</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-8">Así funciona el proceso de cobro automático</h3>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-gradient -translate-x-1/2 z-0"/>
              {timelineSteps.map((step, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-start mb-8 last:mb-0 ${step.isResult ? 'md:block md:text-center' : ''}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 ${step.color} mb-3 md:mb-0 ${!step.isResult ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`} onClick={() => { if (step.isLexGuard) setTimelineModal('lexguard'); }}>
                    <span className="text-base">{step.icon}</span>
                  </div>
                  <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'} ${step.isResult ? 'text-center md:text-center w-full' : ''} pl-14 md:pl-0`}>
                    <span className="text-xs text-zinc-500">{step.day}</span><h4 className="font-semibold mt-1">{step.title}</h4><p className="text-sm text-zinc-400 mt-1">{step.desc}</p>
                    {step.preview && (<div className={`mt-3 bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-left text-xs text-zinc-300 ${i % 2 === 0 ? 'md:text-right' : ''}`}><p className="text-[10px] text-zinc-500 mb-1">📧 Email que recibe tu cliente:</p><p className="font-medium">{step.preview.subject}</p><p className="text-zinc-400 mt-1 whitespace-pre-wrap">{step.preview.body}</p></div>)}
                    {step.isLexGuard && (<div className={`mt-3 ${i % 2 === 0 ? 'md:text-right' : ''}`}><button onClick={(e) => { e.stopPropagation(); setTimelineModal('lexguard'); }} className="text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-800 rounded-lg px-3 py-1.5 transition-colors inline-flex items-center gap-1">⚖ Ver carta legal completa →</button></div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 text-center"><p className="text-sm text-emerald-400 font-bold">El 94% de los casos se resuelven antes de llegar al Día 14.</p></div>
            <p className="text-xs text-zinc-500 mt-4 text-center">Todos los tiempos son configurables.</p>
          </div>
        </div>
      </section>

      {/* 7. TABLA COMPARATIVA */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">¿Por qué CashFlow Guardian es <span className="text-emerald-400">diferente</span>?</h2>
        <div className="bg-amber-900/20 border border-amber-800 rounded-xl p-3 text-center mb-8 max-w-2xl mx-auto"><p className="text-sm text-amber-400">⚠️ Bonsai fue adquirida por Zoom en 2025 — su futuro como herramienta freelance es incierto. <strong className="text-white">Nosotros somos 100% independientes y centrados en freelancers.</strong></p></div>
        <div className="flex justify-center gap-2 mb-8">
          {[{ value: 'todas', label: 'Todas' },{ value: 'cobrar', label: 'Cobrar siempre' },{ value: 'contratos', label: 'Contratos' },{ value: 'gestion', label: 'Tu CFO personal' }].map(filter => (<button key={filter.value} onClick={() => setTableFilter(filter.value)} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${tableFilter === filter.value ? 'bg-white text-black font-medium' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}>{filter.label}</button>))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-zinc-800 text-zinc-400 text-sm"><th className="py-3 px-4">Funcionalidad</th><th className="py-3 px-4 text-center">Bonsai · FreshBooks · Wave · HoneyBook</th><th className="py-3 px-4 text-center">Sin herramienta</th><th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-semibold">CashFlow Guardian</th></tr></thead>
            <tbody className="text-sm">
              {filteredComparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">{row.feat}</td>
                  <td className="py-3 px-4 text-center text-zinc-500">{row.ellos}</td>
                  <td className="py-3 px-4 text-center text-red-400/70 text-xs">{noToolCols[i % noToolCols.length]}</td>
                  <td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">{row.nosotros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-[10px] text-zinc-600 mt-4">Datos verificados Mayo 2026 · Fuentes: G2, Capterra, sitios oficiales</p>
        <div className="text-center mt-8"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Prueba la diferencia 14 días gratis →</Link></div>
      </section>

      {/* 8. TESTIMONIOS */}
      <section className="py-12 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400">847</p><p className="text-sm text-zinc-400 mt-1">freelancers blindados</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400">124.000€</p><p className="text-sm text-zinc-400 mt-1">recuperados este mes</p></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"><p className="text-3xl font-bold text-emerald-400">94%</p><p className="text-sm text-zinc-400 mt-1">tasa de cobro <span className="text-[10px] text-zinc-500 block">del total de facturas gestionadas en CFG</span></p></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Lo que dicen los freelancers <span className="text-emerald-400">blindados</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {quote:"Tenía 2.400€ pendientes. A los 4 días de usar CashFlow Guardian, el cliente pagó. Sin llamadas, sin drama.",name:"María González",role:"Diseñadora de branding, Madrid",avatar:"MG",color:"bg-emerald-500/20 text-emerald-400"},
              {quote:"Rechacé un proyecto de 3.200€ gracias al PayScore. El cliente tenía 4 impagos anteriores.",name:"Carlos Ruiz",role:"Desarrollador web, Barcelona",avatar:"CR",color:"bg-blue-500/20 text-blue-400"},
              {quote:"Subí mis precios un 40% y cerré el mes sin perseguir a nadie. Por primera vez en 3 años.",name:"Ana López",role:"Consultora marketing, México DF",avatar:"AL",color:"bg-violet-500/20 text-violet-400"},
              {quote:"Rechacé a un cliente con PayScore BRONCE. Un compañero me dijo después que ese mismo cliente le debía 3.000€.",name:"Diego Martínez",role:"Fotógrafo freelance, Buenos Aires",avatar:"DM",color:"bg-amber-500/20 text-amber-400"},
              {quote:"Gracias al bloqueo por hitos, mi cliente pagó en 48h. Antes esperaba semanas.",name:"Lucía Fernández",role:"Traductora, Santiago de Chile",avatar:"LF",color:"bg-cyan-500/20 text-cyan-400"},
              {quote:"Al principio pensé que era una estafa porque prometía demasiado. A los 6 días tenía mi dinero. Ahora lo recomiendo.",name:"Javier Herrera",role:"Editor de vídeo, Lima",avatar:"JH",color:"bg-rose-500/20 text-rose-400"},
            ].map((t,i)=>(<div key={i} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left"><div className="absolute top-2 left-4 text-6xl text-emerald-500/15 font-serif leading-none select-none">"</div><p className="text-zinc-300 mb-4 italic relative z-10 pt-4">"{t.quote}"</p><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>{t.avatar}</div><div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-zinc-500">{t.role}</p></div></div></div>))}
          </div>
          <p className="text-xs text-zinc-500 mt-8">Recomendado en comunidades de +50.000 freelancers</p>
          <p className="text-xs text-zinc-600 mt-2">Primeros 847 miembros. ¿Quieres ser el siguiente? <Link href="/register" className="text-emerald-400 hover:underline">Únete gratis</Link></p>
        </div>
      </section>

      {/* 9. PRECIOS */}
      <section id="precios" className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Elige tu <span className="text-emerald-400">blindaje</span></h2>
          <p className="text-zinc-400 mb-4 text-lg">Todos los planes incluyen la <strong className="text-white">Garantía Anti-Impago</strong>.</p>
          <p className="text-sm text-emerald-400 mb-8 flex items-center justify-center gap-1">🛡️ Garantía de reembolso 30 días si no ves resultados</p>
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full p-1 mb-12">
            <button onClick={()=>setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle==='monthly'?'bg-white text-black':'text-zinc-400 hover:text-white'}`}>Mensual</button>
            <button onClick={()=>setBillingCycle('annual')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle==='annual'?'bg-white text-black':'text-zinc-400 hover:text-white'}`}>Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ahorra 2 meses</span></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Blindaje Inicial</h3><p className="text-xs text-zinc-500 mb-2">Para el freelancer que acaba de tener su primer impago y nunca más quiere vivir eso.</p>
              <p className="text-5xl font-bold mb-2 price-value">{prices.basic}€<span className="text-xl text-zinc-500">/mes</span></p><p className="text-xs text-zinc-500 mb-2">Empieza por 1€ tu primer mes</p>
              <ul className="text-left text-zinc-400 space-y-3 mb-10 flex-grow">
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Proyectos ilimitados</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Hitos y facturas</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Recordatorios automáticos</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> PayScore básico</li>
                <li className="flex items-start gap-2 relative group"><span className="text-zinc-700 mt-0.5">🔒</span><span className="text-zinc-600 cursor-help">CFO Cassandra</span><div className="absolute left-0 -top-8 bg-zinc-800 text-xs text-zinc-300 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Desbloquea con Pro →</div></li>
                <li className="flex items-start gap-2 relative group"><span className="text-zinc-700 mt-0.5">🔒</span><span className="text-zinc-600 cursor-help">LexGuard</span><div className="absolute left-0 -top-8 bg-zinc-800 text-xs text-zinc-300 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Desbloquea con Pro →</div></li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Activar mi Blindaje Inicial por 1€</Link>
            </div>
            <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 flex flex-col relative scale-105">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-sm font-bold px-5 py-1.5 rounded-full">Más popular</span>
              <h3 className="text-2xl font-bold mb-2">Blindaje Pro</h3><p className="text-xs text-zinc-500 mb-2">Para el freelancer que factura en serio y necesita que su negocio funcione solo.</p>
              <p className="text-5xl font-bold mb-2 price-value">{prices.pro}€<span className="text-xl text-zinc-500">/mes</span></p><p className="text-xs text-zinc-500 mb-2">Empieza por 1€ tu primer mes</p>
              <p className="text-xs text-emerald-400 mb-4">{proSubscribers} freelancers eligieron Pro esta semana</p>
              <ul className="text-left text-zinc-400 space-y-3 mb-10 flex-grow">
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Todo lo de Inicial</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> CFO Cassandra</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> PayScore completo</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> LexGuard</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Recordatorios avanzados</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Soporte prioritario</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Probar Pro 14 días por 1€</Link>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Blindaje Total</h3><p className="text-xs text-zinc-500 mb-2">Para el que quiere un equipo entero trabajando para que nunca pierda un euro.</p>
              <p className="text-5xl font-bold mb-2 price-value">{prices.total}€<span className="text-xl text-zinc-500">/mes</span></p><p className="text-xs text-zinc-500 mb-2">Menos del 1% de lo que protege</p>
              <ul className="text-left text-zinc-400 space-y-3 mb-10 flex-grow">
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Todo lo de Pro</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Abogado revisor de contratos en 24h</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> WhatsApp directo con tu gestor</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Setup completo por el equipo</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Alertas fiscales personalizadas</li><li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> Early access: contratos inteligentes</li>
              </ul>
              <Link href="/register" className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Activa tu blindaje total</Link>
              <p className="text-xs text-zinc-500 mt-2 text-center">Soporte inmediato · Respuesta en menos de 4h</p>
            </div>
          </div>
          <div className="mt-12 max-w-xl mx-auto text-left">
            <h4 className="text-lg font-semibold mb-4 text-center">Preguntas frecuentes sobre precios</h4>
            <div className="space-y-2">
              {[{ q: "¿Puedo cambiar de plan?", a: "Sí, el cambio es inmediato y se prorratea." },{ q: "¿Los precios incluyen IVA?", a: "No, IVA no incluido para clientes europeos." },{ q: "¿Qué pasa si cancelo?", a: "Puedes cancelar en cualquier momento. No hay permanencia." },{ q: "¿Vale la pena si solo tengo 1-2 clientes al mes?", a: "Especialmente entonces. Con pocos clientes, un impago puede ser el 50% de tu mes. CFG es el seguro más barato que existe para ese riesgo." }].map((item, i) => (<details key={i} open className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 group"><summary className="text-sm font-medium cursor-pointer list-none flex justify-between items-center">{item.q}<span className="text-zinc-500 group-open:rotate-45 transition-transform">+</span></summary><p className="text-sm text-zinc-400 mt-2">{item.a}</p></details>))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Lo que los freelancers nos preguntan <span className="text-emerald-400">antes de blindarse</span></h2>
        <div className="max-w-md mx-auto mb-8 relative">
          <input type="text" placeholder="¿Tienes una duda específica? Escríbela aquí →" value={faqSearch} onChange={e=>setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none transition-colors"/>
          {faqSuggestions.length > 0 && (<div className="absolute top-full left-0 right-0 bg-zinc-900 border border-zinc-800 rounded-xl mt-2 p-2 z-20 shadow-2xl">{faqSuggestions.map((s, i) => (<button key={i} onClick={() => setFaqSearch(s)} className="block w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">{s}</button>))}</div>)}
        </div>
        <div className="grid grid-cols-1 gap-4 items-start">
          {filteredFaq.map((item,i)=>(<details key={i} open={i===0} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 group"><summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{item.q}<span className="text-zinc-500 group-open:rotate-45 transition-transform text-xl">+</span></summary><p className="text-zinc-400 mt-4 text-sm leading-relaxed">{item.a}</p></details>))}
          {filteredFaq.length===0 && <p className="text-center text-zinc-500 py-8">No encontramos esa pregunta. <Link href="/support" className="text-emerald-400 hover:underline">Escríbenos</Link> y te respondemos.</p>}
        </div>
      </section>

      {/* 11. CTA FINAL */}
      <section className="py-16 px-4 bg-emerald-950/20 border-y border-emerald-900/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xl text-zinc-300">El 71% de freelancers sufre un impago este año. <strong className="text-white">Tú ya sabes de qué lado quieres estar.</strong></p>
          <h2 className="text-3xl md:text-5xl font-bold">¿Sigues sin blindarte?</h2>
          <p className="text-zinc-400 text-lg">14 días gratis. Sin tarjeta. Si no ves resultados en 30 días, te devolvemos el dinero. Sin preguntas.</p>
          <p className="text-sm text-amber-400 font-medium">El precio sube a 89€/mes el 1 de junio. Blíndate ahora.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Empieza ahora →</Link>
          <p className="text-sm text-zinc-500">Únete a 847 freelancers que ya duermen tranquilos.</p>
        </div>
      </section>

      {/* LEAD MAGNET + FOOTER */}
      <footer className="py-16 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12 text-center max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2">¿Te vas sin blindarte?</p>
            <p className="text-sm text-zinc-400 mb-4">Llévate la <strong className="text-emerald-400">Guía Anti-Impago gratis</strong> y descubre cómo dejar de perder dinero HOY.</p>
            {leadSubmitted ? (
              <p className="text-emerald-400 text-sm font-medium">✅ Guía enviada. Revisa tu bandeja de entrada.</p>
            ) : (
              <div className="flex gap-2 max-w-sm mx-auto">
                <input type="email" placeholder="Tu email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-white text-sm" />
                <button onClick={() => { if (leadEmail) { setLeadSubmitted(true); alert('📥 Guía enviada (simulación).'); } }} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-4 py-2 rounded-full transition-colors">Enviar</button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg></div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
              <p className="text-zinc-500 text-xs">Hecho por freelancers, para freelancers.</p>
              <p className="text-zinc-600 text-xs mt-1">Versión Mayo 2026</p>
              <div className="flex gap-3 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              </div>
            </div>
            <div><h4 className="font-semibold mb-3">Producto</h4><div className="space-y-2 text-zinc-500"><a href="#como-funciona" className="block hover:text-white transition-colors">Cómo funciona</a><a href="#garantia" className="block hover:text-white transition-colors">Garantía</a><a href="#precios" className="block hover:text-white transition-colors">Precios</a><Link href="/login" className="block hover:text-white transition-colors">Iniciar sesión</Link></div></div>
            <div><h4 className="font-semibold mb-3">Recursos</h4><div className="space-y-2 text-zinc-500"><Link href="/blog" className="block hover:text-white transition-colors">Blog</Link><Link href="/about" className="block hover:text-white transition-colors">Nuestra historia</Link></div></div>
            <div><h4 className="font-semibold mb-3">Legal</h4><div className="space-y-2 text-zinc-500"><Link href="/support" className="block hover:text-white transition-colors">Soporte</Link><Link href="/privacy" className="block hover:text-white transition-colors">Privacidad</Link><Link href="/terms" className="block hover:text-white transition-colors">Términos</Link></div></div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800/50 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600">
            <div className="flex items-center gap-4"><span>🔒 SSL</span><span>🇪🇺 RGPD</span><span>💳 Stripe</span></div>
            <div className="flex items-center gap-3"><span>Idioma:</span><button className="text-emerald-400 font-medium">ES</button><button className="hover:text-white transition-colors">MX</button><button className="hover:text-white transition-colors">EN</button></div>
          </div>
        </div>
      </footer>

      {/* Modal timeline */}
      {timelineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setTimelineModal(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-amber-400">📄 Carta legal LexGuard</h3><button onClick={() => setTimelineModal(null)} className="text-zinc-500 hover:text-white text-xl">&times;</button></div>
            <p className="text-xs text-zinc-400 mb-4">Así se ve la carta legal que recibe tu cliente. Personalizada con tu nombre, el suyo, y la jurisdicción de tu país.</p>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{`ASUNTO: RECLAMACIÓN EXTRAJUDICIAL DE DEUDA\n\nMuy Sr./Sra. [Nombre del Cliente]:\n\nPor medio de la presente, le requiero formalmente el pago de la factura #INV-001 emitida el [fecha] por un importe total de 500 €, la cual se encuentra impagada a fecha de hoy.\n\nLe concedemos un plazo improrrogable de SIETE DÍAS HÁBILES para proceder al pago. En caso contrario, nos reservamos el derecho de iniciar las acciones legales oportunas.\n\nPuede realizar el pago mediante los medios habituales o contactar con nosotros para resolver cualquier discrepancia.\n\nAtentamente,\n\n[Tu nombre]\n[Tu empresa]`}</div>
            <p className="text-xs text-zinc-500 mt-4">Esta carta se adapta automáticamente a la legislación de España, México, EE.UU. y 47 países más.</p>
          </div>
        </div>
      )}
    </div>
  )
}
