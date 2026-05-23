'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const respuestas: Record<string, string> = {
  'hola|buenas|hey': '¡Hola! Soy Cassandra, la IA de CFG. ¿En qué puedo ayudarte? Si tienes alguna factura sin cobrar, este es el mejor sitio para empezar.',
  'que es cfg|como funciona': 'CFG es el sistema que protege tus proyectos como freelancer. Divides tu trabajo en hitos, y si el cliente no paga, bloqueamos la siguiente entrega. Así de simple y efectivo.',
  'precio|cuanto cuesta|plan': 'CFG Pro cuesta 29€/mes. También tenemos un plan Starter (9€/mes) y Élite (79€/mes). Si quieres proteger un solo proyecto, puedes hacerlo desde 19€.',
  'garantia|seguro|confianza': 'Si sigues nuestro proceso y no cobras en 14 días, te devolvemos 3 meses de suscripción. El 94% de los casos se resuelven antes de activarla.',
  'pais|internacional|ley': 'CFG funciona en más de 47 países, adaptando su Escudo Legal a la legislación de cada uno: España, México, Argentina, Colombia, Chile... ¡y muchos más!',
  'contrato|legal|firma': 'CFG genera un contrato digital con hitos. El cliente lo recibe y puede firmarlo electrónicamente. Tiene validez legal y te protege desde el primer minuto.',
  'impago|no me pagan|cliente moroso': 'Es el pan de cada día, pero no tiene por qué serlo. Con CFG, el bloqueo de hitos y los recordatorios automáticos hacen que el cliente pague antes de que tú tengas que decir nada.',
  'registro|empezar|probar': 'Puedes empezar gratis en 3 minutos. No necesitas tarjeta. Solo entra en /register y sigue los pasos. Tu primer proyecto blindado te espera.',
  'default': 'Entiendo tu pregunta, pero necesito más detalles. Cuéntame un poco más y te daré la mejor respuesta. Si quieres, puedo guiarte para que empieces a proteger tus proyectos ahora mismo.',
}

const getRandomResponse = (key: string) => {
  const match = Object.keys(respuestas).find(k => key.match(new RegExp(k, 'i')))
  return match ? respuestas[match] : respuestas['default']
}

export default function CassandraChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ text: '¡Hola! Soy Cassandra, tu asistente virtual. Pregúntame sobre protección anti-impago, precios o cómo funciona CFG.', isUser: false }])
    }
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [open, messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { text: userMsg, isUser: true }])
    setInput('')
    const respuesta = getRandomResponse(userMsg)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: respuesta, isUser: false }])
    }, 700)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 scale-75 md:scale-100">
      {!open && (
        <button onClick={() => setOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2 animate-pulse">
          <span>💬</span>
          <span className="hidden md:inline text-sm">¿Alguna vez un cliente te dejó sin pagar?</span>
        </button>
      )}
      {open && (
        <div className="bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl w-80 md:w-96">
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-bold">C</div>
              <span className="text-sm font-semibold text-emerald-400">Cassandra</span>
              <span className="text-[10px] text-zinc-500">IA</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">&times;</button>
          </div>
          <div ref={chatRef} className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2 rounded-xl text-xs ${msg.isUser ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-300'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Escribe tu pregunta..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-emerald-500" />
            <button onClick={handleSend} className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-2 rounded-full transition-all text-xs font-semibold">Enviar</button>
          </div>
          <div className="p-3 border-t border-zinc-800 text-center">
            <Link href="/register" className="text-xs text-emerald-400 hover:text-emerald-300">Protege tu primer proyecto en 3 minutos →</Link>
          </div>
        </div>
      )}
    </div>
  )
}
