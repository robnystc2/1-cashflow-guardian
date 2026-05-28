const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

// Helper
function safeReplace(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado o ya aplicado)');
  }
}

console.log('🔥 Aplicando cambios de la auditoría...\n');

// ====== ELIMINAR ======
// 2. Testimonio duplicado de Javier Herrera (si hay 2, eliminar el segundo)
let firstJavier = code.indexOf('Javier Herrera');
let secondJavier = code.indexOf('Javier Herrera', firstJavier + 1);
if (secondJavier > -1) {
  let blockStart = code.lastIndexOf('{ quote:', secondJavier);
  let blockEnd = code.indexOf('},', secondJavier) + 2;
  code = code.substring(0, blockStart) + code.substring(blockEnd);
  console.log('✅ Testimonio duplicado de Javier Herrera eliminado');
  changes++;
}

// 4. Cambiar "Seguro de impago opcional" por "Garantía interna CFG"
safeReplace('Seguro de impago opcional: Para proyectos +5.000€. Cobertura total pagando solo el 2-3%.', 'Garantía interna CFG para proyectos +5.000€.', 'Seguro de impago');

// 5. Cambiar "Contratos personalizados por abogado"
safeReplace('Contratos personalizados por abogado', 'Contratos con plantillas revisadas por abogado', 'Contratos abogado');

// 6. Eliminar "Empresa verificada" del footer
safeReplace('Empresa verificada', '', 'Empresa verificada footer');

// 9. Eliminar placeholders de video testimonios
const videoRegex = /<div className="mt-8 bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6 text-center">\s*<p className="text-sm text-zinc-400 mb-4">🎥 Video testimonios reales<\/p>[\s\S]*?Próximamente<\/div>\s*<\/div>\s*<\/div>/;
if (videoRegex.test(code)) {
  code = code.replace(videoRegex, '');
  console.log('✅ Placeholders de video testimonios eliminados');
  changes++;
}

// 10. Unificar edad del fundador a 16
safeReplace('Tenía 17 años', 'Tenía 16 años', 'Edad fundador a 16');

// 14. Eliminar "¿Eres estudiante? Pide tu descuento →"
safeReplace('¿Eres estudiante? Pide tu descuento →', '', 'Descuento estudiante');

// 15. Eliminar urgencia falsa "Plazas limitadas"
safeReplace('Plazas limitadas a 29€/mes. Después subirá.', '', 'Urgencia falsa plazas');

// 19. Cambiar texto de la barra de garantía
safeReplace('Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.', 'Solo 6 de cada 100 freelancers necesitan activarla.', 'Texto garantía');

// 22. Cambiar "Soporte en español nativo 24/7"
safeReplace('Soporte en español nativo 24/7', 'Soporte prioritario en español < 4h', 'Soporte 24/7');

// 24. Unificar números inconsistentes
safeReplace('848 casos gestionados', '847 casos gestionados', 'Casos 848→847');

// 25. Cambiar texto de "¿No está tu profesión?"
safeReplace('¿No está tu profesión?', '¿Otra profesión?', 'Texto otra profesión');
safeReplace('Yo también existo →', 'CFG te protege también →', 'CTA otra profesión');

// ====== HERO ======
// 26. Pre-headline con datos propios
safeReplace('Los diseñadores pierden 1.847€/año en impagos.', 'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.', 'Pre-headline hero');

// 27. Headline con garantía primero (ya lo tenemos, verificar)
if (!code.includes('En 14 días cobras o te pagamos 3 meses')) {
  safeReplace('El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.', 'En 14 días cobras o te pagamos 3 meses. Garantizado.', 'Headline garantía');
}

// 28. Subhero sin paréntesis
safeReplace('94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales. Si no cobras, te devolvemos 3 meses de suscripción.', '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.', 'Subhero limpio');

// ====== GARANTÍA ======
// 45. Cambiar "El cliente acepta los hitos (1 clic)"
safeReplace('El cliente acepta los hitos (1 clic)', 'El cliente recibe notificación del proyecto y los términos de entrega', 'Paso garantía');

// 46. Cambiar "en efectivo" por "transferencia bancaria"
safeReplace('en efectivo, en 48 horas', 'por transferencia bancaria en 48h', 'Efectivo→transferencia');

// ====== PRICING ======
// 66. Añadir texto de ROI encima de los planes (buscar la sección de precios)
const pricingSection = 'Todos los planes incluyen la Garantía Blindaje Total.';
if (code.includes(pricingSection)) {
  const roiText = '<p className="text-sm text-zinc-400 max-w-2xl mx-auto mb-4">💡 Un solo impago recuperado paga 7 años de CFG Pro. Matemática obvia.</p>';
  code = code.replace(pricingSection, pricingSection + '\n          ' + roiText);
  console.log('✅ ROI text en pricing');
  changes++;
}

// ====== FAQ ======
// 68. Añadir preguntas críticas al FAQ
const faqExtra = [
  { q: '¿Qué pasa si el cliente paga parcialmente?', a: 'El sistema registra el pago parcial y mantiene el hito bloqueado hasta recibir el importe completo.' },
  { q: '¿Hay un límite de importe para el Escudo Legal?', a: 'El Escudo Legal cubre facturas de hasta 50.000€.' },
];
const faqStr = JSON.stringify(faqExtra);
const faqEnd = code.indexOf('];', code.indexOf('const faqItems = [')) + 2;
if (faqEnd > 2) {
  const insertion = ',\n    ' + faqExtra.map(q => JSON.stringify(q)).join(',\n    ');
  code = code.substring(0, faqEnd - 2) + insertion + '\n  ];';
  console.log('✅ Preguntas FAQ añadidas');
  changes++;
}

// ====== FOOTER ======
// Unificar columna Legal (eliminar duplicado si existe)
if (code.includes('<Link href="/soporte" className="block hover:text-white">Soporte</Link>')) {
  code = code.replace(/<div><h4 className="font-bold mb-3 text-zinc-200">Legal<\/h4><div className="space-y-2 text-zinc-400"><Link href="\/soporte".*?<\/div><\/div>/, '');
  console.log('✅ Columna Legal duplicada eliminada');
  changes++;
}

// ====== INTEGRACIONES ======
// Añadir más integraciones si faltan
if (!code.includes('💳 Stripe')) {
  code = code.replace(
    '<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>',
    '<span className="text-zinc-400 font-bold text-sm">📝 Notion</span>\n            <span className="text-zinc-400 font-bold text-sm">💳 Stripe</span>\n            <span className="text-zinc-400 font-bold text-sm">💬 Slack</span>'
  );
  console.log('✅ Integraciones extra añadidas');
  changes++;
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' cambios aplicados de la auditoría.');
