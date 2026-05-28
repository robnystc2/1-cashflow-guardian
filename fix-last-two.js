const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. FAQ: Reemplazar por 8 preguntas limpias (sin duplicados)
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
console.log('✅ FAQ corregido');

// 2. CTA final: "Hablar con el equipo" → "Empezar gratis →"
code = code.replace(
  'Hablar con el equipo\nVer comparativa completa de planes →',
  'Empezar gratis →\nVer comparativa completa de planes →'
);
console.log('✅ CTA final corregido');

fs.writeFileSync('src/app/page.tsx', code);
console.log('Listo.');
