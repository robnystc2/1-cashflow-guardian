const fs = require('fs');
const path = require('path');

console.log('🌍 Creando sistema de adquisición de The Core...');

// ============================================================
// 1. LANDING PAGES POR PROFESIÓN (13 páginas)
// ============================================================
const profesiones = [
  { slug: 'disenadores', nombre: 'Diseñadores', recuperado: '47.200€', dolor: 'Entregaste el logo. El cliente desapareció con él.' },
  { slug: 'desarrolladores', nombre: 'Desarrolladores', recuperado: '58.300€', dolor: 'El MVP funciona perfecto. El pago: no tan perfecto.' },
  { slug: 'fotografos', nombre: 'Fotógrafos', recuperado: '18.500€', dolor: 'Las fotos están en su web. Tu factura sigue en el limbo.' },
  { slug: 'consultores', nombre: 'Consultores', recuperado: '32.100€', dolor: 'Auditoría impecable. Factura ignorada.' },
  { slug: 'copywriters', nombre: 'Copywriters', recuperado: '25.400€', dolor: 'Tus textos ya generan tráfico. Tu factura, ni en spam.' },
  { slug: 'traductores', nombre: 'Traductores', recuperado: '11.200€', dolor: 'Traducción entregada. Esperando pago.' },
  { slug: 'editores-video', nombre: 'Editores de Vídeo', recuperado: '10.900€', dolor: '30 horas de edición. El canal tiene 50.000 reproducciones. Tu factura lleva 45 días esperando.' },
  { slug: 'social-media-managers', nombre: 'Social Media Managers', recuperado: '8.100€', dolor: 'Contenido viral. Factura invisible.' },
  { slug: 'coaches', nombre: 'Coaches y Terapeutas', recuperado: '5.600€', dolor: 'Sesiones dadas. Factura olvidada.' },
  { slug: 'productores-musicales', nombre: 'Productores Musicales', recuperado: '3.200€', dolor: 'Tu beat tiene 200.000 streams. Tú sin un euro.' },
  { slug: 'agencias', nombre: 'Agencias Pequeñas', recuperado: '8.700€', dolor: 'Múltiples clientes. Caos de cobros.' },
  { slug: 'desarrolladores-shopify', nombre: 'Desarrolladores Shopify', recuperado: '12.400€', dolor: 'Tienda lista. Pago pendiente.' },
  { slug: 'asistentes-virtuales', nombre: 'Asistentes Virtuales', recuperado: '15.300€', dolor: 'Gestionaste su agenda. El pago lleva 60 días.' }
];

profesiones.forEach(p => {
  const dir = `src/app/${p.slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const content = `import Link from 'next/link'

export default function Landing${p.slug.charAt(0).toUpperCase() + p.slug.slice(1).replace(/-/g, '')}() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 text-center">
        <p className="text-sm text-red-400/80 font-medium mb-2">${p.recuperado} recuperados para ${p.nombre}</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Protege tus proyectos de ${p.nombre} con CFG</h1>
        <p className="text-lg text-zinc-300 mb-4 italic">"${p.dolor}"</p>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">El 94% de nuestros usuarios ${p.nombre} cobran en menos de 14 días. Si no, te devolvemos 3 meses.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-12">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Bloqueo de entregas</h3>
            <p className="text-sm text-zinc-400">El cliente no recibe el siguiente hito hasta que pague. Así de simple.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Escudo Legal automatizado</h3>
            <p className="text-sm text-zinc-400">Cartas legales personalizadas sin mover un dedo.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">PayScore de clientes</h3>
            <p className="text-sm text-zinc-400">Descubre si un cliente paga bien antes de aceptar el proyecto.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="font-bold mb-2">Garantía Blindaje Total</h3>
            <p className="text-sm text-zinc-400">Si no cobras en 14 días, te devolvemos 3 meses de suscripción.</p>
          </div>
        </div>

        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
          Blindar mi primer proyecto →
        </Link>
      </div>
    </div>
  )
}`;
  fs.writeFileSync(`${dir}/page.tsx`, content);
});

// ============================================================
// 2. LANDING PAGES POR PAÍS (7 países)
// ============================================================
const paises = [
  { slug: 'mexico', nombre: 'México', moneda: 'pesos mexicanos', legislacion: 'Código de Comercio y Ley de Títulos y Operaciones de Crédito' },
  { slug: 'colombia', nombre: 'Colombia', moneda: 'pesos colombianos', legislacion: 'Código de Comercio y Código General del Proceso' },
  { slug: 'argentina', nombre: 'Argentina', moneda: 'pesos argentinos', legislacion: 'Código Civil y Comercial y leyes provinciales' },
  { slug: 'chile', nombre: 'Chile', moneda: 'pesos chilenos', legislacion: 'Código Civil y Ley de Cobranza Judicial' },
  { slug: 'peru', nombre: 'Perú', moneda: 'soles', legislacion: 'Código Civil y Ley de Títulos Valores' },
  { slug: 'uruguay', nombre: 'Uruguay', moneda: 'pesos uruguayos', legislacion: 'Código Civil y Ley de Procedimiento Monitorio' },
  { slug: 'ecuador', nombre: 'Ecuador', moneda: 'dólares', legislacion: 'Código Civil y Código Orgánico General de Procesos' }
];

paises.forEach(p => {
  const dir = `src/app/${p.slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const content = `import Link from 'next/link'

export default function Landing${p.nombre}() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Protege tus cobros en ${p.nombre} con CFG</h1>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
          Escudo Legal adaptado a la legislación de ${p.nombre}. Recordatorios automáticos, bloqueo de entregas y garantía de cobro en ${p.moneda}.
        </p>
        
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-2xl mx-auto mb-8">
          <h3 className="text-xl font-bold mb-4">CFG funciona en ${p.nombre}</h3>
          <ul className="text-left text-sm text-zinc-300 space-y-2">
            <li>✅ Cartas legales con jurisdicción local (${p.legislacion})</li>
            <li>✅ Soporte multi-moneda (incluye ${p.moneda})</li>
            <li>✅ Comunidad de freelancers en ${p.nombre}</li>
            <li>✅ Garantía Blindaje Total: si no cobras en 14 días, te devolvemos 3 meses</li>
          </ul>
        </div>

        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full">
          Comenzar ahora →
        </Link>
      </div>
    </div>
  )
}`;
  fs.writeFileSync(`${dir}/page.tsx`, content);
});

