'use client'
import { useState } from 'react'

export default function CalculadoraInline() {
  const [valorProyecto, setValorProyecto] = useState(1000)
  const coste = Math.max(19, Math.round(valorProyecto * 0.015))

  return (
    <div className="mt-4 p-4 bg-zinc-800 rounded-xl text-sm">
      <label className="text-zinc-400 block mb-2">¿De cuánto es tu proyecto?</label>
      <input
        type="range"
        min="100"
        max="10000"
        step="100"
        value={valorProyecto}
        onChange={(e) => setValorProyecto(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>{valorProyecto}€</span>
        <span>Coste: {coste}€</span>
      </div>
    </div>
  )
}
