'use client'
import { useState } from 'react'
export default function Badge() {
  const [copiado, setCopiado] = useState(false)
  const codigo = '<a href="https://cashflowguardian.com" target="_blank"><img src="https://cashflowguardian.com/badge-cfg.png" alt="Protegido por CFG" /></a>'
  const copiar = () => { navigator.clipboard.writeText(codigo); setCopiado(true); setTimeout(() => setCopiado(false), 2000) }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Badge CFG</h1>
        <p className="text-zinc-300 mb-4">Muestra en tu web que tus proyectos están blindados.</p>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-lg mx-auto">
          <pre className="text-xs text-zinc-400 overflow-x-auto p-4 bg-black rounded">{codigo}</pre>
          <button onClick={copiar} className="mt-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-full">{copiado ? '✓ Copiado!' : '📋 Copiar código'}</button>
        </div>
      </div>
    </div>
  )
}