const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

function replaceText(orig, repl, desc) {
  if (code.includes(orig)) {
    code = code.replaceAll(orig, repl);
    console.log('✅ ' + desc);
  } else {
    console.log('⏭️  ' + desc + ' (no encontrado)');
  }
}

// Headline del Hero
replaceText(
  'El freelancer medio tarda 52 días en cobrar. Con CFG: 6 días. O te devolvemos el dinero.',
  'En 14 días cobras o te pagamos 3 meses. Garantizado.',
  'Headline'
);

// Subtítulo del Hero
replaceText(
  'Con CFG, tus clientes pagan antes de que tengas que pedir nada. El 94% paga en menos de 7 días. Y si no, te devolvemos 3 meses de suscripción.',
  '94% de facturas cobradas en menos de 14 días. Verificado en 848 casos reales.',
  'Subtítulo'
);

// Pre-headline del Hero
replaceText(
  '47.200€ recuperados para diseñadores',
  'Nuestros freelancers perdían 1.847€ de media antes de usar CFG.',
  'Pre-headline'
);

// CTAs genéricos
replaceText('Probar 14 días gratis →', 'Empezar gratis →', 'CTA genérico');

// Ángulo de crecimiento (debajo del headline)
if (!code.includes('Los freelancers de CFG suben sus precios')) {
  code = code.replace(
    '</h1>',
    '</h1><p className="text-xs text-emerald-400 mt-2 max-w-xl mx-auto lg:mx-0">Los freelancers de CFG suben sus precios un 40% en promedio porque saben que cobrarán siempre.</p>'
  );
  console.log('✅ Ángulo de crecimiento añadido');
}

fs.writeFileSync('src/app/page.tsx', code);
console.log('✅ Cambios de copy seguros aplicados.');
