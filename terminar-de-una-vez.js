const fs = require('fs');
const path = require('path');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

console.log('🔥 APLICANDO TODO LO QUE FALTA DE UNA VEZ...\n');

// 1. PRECIOS: Reordenar planes (Élite → Pro → Starter → Por proyecto → Teams)
const gridRegex = /(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">)([\s\S]*?)(<\/div>\s*<div className="mt-8 bg-zinc-900)/;
const match = page.match(gridRegex);
if (match) {
  const planesHTML = match[2];
  const starterMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col">[\s\S]*?CFG Starter[\s\S]*?<\/div>\s*<\/div>/);
  const proMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 rounded-2xl p-10 flex flex-col relative scale-105 border-emerald-500">[\s\S]*?CFG Pro[\s\S]*?<\/div>\s*<\/div>/);
  const eliteMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?CFG Élite[\s\S]*?<\/div>\s*<\/div>/);
  const proyectoMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?Por proyecto[\s\S]*?<\/div>\s*<\/div>/);
  const teamsMatch = planesHTML.match(/<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-10 flex flex-col transition-all">[\s\S]*?CFG Teams[\s\S]*?<\/div>\s*<\/div>/);

  if (eliteMatch && proMatch && starterMatch && proyectoMatch && teamsMatch) {
    const nuevoOrden = eliteMatch[0] + proMatch[0] + starterMatch[0] + proyectoMatch[0] + teamsMatch[0];
    page = page.replace(match[0], match[1] + nuevoOrden + '\n              ' + match[3]);
    console.log('✅ Planes reordenados');
    changes++;
  }
}

// 2. VS PAGES: Reescribir las que son muy cortas con contenido completo
const vsData = {
  'vs-copilot': ['Copilot tiene buen portal de cliente, pero cero protección anti-impago. CFG lo tiene todo.', ['Portal de cliente moderno'], ['Sin protección anti-impago', 'Sin bloqueo de entregas', 'Sin Escudo Legal'], ['Bloqueo de hitos', 'Escudo Legal', 'PayScore', 'Garantía Blindaje Total']],
  'vs-and.co': ['AND.CO cerró. Miles de freelancers se quedaron sin herramienta. CFG es la alternativa independiente.', ['Era gratuito'], ['CERRADO permanentemente', 'Sin soporte', 'Sin futuro'], ['Activo y en desarrollo', 'Soporte en español', 'Garantía de cobro', 'Independiente']],
  'vs-factorial': ['Factorial es software de RRHH, no para freelancers. CFG entiende tu negocio y te protege.', ['Gestión de vacaciones', 'Control horario'], ['No es para freelancers', 'Sin protección de cobros', 'Orientado a empresas'], ['Diseñado para freelancers', 'Protección anti-impago', 'Bloqueo de hitos', '3 minutos de configuración']],
  'vs-wave': ['Wave es gratuito porque monetiza tus datos. CFG cobra 29€/mes porque su negocio es protegerte, no venderte.', ['Contabilidad gratis', 'Facturación básica'], ['Sin protección anti-impago', 'Sin recordatorios automáticos', 'Monetiza tus datos'], ['Protección real', 'Recordatorios automáticos', 'Privacidad total', 'Garantía Blindaje Total']],
  'vs-zoho-invoice': ['Zoho Invoice solo hace facturas. CFG bloquea entregas, envía recordatorios y te protege de verdad.', ['Parte del ecosistema Zoho', 'Facturación gratuita'], ['Solo facturación', 'Sin protección anti-impago', 'Sin bloqueo de entregas'], ['Bloqueo de hitos', 'Escudo Legal', 'Recordatorios automáticos', 'Protección completa']],
  'vs-invoice-ninja': ['Invoice Ninja no tiene recordatorios inteligentes. CFG los envía por WhatsApp con un 98% de tasa de apertura.', ['Open source', 'Auto-hospedado'], ['Sin recordatorios automáticos', 'Sin protección legal', 'Sin soporte en español'], ['Recordatorios por WhatsApp', 'Escudo Legal', 'Soporte en español', 'Garantía Blindaje Total']],
  'vs-holded': ['Holded es un ERP genérico. CFG está diseñado exclusivamente para que los freelancers cobren siempre.', ['ERP completo', 'Facturación y contabilidad'], ['No especializado en freelancers', 'Sin bloqueo de entregas', 'Sin protección anti-impago'], ['Especializado en freelancers', 'Bloqueo de hitos', 'Escudo Legal', 'Garantía de cobro']],
  'vs-quickbooks-self-employed': ['QuickBooks SE no está pensado para freelancers de servicios. CFG está diseñado específicamente para proteger tus cobros.', ['Marca reconocida', 'Contabilidad básica'], ['No es para servicios freelance', 'Sin protección anti-impago', 'Sin bloqueo de entregas'], ['Diseñado para freelancers de servicios', 'Bloqueo de hitos', 'Escudo Legal', 'Garantía Blindaje Total']],
};