// ============================================================
// 3. PÁGINAS COMPARATIVAS COMPLETAS (14 páginas)
// ============================================================
const competidores = [
  { nombre: 'Bonsai', slug: 'vs-bonsai', precio: '17$/mes', pros: ['Gestión de proyectos', 'Contratos'], contras: ['Solo inglés', 'Sin protección anti-impago', 'Comprado por Zoom'] },
  { nombre: 'HoneyBook', slug: 'vs-honeybook', precio: '19$/mes', pros: ['CRM básico', 'Pagos online'], contras: ['Solo USA/Canadá', 'Subió precios 40%', 'App móvil deficiente'] },
  { nombre: 'Moxie', slug: 'vs-moxie', precio: '20$/mes', pros: ['CRM freelance', 'Facturación'], contras: ['Sin bloqueo de entregas', 'Sin Escudo Legal', 'Sin soporte español'] },
  { nombre: 'Dubsado', slug: 'vs-dubsado', precio: '20$/mes', pros: ['Flujos de trabajo', 'Formularios'], contras: ['Configuración compleja', 'Requiere especialista', 'Soporte en declive'] },
  { nombre: 'FreshBooks', slug: 'vs-freshbooks', precio: '15$/mes', pros: ['Facturación simple', 'Seguimiento de gastos'], contras: ['Solo contabilidad', 'Sin protección de pagos', 'Sin adaptación legal'] },
  { nombre: 'QuickBooks Self-Employed', slug: 'vs-quickbooks-self-employed', precio: '15$/mes', pros: ['Integración bancaria', 'Cálculo de impuestos'], contras: ['Solo contabilidad', 'Sin gestión de cobros', 'Sin bloqueo de hitos'] },
  { nombre: 'Wave', slug: 'vs-wave', precio: 'Gratis', pros: ['Gratuito', 'Facturación básica'], contras: ['Funcionalidades limitadas', 'Sin protección legal', 'Sin soporte multi-moneda real'] },
  { nombre: 'Zoho Invoice', slug: 'vs-zoho-invoice', precio: 'Gratis', pros: ['Gratuito', 'Multi-moneda'], contras: ['Sin protección de pagos', 'Sin Escudo Legal', 'Soporte en inglés'] },
  { nombre: 'Invoice Ninja', slug: 'vs-invoice-ninja', precio: '10$/mes', pros: ['Open source', 'Facturación'], contras: ['Sin protección de impago', 'Sin bloqueo de entregas', 'Sin PayScore'] },
  { nombre: 'Holded', slug: 'cfg-holded', precio: '15€/mes', pros: ['ERP español', 'Facturación'], contras: ['Sin protección de pagos', 'Sin garantía de cobro', 'No es para freelancers'] },
  { nombre: 'Copilot', slug: 'vs-copilot', precio: '19$/mes', pros: ['Portal de cliente', 'Mensajería'], contras: ['Solo en inglés', 'Sin protección legal', 'Sin adaptación España/LatAm'] },
  { nombre: 'And.co', slug: 'vs-andco', precio: '18$/mes', pros: ['Facturación', 'Propuestas'], contras: ['Cerrado en 2023', 'Usuarios migrados a Fiverr', 'Ya no existe'] },
  { nombre: 'Factorial', slug: 'vs-factorial', precio: '5€/empleado', pros: ['RRHH', 'Nóminas'], contras: ['Para empresas, no autónomos', 'Sin gestión de cobros', 'Sin protección anti-impago'] },
  { nombre: 'Upwork', slug: 'vs-upwork', precio: '10% comisión', pros: ['Plataforma freelance', 'Protección de pago'], contras: ['Comisión altísima', 'No puedes tener relación directa', 'Sin herramientas legales'] }
];

