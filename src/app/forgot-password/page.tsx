'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-emerald-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold">Recupera tu acceso</h1>
          <p className="text-zinc-400 mt-2">Te enviaremos un enlace para restablecer tu contraseña.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h2 className="text-xl font-semibold">Email enviado</h2>
              <p className="text-zinc-400 text-sm">
                Revisa tu bandeja de entrada ({email}). Si no lo encuentras, mira en spam.
              </p>
              <Button variant="outline" className="border-zinc-700" onClick={() => setSent(false)}>
                Reenviar email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 flex items-start gap-2 text-sm text-red-400">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <Label htmlFor="email">Correo ejecutivo</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-zinc-950 border-zinc-700 text-white mt-1" 
                  placeholder="tu@email.com" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Enviar enlace de recuperación
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-zinc-500">
          <Link href="/login" className="text-emerald-400 hover:underline">
            ← Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
