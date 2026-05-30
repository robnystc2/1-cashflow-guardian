'use client'
import { useState } from 'react'
export default function CheckCliente() {
  const [email, setEmail] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const verificar = () => {
    if (email.includes('@')) setResultado('Cliente verificado: PayScore ORO')
    else setResultado('Formato de email inválido')
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Verifica un cliente antes de aceptar</h1>
        <p className="text-zinc-300 mb-8">Introduce el email de tu cliente potencial y descubre su PayScore.</p>
        <div className="max-w-md mx-auto">
          <input type="email" placeholder="cliente@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white mb-4" />
          <button onClick={verificar} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Verificar</button>
          {resultado && <div className="mt-4 p-4 bg-zinc-900 border border-zinc-700 rounded-xl"><p className="text-emerald-400 font-bold">{resultado}</p></div>}
        </div>
      </div>
    </div>
  )
}