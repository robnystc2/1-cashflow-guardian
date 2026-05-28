const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

function safeReplace(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

console.log('🔥 Aplicando cambios finales de la auditoría...\n');

// 1. ELIMINAR DUPLICADO DE "EL MERCADO ESTÁ ROTO"
const mercadoBloque = 'Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.';
let firstMercado = code.indexOf(mercadoBloque);
let secondMercado = code.indexOf(mercadoBloque, firstMercado + 1);
if (secondMercado > -1) {
  // Buscar el <section> que contiene el segundo bloque
  let sectionStart = code.lastIndexOf('<section', secondMercado);
  let sectionEnd = code.indexOf('</section>', secondMercado) + 10;
  code = code.substring(0, sectionStart) + code.substring(sectionEnd);
  console.log('✅ Duplicado Mercado Roto eliminado');
  changes++;
}

// 2. FAQ: CORREGIR DUPLICADOS (reemplazar todo el array)
const faq8 = `const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
    { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
    { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
    { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
  ]`;
code = code.replace(/const faqItems = \[[\s\S]*?\];/, faq8);
console.log('✅ FAQ corregido (8 preguntas)');
changes++;

// 3. TOOLTIPS EN AVATARES
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">CR</div>',
  '<div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Carlos R. — Diseñador, Barcelona. Recuperó 3.200€">CR</div>',
  'Tooltip CR'
);
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">AL</div>',
  '<div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Ana L. — Consultora, México DF. Recuperó 2.100€">AL</div>',
  'Tooltip AL'
);
safeReplace(
  '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold">DM</div>',
  '<div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-zinc-800 flex items-center justify-center text-xs font-bold" title="Diego M. — Fotógrafo, Buenos Aires. Prevención total">DM</div>',
  'Tooltip DM'
);

// 4. UNIFICAR CTAs GENÉRICOS
safeReplace('Probar 14 días gratis →', 'Empezar gratis →', 'CTA genérico');
// Restaurar CTAs específicos de planes
if (code.includes('CFG Pro') && code.includes('Empezar gratis →')) {
  code = code.replace(/(CFG Pro[\s\S]*?)Empezar gratis →/m, '$1Activar mi blindaje');
  console.log('✅ CTA Pro restaurado');
}
if (code.includes('CFG Élite') && code.includes('Empezar gratis →')) {
  code = code.replace(/(CFG Élite[\s\S]*?)Empezar gratis →/m, '$1Hablar con el equipo');
  console.log('✅ CTA Élite restaurado');
}
if (code.includes('Por proyecto') && code.includes('Empezar gratis →')) {
  code = code.replace(/(Por proyecto[\s\S]*?)Empezar gratis →/m, '$1Proteger este proyecto');
  console.log('✅ CTA Por proyecto restaurado');
}

// 5. CORREGIR CTA FINAL (dice "Hablar con el equipo" en lugar de "Empezar gratis")
safeReplace('Hablar con el equipo\nVer comparativa completa de planes →', 'Empezar gratis →\nVer comparativa completa de planes →', 'CTA final');

// 6. ELIMINAR ENLACES BASURA DEL PLAN PRO
['<a href="/futuro" className="block hover:text-white">Roadmap Público</a>',
 '<a href="/transparencia" className="block hover:text-white">Transparencia Radical</a>',
 '<a href="/manifiesto" className="block hover:text-white">Manifiesto</a>',
 '<a href="/cfg-holded" className="block hover:text-white">CFG + Holded</a>',
 '<a href="/whatsapp-business" className="block hover:text-white">CFG + WhatsApp</a>'].forEach(link => {
  if (code.includes(link)) {
    code = code.replaceAll(link, '');
    console.log('✅ Eliminado: ' + link.match(/>(.*?)</)[1]);
    changes++;
  }
});

// 7. TEXTO DE GARANTÍA
safeReplace(
  'Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.',
  'Solo 6 de cada 100 freelancers necesitan activarla.',
  'Texto garantía'
);

// 8. EDAD DEL FUNDADOR
safeReplace('Tenía 17 años', 'Tenía 16 años', 'Edad fundador');

// 9. ELIMINAR TAG "NUEVO"
safeReplace('<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">NUEVO</span>', '', 'Tag NUEVO');

// 10. ELIMINAR PLACEHOLDERS DE VIDEO
if (code.includes('🎥 Video testimonios reales')) {
  code = code.replace(/<div className="mt-8 bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6 text-center">\s*<p className="text-sm text-zinc-400 mb-4">🎥 Video testimonios reales<\/p>[\s\S]*?Próximamente<\/div>\s*<\/div>\s*<\/div>/, '');
  console.log('✅ Placeholders de video eliminados');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' cambios aplicados.');
