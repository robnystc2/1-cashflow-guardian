'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Simulacion() {
  const [cliente, setCliente] = useState('')
  const [hitos, setHitos] = useState('')
  const [simulado, setSimulado] = useState(false)

  const handleSimular = () => {
    if (cliente && hitos) {
      setSimulado(true)
      setTimeout(() => setSimulado(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Simula tu primer proyecto</h1>
        <p className="text-zinc-300 mb-8">En 60 segundos verás cómo CFG protege un proyecto de 1.500€.</p>
        {!simulado ? (
          <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 space-y-4 text-left">
            <div><label className="text-sm text-zinc-400">Nombre del cliente</label><input type="text" value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ej: Agencia XYZ" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
            <div><label className="text-sm text-zinc-400">Hitos (separados por comas)</label><input type="text" value={hitos} onChange={e => setHitos(e.target.value)} placeholder="Ej: Boceto, Diseño final" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
            <button onClick={handleSimular} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Simular blindaje →</button>
          </div>
        ) : (
          <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 text-center animate-pulse">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">¡Blindaje activado!</h3>
            <p className="text-zinc-300">Tu proyecto de {cliente} con {hitos} está protegido. CFG monitorizará los pagos.</p>
          </div>
        )}
      </div>
    </div>
  )
}
