const fs = require('fs');
const path = require('path');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

console.log('🔥 ÚLTIMO BARRIDO: aplicando hasta lo más mínimo...\n');

// Helper
function safeReplace(orig, repl, desc) {
  if (page.includes(orig)) {
    page = page.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

// 1. Asegurar que no queda ningún "Probar 14 días gratis →" en ninguna página
const allFiles = [];
function walkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.next') {
      walkDir(fullPath);
    } else if (f.isFile() && (f.name.endsWith('.tsx') || f.name.endsWith('.ts'))) {
      allFiles.push(fullPath);
    }
  }
}
walkDir('src');
let ctaChanges = 0;
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Probar 14 días gratis →')) {
    content = content.replace(/Probar 14 días gratis →/g, 'Empezar gratis →');
    fs.writeFileSync(file, content);
    ctaChanges++;
  }
});
console.log('✅ CTAs unificados en ' + ctaChanges + ' archivos');
changes += ctaChanges;

// 2. Reemplazar también "Proteger mi primer proyecto gratis →" residual
page = fs.readFileSync('src/app/page.tsx', 'utf8');
safeReplace('Proteger mi primer proyecto gratis →', 'Empezar gratis →', 'CTA antiguo eliminado');

// 3. Asegurar que el toggle Anual es default
if (!page.includes("useState<'monthly' | 'annual'>('annual')")) {
  page = page.replace("useState<'monthly' | 'annual'>('monthly')", "useState<'monthly' | 'annual'>('annual')");
  console.log('✅ Toggle Anual por defecto (corregido)');
  changes++;
}

// 4. Eliminar cualquier duplicado residual de "El mercado está roto"
const mercadoText = '⚠️ El mercado freelance está roto';
let first = page.indexOf(mercadoText);
let second = page.indexOf(mercadoText, first + 1);
if (second > -1) {
  let sectionStart = page.lastIndexOf('<section', second);
  let sectionEnd = page.indexOf('</section>', second) + 10;
  page = page.substring(0, sectionStart) + page.substring(sectionEnd);
  console.log('✅ Duplicado Mercado Roto eliminado (último)');
  changes++;
}

// 5. Añadir más ítems a "Nunca más" si aún no están
if (page.includes('Trabajar gratis') && !page.includes('Regalar tu tiempo')) {
  page = page.replace(
    "['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza']",
    "['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza', 'Aceptar clientes sin verificar', 'No poder subir precios por miedo', 'Revisar el banco cada mañana con ansiedad']"
  );
  console.log('✅ Sección Nunca Más ampliada');
  changes++;
}

