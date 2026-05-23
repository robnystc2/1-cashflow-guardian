import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-black font-bold mb-4">🔒</div>
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
          <p className="text-zinc-400 text-sm mt-2">Bienvenido de vuelta. Tus proyectos blindados te esperan.</p>
        </div>
        <form className="space-y-4">
          <div><label className="text-sm text-zinc-400">Email</label><input type="email" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Contraseña</label><input type="password" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <Link href="/forgot-password" className="text-xs text-emerald-400 hover:text-emerald-300 block text-right">¿Olvidaste tu contraseña?</Link>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Entrar</button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400 mb-4">O continúa con</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-sm transition-all">Google</button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-sm transition-all">LinkedIn</button>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-6 text-center">¿No tienes cuenta? <Link href="/register" className="text-emerald-400">Regístrate gratis</Link></p>
      </div>
    </div>
  )
}
