const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Headline
code = code.replace(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.'
);

// Subtítulo
code = code.replace(
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.'
);

// Pre-headline
code = code.replace(
  '47.200€ recuperados para diseñadores',
  'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.'
);

// CTAs genéricos
code = code.replace(/Probar 14 días gratis →/g, 'Empezar gratis →');

// FAQ limpio (8 preguntas)
const faq8 = `  const faqItems = [
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

// Garantía
code = code.replace(
  'Solo 51 de 849 suscripciones activas han necesitado la garantía. El 94% nunca la activa.',
  'Solo 6 de cada 100 freelancers necesitan activarla. El 94% cobra sin incidencias.'
);

// Testimonios
code = code.replace('🔍 Ver más testimonios →', '🔍 Ver todos los casos de éxito →');

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Cambios aplicados sobre base estable.');
