'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Loader2, FileText, Copy, Check, X } from 'lucide-react'

export default function LegalActionButton({ invoiceId }: { invoiceId: string }) {
  const [loading, setLoading] = useState(false)
  const [document, setDocument] = useState<string | null>(null)
  const [subject, setSubject] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/lexguard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId })
      })
      const data = await res.json()
      if (data.success) {
        setDocument(data.document)
        setSubject(data.subject)
      } else {
        setError(data.error || 'Error desconocido')
      }
    } catch (err) {
      setError('Error de conexión')
    }
    setLoading(false)
  }

  const handleCopy = () => {
    if (document) {
      navigator.clipboard.writeText(document)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-2">
      {!document ? (
        <Button
          variant="outline"
          size="sm"
          className="border-amber-600/50 text-amber-400 hover:bg-amber-950 hover:text-amber-300 hover:border-amber-500 transition-all"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <ShieldCheck className="w-4 h-4 mr-1" />}
          Activar LexGuard
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5" /> Documento LexGuard
              </h3>
              <button onClick={() => setDocument(null)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-zinc-400 mb-2">Asunto: {subject}</p>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-serif text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
              {document}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="border-zinc-700" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 mr-1 text-emerald-400" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">
                Enviar por email
              </Button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
