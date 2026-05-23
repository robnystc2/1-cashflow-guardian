import Link from 'next/link'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm">
          <p><strong>Última actualización:</strong> 21 de mayo de 2026</p>
          <p>Esta web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y personalizar el contenido.</p>
          
          <h2 className="text-xl font-bold mt-6">1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar una página web. Sirven para recordar preferencias, identificar sesiones y recopilar estadísticas.</p>
          
          <h2 className="text-xl font-bold mt-6">2. Cookies que utilizamos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento de la plataforma (sesión, seguridad).</li>
            <li><strong>Cookies analíticas:</strong> Google Analytics y Microsoft Clarity para medir el uso y mejorar el servicio.</li>
            <li><strong>Cookies de preferencias:</strong> Para recordar tu idioma y otras configuraciones.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-6">3. Gestión de cookies</h2>
          <p>Puedes aceptar o rechazar las cookies desde el banner de cookies al entrar en la web, o configurarlas en cualquier momento desde los ajustes de tu navegador.</p>
          
          <h2 className="text-xl font-bold mt-6">4. Cambios en esta política</h2>
          <p>Nos reservamos el derecho a modificar esta política. Te notificaremos cualquier cambio sustancial a través de la plataforma o por email.</p>
          
          <p className="mt-8 text-zinc-500">Si tienes dudas, escríbenos a hola@cashflowguardian.com.</p>
        </div>
      </section>
    </div>
  )
}
