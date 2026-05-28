const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. CTA final: "Hablar con el equipo" → "Empezar gratis →"
page = page.replace(
  'Hablar con el equipo\nVer comparativa completa de planes →',
  'Empezar gratis →\nVer comparativa completa de planes →'
);

// 2. Garantía duplicada: eliminar el texto extra que aparece justo después de "Todos los precios en euros..."
page = page.replace(
  '💡 Calcula tu ROI personalizado →\n\n          💡 Calcula tu ROI personalizado →',
  '💡 Calcula tu ROI personalizado →'
);

// 3. Eliminar texto de Garantía que aparece suelto tras el bloque de precios
page = page.replace(
  '\n\n          🛡️ Garantía Blindaje Total incluida en todos los planes.\n',
  '\n          🛡️ Garantía Blindaje Total incluida en todos los planes.\n'
);

// 4. FAQ: eliminar duplicados reemplazando todo el array por la versión de 8 preguntas
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
page = page.replace(/const faqItems = \[[\s\S]*?\];/, faq8);

// 5. Tabla comparativa: eliminar filas duplicadas de "Mercado hispanohablante" y "Tiempo de onboarding"
// Buscar y eliminar la segunda aparición de cada una
const primeraAparicion = (texto) => page.indexOf(texto);
const segundaAparicion = (texto) => page.indexOf(texto, primeraAparicion(texto) + 1);

['Mercado hispanohablante', 'Tiempo de onboarding'].forEach(fila => {
  const segunda = segundaAparicion(fila);
  if (segunda > -1) {
    // Encontrar la línea completa que contiene esta fila duplicada
    const inicio = page.lastIndexOf('{', segunda);
    const fin = page.indexOf('},', segunda) + 2;
    page = page.substring(0, inicio) + page.substring(fin);
  }
});

fs.writeFileSync('src/app/page.tsx', page);
console.log('✅ 5 últimos fallos corregidos.');
