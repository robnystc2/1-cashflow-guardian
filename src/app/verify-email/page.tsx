'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false)
  const [resent, setResent] = useState(false)
  const supabase = createClient()

  const handleResend = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      await supabase.auth.resend({ type: 'signup', email: user.email })
    }
    setResent(true)
    setLoading(false)
    setTimeout(() => setResent(false), 30000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold">Revisa tu bandeja de entrada</h1>
        <p className="text-zinc-400">
          Te hemos enviado un email de verificación. Haz clic en el enlace para activar tu cuenta.
        </p>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="border-zinc-700" 
            onClick={handleResend} 
            disabled={loading || resent}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2 w-4 h-4" />}
            {resent ? 'Email reenviado. Espera 30s.' : 'Reenviar email'}
          </Button>
          <p className="text-xs text-zinc-500">
            <Link href="/login" className="text-emerald-400 hover:underline">
              ¿Ya verificaste? Inicia sesión →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
