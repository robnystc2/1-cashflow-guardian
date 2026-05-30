'use client'
import { useState } from 'react'
export default function Afiliados() {
  const [referidos, setReferidos] = useState(10)
  const ganancia = referidos * 8.7 // 30% de 29€
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Programa de afiliados CFG</h1>
        <p className="text-zinc-300 mb-8">Gana un 30% de comisión recurrente por cada freelancer que traigas.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md mx-auto mb-8">
          <label className="text-sm text-zinc-300 block mb-2">¿Cuántos freelancers conoces?</label>
          <input type="range" min="1" max="100" value={referidos} onChange={e => setReferidos(Number(e.target.value))} className="w-full accent-emerald-500" />
          <span className="text-xs text-zinc-400">{referidos} referidos activos</span>
          <div className="mt-4 bg-zinc-800 rounded-xl p-4">
            <p className="text-3xl font-extrabold text-emerald-400">{ganancia.toFixed(0)}€/mes</p>
            <p className="text-xs text-zinc-400">comisión estimada</p>
          </div>
        </div>
        <a href="mailto:hola@cashflowguardian.com" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full">Solicitar acceso →</a>
      </div>
    </div>
  )
}