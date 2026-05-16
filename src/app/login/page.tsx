import type { Metadata } from 'next'
import { LoginForm } from '@/components/forms/login-form'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Iniciar sesión — CashFlow Guardian',
  description: 'Tu imperio te espera. Accede a tu panel de blindaje y sigue protegiendo tus proyectos.',
  robots: 'noindex',
}

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Panel izquierdo: formulario */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <Link href="/" className="absolute top-6 left-6 text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-1">← Volver</Link>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-emerald-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Tu imperio te espera</h1>
          </div>

          {/* Google OAuth DOBLE de prominente */}
          <div className="space-y-3">
            <form action="/auth/google" method="POST">
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black font-semibold py-4 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/10 text-base">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </button>
            </form>
            <form action="/auth/apple" method="POST">
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white font-medium py-3 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 border border-zinc-700 shadow-lg shadow-white/5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Continuar con Apple
              </button>
            </form>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-[10px] text-zinc-600">o con tu email</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <LoginForm />
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-center text-sm text-zinc-500">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-emerald-400 hover:underline font-medium">Regístrate gratis</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho: métricas consistentes + actividad */}
      <div className="hidden lg:flex w-[480px] bg-zinc-900/50 border-l border-zinc-800 flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
        <div className="relative z-10 space-y-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center text-black font-bold text-xl shadow-2xl shadow-emerald-500/20 mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
          </div>
          <h2 className="text-2xl font-bold">Tus proyectos te están esperando blindados</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <div className="flex items-center gap-3 justify-center"><span className="w-2 h-2 bg-emerald-400 rounded-full"/>847 freelancers blindados</div>
            <div className="flex items-center gap-3 justify-center"><span className="w-2 h-2 bg-emerald-400 rounded-full"/>124.000€ recuperados este mes</div>
            <div className="flex items-center gap-3 justify-center"><span className="w-2 h-2 bg-emerald-400 rounded-full"/>94% tasa de cobro</div>
          </div>
          {user && (
            <p className="text-xs text-zinc-500">Ya has iniciado sesión. <Link href="/overview" className="text-emerald-400 hover:underline">Ir al panel →</Link></p>
          )}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-left mt-6">
            <p className="text-xs text-emerald-400 font-medium mb-1">📊 Actividad reciente</p>
            <p className="text-xs text-zinc-400">Esta semana, 23 freelancers activaron LexGuard. 3 nuevos proyectos blindados. El sistema sigue protegiendo tus ingresos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
