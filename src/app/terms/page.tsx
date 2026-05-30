export default function Terminos() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceptación</h2>
            <p className="text-zinc-300">Al usar CFG aceptas estos términos en su totalidad. Si no estás de acuerdo, no utilices el servicio.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Servicios</h2>
            <p className="text-zinc-300">CFG proporciona herramientas de gestión de cobros, recordatorios automáticos, bloqueo de hitos y Escudo Legal automatizado.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Garantía Blindaje Total</h2>
            <p className="text-zinc-300">Si utilizas CFG correctamente y no cobras en 14 días, te devolvemos 3 meses de suscripción. Consulta los requisitos completos en nuestra página de garantía.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitación de responsabilidad</h2>
            <p className="text-zinc-300">CFG no es un despacho de abogados. Nuestras cartas legales son automatizadas. Para procesos judiciales, recomendamos consultar con un profesional.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Ley aplicable</h2>
            <p className="text-zinc-300">Estos términos se rigen por la legislación española. Cualquier disputa se resolverá en los juzgados de Santa Cruz de Tenerife.</p>
          </section>
        </div>
      </div>
    </div>
  )
}