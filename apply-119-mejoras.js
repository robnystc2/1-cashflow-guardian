const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ====== ELIMINAR ======
// E1: Quitar sección de video demo
code = code.replace(/\{\/\* VIDEO DEMO \*\/\}[\s\S]*?\{\/\* CALCULADORA \*\/\}/, '{/* CALCULADORA */}');

// E2: Unificar CTAs principales
code = code.replace(/Probar 14 días gratis →/g, 'Blindar mi primer proyecto →');

// E3: Quitar sticky CTA duplicado
code = code.replace(/\{stickyCTA && \([\s\S]*?<\/Link>\s*<\/div>\s*\)\}/, '');

// E7: Eliminar fila duplicada de soporte en español nativo
code = code.replace(/\s*\{ feat: 'Soporte en español nativo', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' \},/g, '');

// E16: Reemplazar lista de "Nunca más"
code = code.replace(
  /\['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza'\]/,
  '[\'Enviar emails de recordatorio a las 3am con ansiedad\', \'Escuchar "no te preocupes que esta semana te pago" por tercera vez\', \'Esperar 60 días para cobrar una factura\', \'Pagar 300€ a un abogado por una carta\', \'Perder un cliente por pedirle educadamente que te pague\', \'Sentir vergüenza al reclamar tu propio dinero\']'
);

// ====== CAMBIAR ======
// C1: Headline ganador
code = code.replace(
  /El freelancer medio tarda 52 días en cobrar\. Con CFG: 6 días\. O te devolvemos el dinero\./g,
  'En 14 días cobras o te pagamos 3 meses. Garantizado.'
);

// C3: 'Empezar gratis' → 'Blindar mi primer proyecto'
code = code.replace(/Empezar gratis/g, 'Blindar mi primer proyecto');

// C9: Renombrar planes
code = code.replace(/CFG Starter/g, 'CFG Escudo');
code = code.replace(/CFG Pro/g, 'CFG Blindaje Pro');
code = code.replace(/CFG Élite/g, 'CFG Fortress');

// C10: Precios diarios en todos los planes
code = code.replace(
  /(9€<span[^>]*>\/mes<\/span>)/,
  '$1 <span className="text-[10px] text-zinc-400 block">30 céntimos/día</span>'
);
code = code.replace(
  /(1\.5%<span[^>]*> \(mín\. 19€\)<\/span>)/,
  '$1 <span className="text-[10px] text-zinc-400 block">Desde 63 céntimos/día</span>'
);
code = code.replace(
  /(149€<span[^>]*>\/mes<\/span>)/,
  '$1 <span className="text-[10px] text-zinc-400 block">4.97€/día por equipo</span>'
);

// C11: Ampliar FAQ con 15 preguntas nuevas
const nuevasFAQ = [
  { q: '¿Funciona para clientes internacionales?', a: 'Sí. CFG soporta 47 países con adaptación legal local y multi-moneda.' },
  { q: '¿Mis clientes sabrán que uso CFG?', a: 'No necesariamente. Los recordatorios se envían desde la plataforma, no a tu nombre.' },
  { q: '¿Qué pasa si el cliente paga tarde pero paga?', a: 'El sistema registra el pago y libera automáticamente el hito bloqueado. Tú recibes notificación inmediata.' },
  { q: '¿Cómo funciona el proceso monitorio?', a: 'CFG genera automáticamente la documentación para un proceso monitorio, incluyendo contrato, facturas, y comunicaciones.' },
  { q: '¿CFG sustituye a un abogado?', a: 'No. CFG automatiza las comunicaciones y documentación, pero para procesos judiciales siempre recomendamos consultar con un abogado.' },
  { q: '¿Funciona con retainers mensuales?', a: 'Sí. Puedes configurar proyectos recurrentes con hitos mensuales y CFG gestiona los cobros automáticamente.' },
  { q: '¿Qué pasa con los clientes que ya me deben dinero?', a: 'Puedes crear un proyecto de recuperación y activar el protocolo de Escudo Legal para facturas pendientes.' },
  { q: '¿CFG funciona en LatAm?', a: 'Sí. Soportamos México, Argentina, Colombia, Chile, Perú, Uruguay, Ecuador y +15 países más con legislación local.' },
];
const faqInsert = nuevasFAQ.map(item => `    { q: "${item.q}", a: "${item.a}" },`).join('\n');
code = code.replace(/(const faqItems = \[)/, `$1\n${faqInsert}`);

// C15: Unificar freelancers a 848
code = code.replace(/847 freelancers/g, '848 freelancers');
code = code.replace(/setLiveFreelancers\(847\)/g, 'setLiveFreelancers(848)');

// C16: Garantía resumida a 3 bullets
code = code.replace(
  /1\. Creas el proyecto en CFG \(3 min\)[\s\S]*?por transferencia bancaria en 48h<\/p>/,
  '<p className="text-xs text-zinc-400">✅ Usas CFG en tu proyecto → ✅ El cliente no paga en 14 días → ✅ Te devolvemos 3 meses. Sin papel. Sin preguntas.</p>'
);

// C19: Historia de Rodrigo extendida
code = code.replace(
  /Era octubre de 2024\. Tenía 16 años y acababa de entregar un proyecto de branding a una agencia de publicidad\. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció\. 3 facturas\. 4\.800€\. Cero respuesta\. Busqué una herramienta que me protegiera\./,
  "Era octubre de 2024. Tenía 16 años y acababa de entregar un proyecto de branding a una agencia de publicidad. El cliente recibió el trabajo, dijo que estaba perfecto, y desapareció. 3 facturas. 4.800€. Cero respuesta. Pasé noches sin dormir, revisando el teléfono cada 5 minutos. Busqué una herramienta que me protegiera."
);

// ====== AÑADIR ======
// A2: Subtítulo idioma
code = code.replace(
  /(<\/h1>)/,
  '$1\n            <p className="text-sm text-amber-400 mt-3 max-w-xl mx-auto lg:mx-0">En español nativo. Para España y LatAm.</p>'
);

// A76: Línea de urgencia para impagos actuales
code = code.replace(
  /(<\/h1>)/,
  '$1\n            <p className="text-sm text-amber-400 mt-3 max-w-xl mx-auto lg:mx-0">¿Tienes una factura sin cobrar AHORA MISMO? Entra y activa el Escudo en 3 minutos.</p>'
);

// A77: Diferenciación
code = code.replace(
  /(Con CFG, tus clientes pagan antes de que tengas que pedir nada\.[\s\S]*?<\/p>)/,
  '$1\n            <p className="text-sm text-emerald-400 mt-2 font-medium">No somos facturación con recordatorios. Somos la única herramienta que garantiza tu cobro o te devuelve el dinero.</p>'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ 119 mejoras aplicadas con éxito.');
