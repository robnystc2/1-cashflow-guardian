import type { Metadata } from 'next'
import { RegisterForm } from '@/components/forms/register-form'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Crear cuenta — CashFlow Guardian',
  description: 'Estás a 60 segundos de nunca más perseguir a un cliente. Crea tu cuenta gratis y blinda tu primer proyecto.',
  robots: 'noindex',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Panel izquierdo: formulario */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <Link href="/" className="absolute top-6 left-6 text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-1">
          ← Volver
        </Link>

        <div className="w-full max-w-md space-y-5">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 group mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-emerald-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Estás a 60 segundos de nunca más perseguir a un cliente</h1>
          </div>

          {/* Banda de plan activo */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <p className="text-sm text-emerald-400 font-semibold">Activando: Plan Pro · 14 días gratis</p>
            <p className="text-xs text-zinc-400 mt-1">Acceso completo a todas las funcionalidades · Sin tarjeta · Sin compromiso</p>
          </div>

          {/* Barra de progreso de 3 pasos */}
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 font-medium">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] flex items-center justify-center font-bold">1</span> Crea tu cuenta
            </div>
            <span className="text-zinc-700">→</span>
            <span className="text-zinc-600">Configura tu proyecto</span>
            <span className="text-zinc-700">→</span>
            <span className="text-zinc-600">Estás blindado</span>
          </div>

          {/* Google OAuth */}
          <div className="space-y-3">
            <form action="/auth/google" method="POST">
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black font-medium py-3 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Registrarse con Google
              </button>
            </form>
            <form action="/auth/apple" method="POST">
              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white font-medium py-3 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 border border-zinc-700 shadow-lg shadow-white/5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Registrarse con Apple
              </button>
            </form>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-xs text-zinc-600">o con tu email</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <RegisterForm />
          </div>

          <p className="text-center text-xs text-zinc-600 flex items-center justify-center gap-1">
            🔒 Tus datos están protegidos y nunca se venden.
          </p>
          <p className="text-center text-xs text-zinc-600">
            Al registrarte, aceptas nuestra{' '}
            <Link href="/privacy" className="underline hover:text-zinc-400">Política de Privacidad</Link>
            {' '}y nuestros{' '}
            <Link href="/terms" className="underline hover:text-zinc-400">Términos de Servicio</Link>.
          </p>
          <div className="border-t border-white/5 pt-4">
            <p className="text-center text-sm text-zinc-500">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-emerald-400 hover:underline font-medium">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho: mockup del dashboard + roadmap */}
      <div className="hidden lg:flex w-[480px] bg-zinc-900/50 border-l border-zinc-800 flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
        <div className="relative z-10 space-y-6 w-full max-w-sm">
          <h2 className="text-xl font-bold">Así se verá tu panel</h2>
          {/* Mini mockup del dashboard */}
          <div className="border border-zinc-700 rounded-xl overflow-hidden shadow-lg bg-zinc-950">
            <div className="bg-zinc-900/80 p-2 flex items-center gap-2 border-b border-zinc-700">
              <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-red-500"/><span className="w-2 h-2 rounded-full bg-yellow-500"/><span className="w-2 h-2 rounded-full bg-emerald-500"/></div>
              <span className="text-[10px] text-zinc-500 ml-1">Panel de Blindaje</span>
            </div>
            <div className="p-3 space-y-3">
              <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg">
                <p className="text-[10px] text-zinc-400">CFO Cassandra</p>
                <p className="text-emerald-400 font-bold text-xs mt-0.5">Tus finanzas están estables.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg">
                <p className="text-[10px] text-zinc-400">PayScore</p>
                <p className="text-xs font-bold mt-0.5">María Gómez <span className="text-emerald-400 ml-1">ORO</span></p>
              </div>
              <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg">
                <p className="text-[10px] text-zinc-400">Proyecto Blindado</p>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 bg-emerald-900/20 border border-emerald-800 rounded p-1 text-center"><p className="text-[10px] text-emerald-400">✓ Fase 1</p><p className="text-xs font-bold">500€</p></div>
                  <div className="flex-1 bg-zinc-800 border border-zinc-600 rounded p-1 text-center"><p className="text-[10px] text-red-400">🔒 Fase 2</p><p className="text-xs font-bold text-zinc-500">500€</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* Roadmap temporal */}
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 mt-0.5">1</div>
              <div><p className="text-xs text-white font-medium">En 2 minutos: tu cuenta lista</p></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 mt-0.5">2</div>
              <div><p className="text-xs text-white font-medium">En 5 minutos: primer proyecto blindado</p></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 mt-0.5">3</div>
              <div><p className="text-xs text-white font-medium">En 24h: el sistema actúa solo</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
