export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Uso de cookies</h2>
            <p className="text-zinc-300">Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Tabla de cookies</h2>
            <table className="w-full text-left border-collapse mt-4">
              <thead><tr className="border-b border-zinc-700"><th className="py-2">Nombre</th><th className="py-2">Tipo</th><th className="py-2">Duración</th><th className="py-2">Finalidad</th></tr></thead>
              <tbody className="text-sm text-zinc-300">
                <tr className="border-b border-zinc-700/50"><td className="py-2">_ga</td><td className="py-2">Analítica</td><td className="py-2">2 años</td><td className="py-2">Google Analytics</td></tr>
                <tr className="border-b border-zinc-700/50"><td className="py-2">_clarity</td><td className="py-2">Analítica</td><td className="py-2">1 año</td><td className="py-2">Microsoft Clarity</td></tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Cómo rechazar cookies</h2>
            <p className="text-zinc-300">Puedes configurar tu navegador para rechazar todas o algunas cookies. Consulta la ayuda de tu navegador para más información.</p>
          </section>
        </div>
      </div>
    </div>
  )
}