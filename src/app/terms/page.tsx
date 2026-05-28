import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — CashFlow Guardian',
  description: 'Términos y Condiciones.',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Términos y Condiciones</h1>
        <p>Estos Términos y Condiciones regulan el uso de la plataforma CashFlow Guardian (CFG), operada por CFG S.L.</p>
        <p>Aceptación: Al registrarte y usar CFG, aceptas estos términos en su totalidad.</p>
        <p>Descripción del servicio: CFG es una herramienta de gestión de proyectos freelance que permite crear contratos con hitos, enviar recordatorios de pago automáticos y, en caso de impago, bloquear entregas futuras y generar cartas legales de reclamación.</p>
        <p>Cuentas de usuario: Eres responsable de mantener la confidencialidad de tus credenciales. No puedes compartir tu cuenta con terceros.</p>
        <p>Planes y precios: Los precios se muestran en euros (€) e incluyen IVA cuando corresponda. CFG se reserva el derecho a modificar los precios con un preaviso de 30 días.</p>
        <p>Garantía Blindaje Total: Si utilizas CFG para un proyecto y sigues todos los pasos del sistema, y el cliente no paga en 14 días tras la carta legal, CFG te reembolsará 3 meses de suscripción. Esta garantía no cubre proyectos sin contrato firmado o impagos de clientes declarados en concurso de acreedores.</p>
        <p>Cancelación: Puedes cancelar tu suscripción en cualquier momento. El acceso al servicio se mantiene hasta el final del período facturado.</p>
        <p>Propiedad intelectual: Todo el contenido y software de CFG es propiedad de CFG S.L. El usuario conserva todos los derechos sobre los datos y documentos que suba a la plataforma.</p>
        <p>Limitación de responsabilidad: CFG es una herramienta de apoyo a la gestión de cobros. No sustituye el asesoramiento legal profesional.</p>
        <p>Legislación aplicable: Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados de Santa Cruz de Tenerife.</p>
        <p>Última actualización: 26 de mayo de 2026.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">Volver al inicio →</Link>
        </div>
      </div>
    </main>
  )
}
