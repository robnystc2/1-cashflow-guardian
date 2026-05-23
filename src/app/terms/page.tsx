import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 bg-[#050505]/80 backdrop-blur-xl py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-black font-bold text-sm">🔒</div><span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CashFlow Guardian</span></Link>
          <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Empieza por 1€ →</Link>
        </div>
      </nav>
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm">
          <p><strong>Última actualización:</strong> 21 de mayo de 2026</p>
          
          <h2 className="text-xl font-bold mt-6">1. Aceptación de los términos</h2>
          <p>Al registrarte y usar CashFlow Guardian, aceptas estos Términos y Condiciones. Si no estás de acuerdo, no debes usar el servicio.</p>
          
          <h2 className="text-xl font-bold mt-6">2. Descripción del servicio</h2>
          <p>CFG es una plataforma SaaS que permite a freelancers y autónomos blindar sus proyectos mediante un sistema de hitos, bloqueo de entregas, recordatorios automáticos y Escudo Legal.</p>
          
          <h2 className="text-xl font-bold mt-6">3. Planes y precios</h2>
          <p>CFG ofrece planes gratuitos y de pago. Los precios se muestran en euros (€) e incluyen IVA cuando corresponda. Nos reservamos el derecho a modificar los precios con un preaviso de 30 días.</p>
          
          <h2 className="text-xl font-bold mt-6">4. Garantía Blindaje Total</h2>
          <p>La Garantía Blindaje Total cubre la devolución de 3 meses de suscripción si el usuario ha seguido el proceso de hitos y recordatorios y no ha cobrado en 14 días. La garantía no cubre casos en los que el usuario no ha configurado correctamente los hitos o no ha activado los recordatorios automáticos.</p>
          
          <h2 className="text-xl font-bold mt-6">5. Cancelación</h2>
          <p>Puedes cancelar tu suscripción en cualquier momento desde el panel de control. La cancelación será efectiva al final del período de facturación actual. No hay permanencia ni penalización.</p>
          
          <h2 className="text-xl font-bold mt-6">6. Propiedad intelectual</h2>
          <p>Todo el contenido y código de la plataforma es propiedad de CashFlow Guardian SL. Los datos introducidos por los usuarios les pertenecen exclusivamente a ellos.</p>
          
          <h2 className="text-xl font-bold mt-6">7. Limitación de responsabilidad</h2>
          <p>CFG es una herramienta de gestión de cobros. No sustituye el asesoramiento legal profesional. Las cartas legales generadas tienen carácter extrajudicial y no constituyen un servicio jurídico.</p>
          
          <h2 className="text-xl font-bold mt-6">8. Ley aplicable</h2>
          <p>Estos términos se rigen por la legislación española. Cualquier disputa será resuelta en los tribunales de Santa Cruz de Tenerife.</p>
          
          <p className="mt-8 text-zinc-500">Para cualquier consulta legal, contacta con hola@cashflowguardian.com.</p>
        </div>
      </section>
    </div>
  )
}
