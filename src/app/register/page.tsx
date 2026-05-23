import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Register() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-black font-bold mb-4">🔒</div>
            <h1 className="text-3xl font-bold">Crear cuenta</h1>
            <p className="text-zinc-400 mt-2">3 pasos · 3 minutos · Sin tarjeta</p>
            <div className="w-full bg-zinc-800 rounded-full h-2 mt-4"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33%' }}></div></div>
          </div>
          <form className="space-y-4">
            <div><label className="text-sm text-zinc-400">Email</label><input type="email" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
            <div><label className="text-sm text-zinc-400">Contraseña</label><input type="password" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Activar mi blindaje gratuito →</button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400 mb-4">O continúa con</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-sm transition-all">Google</button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-sm transition-all">LinkedIn</button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-sm transition-all">Apple</button>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4">Al registrarte aceptas nuestros <Link href="/terms" className="text-emerald-400">Términos</Link> y <Link href="/privacy" className="text-emerald-400">Privacidad</Link>.</p>
          <p className="text-xs text-zinc-500 mt-2">¿Ya tienes cuenta? <Link href="/login" className="text-emerald-400">Iniciar sesión</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-zinc-900 items-center justify-center p-8">
        <div className="max-w-sm text-center">
          <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <p className="text-xl font-bold">Tu primer proyecto estará protegido en 3 minutos</p>
          <p className="text-zinc-400 text-sm mt-2">Paso 1: Creas tu cuenta. Paso 2: Defines tu proyecto. Paso 3: ¡Blindaje activo!</p>
          <div className="mt-6 text-left space-y-2">
            <p className="text-xs text-zinc-500">✓ Sin tarjeta de crédito</p>
            <p className="text-xs text-zinc-500">✓ Activo en 3 minutos</p>
            <p className="text-xs text-zinc-500">✓ Cancela cuando quieras</p>
          </div>
          <div className="mt-6 bg-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-400">💰 Tu primer proyecto de 1.000€ estará blindado en 3 minutos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
