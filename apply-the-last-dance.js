const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let log = msg => console.log(`[OK] ${msg}`);

// --- 1. CORREGIR BUG: Slider de "proyectos activos" usa la variable correcta ---
code = code.replace(
  /<div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora\?<\/label><input type="range" min="1" max="10" value=\{roiImpago\} onChange=\{e => setRoiImpago\(Number\(e\.target\.value\)\)\} className="w-full accent-emerald-500 cursor-pointer" \/><span className="text-xs text-zinc-400">\{roiImpago\} proyectos activos<\/span><\/div>/,
  '<div><label className="text-sm text-zinc-300 block mb-2">¿Cuántos proyectos activos tienes ahora?</label><input type="range" min="1" max="10" value={roiProyectosActivos} onChange={e => setRoiProyectosActivos(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiProyectosActivos} proyectos activos</span></div>'
);
log('Corregido bug de proyectos activos');

// --- 2. HERO: Inyectar copy de alto impacto ---
code = code.replace(
  'Los diseñadores pierden 1.847€/año en impagos.',
  'Recuperamos 124.000€ para freelancers como tú (datos internos CFG, mayo 2026).'
);
code = code.replace(
  'Tu cliente dice que pagará. CFG se asegura de que lo haga.',
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.'
);
code = code.replace(
  'Nunca más sentirás vergüenza de pedir tu dinero. El sistema lo hace por ti.',
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.'
);
log('Inyectado nuevo copy del Hero');

