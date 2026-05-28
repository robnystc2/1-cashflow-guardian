import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad — CashFlow Guardian',
  description: 'Política de Privacidad.',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Política de Privacidad</h1>
        <p>En CashFlow Guardian tratamos tus datos personales con la máxima confidencialidad y en cumplimiento del RGPD y la LOPDGDD.</p>
        <p>Responsable: CFG S.L., Tenerife, España. Contacto: hola@cashflowguardian.com.</p>
        <p>Datos recopilados: Email, nombre, profesión, datos de facturación y proyectos. No almacenamos datos de tarjetas de crédito (los pagos se procesan a través de Stripe).</p>
        <p>Finalidad: Prestar los servicios contratados, enviar notificaciones y mejorar la plataforma.</p>
        <p>Legitimación: Ejecución del contrato de servicios y consentimiento expreso para comunicaciones comerciales.</p>
        <p>Conservación: Mientras la cuenta esté activa. Puedes solicitar la eliminación en cualquier momento.</p>
        <p>Derechos: Acceso, rectificación, supresión, portabilidad y oposición escribiendo a hola@cashflowguardian.com.</p>
        <p>Cookies: Utilizamos cookies técnicas esenciales y cookies analíticas (Google Analytics, Microsoft Clarity) previo consentimiento. Consulta nuestra Política de Cookies.</p>
        <p>Última actualización: 26 de mayo de 2026.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">Volver al inicio →</Link>
        </div>
      </div>
    </main>
  )
}
