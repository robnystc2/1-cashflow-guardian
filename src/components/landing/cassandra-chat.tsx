'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function CassandraChat() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!open && (
        <button onClick={() => setOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center gap-2">
          <span>💬</span>
          <span className="hidden md:inline text-sm">¿Tienes facturas pendientes?</span>
        </button>
      )}
      {open && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-4 w-72">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-emerald-400">Cassandra</span>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">&times;</button>
          </div>
          <p className="text-xs text-zinc-300 mb-3">Hola, soy Cassandra. ¿Tienes alguna factura sin cobrar ahora mismo?</p>
          <div className="flex gap-2 mb-2">
            <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs px-3 py-1.5 rounded-full transition-all">Sí, necesito cobrar</Link>
            <Link href="/register" className="border border-zinc-600 text-zinc-300 text-xs px-3 py-1.5 rounded-full hover:border-zinc-400 transition-all">Quiero prevenir</Link>
          </div>
        </div>
      )}
    </div>
  )
}
