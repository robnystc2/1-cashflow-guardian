'use client'
import { useState } from 'react'
import Link from 'next/link'

const preguntasFrecuentes: Record<string, string> = {
  'impago': 'El 71% de los freelancers sufre impagos. CFG te protege bloqueando la siguiente entrega hasta que el cliente pague.',
  'precio': 'CFG Pro cuesta 29€/mes. También tenemos un plan Starter por 9€/mes y uno Élite por 79€/mes. ¿Quieres ver los detalles?',
  'garantía': 'Si no cobras en 14 días, te devolvemos 3 meses de suscripción. Solo el 6% de los casos la necesita.',
  'contrato': 'CFG genera un contrato digital con hitos. El cliente lo firma y queda legalmente obligado.',
  'país': 'CFG funciona en más de 47 países, incluyendo España, México, Argentina, Colombia y Chile.',
}

export default function CassandraChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { text: userMsg, isUser: true }])
    setInput('')

    // Buscar respuesta automática
    let respuesta = 'Soy Cassandra, tu asistente virtual. Pregúntame sobre protección anti-impago, precios o cómo funciona CFG.'
    for (const [clave, valor] of Object.entries(preguntasFrecuentes)) {
      if (userMsg.toLowerCase().includes(clave)) {
        respuesta = valor
        break
      }
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { text: respuesta, isUser: false }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 scale-75 md:scale-100">
      {!open && (
        <button onClick={() => setOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2">
          <span>💬</span>
          <span className="hidden md:inline text-sm">¿Alguna vez un cliente te dejó sin pagar?</span>
        </button>
      )}
      {open && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-80 md:w-96">
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <span className="text-sm font-semibold text-emerald-400">Cassandra IA</span>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">&times;</button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-xs text-zinc-400 text-center mt-8">
                Pregúntame lo que quieras sobre CFG. Por ejemplo: ¿cómo me protege del impago?
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-xl text-xs ${msg.isUser ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-300'}`}>
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
            <Link href="/register" className="text-xs text-emerald-400 hover:text-emerald-300">¿Quieres blindar tus proyectos? Empieza aquí →</Link>
          </div>
        </div>
      )}
    </div>
  )
}
