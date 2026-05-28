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

console.log('🔥 REAPLICANDO TODAS LAS MEJORAS SOBRE BASE ESTABLE...\n');

// 1. HERO - Headline
safeReplace(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.',
  'Headline hero'
);

// 2. HERO - Subtítulo
safeReplace(
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.',
  'Subtítulo hero'
);

// 3. HERO - Pre-headline
safeReplace(
  '47.200€ recuperados para diseñadores',
  'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.',
  'Pre-headline hero'
);

// 4. HERO - Ángulo de crecimiento
if (!code.includes('Los freelancers de CFG suben sus precios')) {
  code = code.replace(
    '</h1>',
    '</h1><p className="text-xs text-emerald-400 mt-2 max-w-xl mx-auto lg:mx-0">Los freelancers de CFG suben sus precios un 40% en promedio porque saben que cobrarán siempre.</p>'
  );
  console.log('✅ Ángulo de crecimiento en hero');
  changes++;
}

// 5. HERO - Trust strip con garantía
safeReplace(
  '✓ Cancela cuando quieras',
  '✓ Cancela cuando quieras · Garantía Blindaje Total incluida',
  'Garantía en trust strip'
);

// 6. CTAs genéricos
safeReplace('Probar 14 días gratis →', 'Empezar gratis →', 'CTA genérico');
safeReplace('Proteger mi primer proyecto gratis →', 'Empezar gratis →', 'CTA antiguo');

// 7. CTAs planes
if (code.includes('CFG Pro') && code.includes('Empezar gratis →')) {
  code = code.replace(/(CFG Pro[\s\S]*?)Empezar gratis →/m, '$1Activar mi blindaje');
  console.log('✅ CTA Plan Pro');
  changes++;
}
if (code.includes('CFG Élite') && code.includes('Empezar gratis →')) {
  code = code.replace(/(CFG Élite[\s\S]*?)Empezar gratis →/m, '$1Hablar con el equipo');
  console.log('✅ CTA Plan Élite');
  changes++;
}
if (code.includes('Por proyecto') && code.includes('Empezar gratis →')) {
  code = code.replace(/(Por proyecto[\s\S]*?)Empezar gratis →/m, '$1Proteger este proyecto');
  console.log('✅ CTA Por proyecto');
  changes++;
}

// 8. FAQ reducido a 8 preguntas
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
if (code.includes('const faqItems = [')) {
  code = code.replace(/const faqItems = \[[\s\S]*?\];/, faq8);
  console.log('✅ FAQ reducido a 8 preguntas');
  changes++;
}

// 9. FAQ - Cambiar enlace
safeReplace('🔍 Ver todas las preguntas', '🔍 Ver centro de ayuda →', 'Enlace FAQ');

// 10. MERCADO ROTO - Eliminar duplicado
const mercadoBloque = 'Bonsai fue comprada por Zoom. HoneyBook subió precios un 89%. AND.CO cerró. Dubsado requiere especialistas de $500 para configurarlo. CFG es independiente, construido en España, y cuesta menos de 1€ al día.';
let firstMercado = code.indexOf(mercadoBloque);
let secondMercado = code.indexOf(mercadoBloque, firstMercado + 1);
if (secondMercado > -1) {
  let sectionStart = code.lastIndexOf('<section', secondMercado);
  let sectionEnd = code.indexOf('</section>', secondMercado) + 10;
  if (sectionStart > -1 && sectionEnd > 10) {
    code = code.substring(0, sectionStart) + code.substring(sectionEnd);
    console.log('✅ Duplicado Mercado Roto eliminado');
    changes++;
  }
}

// 11. TOOLTIPS en avatares
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

// 12. GARANTÍA - Texto
safeReplace(
  'Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.',
  'Solo 6 de cada 100 freelancers necesitan activarla. El 94% cobra sin incidencias.',
  'Texto garantía'
);

// 13. SOPORTE
safeReplace(
  'Soporte en español nativo 24/7',
  'Soporte prioritario en español < 4h',
  'Soporte corregido'
);

// 14. VIDEO PLACEHOLDERS - Eliminar
const videoRegex = /<div className="mt-8 bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6 text-center">[\s\S]*?Próximamente<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
if (videoRegex.test(code)) {
  code = code.replace(videoRegex, '');
  console.log('✅ Placeholders de video eliminados');
  changes++;
}

// 15. TAG NUEVO
safeReplace('<span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">NUEVO</span>', '', 'Tag NUEVO eliminado');

