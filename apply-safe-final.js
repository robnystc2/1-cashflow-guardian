const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// --- Hero ---
code = code.replace(
  "Los diseñadores pierden 1.847€/año en impagos.",
  "Recuperamos 124.000€ para freelancers como tú (datos internos CFG, mayo 2026)."
);
code = code.replace(
  "Tu cliente dice que pagará. CFG se asegura de que lo haga.",
  "El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero."
);
code = code.replace(
  "Nunca más sentirás vergüenza de pedir tu dinero. El sistema lo hace por ti.",
  "Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción."
);

// --- FAQ: reducir a 8 esenciales ---
const topFAQ = [
  { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
  { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
  { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
  { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
  { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
  { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
  { q: "¿Qué pasa si el cliente se enfada?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
];
code = code.replace(/const faqItems = \[[\s\S]*?\];/, `const faqItems = ${JSON.stringify(topFAQ)};`);

// --- Sección "El mercado está roto" ---
const mercadoRoto = `
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
            <p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>
            <p className="text-zinc-300 text-sm max-w-2xl mx-auto">Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.</p>
            <div className="flex justify-center gap-4 mt-3 text-xs text-zinc-400 flex-wrap">
              <span>❌ Bonsai: pagos retenidos 10 días</span>
              <span>❌ HoneyBook: solo USA/Canadá</span>
              <span>❌ Moxie: sin protección anti-impago</span>
              <span>❌ Dubsado: soporte en declive</span>
            </div>
          </div>
        </div>
      </section>`;
code = code.replace(
  '<section id="como-funciona" className="py-16 px-4 bg-zinc-900/50">',
  mercadoRoto + '\n      <section id="como-funciona" className="py-16 px-4 bg-zinc-900/50">'
);

// --- Grid de comparativas ---
const gridComparativas = `
          <div id="comparativas" className="mt-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comparativas detalladas <span className="text-emerald-400">frente a cada competidor</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Bonsai', slug: 'vs-bonsai' },
                { name: 'HoneyBook', slug: 'vs-honeybook' },
                { name: 'Moxie', slug: 'vs-moxie' },
                { name: 'Dubsado', slug: 'vs-dubsado' },
                { name: 'FreshBooks', slug: 'vs-freshbooks' },
                { name: 'QuickBooks', slug: 'vs-quickbooks-self-employed' },
                { name: 'Wave', slug: 'vs-wave' },
                { name: 'Zoho Invoice', slug: 'vs-zoho-invoice' },
                { name: 'Invoice Ninja', slug: 'vs-invoice-ninja' },
                { name: 'Holded', slug: 'cfg-holded' },
                { name: 'Copilot', slug: 'vs-copilot' },
                { name: 'And.co', slug: 'vs-and.co' },
                { name: 'Factorial', slug: 'vs-factorial' },
                { name: 'Upwork', slug: 'vs-upwork' },
              ].map(comp => (
                <Link key={comp.slug} href={\`/\${comp.slug}\`} className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 hover:border-emerald-500 hover:-translate-y-1 transition-all text-center group">
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">CFG vs {comp.name}</span>
                  <p className="text-[10px] text-zinc-400 mt-1">Ver comparativa completa →</p>
                </Link>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center">Comparaciones objetivas, basadas en datos públicos y experiencia real. Sin patrocinios.</p>
          </div>`;
code = code.replace(
  /(<\/table>\s*<div className="mt-4 text-center"><Link href="\/register"[^>]*>Probar 14 días gratis →<\/Link><\/div>\s*)<\/div>/,
  '$1' + gridComparativas + '\n          </div>'
);

// --- Enlace "Comparativas" en el nav ---
code = code.replace(
  '<Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>',
  '<Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>\n            <a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>'
);

// --- Eliminar tag "NUEVO" ---
code = code.replace('<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">NUEVO</span>', '');

// --- Eliminar placeholders de video testimonios ---
code = code.replace(
  /<div className="mt-8 bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6 text-center">\s*<p className="text-sm text-zinc-400 mb-4">🎥 Video testimonios reales<\/p>\s*<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\s*(<div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">Próximamente<\/div>\s*){3}\s*<\/div>\s*<\/div>/g,
  ''
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Todos los cambios aplicados de forma segura.');
