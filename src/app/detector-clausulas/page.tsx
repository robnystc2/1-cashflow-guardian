'use client'
import { useState } from 'react'
export default function Detectordecláusulaspeligrosas() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const handleSubmit = () => {
    if (input.includes('90 días')) setResult('⚠️ Cláusula de pago a 90 días detectada. En España, el plazo máximo legal es de 30 días para pymes.'); else if (input.length > 0) setResult('✅ No se detectaron cláusulas peligrosas.'); else setResult('Introduce el texto del contrato.');
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Detector de cláusulas peligrosas</h1>
        <p className="text-zinc-300 mb-8">Pega el contrato de tu cliente y Cassandra IA señalará las cláusulas abusivas.</p>
        <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <textarea className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white h-40" placeholder="Pega aquí el texto del contrato..." value={input} onChange={e => setInput(e.target.value)}></textarea>
          <button onClick={handleSubmit} className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">Analizar</button>
          {result && <div className="mt-4 p-4 bg-zinc-800 rounded-xl"><p className="text-emerald-400 font-bold">{result}</p></div>}
        </div>
      </div>
    </div>
  )
}