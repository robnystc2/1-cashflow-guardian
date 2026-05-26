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
        <p>En CashFlow Guardian (en adelante, "CFG"), tratamos los datos personales con la máxima confidencialidad y en cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).</p>
        <p>Responsable del tratamiento: CFG S.L., con domicilio en Tenerife, España. Email de contacto: hola@cashflowguardian.com.</p>
        <p>Datos que recopilamos: Email, nombre, profesión, datos de facturación y proyectos. No recopilamos datos sensibles ni de tarjetas de crédito (los pagos se procesan a través de Stripe, que cumple PCI-DSS).</p>
        <p>Finalidad del tratamiento: Prestar los servicios contratados, enviar notificaciones sobre el estado de los proyectos, y mejorar la plataforma mediante análisis anonimizados.</p>
        <p>Legitimación: Ejecución del contrato de servicios y consentimiento expreso del interesado para comunicaciones comerciales.</p>
        <p>Conservación: Los datos se conservan mientras la cuenta esté activa. El usuario puede solicitar la eliminación en cualquier momento escribiendo a hola@cashflowguardian.com.</p>
        <p>Derechos del usuario: Acceso, rectificación, supresión, limitación del tratamiento, portabilidad de los datos y oposición. Para ejercerlos, escribe a hola@cashflowguardian.com con el asunto "Protección de Datos".</p>
        <p>Cookies: Utilizamos cookies técnicas esenciales y cookies analíticas (Google Analytics, Microsoft Clarity) previo consentimiento. Consulta nuestra Política de Cookies para más información.</p>
        <p>Transferencias internacionales: No realizamos transferencias de datos fuera del Espacio Económico Europeo sin las garantías adecuadas.</p>
        <p>Modificaciones: Esta política puede actualizarse. La fecha de la última modificación aparecerá al inicio del documento.</p>
        <p>Última actualización: 26 de mayo de 2026.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">Volver al inicio →</Link>
        </div>
      </div>
    </main>
  )
}
