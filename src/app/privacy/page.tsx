export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Responsable del tratamiento</h2>
            <p className="text-zinc-300">CFG SL, con domicilio en Tenerife, España, y correo electrónico hola@cashflowguardian.com.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Datos que recogemos</h2>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Email y nombre del freelancer.</li>
              <li>Datos de proyectos (importes, hitos, clientes).</li>
              <li>Historial de pagos y PayScore de clientes (con consentimiento explícito).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Finalidad del tratamiento</h2>
            <p className="text-zinc-300">Gestionar la protección de cobros, enviar recordatorios, y calcular el PayScore de clientes dentro de nuestra red.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Base legal</h2>
            <p className="text-zinc-300">Ejecución de un contrato (RGPD art. 6.1.b) y consentimiento explícito para el tratamiento de PayScore.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Destinatarios</h2>
            <p className="text-zinc-300">No compartimos datos con terceros, salvo obligación legal. Los datos de PayScore son anónimos dentro de la red CFG.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Transferencias internacionales</h2>
            <p className="text-zinc-300">Utilizamos servidores en la UE (Vercel, AWS Frankfurt). No transferimos datos fuera del EEE sin garantías adecuadas.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Plazos de retención</h2>
            <p className="text-zinc-300">Conservamos tus datos mientras tu cuenta esté activa. Puedes solicitar la eliminación en cualquier momento.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Tus derechos</h2>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Acceso, rectificación, supresión y portabilidad de tus datos.</li>
              <li>Oposición y limitación del tratamiento.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}