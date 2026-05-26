const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. FAQ reducido a 8 preguntas
const faq8 = [
  { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
  { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
  { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
  { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
  { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
  { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
  { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% de los clientes paga sin conflicto." },
];
code = code.replace(/const faqItems = \[[\s\S]*?\];/, `const faqItems = ${JSON.stringify(faq8)};`);

// 2. Texto de profesión dinámico corregido (todas las opciones)
const profesionesTexto = [
  { prof: 'Diseñador', texto: '47.200€ recuperados para diseñadores' },
  { prof: 'Desarrollador', texto: '58.300€ recuperados para desarrolladores' },
  { prof: 'Consultor', texto: '32.100€ recuperados para consultores' },
  { prof: 'Fotógrafo', texto: '18.500€ recuperados para fotógrafos' },
  { prof: 'Copywriter', texto: '25.400€ recuperados para copywriters' },
  { prof: 'Traductor', texto: '11.200€ recuperados para traductores' },
  { prof: 'Gestor de Ads', texto: '19.800€ recuperados para gestores de ads' },
  { prof: 'Asistente Virtual', texto: '15.300€ recuperados para asistentes virtuales' },
  { prof: 'Editor de vídeo', texto: '10.900€ recuperados para editores de vídeo' },
  { prof: 'Agencia pequeña', texto: '8.700€ recuperados para agencias' },
  { prof: 'Coach / Terapeuta', texto: '5.600€ recuperados para coaches' },
  { prof: 'Productor musical', texto: '3.200€ recuperados para productores musicales' },
];
const ternario = profesionesTexto.map(p => `heroProfession === '${p.prof}' ? '${p.texto}'`).join(' : ') + " : 'Selecciona tu profesión para ver tu riesgo real'";
code = code.replace(
  /<p className="text-sm text-red-400\/80 font-medium mb-2">\{heroProfession === 'Diseñador' \? '.*?' : heroProfession === 'Desarrollador' \? '.*?' : heroProfession === 'Consultor' \? '.*?' : heroProfession === 'Fotógrafo' \? '.*?' : 'Selecciona tu profesión para ver tu riesgo real\.'\}<\/p>/,
  `<p className="text-sm text-red-400/80 font-medium mb-2">{${ternario}}</p>`
);

// 3. Eliminar duplicado de "El mercado está roto" (mantener solo la primera ocurrencia)
const mercadoBloque = /<section className="py-12 px-4 bg-zinc-950">\s*<div className="max-w-4xl mx-auto">\s*<div className="bg-amber-900\/20 border border-amber-700\/30 rounded-2xl p-6 text-center">\s*<p className="text-amber-300 font-bold text-lg mb-2">⚠️ El mercado freelance está roto<\/p>[\s\S]*?<\/section>/;
const matches = code.match(mercadoBloque);
if (matches && matches.length > 1) {
  // Si hay más de uno, eliminamos el segundo
  const firstIndex = code.indexOf(matches[0]);
  const secondIndex = code.indexOf(matches[0], firstIndex + 1);
  if (secondIndex !== -1) {
    code = code.substring(0, secondIndex) + code.substring(secondIndex + matches[0].length);
    console.log('Duplicado de "El mercado está roto" eliminado.');
  }
}

// 4. Insertar grid de comparativas justo después del cierre de la tabla (</table>) y antes del div del CTA
const grid = `
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
  '$1' + grid + '\n          </div>'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('Correcciones aplicadas.');
