'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle, XCircle, Check, Eye, EyeOff } from 'lucide-react'

export function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [country, setCountry] = useState('')
  const [freelancerType, setFreelancerType] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [nameError, setNameError] = useState('')
  const [nameValid, setNameValid] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const referralCode = searchParams.get('ref')
  const supabase = createClient()
  const nameRef = useRef<HTMLInputElement>(null)

  const passwordChecks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }
  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean)
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordsDontMatch = confirmPassword.length > 0 && password !== confirmPassword

  // Autofocus en nombre
  useEffect(() => { nameRef.current?.focus() }, [])

  // Validar email en tiempo real
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailValid(email.length > 0 && emailRegex.test(email))
  }, [email])

  // Tracking de abandono por campo (Google Analytics)
  const trackFieldAbandon = (fieldName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'register_field_blur', { field: fieldName })
    }
  }

  // Autodetección de país
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryMap: Record<string, string> = { 'ES': 'ES', 'MX': 'MX', 'AR': 'AR', 'CO': 'CO', 'US': 'US' }
        setCountry(countryMap[data.country_code] || 'ES')
      })
      .catch(() => setCountry('ES'))
  }, [])

  // Exit intent en formulario
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup && (fullName || email || password)) {
        setShowExitPopup(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitPopup, fullName, email, password])

  const validateName = (name: string) => {
    if (name.trim().length < 3) { setNameError('Introduce tu nombre y apellido completos'); setNameValid(false); return false }
    const words = name.trim().split(/\s+/)
    if (words.length < 2) { setNameError('Introduce al menos nombre y apellido'); setNameValid(false); return false }
    if (words.some(w => w.length < 2)) { setNameError('Cada palabra debe tener al menos 2 caracteres'); setNameValid(false); return false }
    setNameError(''); setNameValid(true); return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    if (!validateName(fullName)) { setLoading(false); return }
    if (!allPasswordChecksPassed) { setError('La contraseña debe tener al menos 6 caracteres, una mayúscula y un número'); setLoading(false); return }
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); setLoading(false); return }

    const { data: { user }, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, freelancer_type: freelancerType, country } } })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (!user) { setError('Error al crear la cuenta. Inténtalo de nuevo.'); setLoading(false); return }

    const trialEnd = new Date(); trialEnd.setDate(trialEnd.getDate() + 14)
    await supabase.from('profiles').upsert({ id: user.id, trial_ends_at: trialEnd.toISOString(), plan: 'trial', full_name: fullName, jurisdiction: country })
    if (referralCode) {
      const { data: referrer } = await supabase.from('profiles').select('id').eq('referral_code', referralCode).single()
      if (referrer) await supabase.from('referrals').insert({ referrer_id: referrer.id, referred_email: email, referral_code: referralCode, converted: true })
    }
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) { setError('Cuenta creada, pero no pudimos iniciar sesión. Ve a /login.'); setLoading(false); return }
    setSuccess(true)
    setTimeout(() => router.push('/onboarding'), 800)
    setLoading(false)
  }

  const freelancerTypes = [
    { id: 'designer', label: 'Diseñador', icon: '🎨' },
    { id: 'developer', label: 'Desarrollador', icon: '💻' },
    { id: 'consultant', label: 'Consultor', icon: '📊' },
    { id: 'photographer', label: 'Fotógrafo', icon: '📸' },
    { id: 'copywriter', label: 'Copywriter', icon: '✍️' },
    { id: 'translator', label: 'Traductor', icon: '🌍' },
    { id: 'ads', label: 'Gestor de Ads', icon: '📈' },
    { id: 'virtual', label: 'Asistente Virtual', icon: '💼' },
    { id: 'video', label: 'Editor de vídeo', icon: '🎥' },
    { id: 'architect', label: 'Arquitecto', icon: '🏛️' },
    { id: 'musician', label: 'Músico/Productor', icon: '🎵' },
    { id: 'other', label: 'Otro', icon: '🌟' },
  ]

  return (
    <form onSubmit={handleRegister} className="space-y-3">
      {/* Exit intent popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6 text-center" onClick={e => e.stopPropagation()}>
            <p className="text-lg font-semibold mb-2">¿Te vas?</p>
            <p className="text-sm text-zinc-400 mb-4">Tu cuenta estará lista en 60 segundos. Si tienes alguna duda, escríbenos.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowExitPopup(false)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-full text-sm">Continuar registro</button>
              <Link href="/support" className="bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold px-4 py-2 rounded-full text-sm">Escribir soporte</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mensajes de error/éxito */}
      <div className="min-h-[2.5rem]">
        {error && (<div className="bg-red-900/20 border-l-4 border-red-500 rounded-lg p-3 flex items-start gap-2 text-sm text-red-400"><XCircle className="w-4 h-4 mt-0.5 shrink-0"/><span>{error}</span></div>)}
        {success && (<div className="bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-400"><CheckCircle className="w-4 h-4"/><span>¡Cuenta creada! Redirigiendo a tu onboarding...</span></div>)}
      </div>

      <div>
        <Label htmlFor="fullName">Nombre completo</Label>
        <div className="relative">
          <Input id="fullName" ref={nameRef} type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); if (nameError) validateName(e.target.value) }} onBlur={() => { validateName(fullName); trackFieldAbandon('fullName') }} className={`bg-zinc-950 border text-white mt-1 pr-8 ${nameError ? 'border-red-800' : nameValid ? 'border-emerald-800' : 'border-zinc-700'}`} placeholder="María Gómez" required autoComplete="name" />
          {nameValid && <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2" />}
        </div>
        {nameError && <p className="text-xs text-amber-400 mt-1">{nameError}</p>}
      </div>

      <div>
        <Label htmlFor="email">Tu email</Label>
        <div className="relative">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => trackFieldAbandon('email')} className={`bg-zinc-950 border text-white mt-1 pr-8 ${email.length > 0 ? (emailValid ? 'border-emerald-800' : 'border-amber-800') : 'border-zinc-700'}`} placeholder="tu@email.com" required autoComplete="email" />
          {email.length > 0 && emailValid && <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2" />}
        </div>
      </div>

      <div>
        <Label htmlFor="country">País</Label>
        <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-2 mt-1 text-sm">
          <option value="">Selecciona tu país</option>
          <option value="ES">España</option><option value="MX">México</option><option value="AR">Argentina</option><option value="CO">Colombia</option><option value="US">Estados Unidos</option><option value="OTHER">Otro</option>
        </select>
      </div>

      <div>
        <Label>¿A qué te dedicas?</Label>
        <div className="grid grid-cols-4 gap-1.5 mt-1">
          {freelancerTypes.map(type => (
            <button key={type.id} type="button" onClick={() => setFreelancerType(type.id)} className={`relative p-1.5 rounded-lg text-[10px] font-medium transition-all border ${freelancerType === type.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>
              {freelancerType === type.id && <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center"><Check className="w-2 h-2 text-black"/></span>}
              <span className="block text-sm mb-0.5">{type.icon}</span>{type.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="password">Contraseña de acceso</Label>
        <div className="relative">
          <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => trackFieldAbandon('password')} className="bg-zinc-950 border-zinc-700 text-white mt-1 pr-10" placeholder="Mínimo 6 caracteres, 1 mayúscula, 1 número" required autoComplete="new-password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {password.length > 0 && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-1">
              {[1,2,3].map(i => {
                const strength = Object.values(passwordChecks).filter(Boolean).length
                return <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${strength >= i ? (strength === 3 ? 'bg-emerald-500' : strength === 2 ? 'bg-amber-500' : 'bg-red-500') : 'bg-zinc-800'}`} />
              })}
            </div>
            <div className="flex gap-3 text-[10px]">
              <span className={passwordChecks.length ? 'text-emerald-400' : 'text-zinc-600'}>✅ 6+ caracteres</span>
              <span className={passwordChecks.uppercase ? 'text-emerald-400' : 'text-zinc-600'}>✅ 1 mayúscula</span>
              <span className={passwordChecks.number ? 'text-emerald-400' : 'text-zinc-600'}>✅ 1 número</span>
            </div>
            {allPasswordChecksPassed && <p className="text-xs text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3"/> Contraseña segura</p>}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirma tu contraseña</Label>
        <div className="relative">
          <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`bg-zinc-950 border text-white mt-1 pr-10 ${passwordsDontMatch ? 'border-red-800' : passwordsMatch ? 'border-emerald-800' : 'border-zinc-700'}`} placeholder="Repite tu contraseña" required autoComplete="new-password" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {passwordsMatch && <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><Check className="w-3 h-3"/> Las contraseñas coinciden</p>}
        {passwordsDontMatch && <p className="text-xs text-red-400 mt-1">Las contraseñas no coinciden</p>}
      </div>

      {referralCode && <p className="text-xs text-emerald-400">Código de referido aplicado: {referralCode}</p>}

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300" disabled={loading || success}>
        {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4"/>Creando cuenta...</span> : success ? '¡Cuenta creada!' : 'Blindar mi primer proyecto gratis →'}
      </Button>

      <p className="text-xs text-zinc-500 text-center">14 días de prueba Pro · Sin tarjeta · Sin compromiso</p>
      <p className="text-xs text-zinc-600 text-center">Acceso inmediato · Sin verificación de email · Empieza en 60 segundos</p>
    </form>
  )
}
