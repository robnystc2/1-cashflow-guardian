'use client'
import { useState } from 'react'
export default function Comunidad() {
  const [busqueda, setBusqueda] = useState('')
  const miembros = [
    { nombre: 'Carlos Ruiz', profesion: 'Diseñador', pais: 'España', proyectos: 12, tasa: '100%' },
    { nombre: 'Ana López', profesion: 'Consultora', pais: 'México', proyectos: 8, tasa: '95%' },
    { nombre: 'Lucía Fernández', profesion: 'Traductora', pais: 'Chile', proyectos: 5, tasa: '90%' },
  ]
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Comunidad Blindada</h1>
        <p className="text-zinc-300 mb-8">Directorio de freelancers verificados que usan CFG.</p>
        <input type="text" placeholder="Buscar por nombre o profesión..." className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white mb-6" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {miembros.filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()) || m.profesion.toLowerCase().includes(busqueda.toLowerCase())).map((m, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
              <h3 className="font-bold">{m.nombre}</h3>
              <p className="text-sm text-zinc-400">{m.profesion} · {m.pais}</p>
              <p className="text-xs text-zinc-400 mt-1">Proyectos blindados: {m.proyectos} · Tasa de cobro: {m.tasa}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}