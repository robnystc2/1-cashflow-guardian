const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// ============ CALCULADORA: más campos y lógica (54-62) ============
// 55. Añadir campo "Tamaño medio de tus proyectos"
code = code.replace(
  /<div><label className="text-sm text-zinc-300 block mb-2">¿En cuántos días sueles cobrar de media\?<\/label>/,
  `<div><label className="text-sm text-zinc-300 block mb-2">Tamaño medio de tus proyectos (€)</label><input type="range" min="100" max="10000" step="100" value={roiFacturacion} onChange={e => setRoiFacturacion(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" /><span className="text-xs text-zinc-400">{roiFacturacion}€</span></div>
              <div><label className="text-sm text-zinc-300 block mb-2">¿En cuántos días sueles cobrar de media?</label>`
);

// 61. Mensaje condicional si no ha tenido impago
code = code.replace(
  /(Con CFG Blindaje Pro \(29€\/mes\), proteges \{new Intl\.NumberFormat\('es-ES'\)\.format\(roiPerdida\)\}€ por solo 348€\/año\.)/,
  `{roiImpago === 0 ? (
    <p className="text-sm text-emerald-400 mt-3 font-medium">Aún no has perdido dinero. CFG se asegura de que nunca pase. Con CFG Blindaje Pro (29€/mes), proteges tus ingresos desde el primer día.</p>
  ) : (
    <p className="text-sm text-emerald-400 mt-3 font-medium">$1</p>
  )}`
);

// 59. Contador regresivo debajo del resultado
code = code.replace(
  /(🔒 Blindar mis \{new Intl\.NumberFormat\('es-ES'\)\.format\(roiPerdida\)\}€ por 1€ →<\/Link>)/,
  `$1
            <p className="text-[10px] text-amber-400 mt-2">⏳ Esta oferta de 1€ está disponible durante las próximas 47 horas</p>`
);

// ============ TABLA COMPARATIVA: filas nuevas (67-69) ============
// 68. Añadir fila "Compatibilidad España/LatAm" y "IA de verificación"
const nuevasFilas = `
    { feat: 'Compatibilidad España/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'IA de verificación de clientes', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Cassandra IA' },`;
code = code.replace(
  /(\{ feat: 'Adaptado a legislación España\/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' \},)/,
  `$1\n${nuevasFilas}`
);

// 69. Añadir Fiverr Workspace a la tabla (solo en texto, no en datos)
code = code.replace(
  /(<th className="py-3 px-4 text-center bg-emerald-900\/20 text-emerald-400 font-bold">CFG<\/th>)/,
  `<th className="py-3 px-4 text-center text-red-400 line-through">Fiverr Workspace<br /><span className="text-[10px] text-red-400">Cerrado 2026</span></th>\n              $1`
);

// ============ FEATURES: nuevas (77-81) ============
const nuevasFeatures = `
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">📉</span><h3 className="font-bold mt-2 mb-2">Dashboard de cashflow predictivo</h3><p className="text-sm text-zinc-400">Basado en tus proyectos actuales, CFG predice cuánto dinero entra este mes, el siguiente y el próximo.</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">🚨</span><h3 className="font-bold mt-2 mb-2">Alerta de cliente de riesgo</h3><p className="text-sm text-zinc-400">Si un cliente empieza a no pagar a otros freelancers en la red CFG, tú recibes una alerta antes de aceptar su proyecto.</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">📑</span><h3 className="font-bold mt-2 mb-2">Propuesta → Contrato → Cobro</h3><p className="text-sm text-zinc-400">Envía una propuesta, el cliente la acepta, se genera el contrato y los hitos de pago automáticamente.</p></div>
              <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6"><span className="text-2xl">🧾</span><h3 className="font-bold mt-2 mb-2">Informe anual para Hacienda</h3><p className="text-sm text-zinc-400">Resumen de ingresos, clientes y proyectos del año para facilitar tu declaración de la renta.</p></div>`;
code = code.replace(
  /(<div className="bg-zinc-900 border-2 border-zinc-700\/50 rounded-2xl p-6"><span className="text-2xl">📈<\/span><h3 className="font-bold mt-2 mb-2">Kit de demanda listo para juzgado<\/h3>[\s\S]*?<\/div>)/,
  `$1\n${nuevasFeatures}`
);

