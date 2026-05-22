import Link from 'next/link'
import { useState } from 'react'

export default function NavDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="hover:text-white transition-colors cursor-pointer">Herramientas</span>
      {open && (
        <div className="absolute top-full left-0 bg-zinc-900 border border-zinc-700 rounded-xl p-2 mt-2 shadow-2xl z-50 min-w-[200px]">
          <Link href="/#calculadora" className="block px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg">Calculadora de riesgo</Link>
          <Link href="/herramientas" className="block px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg">Contrato descargable</Link>
          <Link href="/herramientas" className="block px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg">Calculadora de tarifa</Link>
        </div>
      )}
    </div>
  )
}
