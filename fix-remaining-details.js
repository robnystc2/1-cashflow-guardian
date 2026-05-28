const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Eliminar el segundo bloque duplicado de "El mercado freelance está roto"
const mercadoTexto = '⚠️ El mercado freelance está roto';
let firstMercado = code.indexOf(mercadoTexto);
let secondMercado = code.indexOf(mercadoTexto, firstMercado + 1);

if (secondMercado > -1) {
  // Buscar el inicio de la segunda sección (el <section> más cercano hacia atrás)
  let sectionStart = code.lastIndexOf('<section', secondMercado);
  // Buscar el cierre de esa sección (</section> más cercano hacia adelante)
  let sectionEnd = code.indexOf('</section>', secondMercado) + 10;
  
  if (sectionStart > -1 && sectionEnd > 10) {
    code = code.substring(0, sectionStart) + code.substring(sectionEnd);
    console.log('✅ Segundo bloque "El mercado freelance está roto" eliminado.');
  }
}

// 2. FAQ: reemplazar por el array limpio de 8 preguntas (si existe)
const faqStart = code.indexOf('const faqItems = [');
if (faqStart > -1) {
  const faqEnd = code.indexOf('];', faqStart) + 2;
  const faq8 = `const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
    { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
    { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
    { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
  ];`;
  
  code = code.substring(0, faqStart) + faq8 + code.substring(faqEnd);
  console.log('✅ FAQ reemplazado con 8 preguntas limpias.');
} else {
  console.log('❌ No se encontró faqItems.');
}

// 3. Actualizar texto de la garantía (Solo 51 de 849... → Solo 6 de cada 100...)
code = code.replace(
  /Solo 51 de 849 suscripciones activas han necesitado la garantía\. El 94% nunca la activa\./g,
  'Solo 6 de cada 100 freelancers necesitan activarla. El 94% cobra sin incidencias.'
);

// 4. Cambiar enlace de testimonios ("Ver más testimonios →" → "Ver todos los casos de éxito →")
code = code.replace(/🔍 Ver más testimonios →/g, '🔍 Ver todos los casos de éxito →');

// 5. Añadir eIDAS y fuente Meta en features (por si no se aplicó antes)
code = code.replace('Firma digital de hitos', 'Firma digital de hitos (cumple eIDAS)');
code = code.replace('WhatsApp tiene 98% de tasa de apertura vs 20% del email', 'WhatsApp tiene 98% de tasa de apertura (fuente: Meta) vs 20% del email');

// 6. Eliminar columna Legal duplicada en el footer
const legalDuplicado = '<div><h4 className="font-bold mb-3 text-zinc-200">Legal</h4><div className="space-y-2 text-zinc-400"><Link href="/soporte"';
let idx = code.indexOf(legalDuplicado);
if (idx > -1) {
  let endIdx = code.indexOf('</div></div>', idx + 100) + 12;
  if (endIdx > 12) {
    code = code.substring(0, idx) + code.substring(endIdx);
    console.log('✅ Columna Legal duplicada eliminada del footer.');
  }
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Ajustes finales realizados.');