// ============ INTEGRACIONES: categorizar (83-84) ============
code = code.replace(
  /(<div className="flex flex-wrap justify-center gap-6 items-center opacity-70">)/,
  `$1\n              <div className="w-full text-center mb-2"><span className="text-xs text-zinc-500 font-bold">Facturación</span></div>`
);
code = code.replace(
  /(<span className="text-zinc-400 font-bold text-sm">💳 Payoneer<\/span>)/,
  `$1\n              <div className="w-full text-center mb-2 mt-4"><span className="text-xs text-zinc-500 font-bold">Pagos</span></div>`
);

// ============ MÉTRICAS: fijar y añadir 5º stat (91-94) ============
code = code.replace(
  /<p className="text-sm text-zinc-300 mt-1">Sabes cuándo entra el dinero\. Siempre\.<\/p>/,
  '<p className="text-sm text-zinc-300 mt-1">6 días — Tiempo medio de cobro con CFG. La media del sector: 52.</p>'
);
code = code.replace(
  /(<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">)/,
  `$1\n            <div className="bg-zinc-900 border-2 border-zinc-700/50 rounded-xl p-6"><p className="text-3xl font-extrabold text-emerald-400">47</p><p className="text-sm text-zinc-300 mt-1">países activos</p></div>`
);

// ============ SEGURIDAD: expandir (101-102) ============
code = code.replace(
  /Puedes exportar todos tus datos en cualquier momento\. Sin candados\./g,
  'Tus datos son tuyos. Siempre. Exporta todo en 1 clic, sin candados.'
);
code = code.replace(
  /(Servidores en Europa con cifrado AES-256\. Cumplimos con el RGPD\.)/,
  `$1\n              <p className="text-sm text-zinc-400 mt-2">Cifrado en tránsito (TLS 1.3) y en reposo (AES-256). Infraestructura en AWS/Vercel EU.</p>`
);

// ============ PRECIOS: ajustes finales (108, 110, 111) ============
code = code.replace(/CFG Fortress/g, 'CFG Agency');
code = code.replace(/Ahorra 99€/g, 'Ahorra 2 meses');
code = code.replace(
  /(699€\/año)/,
  `$1\n              <p className="text-xs text-emerald-400 mt-1">Ahorra 249€/año</p>`
);
code = code.replace(/Comenzar/g, 'Empezar con Escudo');

// ============ FAQ: más preguntas (116 continuacion) ============
const extraFAQ = [
  { q: "¿Puedo migrar mis proyectos desde Bonsai o HoneyBook?", a: "Sí. Tenemos una guía de migración paso a paso y puedes importar tus proyectos en minutos." },
  { q: "¿Qué pasa con los proyectos en curso cuando activo CFG?", a: "Puedes añadirlos manualmente y activar la protección desde ese momento. No afecta a los acuerdos previos." },
  { q: "¿CFG actúa como intermediario de pago?", a: "No. CFG gestiona los recordatorios y el bloqueo de entregas, pero el pago se realiza directamente entre tú y tu cliente." },
  { q: "¿Cuánto tarda Cassandra en verificar un cliente?", a: "Menos de 5 segundos. Si el cliente tiene historial en nuestra red, el PayScore aparece al instante." },
  { q: "¿Puedo tener proyectos en varias monedas al mismo tiempo?", a: "Sí. CFG soporta múltiples divisas y se adapta a la moneda de cada cliente." },
  { q: "¿El cliente puede apelar el bloqueo de su entrega?", a: "El sistema registra todas las comunicaciones. Si hay una disputa, ambas partes tienen acceso al historial completo." },
];
const extraFAQInsert = extraFAQ.map(item => `    { q: "${item.q}", a: "${item.a}" },`).join('\n');
code = code.replace(/(const faqItems = \[)/, `$1\n${extraFAQInsert}`);

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Lote 6 aplicado: calculadora, tabla, features, integraciones, métricas, seguridad, precios, FAQ.');
