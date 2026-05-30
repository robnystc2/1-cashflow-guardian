const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');
let changes = 0;

function safeReplace(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
    changes++;
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

console.log('🔥 Aplicando Lote 1 de 119...\n');

// 1. E1: Reemplazar el iframe roto del video por un placeholder profesional
safeReplace(
  '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/cashflow-guardian-demo" title="Video demo de CFG" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>',
  `<div className="flex items-center justify-center h-full bg-zinc-800/50 rounded-xl">
    <div className="text-center">
      <span className="text-5xl">🎥</span>
      <p className="text-zinc-300 text-sm mt-2 font-medium">Demo del blindaje en 90 segundos</p>
      <p className="text-zinc-500 text-xs mt-1">Vídeo en producción — disponible próximamente</p>
    </div>
  </div>`,
  'E1: Placeholder de vídeo'
);

// 2. E7: Fusionar filas duplicadas en la tabla comparativa
// Eliminar la fila "Soporte en español nativo" (duplicada de "Soporte en español")
const comparisonStart = code.indexOf('const comparisonRows = [');
const comparisonEnd = code.indexOf('];', comparisonStart) + 2;
let comparisonBlock = code.substring(comparisonStart, comparisonEnd);

// Reemplazar el bloque completo de comparisonRows por una versión sin duplicados
const newComparisonRows = `const comparisonRows = [
    { feat: 'Protección impago', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Bloqueo de entrega', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Calificación de clientes', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ PayScore' },
    { feat: 'Defensa legal', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Escudo Legal' },
    { feat: 'Precio mensual', bonsai: '17$', honeybook: '19$', moxie: '20$', dubsado: '20$', nosotros: '29€' },
    { feat: 'Recordatorios', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ Automático' },
    { feat: 'Velocidad de onboarding', bonsai: '15 min', honeybook: '20 min', moxie: '10 min', dubsado: 'semanas', nosotros: '✓ 3 min' },
    { feat: 'Soporte nativo español', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
    { feat: 'Garantía de cobro', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓ 3 meses gratis' },
    { feat: 'Adaptado a legislación España/LatAm', bonsai: '✗', honeybook: '✗', moxie: '✗', dubsado: '✗', nosotros: '✓' },
  ]`;

code = code.replace(comparisonBlock, newComparisonRows);
console.log('✅ E7: Filas de tabla fusionadas');

// 3. C1: Headline unificado (ya está, verificar)
if (code.includes('En 14 días cobras o te pagamos 3 meses. Garantizado.')) {
  console.log('✅ C1: Headline ya unificado');
} else {
  safeReplace(
    'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
    'En 14 días cobras o te pagamos 3 meses. Garantizado.',
    'C1: Headline unificado'
  );
}

// 4. C3: Cambiar CTA "Empezar gratis" por "Blindar mi primer proyecto"
safeReplace('Empezar gratis →', 'Blindar mi primer proyecto →', 'C3: CTA principal');

// 5. C16: Simplificar texto de la Garantía Blindaje Total
const garantiaOld = '1. Creas el proyecto en CFG (3 min)\n\n2. El cliente recibe los términos. Si desaparece (ghosting), el sistema actúa.\n\n3. CFG gestiona los cobros. El cliente nunca sabrá que fuiste tú quien activó el protocolo.\n\n4. Si en 14 días no has cobrado, te devolvemos 3 meses de suscripción, por transferencia bancaria en 48h';
const garantiaNew = '✅ Creas el proyecto en CFG (3 min) → ✅ Si el cliente no paga en 14 días → ✅ Te devolvemos 3 meses de suscripción. Sin preguntas. Sin papeleo.';
safeReplace(garantiaOld, garantiaNew, 'C16: Garantía simplificada');

// 6. E16: Items más específicos en "Lo que nunca más"
const nuncaMasOld = "['Trabajar gratis', 'Perseguir facturas', 'Esperar meses para cobrar', 'Pagar a un abogado', 'Perder clientes por pedir pago', 'Pedir el dinero con vergüenza']";
const nuncaMasNew = "['Trabajar gratis', 'Enviar emails de recordatorio a las 3am con ansiedad', 'Esperar 60 días para cobrar', 'Pagar 300€ a un abogado por una carta', 'Perder un cliente por pedirle educadamente que te pague', 'Sentir vergüenza al reclamar tu propio dinero']";
safeReplace(nuncaMasOld, nuncaMasNew, 'E16: Nunca más específico');

// 7. A76: Añadir línea para impagos activos debajo del headline
if (!code.includes('¿Tienes una factura sin cobrar AHORA MISMO')) {
  code = code.replace(
    '</h1>',
    '</h1><p className="text-sm text-amber-400 mt-3 max-w-xl mx-auto lg:mx-0">¿Tienes una factura sin cobrar AHORA MISMO? Entra y activa el Escudo en 3 minutos.</p>'
  );
  console.log('✅ A76: Línea para impagos activos');
  changes++;
}

// 8. A2: Subtítulo "En español nativo. Para España y LatAm."
if (!code.includes('En español nativo. Para España y LatAm')) {
  code = code.replace(
    '<p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">',
    '<p className="text-sm text-emerald-400 mb-2">En español nativo. Para España y LatAm.</p>\n            <p className="text-lg md:text-xl text-zinc-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">'
  );
  console.log('✅ A2: Subtítulo LatAm');
  changes++;
}

// 9. E10: Unificar nombres de Cassandra (dejar solo "Cassandra IA")
safeReplace('CFO Cassandra', 'Cassandra IA', 'E10: CFO Cassandra → Cassandra IA');
safeReplace('Cassandra Score', 'Cassandra IA', 'E10: Cassandra Score → Cassandra IA');
safeReplace('Cassandra Ejecutiva', 'Cassandra IA (Avanzada)', 'E10: Cassandra Ejecutiva → Cassandra IA Avanzada');

fs.writeFileSync('src/app/page.tsx', code);
console.log('\n🎉 ' + changes + ' cambios del Lote 1 aplicados.');
