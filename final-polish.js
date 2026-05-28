const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. FAQ exacto (8 preguntas, sin duplicados)
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

code = code.replace(/const faqItems = \[[\s\S]*?\];/, faq8);

// 2. CTA final
code = code.replace(
  'Hablar con el equipo\nVer comparativa completa de planes →',
  'Empezar gratis →\nVer comparativa completa de planes →'
);

// 3. Eliminar cualquier "Comparativas" duplicado en la barra de navegación (por si acaso)
code = code.replace(
  '<a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>\n            <a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>',
  '<a href="#comparativas" onClick={() => setMobileMenu(false)} className="hover:text-white transition-colors scroll-smooth">Comparativas</a>'
);

// 4. Eliminar cualquier "Probar 14 días gratis →" residual (por si queda alguno)
code = code.replace(/Probar 14 días gratis →/g, 'Empezar gratis →');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ FAQ, CTA final y nav limpios.');
