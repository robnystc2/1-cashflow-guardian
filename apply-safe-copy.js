const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

// Función que reemplaza SOLO si encuentra el texto literal (no usa regex)
function safeReplaceString(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

console.log('🔥 Aplicando cambios de copy seguros...\n');

// 1. HERO - Headline (texto exacto de la versión restaurada)
safeReplaceString(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.',
  'Headline hero'
);

// 2. HERO - Subtítulo
safeReplaceString(
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.',
  'Subtítulo hero'
);

// 3. CTAs genéricos
safeReplaceString('Probar 14 días gratis →', 'Empezar gratis →', 'CTA genérico');

// 4. CTAs planes (usamos regex directamente con replace)
if (code.includes('CFG Pro') && code.includes('Probar 14 días gratis →')) {
  code = code.replace(/(CFG Pro[\s\S]*?)Probar 14 días gratis →/m, '$1Activar mi blindaje');
  console.log('✅ CTA Plan Pro');
  changes++;
}
if (code.includes('CFG Élite') && code.includes('Probar 14 días gratis →')) {
  code = code.replace(/(CFG Élite[\s\S]*?)Probar 14 días gratis →/m, '$1Hablar con el equipo');
  console.log('✅ CTA Plan Élite');
  changes++;
}
if (code.includes('Por proyecto') && code.includes('Probar 14 días gratis →')) {
  code = code.replace(/(Por proyecto[\s\S]*?)Probar 14 días gratis →/m, '$1Proteger este proyecto');
  console.log('✅ CTA Por proyecto');
  changes++;
}

// 5. FAQ reducido a 8 preguntas (reemplazo exacto)
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

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' cambios aplicados.');
