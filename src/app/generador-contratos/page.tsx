'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function GeneradorContratos() {
  const [nombre, setNombre] = useState('')
  const [cliente, setCliente] = useState('')
  const [proyecto, setProyecto] = useState('')
  const [importe, setImporte] = useState('')
  const [hitos, setHitos] = useState('')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Generador de <span className="text-emerald-400">contratos</span></h1>
        <p className="text-zinc-300 text-center mb-10">Rellena los campos y descarga tu contrato con hitos listo para firmar.</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
          <div><label className="text-sm text-zinc-400">Tu nombre o marca</label><input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Carlos Ruiz Diseño" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Nombre del cliente</label><input type="text" value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ej: Agencia XYZ" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Descripción del proyecto</label><input type="text" value={proyecto} onChange={e => setProyecto(e.target.value)} placeholder="Ej: Diseño de logo y branding" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Importe total (€)</label><input type="text" value={importe} onChange={e => setImporte(e.target.value)} placeholder="Ej: 1.500" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Hitos (separados por comas)</label><input type="text" value={hitos} onChange={e => setHitos(e.target.value)} placeholder="Ej: Boceto inicial, Entrega final" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Descargar contrato (PDF)</button>
          <p className="text-xs text-zinc-500 text-center">Al descargar, aceptas recibir tips de cobro por email.</p>
        </div>
        <div className="text-center mt-8">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Blindar mis proyectos con CFG <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  )
}
