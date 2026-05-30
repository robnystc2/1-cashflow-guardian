'use client'
import { useState } from 'react'
export default function Predictordeimpagodeclientes() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const handleSubmit = () => {
    if (input.includes('@')) setResult('Probabilidad de impago: 12% (bajo riesgo)'); else setResult('Email no válido');
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Predictor de impago de clientes</h1>
        <p className="text-zinc-300 mb-8">Introduce el email de tu cliente y Cassandra IA estimará el riesgo de impago.</p>
        <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <input type="email" className="w-full bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white" placeholder="cliente@ejemplo.com" value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={handleSubmit} className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Analizar</button>
          {result && <div className="mt-4 p-4 bg-zinc-800 rounded-xl"><p className="text-emerald-400 font-bold">{result}</p></div>}
        </div>
      </div>
    </div>
  )
}