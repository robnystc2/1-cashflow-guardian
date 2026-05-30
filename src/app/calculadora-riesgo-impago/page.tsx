'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function CalculadoraRiesgo() {
  const [facturacion, setFacturacion] = useState(2000)
  const [clientes, setClientes] = useState(3)
  const [tardanza, setTardanza] = useState(30)
  const [sector, setSector] = useState('Diseño')
  const [impago, setImpago] = useState(1)

  const perdida = Math.round(facturacion * 12 * (tardanza / 100) * (impago === 1 ? 1.4 : 1))
  const coste = 29 * 12
  const multiplicador = perdida > 0 ? (perdida / coste).toFixed(1) : '0'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Calcula cuánto estás <span className="text-red-400">perdiendo</span> en impagos</h1>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8 max-w-xl mx-auto">
          <div className="space-y-6 mb-6">
            <div><label className="text-sm text-zinc-300 block mb-2">Facturación mensual (€)</label><input type="range" min="300" max="10000" step="100" value={facturacion} onChange={e => setFacturacion(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-xs text-zinc-400">{facturacion.toLocaleString('es-ES')}€</span></div>
            <div><label className="text-sm text-zinc-300 block mb-2">Clientes nuevos al mes</label><input type="range" min="1" max="20" value={clientes} onChange={e => setClientes(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-xs text-zinc-400">{clientes}</span></div>
            <div><label className="text-sm text-zinc-300 block mb-2">% clientes que pagan tarde</label><input type="range" min="10" max="80" step="5" value={tardanza} onChange={e => setTardanza(Number(e.target.value))} className="w-full accent-emerald-500" /><span className="text-xs text-zinc-400">{tardanza}%</span></div>
            <div><label className="text-sm text-zinc-300 block mb-2">Sector</label><select value={sector} onChange={e => setSector(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700/50 rounded-full px-4 py-2 text-sm text-white"><option>Diseño</option><option>Desarrollo</option><option>Marketing</option><option>Consultoría</option><option>Otro</option></select></div>
            <div><label className="text-sm text-zinc-300 block mb-2">¿Has tenido impagos en 12 meses?</label><div className="flex gap-2 mt-2"><button onClick={() => setImpago(1)} className={`px-4 py-2 rounded-full text-sm font-medium ${impago===1?'bg-red-900/30 border-red-700 text-red-300':'bg-zinc-800 border-zinc-700/50 text-zinc-400'}`}>Sí</button><button onClick={() => setImpago(0)} className={`px-4 py-2 rounded-full text-sm font-medium ${impago===0?'bg-teal-900/30 border-teal-700 text-teal-300':'bg-zinc-800 border-zinc-700/50 text-zinc-400'}`}>No</button></div></div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 text-center">
            <p className="text-zinc-300 text-sm mb-2">Este año, sin blindaje, perderás</p>
            <p className="text-7xl font-extrabold text-red-400">{new Intl.NumberFormat('es-ES').format(perdida)}€</p>
            <p className="text-zinc-300 text-sm mt-1">en impagos</p>
            <p className="text-sm text-emerald-400 mt-3 font-medium">Con CFG Blindaje Pro (29€/mes), proteges {new Intl.NumberFormat('es-ES').format(perdida)}€ por solo 348€/año. → <strong className="text-2xl text-white">{multiplicador}x tu inversión</strong></p>
          </div>
          <div className="mt-6">
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all w-full justify-center">🔒 Blindar mis {new Intl.NumberFormat('es-ES').format(perdida)}€ por 1€ →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}