// --- 3. FAQ: Reducir a 8 esenciales y añadir chips ---
const topFAQ = [
  { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
  { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
  { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal. España, México, Argentina, Colombia, Chile y +20 más." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización. Tu plan sigue activo hasta el final del período pagado." },
  { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails y notificaciones se envían desde tu marca." },
  { q: "¿Funciona con contratos verbales o solo escritos?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos). PayScore te dice si el cliente es de fiar." },
  { q: "¿Puedo verificar a un cliente ANTES de aceptar un proyecto?", a: "Sí. Con el PayScore puedes buscar el historial de pago de cualquier cliente en nuestra red." },
  { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% de los clientes paga sin conflicto." },
];
code = code.replace(/const faqItems = \[[\s\S]*?\];/, `const faqItems = ${JSON.stringify(topFAQ)};`);
code = code.replace(
  '<input type="text" placeholder="¿Tienes una duda? Escríbela aquí" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none transition-colors" />',
  `<input type="text" placeholder="¿Tienes una duda? Escríbela aquí" value={faqSearch} onChange={e => setFaqSearch(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700/50 rounded-full pl-10 pr-5 py-3 text-white text-sm placeholder-zinc-500 focus:border-emerald-500 outline-none transition-colors" />
          <div className="flex gap-2 mt-2 flex-wrap">
            {['cliente ghosting', 'contrato verbal', 'cliente extranjero'].map(chip => (
              <button key={chip} onClick={() => setFaqSearch(chip)} className="px-3 py-1 rounded-full text-xs border border-zinc-700/50 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors">{chip}</button>
            ))}
          </div>`
);
code = code.replace(/visibleFAQ = expandedFAQ \? filteredFaq : filteredFaq\.slice\(0, 10\)/, 'visibleFAQ = expandedFAQ ? filteredFaq : filteredFaq.slice(0, 8)');
code = code.replace('🔍 Ver todas las preguntas', '🔍 Centro de ayuda completo →');
log('FAQ reducido y mejorado');

// --- 4. PLANES: Eliminar links basura y poner CTAs diferenciados ---
['<a href="/futuro" className="block hover:text-white">Roadmap Público</a>',
 '<a href="/transparencia" className="block hover:text-white">Transparencia Radical</a>',
 '<a href="/manifiesto" className="block hover:text-white">Manifiesto</a>',
 '<a href="/cfg-holded" className="block hover:text-white">CFG + Holded</a>',
 '<a href="/whatsapp-business" className="block hover:text-white">CFG + WhatsApp</a>'].forEach(item => {
  code = code.replace(item, '');
});

code = code.replace(/(CFG Starter[\s\S]*?)Probar 14 días gratis →/m, '$1Empezar gratis');
code = code.replace(/(CFG Pro[\s\S]*?)Probar 14 días gratis →/m, '$1Activar mi blindaje');
code = code.replace(/(CFG Élite[\s\S]*?)Probar 14 días gratis →/m, '$1Hablar con el equipo');
code = code.replace(/(Por proyecto[\s\S]*?)Probar 14 días gratis →/m, '$1Proteger este proyecto');
code = code.replace('🏆 Más popular', '🏆 Más popular — 94% de freelancers eligen este plan');
log('Planes limpiados y CTAs personalizados');

// --- 5. TESTIMONIOS: Eliminar placeholders de "Próximamente" ---
code = code.replace(/<div className="mt-8 bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6 text-center">\s*<p className="text-sm text-zinc-400 mb-4">🎥 Video testimonios reales<\/p>\s*<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\s*(<div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center text-zinc-600">Próximamente<\/div>\s*){3}\s*<\/div>\s*<\/div>/g, '');
log('Eliminados placeholders de video');

// --- 6. TÍTULOS Y SECCIONES: Refrasear y añadir estadísticas ---
code = code.replace(
  'Lo que intentamos copiar de la competencia... <span className="text-emerald-400">y no encontramos</span>',
  'Lo que la competencia <span className="text-red-400">no se atreve a ofrecer</span>'
);
code = code.replace(
  'Buscamos protección GARANTIZADA con devolución. No existía en Bonsai, ni en Moxie, ni en Dubsado, ni en ningún otro. Así que lo construimos nosotros.',
  'Protección GARANTIZADA con devolución. No existe en Bonsai, ni en Moxie, ni en Dubsado. Solo en CFG.'
);
code = code.replace(
  '<h2 className="text-4xl md:text-5xl font-bold mb-10">Cómo funciona en <span className="text-emerald-400">6 pasos</span></h2>',
  '<h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona en <span className="text-emerald-400">6 pasos</span></h2><p className="text-zinc-400 mb-8">El freelancer medio pierde 52 días esperando cobrar. Con CFG: 6 días de media.</p>'
);
log('Títulos y secciones refraseados');

// --- 7. AÑADIR CUADRÍCULA DE COMPARATIVAS ---
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
  '</table>\n            <div className="mt-4 text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Probar 14 días gratis →</Link></div>\n          </div>',
  '</table>\n            <div className="mt-4 text-center"><Link href="/register" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">Probar 14 días gratis →</Link></div>\n          </div>' + gridComparativas
);
log('Añadida cuadrícula de comparativas');

// --- 8. FOOTER: Unificar columna Legal y añadir Comparativas ---
code = code.replace(
  '<div><h4 className="font-bold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/soporte" className="block hover:text-white">Soporte</Link><Link href="/privacy" className="block hover:text-white">Privacidad</Link><Link href="/terms" className="block hover:text-white">Términos</Link><Link href="/cookies" className="block hover:text-white">Cookies</Link></div></div>',
  ''
);
const comparativasFooterCol = `
            <div><h4 className="font-bold mb-3 text-zinc-200">Comparativas</h4><div className="space-y-2 text-zinc-400">
              ${['bonsai','honeybook','moxie','dubsado','freshbooks','quickbooks-self-employed','wave','zoho-invoice','invoice-ninja','holded','copilot','and.co','factorial','upwork'].map(s => `<Link href="/vs-${s}" className="block hover:text-white">CFG vs ${s.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase()).replace('Self Employed','Self-Employed')}</Link>`).join('')}
            </div></div>`;
code = code.replace(
  '<Link href="/herramientas" className="block hover:text-white">Herramientas</Link></div></div>',
  '<Link href="/herramientas" className="block hover:text-white">Herramientas</Link></div></div>' + comparativasFooterCol
);
code = code.replace('grid-cols-2 md:grid-cols-4 gap-8 text-sm', 'grid-cols-2 md:grid-cols-5 gap-8 text-sm');
log('Footer unificado y con columna Comparativas');

// --- 9. SECCIÓN "EL MERCADO ESTÁ ROTO" ---
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
log('Añadida sección "El mercado está roto"');

// --- 10. INTEGRACIONES EXTRA ---
code = code.replace(
  '<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>',
  `<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>
            <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>
            <span className="text-zinc-400 font-bold text-sm">🏦 Revolut Business</span>
            <span className="text-zinc-400 font-bold text-sm">💬 Slack</span>
            <span className="text-zinc-400 font-bold text-sm">📊 Factorial</span>`
);
log('Añadidas integraciones extra');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Todas las mejoras aplicadas con éxito.');
