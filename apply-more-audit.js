const fs = require('fs');
const path = require('path');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

console.log('🔥 Aplicando más cambios de la auditoría...\n');

// 1. Eliminar duplicado de "El mercado está roto" (si aún aparece)
const mercadoText = '⚠️ El mercado freelance está roto';
let first = page.indexOf(mercadoText);
let second = page.indexOf(mercadoText, first + 1);
if (second > -1) {
  let sectionStart = page.lastIndexOf('<section', second);
  let sectionEnd = page.indexOf('</section>', second) + 10;
  page = page.substring(0, sectionStart) + page.substring(sectionEnd);
  console.log('✅ Duplicado Mercado Roto eliminado');
  changes++;
} else {
  console.log('⏭️  Mercado Roto ya está limpio');
}

// 2. Corregir CTAs sueltos (cualquier "Probar 14 días gratis" que quede)
if (page.includes('Probar 14 días gratis →')) {
  page = page.replace(/Probar 14 días gratis →/g, 'Empezar gratis →');
  console.log('✅ CTAs genéricos unificados');
  changes++;
}

// Restaurar CTAs específicos de planes (por si se cambiaron)
const planCTAs = [
  { plan: 'CFG Pro', cta: 'Activar mi blindaje' },
  { plan: 'CFG Élite', cta: 'Hablar con el equipo' },
  { plan: 'Por proyecto', cta: 'Proteger este proyecto' },
];
planCTAs.forEach(({ plan, cta }) => {
  const regex = new RegExp(`(${plan}[\\s\\S]*?)Empezar gratis →`, 'm');
  if (page.match(regex)) {
    page = page.replace(regex, `$1${cta}`);
    console.log('✅ CTA ' + plan + ' restaurado');
    changes++;
  }
});

// 3. Añadir anchor "Calculadora" en el menú si aún no existe
if (!page.includes('href="#calculadora"')) {
  page = page.replace(
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>',
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>\n            <a href="#calculadora" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Calculadora</a>'
  );
  console.log('✅ Anchor Calculadora añadido');
  changes++;
}

// 4. Añadir id="calculadora" a la sección de la calculadora si no existe
if (!page.includes('id="calculadora"')) {
  page = page.replace(
    /<section className="py-16 px-4 bg-zinc-900\/50"><div className="max-w-4xl mx-auto text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente/,
    '<section id="calculadora" className="py-16 px-4 bg-zinc-900/50"><div className="max-w-4xl mx-auto text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente'
  );
  console.log('✅ ID calculadora añadido');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', page);

// 5. Crear páginas VS faltantes con contenido único
const vsPages = {
  'vs-quickbooks-self-employed': 'QuickBooks SE no está pensado para freelancers de servicios. CFG sí.',
  'vs-zoho-invoice': 'Zoho Invoice solo hace facturas. CFG bloquea entregas y te protege de verdad.',
  'vs-invoice-ninja': 'Invoice Ninja no tiene recordatorios inteligentes. CFG los envía por WhatsApp.',
  'vs-holded': 'Holded es un ERP genérico. CFG está diseñado para que los freelancers cobremos.',
  'vs-factorial': 'Factorial es para RRHH, no para freelancers. CFG entiende mi negocio.',
  'vs-and.co': 'AND.CO cerró. Menos mal que encontré CFG a tiempo.',
};

Object.entries(vsPages).forEach(([slug, quote]) => {
  const dir = `src/app/${slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'page.tsx');
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8').length < 500) {
    const content = `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFG vs ${slug.replace('vs-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} — ¿Por qué los freelancers están migrando?',
  description: '${quote}',
}

export default function VsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">CFG vs ${slug.replace('vs-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h1>
        <p className="text-xl text-zinc-300 mb-8">${quote}</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
          Probar CFG 14 días gratis →
        </Link>
      </div>
    </main>
  )
}
`;
    fs.writeFileSync(filePath, content);
    console.log('✅ VS ' + slug + ' creada');
    changes++;
  }
});

console.log('\n🎉 ' + changes + ' cambios adicionales aplicados.');
