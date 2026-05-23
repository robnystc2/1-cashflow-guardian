import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CFG</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm">
          <p><strong>Última actualización:</strong> 21 de mayo de 2026</p>
          <p>En CFG (en adelante, "CFG"), nos tomamos muy en serio la privacidad de tus datos. Esta política describe qué información recopilamos, cómo la usamos y qué derechos tienes sobre ella.</p>
          
          <h2 className="text-xl font-bold mt-6">1. Responsable del tratamiento</h2>
          <p>CFG SL (CIF B-XXXXXXXX)<br/>Tenerife, España<br/>hola@cashflowguardian.com</p>
          
          <h2 className="text-xl font-bold mt-6">2. Datos que recopilamos</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Datos de registro: email, nombre, profesión.</li>
            <li>Datos de facturación: nombre fiscal, dirección, CIF/NIF.</li>
            <li>Datos de uso: proyectos creados, facturas emitidas, clientes añadidos.</li>
            <li>Datos de pago: historial de suscripciones (Stripe procesa los pagos).</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-6">3. Finalidad del tratamiento</h2>
          <p>Usamos tus datos exclusivamente para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Proveer el servicio de blindaje de proyectos.</li>
            <li>Enviar recordatorios de pago a tus clientes.</li>
            <li>Generar el PayScore de clientes basado en historiales de pago anonimizados.</li>
            <li>Enviar comunicaciones sobre tu cuenta y mejoras del producto.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-6">4. Base legal</h2>
          <p>El tratamiento se basa en la ejecución del contrato de servicios (art. 6.1.b RGPD) y en el interés legítimo (art. 6.1.f RGPD) para la mejora del producto y prevención de fraude.</p>
          
          <h2 className="text-xl font-bold mt-6">5. Conservación de datos</h2>
          <p>Conservamos tus datos mientras tu cuenta esté activa. Al cancelar, puedes solicitar la eliminación total o la exportación de tus datos en un plazo de 30 días.</p>
          
          <h2 className="text-xl font-bold mt-6">6. Tus derechos</h2>
          <p>Tienes derecho a acceder, rectificar, suprimir, limitar, portar y oponerte al tratamiento de tus datos. Para ejercerlos, escribe a hola@cashflowguardian.com.</p>
          
          <h2 className="text-xl font-bold mt-6">7. Cookies</h2>
          <p>Usamos cookies técnicas esenciales y cookies analíticas (Google Analytics, Microsoft Clarity). Puedes gestionar tus preferencias en nuestra <Link href="/cookies" className="text-emerald-400 underline">Política de Cookies</Link>.</p>
          
          <p className="mt-8 text-zinc-500">Si tienes cualquier duda sobre esta política, contacta con nosotros en hola@cashflowguardian.com.</p>
        </div>
      </section>
    </div>
  )
}
