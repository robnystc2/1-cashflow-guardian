'use client'
import { useState, useEffect } from 'react'

const messages = [
  { emoji: '⚠️', title: 'Cliente en riesgo', desc: 'El sistema detecta una factura sin pagar.' },
  { emoji: '🛡️', title: 'CFG activa protocolo', desc: 'Se envía el recordatorio y se bloquea el siguiente hito.' },
  { emoji: '✅', title: 'Cobrado', desc: 'El cliente paga. El 94% de los casos se resuelven aquí.' },
]

export default function HeroAnimation() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const current = messages[index]

  return (
    <div className="flex items-center gap-3 bg-zinc-900 border-l-2 border-emerald-500 p-3 rounded-xl transition-all duration-500">
      <span className="text-lg">{current.emoji}</span>
      <div>
        <p className="text-zinc-400 text-[10px]">{current.title}</p>
        <p className="text-emerald-400 font-bold text-sm">{current.desc}</p>
      </div>
    </div>
  )
}
