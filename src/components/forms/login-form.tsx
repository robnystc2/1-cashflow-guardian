'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, XCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    if (!email.trim() || !password.trim()) { setError('Por favor, completa todos los campos'); setLoading(false); return }
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) { setError(loginError.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos. Inténtalo de nuevo.' : loginError.message); setLoading(false); return }
    setSuccess(true)
    setTimeout(() => router.push('/overview'), 600)
    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="email">Tu email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-zinc-950 border-zinc-700 text-white mt-1" placeholder="tu@email.com" required autoComplete="email" />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña de acceso</Label>
          <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">¿Olvidaste tu contraseña? →</Link>
        </div>
        <div className="relative">
          <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="bg-zinc-950 border-zinc-700 text-white mt-1 pr-10" placeholder="••••••••" required autoComplete="current-password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 accent-emerald-500" />
        <Label htmlFor="rememberMe" className="text-xs text-zinc-400 cursor-pointer">Recordar sesión</Label>
      </div>

      <div className="min-h-[2.5rem]">
        {error && (<div className="bg-red-900/20 border-l-4 border-red-500 rounded-lg p-3 flex items-start gap-2 text-sm text-red-400"><XCircle className="w-4 h-4 mt-0.5 shrink-0"/><span>{error}</span></div>)}
        {success && (<div className="bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-400"><CheckCircle className="w-4 h-4"/><span>Acceso concedido. Redirigiendo...</span></div>)}
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" disabled={loading || success}>
        {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4"/>Accediendo...</span> : success ? 'Acceso concedido' : 'Entrar a mi blindaje →'}
      </Button>

      <p className="text-xs text-zinc-500 text-center">🔒 Conexión cifrada con SSL · Tus datos están seguros</p>
      <p className="text-center text-xs text-zinc-600">
        <Link href="/support" className="hover:text-zinc-400 transition-colors">¿Problemas para entrar? Escríbenos →</Link>
      </p>
    </form>
  )
}
