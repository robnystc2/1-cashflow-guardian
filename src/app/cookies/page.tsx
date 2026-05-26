import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies — CashFlow Guardian',
  description: 'Política de Cookies.',
}

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Política de Cookies</h1>
        <p>CFG utiliza cookies y tecnologías similares para garantizar el correcto funcionamiento de la plataforma y analizar el uso de forma anónima.</p>
        <p>¿Qué son las cookies? Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo. Permiten recordar tus preferencias y reconocerte en visitas posteriores.</p>
        <p>Tipos de cookies que utilizamos:</p>
        <p>Cookies técnicas (esenciales): Necesarias para el funcionamiento de la web. No requieren consentimiento. Incluyen cookies de sesión y de autenticación.</p>
        <p>Cookies analíticas: Utilizamos Google Analytics 4 (GA4) y Microsoft Clarity para medir de forma anónima el uso de la web y mejorar la experiencia. Estas cookies solo se activan si aceptas su uso.</p>
        <p>Cookies de terceros: Stripe (procesamiento de pagos) puede instalar cookies técnicas para prevenir el fraude.</p>
        <p>Consentimiento: Al entrar en CFG, puedes aceptar o rechazar las cookies no esenciales. Puedes cambiar tu configuración en cualquier momento desde el banner de cookies.</p>
        <p>Cómo desactivar las cookies: Puedes configurar tu navegador para bloquear o eliminar las cookies. Consulta la ayuda de tu navegador para más información.</p>
        <p>Más información: Si tienes dudas sobre nuestra política de cookies, escríbenos a hola@cashflowguardian.com.</p>
        <p>Última actualización: 26 de mayo de 2026.</p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">Volver al inicio →</Link>
        </div>
      </div>
    </main>
  )
}
