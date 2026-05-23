import Link from 'next/link'
export default function CalculadoraRiesgo() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Calculadora de <span className="text-emerald-400">Riesgo de Impago</span></h1>
        <p className="text-zinc-300 mb-8">Calcula cuánto podrías perder este año por impagos y cómo CFG puede protegerte.</p>
        <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-8">
          <p className="text-sm text-zinc-400 mb-4">Próximamente: herramienta interactiva.</p>
        </div>
      </div>
    </div>
  )
}