competidores.forEach(c => {
  const dir = `src/app/${c.slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const content = `import Link from 'next/link'

export default function Comparativa${c.nombre.replace(/\s/g,'')}() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs ${c.nombre}</h1>
        <p className="text-lg text-zinc-300 mb-8 text-center">Comparativa completa: protección de pagos, funcionalidades y precios.</p>

        {/* Tabla comparativa */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-300 text-sm">
                <th className="py-3 px-4">Funcionalidad</th>
                <th className="py-3 px-4 text-center">${c.nombre}</th>
                <th className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">CFG</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Protección impago</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Garantizado</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Bloqueo de entregas</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Automático</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Calificación de clientes</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ PayScore</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Garantía de cobro</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ 3 meses gratis</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Soporte en español</td><td className="py-3 px-4 text-center text-red-400">✗</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400">✓ Nativo</td></tr>
              <tr className="border-b border-zinc-700/50"><td className="py-3 px-4 text-zinc-300">Precio</td><td className="py-3 px-4 text-center text-zinc-400">${c.precio}</td><td className="py-3 px-4 text-center bg-emerald-900/20 text-emerald-400 font-bold">29€/mes</td></tr>
            </tbody>
          </table>
        </div>

        {/* Pros / Contras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="text-amber-400 font-bold mb-4">✅ Ventajas de ${c.nombre}</h3>
            <ul className="space-y-2">
              ${c.pros.map(pro => `<li className="flex items-start gap-2"><span className="text-amber-400">•</span><span className="text-sm text-zinc-300">${pro}</span></li>`).join('\n')}
            </ul>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
            <h3 className="text-red-400 font-bold mb-4">❌ Limitaciones frente a CFG</h3>
            <ul className="space-y-2">
              ${c.contras.map(con => `<li className="flex items-start gap-2"><span className="text-red-400">•</span><span className="text-sm text-zinc-300">${con}</span></li>`).join('\n')}
            </ul>
          </div>
        </div>

        {/* Guía de migración */}
        <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-6 mb-8">
          <h3 className="text-amber-300 font-bold mb-2">📋 Guía de migración de ${c.nombre} a CFG</h3>
          <p className="text-sm text-zinc-300 mb-4">Sigue estos pasos para migrar tus proyectos en menos de 10 minutos.</p>
          <ol className="text-sm text-zinc-300 space-y-1 list-decimal list-inside">
            <li>Exporta tus clientes y proyectos activos de ${c.nombre}.</li>
            <li>Crea tu cuenta gratuita en CFG (3 minutos).</li>
            <li>Importa tus proyectos y configura los hitos de pago.</li>
            <li>Activa la protección automática en cada proyecto.</li>
          </ol>
          <Link href="/register" className="inline-block mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full">
            Migrar a CFG ahora →
          </Link>
        </div>

        {/* CTA final */}
        <div className="text-center">
          <p className="text-zinc-400 text-sm mb-4">No pierdas otro cliente por falta de protección.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg px-10 py-4 rounded-full">
            Blindar mi primer proyecto →
          </Link>
        </div>
      </div>
    </div>
  )
}`;
  fs.writeFileSync(`${dir}/page.tsx`, content);
});

console.log('✅ Sistema de adquisición masiva creado:');
console.log(`   - ${profesiones.length} landings por profesión`);
console.log(`   - ${paises.length} landings por país`);
console.log(`   - ${competidores.length} comparativas completas`);
console.log('🚀 Listo para dominar el SEO del nicho freelance en español.');