// 16. ENLACES BASURA PLAN PRO
['<a href="/futuro" className="block hover:text-white">Roadmap Público</a>',
 '<a href="/transparencia" className="block hover:text-white">Transparencia Radical</a>',
 '<a href="/manifiesto" className="block hover:text-white">Manifiesto</a>',
 '<a href="/cfg-holded" className="block hover:text-white">CFG + Holded</a>',
 '<a href="/whatsapp-business" className="block hover:text-white">CFG + WhatsApp</a>'].forEach(link => {
  if (code.includes(link)) {
    code = code.replaceAll(link, '');
    console.log('✅ Enlace basura eliminado');
    changes++;
  }
});

// 17. EDAD FUNDADOR
safeReplace('Tenía 17 años', 'Tenía 16 años', 'Edad fundador');

// 18. FUNDADOR - Cierre circular
safeReplace(
  'Así que construí CFG. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura.',
  'Así que construí CFG. Y desde entonces, 847 freelancers no han vuelto a perseguir una factura. Ninguno.',
  'Cierre fundador'
);

// 19. INTEGRACIONES EXTRA
if (!code.includes('💳 Stripe')) {
  code = code.replace(
    '<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>',
    '<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>\n            <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>\n            <span className="text-zinc-400 font-bold text-sm">💬 Slack</span>'
  );
  console.log('✅ Integraciones extra añadidas');
  changes++;
}

// 20. ENLACE CALCULADORA EN NAV
if (!code.includes('href="#calculadora"')) {
  code = code.replace(
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>',
    '<a href="#precios" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Precios</a>\n            <a href="#calculadora" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Calculadora</a>'
  );
  console.log('✅ Enlace Calculadora en nav');
  changes++;
}

// 21. TÍTULO SECCIÓN GARANTÍA
safeReplace(
  'Lo que intentamos copiar de la competencia... <span className="text-emerald-400">y no encontramos</span>',
  'Lo que la competencia <span className="text-red-400">no se atreve a ofrecer</span>',
  'Título garantía'
);

// 22. SECCIÓN "LO QUE HACE CFG" - Añadir eIDAS
safeReplace(
  'Firma digital de hitos',
  'Firma digital de hitos (cumple eIDAS)',
  'eIDAS en features'
);

// 23. WHATSAPP - Fuente
safeReplace(
  'WhatsApp tiene 98% de tasa de apertura vs 20% del email',
  'WhatsApp tiene 98% de tasa de apertura (fuente: Meta) vs 20% del email',
  'Fuente WhatsApp'
);

// 24. FOOTER - Unificar columna Legal (eliminar duplicado)
const legalDuplicado = '<div><h4 className="font-bold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/soporte"';
if (code.includes(legalDuplicado)) {
  let idx = code.indexOf(legalDuplicado);
  let endIdx = code.indexOf('</div></div>', idx + 100) + 12;
  if (endIdx > 12) {
    code = code.substring(0, idx) + code.substring(endIdx);
    console.log('✅ Columna Legal duplicada eliminada');
    changes++;
  }
}

// 25. NAV - Añadir "Comparativas" entre Casos de éxito y Herramientas
safeReplace(
  '<Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>',
  '<Link href="/casos" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Casos de éxito</Link>\n            <a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>',
  'Enlace Comparativas en nav'
);

// 26. CORREGIR CTA FINAL
safeReplace('Probar 14 días gratis →\nVer comparativa completa de planes →', 'Empezar gratis →\nVer comparativa completa de planes →', 'CTA final');

// 27. MONEDAS LatAm EN PRECIOS
safeReplace(
  'Sin costes ocultos. Sin permanencia. Sin sorpresas.',
  'Sin costes ocultos. Sin permanencia. Sin sorpresas. Pagos disponibles en USD, MXN, COP.',
  'Monedas LatAm'
);

// 28. ROI EN PRECIOS
if (!code.includes('Calcula tu ROI personalizado')) {
  code = code.replace(
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.',
    'Todos los precios en euros (€). Sin costes ocultos. Sin permanencia. Sin sorpresas.\n          <p className="text-xs text-zinc-400 mt-2">💡 <a href="#calculadora" className="text-emerald-400 hover:text-emerald-300">Calcula tu ROI personalizado →</a></p>'
  );
  console.log('✅ ROI en precios');
  changes++;
}

// 29. ENLACE TESTIMONIOS
safeReplace('🔍 Ver más testimonios →', '🔍 Ver todos los casos de éxito →', 'Link testimonios');

// 30. INDEPENDENCIA REFORZADA
safeReplace(
  'CFG es independiente y construido en España.',
  'CFG es independiente, construido en España, y no tenemos planes de vendernos.',
  'Independencia reforzada'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' mejoras aplicadas correctamente.');
