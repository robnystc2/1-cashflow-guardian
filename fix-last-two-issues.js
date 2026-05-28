const fs = require('fs');
const { execSync } = require('child_process');

let current = fs.readFileSync('src/app/page.tsx', 'utf8');
let good = execSync('git show c57a473:src/app/page.tsx', { encoding: 'utf8' });

// ====== 1. CORREGIR FAQ ======
// Extraer el bloque faqItems original del commit estable (contiene duplicados)
const faqStart = good.indexOf('const faqItems = [');
const faqEnd = good.indexOf('];', faqStart) + 2;
const oldFaqBlock = good.substring(faqStart, faqEnd);

// Nuevo FAQ limpio
const newFaqBlock = `const faqItems = [
    { q: "¿Necesita mi cliente registrarse en CFG?", a: "No. Solo recibe un email con el detalle del proyecto y el botón de pago. Cero fricción." },
    { q: "¿Qué pasa si el cliente se niega a pagar?", a: "Escudo Legal genera una carta con jurisdicción de tu país. El 80% de los impagos se resuelven con este aviso." },
    { q: "¿Cómo sé que esto funciona en mi país?", a: "Soportamos 47 países con adaptación legal." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia, sin penalización." },
    { q: "¿El cliente sabrá que estoy usando esto?", a: "No necesariamente. Los emails se envían desde tu marca." },
    { q: "¿Funciona con contratos verbales?", a: "Recomendamos contrato escrito (el sistema genera uno en 3 minutos)." },
    { q: "¿Puedo verificar a un cliente antes de aceptar?", a: "Sí. Con el PayScore puedes buscar el historial de pago." },
    { q: "¿Qué pasa si el cliente se enfada por los recordatorios?", a: "Los recordatorios los envía el sistema, no tú. El 94% paga sin conflicto." },
  ];`;

// Reemplazar el bloque exacto
if (current.includes(oldFaqBlock)) {
  current = current.replace(oldFaqBlock, newFaqBlock);
  console.log('✅ FAQ reemplazado correctamente.');
} else {
  console.log('❌ No se encontró el bloque FAQ original. Intentando con regex...');
  current = current.replace(/const faqItems = \[[\s\S]*?\];/, newFaqBlock);
  console.log('✅ FAQ reemplazado con regex.');
}

// ====== 2. ELIMINAR DUPLICADO DEL MERCADO ======
const mercadoText = '⚠️ El mercado freelance está roto';
let first = current.indexOf(mercadoText);
let second = current.indexOf(mercadoText, first + 1);
if (second !== -1) {
  // Buscar el inicio de la segunda sección (el <section> más cercano hacia atrás)
  let sectionStart = current.lastIndexOf('<section', second);
  // Buscar el cierre de esa sección (</section> más cercano hacia adelante)
  let sectionEnd = current.indexOf('</section>', second) + 10;
  if (sectionStart !== -1 && sectionEnd > 10) {
    current = current.substring(0, sectionStart) + current.substring(sectionEnd);
    console.log('✅ Segundo bloque "El mercado freelance está roto" eliminado.');
  }
} else {
  console.log('ℹ️ No hay duplicado del mercado.');
}

fs.writeFileSync('src/app/page.tsx', current);
console.log('✅ Archivo actualizado.');
