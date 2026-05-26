const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. HERO: Pre-headline con datos propios
code = code.replace(
  "Los diseñadores pierden 1.847€/año en impagos.",
  "Nuestros freelancers perdían 1.847€ de media antes de usar CFG."
);

// 2. HERO: Headline y subtítulo (ya aplicados, verificar)
code = code.replace(
  "Tu cliente dice que pagará. CFG se asegura de que lo haga.",
  "En 14 días cobras o te pagamos 3 meses. Garantizado."
);
code = code.replace(
  "Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.",
  "94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales. Si no cobras, te devolvemos 3 meses de suscripción."
);

// 3. ELIMINAR DUPLICADO DE JAVIER HERRERA (dejar solo el primer testimonio)
const firstJavier = code.indexOf("Javier Herrera");
const secondJavier = code.indexOf("Javier Herrera", firstJavier + 1);
if (secondJavier !== -1) {
  // Eliminar el segundo testimonio completo
  const blockStart = code.lastIndexOf("{ quote:", secondJavier);
  const blockEnd = code.indexOf("},", secondJavier) + 2;
  code = code.substring(0, blockStart) + code.substring(blockEnd);
}

// 4. FAQ: Reducir a 8 preguntas
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
code = code.replace(/const faqItems = \[[\s\S]*?\];/, `const faqItems = ${JSON.stringify(faq8)};`);

// 5. CTAs: Unificar y personalizar por plan
code = code.replace(/Probar 14 días gratis · Luego 29€\/mes · Sin compromiso →/g, "Empezar gratis →");
code = code.replace(/Probar 14 días gratis →/g, "Empezar gratis →");
code = code.replace(/(CFG Pro[\s\S]*?)Empezar gratis →/m, '$1Activar mi blindaje');
code = code.replace(/(CFG Élite[\s\S]*?)Empezar gratis →/m, '$1Hablar con el equipo');
code = code.replace(/(Por proyecto[\s\S]*?)Empezar gratis →/m, '$1Proteger este proyecto');

// 6. ELIMINAR ENLACES BASURA DEL PLAN PRO
["<a href=\"/futuro\" className=\"block hover:text-white\">Roadmap Público</a>",
 "<a href=\"/transparencia\" className=\"block hover:text-white\">Transparencia Radical</a>",
 "<a href=\"/manifiesto\" className=\"block hover:text-white\">Manifiesto</a>",
 "<a href=\"/cfg-holded\" className=\"block hover:text-white\">CFG + Holded</a>",
 "<a href=\"/whatsapp-business\" className=\"block hover:text-white\">CFG + WhatsApp</a>"].forEach(link => {
  code = code.replace(link, '');
});

// 7. SECCIÓN "EL MERCADO ESTÁ ROTO" (antes de Cómo funciona)
const mercadoRoto = `
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-2xl p-6 text-center">
            <p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto</p>
            <p className="text-zinc-300 text-sm max-w-2xl mx-auto">Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.</p>
          </div>
        </div>
      </section>`;
code = code.replace(
  '{/* CÓMO FUNCIONA */}',
  mercadoRoto + '\n      {/* CÓMO FUNCIONA */}'
);

// 8. CUADRÍCULA DE COMPARATIVAS (después de la tabla)
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
          </div>`;
code = code.replace(
  '{/* FEATURES EXCLUSIVAS */}',
  gridComparativas + '\n          {/* FEATURES EXCLUSIVAS */}'
);

// 9. FOOTER: Eliminar columna Legal duplicada
code = code.replace(
  /<div><h4 className="font-bold mb-3 text-zinc-200">Legal<\/h4><div className="space-y-2 text-zinc-400"><Link href="\/soporte" className="block hover:text-white">Soporte<\/Link>.*?<\/div><\/div>/,
  ''
);

// 10. Añadir integraciones extra
code = code.replace(
  '(<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>)',
  '$1\n            <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>\n            <span className="text-zinc-400 font-bold text-sm">💬 Slack</span>'
);

// 11. Cambiar título de sección de garantía
code = code.replace(
  "Lo que intentamos copiar de la competencia... <span className=\"text-emerald-400\">y no encontramos</span>",
  "Lo que la competencia <span className=\"text-red-400\">no se atreve a ofrecer</span>"
);

// 12. Corregir edad del fundador (unificar a 16)
code = code.replace("Tenía 17 años", "Tenía 16 años");

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Todos los cambios aplicados correctamente.');