// 6. FAQ: Asegurar que tiene las 8 preguntas correctas (sin duplicados)
const faq8 = [
  { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
  { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
  { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
  { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
  { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
  { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
  { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
];
const faqRegex = /const faqItems = \[[\s\S]*?\];/;
if (faqRegex.test(page)) {
  page = page.replace(faqRegex, `const faqItems = ${JSON.stringify(faq8)};`);
  console.log('✅ FAQ reescrito (8 preguntas exactas)');
  changes++;
}

// 7. Añadir tooltips en avatares si aún faltan
if (!page.includes('title="Carlos R.')) {
  page = page.replace(
    '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">CR</div>',
    '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Carlos R. — Diseñador, Barcelona. Recuperó 3.200€">CR</div>'
  );
  page = page.replace(
    '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">AL</div>',
    '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Ana L. — Consultora, México DF. Recuperó 2.100€">AL</div>'
  );
  page = page.replace(
    '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">DM</div>',
    '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Diego M. — Fotógrafo, Buenos Aires. Prevención total">DM</div>'
  );
  console.log('✅ Tooltips en avatares');
  changes++;
}

// 8. Eliminar cualquier tag "NUEVO" residual
safeReplace('<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">NUEVO</span>', '', 'Tag NUEVO eliminado');

// 9. Reemplazar "Ver más testimonios" por "Ver todos los casos de éxito"
safeReplace('🔍 Ver más testimonios →', '🔍 Ver todos los casos de éxito →', 'Link testimonios');

// 10. Añadir "Garantía Blindaje Total incluida" en el trust strip debajo del CTA del hero
safeReplace('✓ Cancela cuando quieras', '✓ Cancela cuando quieras · Garantía Blindaje Total incluida', 'Garantía en trust strip');

// 11. Añadir anchor "calculadora" en la nav si no existe
if (!page.includes('href="#calculadora"')) {
  page = page.replace(
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>',
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>\n            <a href="#calculadora" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Calculadora</a>'
  );
  console.log('✅ Enlace Calculadora en nav');
  changes++;
}

// 12. Asegurar que el id="calculadora" está en la sección
if (!page.includes('id="calculadora"')) {
  page = page.replace(
    /<section className="py-16 px-4 bg-zinc-900\/50"><div className="max-w-4xl mx-auto text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente/,
    '<section id="calculadora" className="py-16 px-4 bg-zinc-900/50"><div className="max-w-4xl mx-auto text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">Calcula exactamente'
  );
  console.log('✅ ID calculadora añadido');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', page);

// ====== VS PAGES CON CONTENIDO ÚNICO PARA TODOS ======
const vsQuotes = {
  'vs-bonsai': 'Bonsai fue comprada por Zoom en 2025. Tus contratos, tus clientes y tu historial ahora están en manos de una empresa de videoconferencias. CFG es independiente, construido en España, y no tenemos planes de vendernos.',
  'vs-honeybook': 'HoneyBook fue diseñado para el mercado americano. Sus plantillas legales son para legislación estadounidense. Si tu cliente es español o latinoamericano, necesitas protección adaptada a tu jurisdicción.',
  'vs-moxie': 'Moxie tiene buen diseño pero cero protección anti-impago. Con CFG, activas el Escudo Legal y en 48h tienes tu dinero.',
  'vs-dubsado': 'Dubsado necesita un especialista para configurarlo. CFG lo tienes listo en 3 minutos. Sin curva de aprendizaje.',
  'vs-freshbooks': 'FreshBooks es software de contabilidad que añadió recordatorios. CFG es protección de ingresos con facturación integrada.',
  'vs-quickbooks-self-employed': 'QuickBooks SE no está pensado para freelancers de servicios. CFG está diseñado específicamente para proteger tus cobros.',
  'vs-wave': 'Wave es gratuito porque monetiza tus datos. CFG cobra 29€/mes porque su negocio es protegerte, no venderte.',
  'vs-zoho-invoice': 'Zoho Invoice solo hace facturas. CFG bloquea entregas, envía recordatorios y te protege de verdad.',
  'vs-invoice-ninja': 'Invoice Ninja no tiene recordatorios inteligentes. CFG los envía por WhatsApp con un 98% de tasa de apertura.',
  'vs-holded': 'Holded es un ERP genérico. CFG está diseñado exclusivamente para que los freelancers cobren siempre.',
  'vs-copilot': 'Copilot tiene un buen portal de cliente, pero cero protección anti-impago. CFG lo tiene todo.',
  'vs-and.co': 'AND.CO cerró. Miles de freelancers se quedaron sin herramienta. CFG es la alternativa independiente.',
  'vs-factorial': 'Factorial es software de RRHH, no para freelancers. CFG entiende tu negocio y te protege.',
  'vs-upwork': 'Upwork se queda con el 20% de cada proyecto para siempre. Con CFG, el 100% es tuyo. Solo 29€/mes.',
};

Object.entries(vsQuotes).forEach(([slug, quote]) => {
  const filePath = `src/app/${slug}/page.tsx`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Reemplazar el párrafo de lead
    content = content.replace(
      /<p className="text-xl text-zinc-300 mb-8">[^<]*<\/p>/,
      `<p className="text-xl text-zinc-300 mb-8">${quote}</p>`
    );
    fs.writeFileSync(filePath, content);
    console.log('✅ VS ' + slug + ' actualizada');
    changes++;
  }
});

console.log('\n🎉 ' + changes + ' micro-mejoras finales aplicadas.');
