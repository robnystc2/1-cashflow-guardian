const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

// 1. Eliminar "Comparativas" duplicado en el menú
code = code.replace(
  '<a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>\n            <a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>',
  '<a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>'
);
console.log('✅ Comparativas duplicado eliminado del nav');
changes++;

// 2. FAQ: Reemplazar por 8 preguntas exactas (sin duplicados)
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
console.log('✅ FAQ reemplazado con 8 preguntas exactas');
changes++;

// 3. CTA final: "Hablar con el equipo" → "Empezar gratis →"
code = code.replace(
  'Hablar con el equipo\nVer comparativa completa de planes →',
  'Empezar gratis →\nVer comparativa completa de planes →'
);
console.log('✅ CTA final corregido');
changes++;

// 4. Monedas LatAm: unificar con el texto de precios
code = code.replace(
  'Sin costes ocultos. Sin permanencia. Sin sorpresas.\n💡 Calcula tu ROI personalizado →\n\nPagos disponibles en USD, MXN, COP.',
  'Sin costes ocultos. Sin permanencia. Sin sorpresas. Pagos disponibles en USD, MXN, COP.\n💡 Calcula tu ROI personalizado →'
);
console.log('✅ Monedas LatAm unificadas');
changes++;

// 5. Eliminar línea vacía extra en la sección de precios
code = code.replace('💡 Calcula tu ROI personalizado →\n\n          🛡️ Garantía Blindaje Total', '💡 Calcula tu ROI personalizado →\n          🛡️ Garantía Blindaje Total');
console.log('✅ Línea extra eliminada en precios');
changes++;

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' correcciones aplicadas.');
