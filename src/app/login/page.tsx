import Link from 'next/link'
export default function Login() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-black font-bold mb-4">🛡️</div>
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
        </div>
        <form className="space-y-4">
          <div><label className="text-sm text-zinc-400">Email</label><input type="email" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <div><label className="text-sm text-zinc-400">Contraseña</label><input type="password" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" /></div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-full transition-all">Entrar</button>
        </form>
        <p className="text-xs text-zinc-500 mt-4">¿No tienes cuenta? <Link href="/register" className="text-emerald-400">Regístrate gratis</Link></p>
      </div>
    </div>
  )
}
