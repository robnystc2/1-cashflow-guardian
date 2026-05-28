const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// --- 1. FAQ: reemplazar array entero por las 8 preguntas correctas ---
const faqStart = code.indexOf('const faqItems = [');
if (faqStart !== -1) {
  const faqEnd = code.indexOf('];', faqStart) + 2; // incluye ];
  const newFaq = `const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
    { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
    { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
    { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
  ];`;
  code = code.substring(0, faqStart) + newFaq + code.substring(faqEnd);
  console.log('✅ FAQ reemplazado.');
}

// --- 2. Eliminar duplicado de "El mercado freelance está roto" ---
const mercadoStr = '⚠️ El mercado freelance está roto';
let firstIdx = code.indexOf(mercadoStr);
let secondIdx = code.indexOf(mercadoStr, firstIdx + 1);
if (secondIdx !== -1) {
  // Buscar el <section> que contiene la segunda ocurrencia
  let sectionStart = code.lastIndexOf('<section', secondIdx);
  let sectionEnd = code.indexOf('</section>', secondIdx) + 10;
  if (sectionStart !== -1 && sectionEnd !== -1) {
    code = code.substring(0, sectionStart) + code.substring(sectionEnd);
    console.log('✅ Bloque de mercado duplicado eliminado.');
  }
} else {
  console.log('ℹ️ No hay duplicado del mercado.');
}

// --- 3. Texto de garantía ---
code = code.replace(
  /Solo 51 de 849 suscripciones activas han necesitado la garantía\. El 94% nunca la activa\./g,
  'Solo 6 de cada 100 freelancers necesitan activarla. El 94% cobra sin incidencias.'
);
console.log('✅ Garantía actualizada.');

// --- 4. Enlace de testimonios ---
code = code.replace(/🔍 Ver más testimonios →/g, '🔍 Ver todos los casos de éxito →');
console.log('✅ Enlace testimonios cambiado.');

fs.writeFileSync('src/app/page.tsx', code);
console.log('🎉 Todos los cambios aplicados.');