Object.entries(vsData).forEach(([slug, data]) => {
  const filePath = `src/app/${slug}/page.tsx`;
  if (fs.existsSync(filePath)) {
    const [quote, pros, cons, cfPros] = data;
    const name = slug.replace('vs-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace('Quickbooks Self Employed', 'QuickBooks Self-Employed');
    const newContent = `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs ${name} — ¿Por qué los freelancers están migrando?',
  description: '${quote}',
}

export default function VsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">CFG vs ${name}</h1>
        <p className="text-xl text-zinc-300 mb-8 text-center">${quote}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">❌ Lo que no te gusta de ${name}</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              ${cons.map(c => '<li>• ' + c + '</li>').join('\n              ')}
            </ul>
            ${pros.length > 0 ? '<p className="text-xs text-zinc-500 mt-4">✅ Pros: ' + pros.join(', ') + '</p>' : ''}
          </div>
          <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">✅ Lo que ganas con CFG</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              ${cfPros.map(p => '<li>• ' + p + '</li>').join('\n              ')}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Empezar gratis →
          </Link>
        </div>
      </div>
    </main>
  )
}
`;
    fs.writeFileSync(filePath, newContent);
    console.log('✅ VS ' + slug + ' reescrita');
    changes++;
  }
});

// 3. BLOG: Crear artículo "subir precios" si no existe
const blogDir = 'src/app/blog/subir-precios-freelance-sin-perder-clientes';
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
fs.writeFileSync(path.join(blogDir, 'page.tsx'), `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo subir tus precios como freelancer sin perder clientes | Blog CFG',
  description: 'Los freelancers de CFG suben sus precios un 40% en promedio. Descubre cómo hacerlo tú también.',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <h1>Cómo subir tus precios como freelancer sin perder clientes</h1>
        <p className="lead text-lg text-zinc-300">Los freelancers que usan CFG suben sus precios un 40% en promedio. ¿Por qué? Porque cuando sabes que vas a cobrar, tienes la confianza para pedir lo que vales.</p>
        <div className="bg-emerald-900/20 border border-emerald-500 rounded-xl p-6 my-8">
          <p className="text-lg font-bold text-emerald-400">¿Listo para blindar tus proyectos?</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
            Empezar gratis →
          </Link>
        </div>
      </article>
    </main>
  )
}
`);
console.log('✅ Blog: subir-precios');
changes++;

// 4. INTEGRACIONES: Crear página
const integDir = 'src/app/integraciones';
if (!fs.existsSync(integDir)) fs.mkdirSync(integDir, { recursive: true });
fs.writeFileSync(path.join(integDir, 'page.tsx'), `import type { Metadata } from 'next'
import Link from 'next/link'

const tools = [
  { name: 'Holded', icon: '📊', desc: 'Sincroniza tus facturas y protégelas automáticamente.' },
  { name: 'Quipu', icon: '📋', desc: 'Conecta tu facturación y añade protección anti-impago.' },
  { name: 'Stripe', icon: '💳', desc: 'Cobra por Stripe y CFG gestiona los recordatorios.' },
  { name: 'PayPal', icon: '🅿️', desc: 'Tus clientes pagan por PayPal. CFG se encarga del resto.' },
  { name: 'Wise', icon: '💱', desc: 'Cobra en múltiples divisas con Wise y CFG.' },
  { name: 'Google Calendar', icon: '📅', desc: 'CFG marca vencimientos en tu calendario automáticamente.' },
  { name: 'Zapier', icon: '⚡', desc: 'Conecta CFG con 5000+ apps.' },
  { name: 'Notion', icon: '📝', desc: 'Sincroniza tus proyectos de Notion con CFG.' },
  { name: 'Slack', icon: '💬', desc: 'Recibe notificaciones de cobro en Slack.' },
  { name: 'WhatsApp', icon: '📱', desc: 'Recordatorios de pago por WhatsApp con tu número.' },
];

export const metadata: Metadata = {
  title: 'Integraciones — Conecta CFG con tus herramientas | CFG',
  description: 'CFG se integra con Holded, Quipu, Stripe, PayPal, Wise, Zapier, Notion y más.',
}

export default function IntegracionesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Integraciones</h1>
        <p className="text-zinc-300 text-lg mb-10">CFG se conecta con las herramientas que ya usas.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <span className="text-3xl">{t.icon}</span>
              <h2 className="text-xl font-bold mt-2 mb-2">{t.name}</h2>
              <p className="text-sm text-zinc-400">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
            Empezar gratis →
          </Link>
        </div>
      </div>
    </main>
  )
}
`);
console.log('✅ Página /integraciones');
changes++;

// 5. FOOTER: Añadir enlace a Integraciones
if (!page.includes('href="/integraciones"')) {
  page = page.replace(
    '<Link href="/herramientas" className="block text-zinc-400 hover:text-white">Herramientas</Link>',
    '<Link href="/herramientas" className="block text-zinc-400 hover:text-white">Herramientas</Link>\n              <Link href="/integraciones" className="block text-zinc-400 hover:text-white">Integraciones</Link>'
  );
  console.log('✅ Enlace Integraciones en footer');
  changes++;
}

// 6. Plan Starter limitado (1 factura, 1 cliente, sin bloqueo)
page = page.replace(
  /(<li className="flex items-start gap-2"><Check[^>]*>[^<]*<\/Check> )5 facturas\/mes/,
  '$11 factura/mes'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check[^>]*>[^<]*<\/Check> )Bloqueo de hitos/,
  '$1Recordatorios email'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check[^>]*>[^<]*<\/Check> )3 clientes/,
  '$11 cliente'
);
page = page.replace(
  /(<li className="flex items-start gap-2"><Check[^>]*>[^<]*<\/Check> )Recordatorios email/,
  '$1Sin bloqueo de hitos'
);
page = page.replace(
  'Protege hasta 5 facturas al mes.',
  'Protege 1 factura al mes. Ideal para probar el sistema.'
);
console.log('✅ Plan Starter limitado');
changes++;

fs.writeFileSync('src/app/page.tsx', page);
console.log('\n🎉 ' + changes + ' cambios aplicados. Fin del desarrollo.');
